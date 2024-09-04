IF OBJECT_ID('BSO.GetAboutMCAPSHtmlContent', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.GetAboutMCAPSHtmlContent;
END
GO


CREATE PROCEDURE [BSO].GetAboutMCAPSHtmlContent   
AS
BEGIN
    SELECT ContentType, HtmlContent
    FROM [BSO].AboutMCAPSHELPHtmlContentTable WIth (NOLOCK)
    WHERE IsActive = 1
END;

GO