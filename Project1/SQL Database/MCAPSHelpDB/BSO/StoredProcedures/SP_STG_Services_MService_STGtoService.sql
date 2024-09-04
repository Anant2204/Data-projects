IF OBJECT_ID('BSO.STG_Services_MService_STGtoService', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.STG_Services_MService_STGtoService;
END
GO

CREATE PROCEDURE [BSO].[STG_Services_MService_STGtoService]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@Table_DV_ID NVARCHAR(50) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
MERGE BSO.Services AS tgt
		USING BSO.STG_Services AS src
		ON UPPER(src.DataverseRowID) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.Name = src.Name,
				tgt.IRIS_Utterance = src.IRIS_Utterance, 	
				tgt.AboutService = src.AboutService ,
				tgt.relatedinformation= src.relatedinformation ,
				tgt.IsNonIRISService= src.IsNonIRISService ,
				tgt.IsDropdownUI= src.IsDropdownUI ,
				tgt.ServiceDropDownLinks= src.ServiceDropDownLinks ,
				--tgt.ServiceCategories= src. ,
				--tgt.ServiceAzureADGroup= src. ,
				tgt.IsSecuredByAzureADGroup= COALESCE(src.IsSecuredByAzureADGroup ,0),
				tgt.ModifiedDate= src.ModifiedDate ,
				tgt.CreatedDate= src.CreatedDate ,
				tgt.CreatedBy= src.CreatedBy ,
				tgt.ModifiedBy= src.ModifiedBy ,
				tgt.IsActive = src.IsActive,
				tgt.IrisAppName = src.IrisAppName,
				tgt.IDWEBGroup_DataverseRowID=src.IDWEBGroup_DataverseRowID,
				tgt.FaqLink = src.FaqLink
				--tgt.TileName = src.TileName
		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, 
			IRIS_Utterance,
			AboutService,
			relatedinformation,
			IsNonIRISService,
			IsDropdownUI,
			ServiceDropDownLinks,
			DataverseRowID,
			IsSecuredByAzureADGroup,
			ModifiedDate,
			ModifiedBy,
			CreatedDate,
			CreatedBy,
			IsActive,
			IrisAppName,
			FaqLink,
			--TileName,
			IDWEBGroup_DataverseRowID) 
			VALUES (src.name, 
			src.IRIS_Utterance, 
			src.AboutService,
			src.relatedinformation, 
			src.IsNonIRISService,
			src.IsDropdownUI, 
			src.ServiceDropDownLinks,
			src.DataverseRowID, 
			COALESCE(src.IsSecuredByAzureADGroup ,0),
			 src.ModifiedDate, 
			 src.ModifiedBy,
			 src.CreatedDate,
			 src.CreatedBy,
			src.IsActive,
			src.IrisAppName,
			src.FaqLink,
			--src.TileName,
			src.IDWEBGroup_DataverseRowID
			)
		WHEN NOT MATCHED BY SOURCE THEN
		UPDATE SET tgt.IsActive=0;
	END
