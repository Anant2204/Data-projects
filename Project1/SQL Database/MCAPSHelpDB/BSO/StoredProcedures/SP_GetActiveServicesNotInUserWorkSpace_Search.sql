IF OBJECT_ID('[BSO].[GetActiveServicesNotInUserWorkSpace_Search]', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE [BSO].[GetActiveServicesNotInUserWorkSpace_Search];
END
GO

CREATE PROCEDURE [BSO].[GetActiveServicesNotInUserWorkSpace_Search]
    @UserId INT,
	@Query varchar(100),
	@FilterMCEM NVARCHAR(200) = NULL,
	@FilterServiceCategory NVARCHAR(200)= NULL
AS
--Exec [BSO].[GetActiveServicesNotInUserWorkSpace_Search] 91, 'abc'
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


    DECLARE @UserSubSegment NVARCHAR(MAX);
    SELECT @UserSubSegment = SubSegment
    FROM BSO.[User]
    WHERE Id = @UserId;
    WITH ServiceCTE AS (
        SELECT
            S.ID, S.Name, 
			COALESCE(SNM.IRIS_Utterance,S.IRIS_Utterance) IRIS_Utterance, 
			COALESCE(SNM.TileBlurb, s.Name) AS AboutService, 
			COALESCE(SNM.RelatedInformation, s.RelatedInformation) AS relatedinformation,
            COALESCE(SNM.IsNonIRISService,s.IsNonIRISService)  AS IsNonIRISService, 
			SM.ServiceRequestFormLink, 
			S.IsDropdownUI, 
			S.ServiceDropDownLinks, 
			COALESCE(SNM.ServiceCategories, s.ServiceCategories)  AS ServiceCategories,
			S.IsPrivate,
			S.DataverseRowID, 
			S.isActive, 
			COALESCE(SNM.WelcomeMessage, S.WelcomeMessage) as WelcomeMessage, 
			SO.UPN, 
			SO.DisplayName, 
			COALESCE(SNM.IrisAppName ,S.IrisAppName) as IrisAppName, 
			SNM.TileName, 
			CONVERT(BIT, 0) AS IsExistInWorkspace, 
			COALESCE(SNM.IsSecuredByAzureADGroup,S.IsSecuredByAzureADGroup)  AS IsSecuredByAzureADGroup, 
			COALESCE(ADG_SNM.Name, ADG.Name) as AzureADGroupName
        FROM 
            BSO.[Services] S
        INNER JOIN BSO.[ServiceMapping] SM ON  SM.ServiceID = S.ID
				 AND SM.ServiceArea = (SELECT UserArea FROM BSO.[User] WHERE Id = @UserId)
				 AND SM.ServiceRole = (SELECT UserRole FROM BSO.[User] WHERE Id = @UserId)
				 AND SM.ServiceSegment = (SELECT Segment FROM BSO.[User] WHERE Id = @UserId)
				 AND SM.ServiceSubsegment =  (SELECT  SubSegment  FROM BSO.[User] WHERE Id = @UserId)
		LEFT JOIN BSO.ServiceNameMapping SNM 
				on SNM.ServiceID = S.ID
				AND SNM.ServiceArea=SM.ServiceArea 
				AND SNM.ServiceRole=SM.ServiceRole 
				AND SNM.ServiceSegment=SM.ServiceSegment 
				AND SNM.ServiceSubsegment=SM.ServiceSubsegment 
				AND SNM.IsActive=1
        LEFT JOIN BSO.UserADGroup ADG ON ADG.ID = S.ServiceAzureADGroup 
		LEFT JOIN BSO.UserADGroup ADG_SNM ON ADG.ID = SNM.ServiceAzureADGroup 
		LEFT JOIN BSO.ServiceOwnerServices SOS ON SOS.ServiceID = S.ID
					AND SOS.ServiceNameMapping_DataverseRowID = SNM.DataverseRowID
		LEFT JOIN BSO.ServiceOwner SO ON SO.ID = SOS.ServiceOwnerID
		LEFT JOIN BSO.ServiceGroup SG ON SG.ServiceGroupID = SM.ServiceGroupID
		LEFT JOIN BSO.RequestType RT ON RT.RequestTypeID = SM.RequestTypeID
        WHERE 
            S.IsActive = 1
            --AND SM.ServiceArea = (SELECT UserArea FROM BSO.[User] WHERE Id = @UserId)
            --AND SM.ServiceRole = (SELECT UserRole FROM BSO.[User] WHERE Id = @UserId)
            --AND SM.ServiceSegment = (SELECT Segment FROM BSO.[User] WHERE Id = @UserId)
            --AND ( SM.ServiceSubsegment = @UserSubSegment OR @UserSubSegment IS NULL )
            AND SM.IsActive = 1
			--AND (CONTAINS(S.Name, @Query) OR CONTAINS(SG.ServiceGroupName, @Query) OR CONTAINS(RT.RequestTypeName, @Query))
			AND (S.Name LIKE '%' + @Query + '%' OR S.AboutService LIKE '%' + @Query + '%' OR SG.ServiceGroupName LIKE '%' + @Query + '%' OR RT.RequestTypeName LIKE '%' + @Query + '%')
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
        ID, Name, IRIS_Utterance, AboutService, relatedinformation, IsNonIRISService, ServiceRequestFormLink, IsDropdownUI,
        ServiceDropDownLinks, ServiceCategories, IsPrivate, DataverseRowID, isActive, IsSecuredByAzureADGroup, AzureADGroupName,
		WelcomeMessage, UPN,DisplayName, IrisAppName, TileName, IsExistInWorkspace
    FROM ServiceCTE
	ORDER BY NAME
END;
GO


