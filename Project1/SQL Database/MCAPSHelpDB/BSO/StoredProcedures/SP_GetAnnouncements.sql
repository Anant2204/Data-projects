IF OBJECT_ID('BSO.GetAnnouncements', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.GetAnnouncements;
END
GO

CREATE PROCEDURE [BSO].[GetAnnouncements]
AS
BEGIN
    SELECT
        a.AnnouncementID,
        a.Title,
        at.AnnouncementTypeName AS AnnouncementType,
        a.StartDate,
        a.EndDate,
        a.Description,
        a.IsActive
    FROM
        Announcements a
    INNER JOIN
        AnnouncementTypes at ON a.AnnouncementTypeID = at.AnnouncementTypeID;
END;
GO