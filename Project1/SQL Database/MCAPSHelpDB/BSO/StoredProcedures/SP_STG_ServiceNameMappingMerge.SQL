
IF OBJECT_ID('BSO.STG_ServiceNameMappingMerge', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.STG_ServiceNameMappingMerge;
END
GO

CREATE PROCEDURE [BSO].[STG_ServiceNameMappingMerge]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN

DECLARE  @ModifiedByName NVARCHAR(200) = 'ADF pipeline';
MERGE BSO.STG_ServiceNameMapping AS tgt
		USING  (		
		SELECT DISTINCT
		STGSrv.DataverseRowID ServiceName_id,
		STGSrv.ID Service_ID
		,STGSrv.isactive
		,Area.ID AreaID
		,Role.ID RoleID
		,Segment.ID SegmentID
		,SubSegment.ID SubSegmentID
		,BSO.fnGetNullIfBlank(SR_Map.Tilename) AS Tilename
		,SR_Map.ServiceNameMapping_ID
		,BSO.fnGetNullIfBlank(SR_Map.IRIS_Utterance) AS IRIS_Utterance
		,BSO.fnGetNullIfBlank(SR_Map.AboutService) AS AboutService
		,BSO.fnGetNullIfBlank(SR_Map.relatedinformation) AS relatedinformation 
		,SR_Map.IsNonIRISService
		,SR_Map.ServiceRequestFormLink
		,BSO.fnGetNullIfBlank(SR_Map.WelcomeMessage) AS WelcomeMessage
		,BSO.fnGetNullIfBlank(SR_Map.TileBlurb) AS TileBlurb
		,BSO.fnGetNullIfBlank(SR_Map.TileDescription) AS TileDescription
		,SR_Map.isidwebservicegroup
		,BSO.fnGetNullIfBlank(SR_Map.FAQLink) AS FAQLink
		,BSO.fnGetNullIfBlank(SR_Map.IrisAppName) AS IrisAppName
		,BSO.fnGetNullIfBlank(SR_Map.idweblink) AS idweblink
		,SR_Map.IDWEBGroup_DataverseRowID
		,SR_Map.ModifiedDate


		FROM  BSO.STG_Services STGSrv

		INNER JOIN BSO.DV_ServiceNameMapping SR_Map
		ON UPPER(SR_Map.ServiceName_ID) = UPPER(STGSrv.DataverseRowID)
		

		INNER JOIN BSO.DV_ServiceNameMapping_Area SR_A
		ON UPPER(SR_A.service_name_mapping_id)= UPPER(SR_Map.ServiceNameMapping_ID)
		INNER JOIN BSO.Area Area
		ON UPPER(Area.DataverseRowID)=UPPER(SR_A.areaid)
		AND Area.isActive =1

		INNER JOIN BSO.DV_ServiceNameMapping_Role SR_R
		ON UPPER(SR_R.service_name_mapping_id)= UPPER(SR_Map.ServiceNameMapping_ID)
		INNER JOIN BSO.Role Role
		ON UPPER(Role.DataverseRowID) = UPPER(SR_R.role_id)
		AND Role.isActive =1

		INNER JOIN BSO.DV_ServiceNameMapping_Segment SR_S
		ON UPPER(SR_S.service_name_mapping_id)= UPPER(SR_Map.ServiceNameMapping_ID)
		INNER JOIN BSO.Segment Segment
		ON UPPER(Segment.DataverseRowID)=UPPER(SR_S.segmentsid)
		AND Segment.isActive =1

		INNER JOIN BSO.DV_SubSegment_Segment SubSeg_Seg
		ON UPPER(SubSeg_Seg.segments_id) = UPPER(SR_S.segmentsid)
		INNER JOIN BSO.DV_SubSegment SR_SubSeg
		ON UPPER(SR_SubSeg.subsegments_id)= UPPER(SubSeg_Seg.subsegments_id)
		INNER JOIN BSO.SubSegment SubSegment
		ON UPPER(SubSegment.DataverseRowID)=UPPER(SubSeg_Seg.subsegments_id)
		AND Segment.ID= SubSegment.Segment
		AND SubSegment.isActive =1		
		) AS src

		ON src.Service_ID = tgt.ServiceID
		AND src.AreaID = tgt.ServiceArea
		AND src.RoleID = tgt.ServiceRole
		AND src.SegmentID= tgt.ServiceSegment
		AND src.SubSegmentID= tgt.ServiceSubsegment


		
		-- Update existing rows in the target table
		WHEN MATCHED  THEN
			UPDATE SET 
				tgt.TileName = src.Tilename,	
				tgt.IsActive=src.IsActive,
				tgt.Service_DataverseRowID=src.ServiceName_id,
				tgt.DataverseRowID=src.ServiceNameMapping_ID,
				tgt.IRIS_Utterance = src.IRIS_Utterance, 	
				tgt.AboutService = src.AboutService ,
				tgt.relatedinformation= src.relatedinformation ,
				tgt.IsNonIRISService= src.isnonirisservice ,
				tgt.IsSecuredByAzureADGroup= COALESCE(src.isidwebservicegroup ,0),
				tgt.ModifiedDate= src.ModifiedDate ,
				tgt.CreatedDate= src.ModifiedDate ,
				tgt.CreatedBy= @ModifiedByName ,
				tgt.ModifiedBy= @ModifiedByName ,
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
			Service_DataverseRowID,
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
			src.ServiceNameMapping_ID,
			src.IsActive,
			src.TileName,
			src.ServiceName_id,
			src.IRIS_Utterance,
			src.AboutService,
			src.relatedinformation,
			src.IsNonIRISService,
			COALESCE(src.isidwebservicegroup ,0),
			src.ModifiedDate,
			src.ModifiedDate,
			@ModifiedByName,
			@ModifiedByName,
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