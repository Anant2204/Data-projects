
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_RequestType_MService_STGtoService]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_RequestType_MService_STGtoService] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_RequestType_MService_STGtoService]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@Table_DV_ID NVARCHAR(50) = NULL,
@ADFpipeline NVARCHAR(50) = 'ADF pipeline',
@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
	MERGE BSO.RequestType AS tgt
		USING  (
		SELECT STG_RT.* ,
		SG.ServiceGroupID ServiceGroup_ID
		FROM BSO.STG_RequestType STG_RT
		LEFT JOIN BSO.ServiceGroup SG
		ON SG.DataverseRowID= STG_RT.ServiceGroup_DataverseRowID
		
		) AS src
		ON UPPER(src.DataverseRowID) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.RequestTypeName = src.RequestTypeName,	
				tgt.IsActive=src.IsActive,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFpipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFpipeline,
				ServiceGroupID= src.ServiceGroup_ID

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (RequestTypeName, 
			ServiceGroupID,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy
			) 
			VALUES (src.RequestTypeName, 
			src.ServiceGroup_ID, 
			src.IsActive,
			src.DataverseRowID,
			GETDATE(),
			GETDATE(),
			@ADFpipeline,
			@ADFpipeline
			)
		WHEN NOT MATCHED BY SOURCE THEN
		UPDATE SET tgt.IsActive=0;

END
