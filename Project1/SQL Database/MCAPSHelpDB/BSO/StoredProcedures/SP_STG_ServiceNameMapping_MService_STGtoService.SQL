IF OBJECT_ID('BSO.STG_ServiceNameMapping_MService_STGtoService', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.STG_ServiceNameMapping_MService_STGtoService;
END
GO

CREATE PROCEDURE [BSO].[STG_ServiceNameMapping_MService_STGtoService]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@Table_DV_ID UNIQUEIDENTIFIER = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN

DECLARE @CREATEANDMODIFIEDBYNAME NVARCHAR(200) = 'ADF pipeline';
	MERGE BSO.ServiceNameMapping AS tgt
		USING  (		
		SELECT
		SSrv.ID Service_ID
		,STGSrvMap.IsActive
		,STGSrvMap.ServiceArea AreaID
		,STGSrvMap.ServiceRole RoleID
		,STGSrvMap.ServiceSegment SegmentID
		,STGSrvMap.ServiceSubsegment SubSegmentID
		,STGSrvMap.TileName TileName
		,STGSrvMap.DataverseRowID ServiceNameMappingID
		,STGSrvMap.IRIS_Utterance
		,STGSrvMap.AboutService
		,STGSrvMap.relatedinformation
		,STGSrvMap.IsNonIRISService
		,STGSrvMap.ServiceRequestFormLink
		,STGSrvMap.WelcomeMessage
		,STGSrvMap.TileBlurb
		,STGSrvMap.TileDescription
		,STGSrvMap.IsSecuredByAzureADGroup
		,STGSrvMap.FAQLink
		,STGSrvMap.IrisAppName
		,STGSrvMap.idweblink
		,STGSrvMap.IDWEBGroup_DataverseRowID
		,STGSrvMap.ModifiedDate
		
		FROM BSO.STG_ServiceNameMapping STGSrvMap
		INNER JOIN BSO.Services SSrv
		ON SSrv.DataverseRowID= STGSrvMap.Service_DataverseRowID
		AND SSrv.IsActive=1
			
		) AS src

		ON src.Service_ID = tgt.ServiceID
		AND src.AreaID = tgt.ServiceArea
		AND src.RoleID = tgt.ServiceRole
		AND src.SegmentID= tgt.ServiceSegment
		AND src.SubSegmentID= tgt.ServiceSubsegment

		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.TileName = src.TileName,	
				tgt.IsActive=src.IsActive,
				tgt.DataverseRowID=src.ServiceNameMappingID,
				tgt.IRIS_Utterance = src.IRIS_Utterance, 	
				tgt.AboutService = src.AboutService ,
				tgt.relatedinformation= src.relatedinformation ,
				tgt.IsNonIRISService= src.isnonirisservice ,
				tgt.IsSecuredByAzureADGroup= src.IsSecuredByAzureADGroup ,
				tgt.ModifiedDate= src.ModifiedDate ,
				tgt.CreatedDate= src.ModifiedDate ,
				tgt.CreatedBy= @CREATEANDMODIFIEDBYNAME ,
				tgt.ModifiedBy= @CREATEANDMODIFIEDBYNAME ,
				tgt.IDWEBGroup_DataverseRowID= src.IDWEBGroup_DataverseRowID,
				tgt.IrisAppName = src.IrisAppName
				,tgt.FaqLink = src.FAQLink
				,tgt.TileDescription= src.TileDescription
				,tgt.TileBlurb=src.TileBlurb
				,tgt.WelcomeMessage=src.WelcomeMessage

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (ServiceID, 
			ServiceArea,
			ServiceRole,
			ServiceSegment,
			ServiceSubsegment,
			DataverseRowID,
			IsActive,
			TileName,
			IRIS_Utterance,
			AboutService,
			relatedinformation,
			IsNonIRISService,
			IsSecuredByAzureADGroup,
			ModifiedDate,
			CreatedDate,
			CreatedBy,
			ModifiedBy,
			IDWEBGroup_DataverseRowID,
			IrisAppName,
			FaqLink,
			TileDescription,
			TileBlurb,
			WelcomeMessage
			) 
			VALUES (src.Service_ID, 
			src.AreaID,
			src.RoleID,
			src.SegmentID,
			src.SubSegmentID,
			src.ServiceNameMappingID,
			src.IsActive,
			src.TileName,
			src.IRIS_Utterance,
			src.AboutService,
			src.relatedinformation,
			src.IsNonIRISService,
			src.IsSecuredByAzureADGroup,
			src.ModifiedDate,
			src.ModifiedDate,
			@CREATEANDMODIFIEDBYNAME,
			@CREATEANDMODIFIEDBYNAME,
			src.IDWEBGroup_DataverseRowID,
			src.IrisAppName,
			src.FaqLink,
			src.TileDescription,
			src.TileBlurb,
			src.WelcomeMessage
			)
		WHEN NOT MATCHED BY SOURCE THEN
		UPDATE SET tgt.IsActive=0;

 END


GO