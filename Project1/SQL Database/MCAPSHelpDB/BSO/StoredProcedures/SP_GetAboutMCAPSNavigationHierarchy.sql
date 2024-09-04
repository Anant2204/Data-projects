IF OBJECT_ID('BSO.GetAboutNavigationLinks', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.GetAboutNavigationLinks;
END
GO

CREATE PROCEDURE [BSO].GetAboutNavigationLinks
AS
BEGIN
    WITH NavigationCTE AS
    (
        SELECT
            Id,
            Name,
            Content,
            Url,
            [Key],
            ParentLinkId
        FROM
            [BSO].AboutNavigationLinks
        WHERE
            ParentLinkId IS NULL
        UNION ALL
        SELECT
            t.Id,
            t.Name,
            t.Content,
            t.Url,
            t.[Key],
            t.ParentLinkId
        FROM
            [BSO].AboutNavigationLinks t
        INNER JOIN
            NavigationCTE cte ON t.ParentLinkId = cte.Id
    )
    SELECT
        Id,
        Name,
        Content,
        Url,
        [Key],
        ParentLinkId
    FROM
        NavigationCTE order BY Id
   -- FOR JSON PATH, ROOT('NavigationLinks');
END;
GO



