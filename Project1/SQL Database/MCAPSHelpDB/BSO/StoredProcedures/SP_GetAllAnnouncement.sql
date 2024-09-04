IF OBJECT_ID('BSO.GetAllAnnouncement', 'P') IS NOT NULL

BEGIN
    DROP PROCEDURE BSO.GetAllAnnouncement;
END

GO
CREATE PROCEDURE [BSO].[GetAllAnnouncement]
AS
BEGIN
	SET NOCOUNT ON;
   	SELECT [ID],[Title],[Description],[StartDate],[EndDate],[IsAnnouncement],
	[Type]
	FROM [BSO].[Announcement]  WITH (NOLOCK) WHERE 1 = 1 ORDER BY ID
END;

GO

