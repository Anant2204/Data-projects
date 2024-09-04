
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_RequestTypeMerge]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_RequestTypeMerge] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_RequestTypeMerge]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,
@ADFpipeline NVARCHAR(50) = 'ADF pipeline',
@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
MERGE BSO.STG_RequestType AS tgt
		USING  (
		SELECT DRT.* ,
		STGSG.ServiceGroupID ServiceGroup_ID
		FROM BSO.DV_RequestTypes DRT
		LEFT JOIN BSO.STG_ServiceGroup STGSG
		ON STGSG.DataverseRowID= DRT.servicegroup_mapping_id
		
		) AS src
		ON UPPER(src.service_request_typeid) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED  THEN --AND src.modifiedon > tgt.ModifiedDate
			UPDATE SET 
				tgt.RequestTypeName = src.service_request_type_name,	
				tgt.IsActive=src.statecode,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFpipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFpipeline,
				ServiceGroupID= src.ServiceGroup_ID,
				ServiceGroup_DataverseRowID=src.servicegroup_mapping_id

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (RequestTypeName, 
			ServiceGroupID,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy,
			ServiceGroup_DataverseRowID
			) 
			VALUES (src.service_request_type_name, 
			src.ServiceGroup_ID, 
			src.statecode,
			src.service_request_typeid,
			GETDATE(),
			GETDATE(),
			@ADFpipeline,
			@ADFpipeline,
			servicegroup_mapping_id
			);

END