IF OBJECT_ID('[BSO].[GetUserWorkSpacesByUserId]', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE [BSO].[GetUserWorkSpacesByUserId];
END
GO
CREATE  PROCEDURE [BSO].[GetUserWorkSpacesByUserId]
    @UserId INT
AS
BEGIN
      
WITH ServiceCTE AS ( 
   SELECT 
      rt.RequestTypeName,
      uws.Id,
      uws.UserID,
      uws.ServiceID,     
      COALESCE(SNM.IRIS_Utterance,s.IRIS_Utterance) IRIS_Utterance,
      s.Name,
      COALESCE(SNM.TileBlurb,s.AboutService, s.Name) as AboutService,
      s.DataverseRowID,
      s.IsActive AS Service_IsActive,
      s.IsDropdownUI AS Service_IsDropdownUI,
      COALESCE(SNM.IsNonIRISService,s.IsNonIRISService) AS Service_IsNonIRISService,
      s.IsPrivate AS Service_IsPrivate,
      s.ServiceDropDownLinks,
      sm.ServiceRequestFormLink,
      COALESCE(SNM.RelatedInformation, s.RelatedInformation) AS RelatedInformation,
      COALESCE(SNM.ServiceCategories, s.ServiceCategories) AS ServiceCategories,
      SO.UPN,
      SO.DisplayName,
      COALESCE(SNM.FAQLink , S.FAQLink) AS FAQLink,
      COALESCE(SNM.IrisAppName ,S.IrisAppName) AS IrisAppName,
	  SNM.TileName,
	  CASE WHEN LOWER(s.ServiceCategories) LIKE '%width%' THEN 1 ELSE 0 END AS Service_IsLarge
   FROM
      [BSO].[UserWorkSpaceServices] uws	

      INNER JOIN [BSO].[Services] s ON s.Id = uws.ServiceID AND s.IsActive = 1
	  AND uws.UserID = @UserId AND (uws.IsActive = 1 OR uws.IsActive IS NULL)
      INNER JOIN [BSO].ServiceMapping sm ON uws.ServiceID = sm.ServiceID AND sm.IsActive = 1
	  
	  AND SM.ServiceArea = (SELECT UserArea FROM BSO.[User] WHERE Id = @UserId)
      AND SM.ServiceRole = (SELECT UserRole FROM BSO.[User] WHERE Id = @UserId)
      AND SM.ServiceSegment = (SELECT Segment FROM BSO.[User] WHERE Id = @UserId)
      AND SM.ServiceSubsegment =  (SELECT  SubSegment  FROM BSO.[User] WHERE Id = @UserId)

      INNER JOIN [BSO].[RequestType] rt ON sm.RequestTypeID = rt.RequestTypeID AND rt.IsActive = 1   
      LEFT JOIN BSO.ServiceOwnerServices SOS ON SOS.ServiceID = uws.ServiceID	
      LEFT JOIN BSO.ServiceOwner SO ON SO.ID = SOS.ServiceOwnerID AND SO.IsActive = 1
	  LEFT JOIN BSO.ServiceNameMapping SNM  on SNM.ServiceID = S.ID
	  			AND SNM.ServiceArea=SM.ServiceArea 
				AND SNM.ServiceRole=SM.ServiceRole 
				AND SNM.ServiceSegment=SM.ServiceSegment 
				AND SNM.ServiceSubsegment=SM.ServiceSubsegment
				AND SNM.IsActive=1

				--select * from [BSO].ServiceNameMapping
)
SELECT DISTINCT
      RequestTypeName,
      Id,
      UserID,
      ServiceID,     
      IRIS_Utterance,
      Name,
      AboutService,
      DataverseRowID,
      Service_IsActive,
      Service_IsDropdownUI,
      Service_IsNonIRISService,
      Service_IsPrivate,
      ServiceDropDownLinks,
      ServiceRequestFormLink,
		 RelatedInformation,
		 ServiceCategories,
		 UPN,
		 DisplayName,
		 FAQLink,
		 IrisAppName,
		 TileName,
		 Service_IsLarge
FROM ServiceCTE ORDER BY NAME;
END;
GO