
IF OBJECT_ID('BSO.STG_ServicesMerge', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.STG_ServicesMerge;
END
GO

CREATE PROCEDURE [BSO].[STG_ServicesMerge]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
DECLARE @CREATEDNMODIFIEDBYNAME NVARCHAR(200) = 'ADF pipeline';
	MERGE BSO.STG_Services AS tgt
		USING BSO.DV_ServiceNames AS src
		ON UPPER(src.servicename_id) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED  THEN --AND src.modifiedon > tgt.ModifiedDate
			UPDATE SET 
				tgt.Name = src.servicename,
				tgt.IRIS_Utterance = BSO.fnGetNullIfBlank(src.irisutterance), 	
				tgt.AboutService = BSO.fnGetNullIfBlank(src.servicetiledescription) ,
				tgt.relatedinformation= BSO.fnGetNullIfBlank(src.relatedinformation) ,
				tgt.IsNonIRISService= src.isnonirisservice ,
				tgt.IsDropdownUI= src.needdropdown ,
				tgt.ServiceDropDownLinks= src.dropdownvalues ,
		
				tgt.IsSecuredByAzureADGroup= COALESCE(src.isidwebservicegroup ,0),
				tgt.ModifiedDate= src.modifiedon ,
				tgt.CreatedDate= src.modifiedon ,
				tgt.CreatedBy= @CREATEDNMODIFIEDBYNAME ,
				tgt.ModifiedBy= @CREATEDNMODIFIEDBYNAME ,
				tgt.IsActive = src.statecode,
				tgt.IDWEBGroup_DataverseRowID= src.idwebgroup,
				tgt.IrisAppName = BSO.fnGetNullIfBlank(src.IrisAppName)
				,tgt.FaqLink = BSO.fnGetNullIfBlank(src.FaqLink)
			

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
		
			IDWEBGroup_DataverseRowID) 
			VALUES (src.servicename, 
			BSO.fnGetNullIfBlank(src.irisutterance), 
			BSO.fnGetNullIfBlank(src.servicetiledescription),
			BSO.fnGetNullIfBlank(src.relatedinformation), 
			src.isnonirisservice,
			src.needdropdown, 
			src.dropdownvalues,
			src.servicename_id, 
			COALESCE(src.isidwebservicegroup ,0),
			 src.modifiedon, 
			@CREATEDNMODIFIEDBYNAME,
			 src.modifiedon,
			 @CREATEDNMODIFIEDBYNAME,
			src.statecode,
			BSO.fnGetNullIfBlank(src.IrisAppName),
			BSO.fnGetNullIfBlank(src.FaqLink),			
			 src.idwebgroup
			);
END
GO