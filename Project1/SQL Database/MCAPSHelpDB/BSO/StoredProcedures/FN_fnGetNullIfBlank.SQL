IF OBJECT_ID (N'BSO.fnGetNullIfBlank', N'FN') IS NOT NULL
    DROP FUNCTION [BSO].[fnGetNullIfBlank];
GO
CREATE FUNCTION [BSO].[fnGetNullIfBlank]
(
    @inputValue NVARCHAR(MAX)
)
RETURNS NVARCHAR(MAX)
AS
BEGIN
    DECLARE @result NVARCHAR(MAX);
 
    IF LTRIM(RTRIM(ISNULL(@inputValue, ''))) = ''
        SET @result = NULL;
    ELSE
        SET @result = @inputValue;
 
    RETURN @result;
END;