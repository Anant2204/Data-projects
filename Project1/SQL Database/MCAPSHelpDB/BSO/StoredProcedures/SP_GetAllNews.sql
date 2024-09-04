IF EXISTS (SELECT 1 FROM sys.procedures WHERE object_id = OBJECT_ID('[BSO].[GetAllNews]'))
BEGIN
    DROP PROCEDURE [BSO].[GetAllNews]
END
GO

CREATE PROCEDURE [BSO].[GetAllNews]
AS
BEGIN
    DECLARE @Today DATE = GETDATE();

    SELECT
	ID,
        title,
        description,
        [date],
        link,
        isActive
    FROM [BSO].News
    WHERE IsActive = 1
    AND [date] <= @Today AND EndDate >= @Today		
	order by ID desc;
END;

GO
