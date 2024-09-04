IF OBJECT_ID('[BSO].[GetActiveServicesNotInUserWorkSpace]', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE [BSO].[GetActiveServicesNotInUserWorkSpace];
END
GO
CREATE PROCEDURE [BSO].[GetActiveServicesNotInUserWorkSpace]
    @UserId INT,
	@FilterMCEM NVARCHAR(200) = NULL,
	@FilterServiceCategory NVARCHAR(200)= NULL

AS
BEGIN
    SET NOCOUNT ON;
	DECLARE @hasALLinMCEMStage bit = 0;
	--DECLARE @mcemstage AS NVARCHAR(MAX) = '1,2,3,4';
	IF @FilterMCEM IS NOT NULL 
	BEGIN
		SELECT @hasALLinMCEMStage = CASE 
		WHEN EXISTS (
		Select * from BSO.MCEMstage M
		INNER JOIN (
			SELECT value FROM STRING_SPLIT(@FilterMCEM, ',')
		) AS P on P.value=M.ID
		where UPPER(M.Name) like 'ALL')
		THEN 1
		ELSE 0
		END;
	END;

	DECLARE @hasALLinSrvCategory bit = 0;
	--DECLARE @mcemstage AS NVARCHAR(MAX) = '1,2,3,4';
	IF @FilterServiceCategory IS NOT NULL 
	BEGIN
		SELECT @hasALLinSrvCategory = CASE 
		WHEN EXISTS (
		Select * from BSO.ServicesCategory M
		INNER JOIN (
			SELECT value FROM STRING_SPLIT(@FilterServiceCategory, ',')
		) AS P on P.value=M.ID
		where UPPER(M.Name) like 'ALL')
		THEN 1
		ELSE 0
		END;
	END;


    WITH ServiceCTE AS (
        SELECT 
            S.ID, 
			S.Name, 
			COALESCE(SNM.IRIS_Utterance,s.IRIS_Utterance) IRIS_Utterance,
			COALESCE(SNM.TileBlurb, s.Name) AS AboutService, 
			s.RelatedInformation as relatedinformation,
			--COALESCE(SNM.RelatedInformation, s.RelatedInformation)  relatedinformation,
            COALESCE(SNM.IsNonIRISService,s.IsNonIRISService) AS IsNonIRISService, 
			SM.ServiceRequestFormLink, 
			S.IsDropdownUI,
            S.ServiceDropDownLinks, 
			COALESCE(SNM.ServiceCategories, s.ServiceCategories) AS ServiceCategories, 
			S.IsPrivate, 
			S.DataverseRowID,
            S.isActive, 
			COALESCE(SNM.WelcomeMessage, S.WelcomeMessage) AS WelcomeMessage,
			SO.UPN,
			SO.DisplayName,
			COALESCE(SNM.IrisAppName ,S.IrisAppName) AS IrisAppName,
			SNM.TileName,
			CASE WHEN EXISTS (
			Select 1 FROM [BSO].UserWorkSpaceServices
			WHERE serviceID = S.ID and UserId = @UserID and (IsActive = 1
			or IsActive is null)
			) THEN  CONVERT(BIT, 1) ELSE CONVERT(BIT, 0) END AS IsExistInWorkspace,
			
			--CONVERT(BIT, 0) as  IsExistInWorkspace,

		    CASE WHEN EXISTS (
                SELECT 1
                FROM BSO.[UserADGroupMapping] G
                WHERE G.UserADGroupID IN (SNM.ServiceAzureADGroup,S.ServiceAzureADGroup)
                AND G.UserId = @UserId AND G.IsActive = 1
            ) THEN CONVERT(BIT, 0) ELSE COALESCE(SNM.IsSecuredByAzureADGroup,S.IsSecuredByAzureADGroup) END AS IsSecuredByAzureADGroup,
			
            COALESCE(ADG_SNM.Name, ADG.Name) as AzureADGroupName
        FROM 
            BSO.[Services] S
        INNER JOIN 
            BSO.[ServiceMapping] SM ON  SM.ServiceID = S.ID

		 AND SM.ServiceArea = (SELECT UserArea FROM BSO.[User] WHERE Id = @UserId)
		 AND SM.ServiceRole = (SELECT UserRole FROM BSO.[User] WHERE Id = @UserId)
		 AND SM.ServiceSegment = (SELECT Segment FROM BSO.[User] WHERE Id = @UserId)
		 AND SM.ServiceSubsegment =  (SELECT  SubSegment  FROM BSO.[User] WHERE Id = @UserId)
		LEFT JOIN 
			BSO.ServiceNameMapping SNM on SNM.ServiceID = S.ID
				AND SNM.ServiceArea=SM.ServiceArea 
				AND SNM.ServiceRole=SM.ServiceRole 
				AND SNM.ServiceSegment=SM.ServiceSegment 
				AND SNM.ServiceSubsegment=SM.ServiceSubsegment 
				AND SNM.IsActive=1
        LEFT JOIN 
            BSO.UserADGroup ADG ON ADG.ID = S.ServiceAzureADGroup   
		LEFT JOIN 
            BSO.UserADGroup ADG_SNM ON ADG_SNM.ID = SNM.ServiceAzureADGroup   
		LEFT JOIN 
			BSO.ServiceOwnerServices SOS ON SOS.ServiceID = S.ID
		LEFT JOIN
			BSO.ServiceOwner SO ON SO.ID = SOS.ServiceOwnerID
        WHERE 
            S.IsActive = 1
			AND SM.IsActive = 1
			AND 
			( @FilterMCEM is NULL OR 
			( @hasALLinMCEMStage =1 OR 
			(S.ID in 
			(  Select M.ServiceID from BSO.ServicesMCEMMapping M
				INNER JOIN (
					SELECT value FROM STRING_SPLIT(@FilterMCEM, ',')
				) AS P on P.value=M.MCEMStageID
				UNION
				Select M.ServiceID from BSO.ServicesMCEMMapping M
				INNER JOIN BSO.MCEMStage P
					on P.ID=M.MCEMStageID
					AND P.Name = 'All'
			
			))))

			AND 
			( @FilterServiceCategory is NULL OR 
			( @hasALLinSrvCategory =1 OR 
			(S.ID in 
			( 
				Select M.ServiceID from BSO.ServicesCategoryMapping M
				INNER JOIN BSO.ServicesCategory P on P.ID=M.CategoryID
				INNER JOIN (
					SELECT value FROM STRING_SPLIT(@FilterServiceCategory, ',')
				) AS C on C.value=M.CategoryID
			))))
    )
    SELECT DISTINCT
        ID, Name, IRIS_Utterance, AboutService, relatedinformation, 
        IsNonIRISService, ServiceRequestFormLink, IsDropdownUI,
        ServiceDropDownLinks, ServiceCategories, IsPrivate, DataverseRowID,
        isActive, IsSecuredByAzureADGroup, AzureADGroupName, WelcomeMessage,UPN,DisplayName
		,IrisAppName,TileName, IsExistInWorkspace
    FROM ServiceCTE
	ORDER BY NAME
END;
GO