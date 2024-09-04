
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceGroup_MService_STGtoService]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_ServiceGroup_MService_STGtoService] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_ServiceGroup_MService_STGtoService]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@Table_DV_ID NVARCHAR(50) = NULL,
@ADFpipeline NVARCHAR(50) = 'ADF pipeline',
@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
	MERGE BSO.ServiceGroup AS tgt
		USING  (
		SELECT STG_SrvGrp.* ,
		SRV.ID Service_ID
		FROM BSO.STG_ServiceGroup STG_SrvGrp
		LEFT JOIN BSO.Services SRV
		ON SRV.DataverseRowID= STG_SrvGrp.Service_DataverseRowID
		
		) AS src
		ON UPPER(src.DataverseRowID) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.ServiceGroupName = src.ServiceGroupName,
				tgt.ServiceGroupDescription = src.ServiceGroupDescription, 	
				tgt.IsActive=src.IsActive,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFpipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFpipeline,
				ServiceID= src.Service_ID

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (ServiceGroupName, 
			ServiceGroupDescription,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy,
			ServiceID
			) 
			VALUES (src.ServiceGroupName, 
			src.ServiceGroupDescription, 
			src.IsActive,
			src.DataverseRowID,
			GETDATE(),
			GETDATE(),
			@ADFpipeline,
			@ADFpipeline,
			src.Service_ID
			)
		WHEN NOT MATCHED BY SOURCE THEN
		UPDATE SET tgt.IsActive=0;

END
