IF OBJECT_ID('BSO.STG_ServiceOwner_MService_STGtoService', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.[STG_ServiceOwner_MService_STGtoService];
END
GO


Create PROCEDURE [BSO].[STG_ServiceOwner_MService_STGtoService]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@Table_DV_ID NVARCHAR(50) = NULL,
@ADFpipeline NVARCHAR(50) = 'ADF pipeline',
@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN

	MERGE BSO.ServiceOwner AS tgt
		USING STG_ServiceOwner AS src
		ON UPPER(src.DataverseRowID) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.UPN = src.UPN,
				tgt.DisplayName = src.DisplayName, 	
				tgt.DataverseRowID = src.DataverseRowID ,
				tgt.IsActive=src.IsActive,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFpipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFpipeline

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (UPN, 
			DisplayName,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy
			) 
			VALUES (src.UPN, 
			src.DisplayName, 
			src.IsActive,
			src.DataverseRowID,
			GETDATE(),
			GETDATE(),
			@ADFpipeline,
			@ADFpipeline
			);	

END
