IF OBJECT_ID('[BSO].[InActiveUserWorkSpaceByPreference]', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE [BSO].[InActiveUserWorkSpaceByPreference];
END
GO

CREATE PROCEDURE BSO.InActiveUserWorkSpaceByPreference
@UserID INT
AS
BEGIN

UPDATE  [BSO].[UserWorkSpaceServices] SET IsActive = 0,
TransactionTime = GETDATE()
WHERE UserID = @UserID
END
GO