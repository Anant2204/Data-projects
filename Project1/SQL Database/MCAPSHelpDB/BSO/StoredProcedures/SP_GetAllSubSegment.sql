IF OBJECT_ID('[BSO].[GetAllSubSegment]', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE [BSO].[GetAllSubSegment];
END
GO
CREATE PROCEDURE [BSO].[GetAllSubSegment]
    @SegmentId INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT [Id], [Name]
    FROM [BSO].[SubSegment] WITH (NOLOCK)
    WHERE Segment = @SegmentId AND
    IsActive = 1 Order By [Name]
    
END;
GO
