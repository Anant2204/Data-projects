IF OBJECT_ID('BSO.GetServiceGroupNRequestTypeDetails', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.GetServiceGroupNRequestTypeDetails;
END
GO

/****** Object:  StoredProcedure [BSO].[GetServiceGroupNRequestTypeDetails]    Script Date: 01-03-2024 15:18:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [BSO].[GetServiceGroupNRequestTypeDetails]
    @ServiceID INT,
	@UserId INT
AS
BEGIN

    DECLARE @UserSubSegment NVARCHAR(MAX);
    SELECT @UserSubSegment = SubSegment
    FROM BSO.[User]
    WHERE Id = @UserId;
    SELECT DISTINCT S.ID,
           SG.ServiceGroupName,
           SG.ServiceGroupDescription,
           SG.ServiceGroupID,
           RT.RequestTypeName,
           RT.RequestTypeID,
		   COALESCE(SNM.relatedinformation,S.relatedinformation) as relatedinformation
		   ,SO.DisplayName,
		   SO.UPN,
		   ISNUll(S.AboutService,SNM.TileDescription) AS AboutService
    FROM BSO.[Services] S
    INNER JOIN BSO.ServiceMapping SM ON S.ID = SM.ServiceID
	AND  S.IsActive = 1
	AND SM.IsActive = 1
    AND SM.ServiceArea = (SELECT UserArea FROM BSO.[User] WHERE Id = @UserId)
    AND SM.ServiceRole = (SELECT UserRole FROM BSO.[User] WHERE Id = @UserId)
    AND SM.ServiceSegment = (SELECT Segment FROM BSO.[User] WHERE Id = @UserId)
    AND
	(
        SM.ServiceSubsegment = @UserSubSegment
        OR @UserSubSegment IS NULL
    )
    INNER JOIN BSO.ServiceGroup SG ON SG.ServiceGroupID = SM.ServiceGroupID
	AND SG.IsActive = 1
    INNER JOIN BSO.RequestType RT ON RT.RequestTypeID = SM.RequestTypeID
	AND RT.IsActive = 1
	
	LEFT JOIN BSO.ServiceNameMapping SNM 
				on SNM.ServiceID = S.ID
				AND SNM.ServiceArea=SM.ServiceArea 
				AND SNM.ServiceRole=SM.ServiceRole 
				AND SNM.ServiceSegment=SM.ServiceSegment 
				AND SNM.ServiceSubsegment=SM.ServiceSubsegment 
				AND SNM.IsActive=1
	Left JOIN BSO.ServiceOwnerServices SOS ON SM.ServiceID = SOS.ServiceID 
		AND SOS.ServiceNameMapping_DataverseRowID = SNM.DataverseRowID
	Left JOIN BSO.ServiceOwner SO ON SO.ID = SOS.ServiceOwnerID
	WHERE S.ID = @ServiceID
	ORDER BY  SG.ServiceGroupName , RT.RequestTypeName ASC
	--ORDER BY S.NAME ASC;
END;
GO

--Select  top 10 * from [BSO].ServiceNameMapping