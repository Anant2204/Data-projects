IF OBJECT_ID('[BSO].[GetAllSegmentByRole]', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE [BSO].[GetAllSegmentByRole];
END
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

--Exec [BSO].[GetAllSegmentByRole] 5
CREATE PROCEDURE [BSO].[GetAllSegmentByRole]
	@id int
AS
BEGIN
	SET NOCOUNT ON;

    SELECT s.ID, s.Name
    FROM [BSO].[Role] r
    INNER JOIN [BSO].[SegmentRoleMapping] srm ON r.Id = srm.[ServiceRole]
    INNER JOIN [BSO].[Segment] s ON srm.[ServiceSegment] = s.ID
    WHERE r.ID = @id
    AND r.IsActive = 1
    AND s.IsActive = 1
    AND srm.IsActive = 1;
END;
GO
