IF OBJECT_ID('BSO.GetUserById', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.GetUserById;
END
GO

CREATE PROCEDURE [BSO].[GetUserById]
    @UserId INT
AS
BEGIN

    SELECT U.*, M.UserADGroupID
    FROM BSO.[User] U WITH (NOLOCK)
    JOIN BSO.[UserADGroupMapping] M ON U.Id = M.UserId
    WHERE U.Id = @UserId;

END;
GO


