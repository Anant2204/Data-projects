
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceGroupMerge]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_ServiceGroupMerge] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_ServiceGroupMerge]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,
@ADFpipeline NVARCHAR(50) = 'ADF pipeline',
@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
MERGE BSO.STG_ServiceGroup AS tgt
		USING  (
		SELECT DSG.* ,
		STGS.ID Service_ID
		FROM BSO.DV_ServiceGroups DSG
		LEFT JOIN BSO.STG_Services STGS
		ON STGS.DataverseRowID= DSG.servicename_mapping_id
		
		) AS src
		ON UPPER(src.service_groupid) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED  THEN --AND src.modifiedon > tgt.ModifiedDate
			UPDATE SET 
				tgt.ServiceGroupName = src.service_group_name,
				tgt.ServiceGroupDescription = src.service_groupdescription, 	
				tgt.IsActive=src.statecode,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFpipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFpipeline,
				ServiceID= src.Service_ID,
				tgt.Service_DataverseRowID= src.servicename_mapping_id

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
			ServiceID,
			Service_DataverseRowID
			) 
			VALUES (src.service_group_name, 
			src.service_groupdescription, 
			src.statecode,
			src.service_groupid,
			GETDATE(),
			GETDATE(),
			@ADFpipeline,
			@ADFpipeline,
			src.Service_ID,
			src.servicename_mapping_id
			);

END
