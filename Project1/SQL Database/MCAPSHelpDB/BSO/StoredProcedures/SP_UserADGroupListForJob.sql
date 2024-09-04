
IF NOT EXISTS (SELECT 1 FROM sys.types WHERE name = 'UserADGroupListForJob' AND SCHEMA_NAME(schema_id) = 'BSO')
BEGIN
    CREATE TYPE [BSO].UserADGroupListForJob AS TABLE
    (
        UserADGroupID nvarchar(300)
    );
END;
GO
IF OBJECT_ID('BSO.UpdateUserByObjectID', 'P') IS NOT NULL

BEGIN
    DROP PROCEDURE BSO.UpdateUserByObjectID;
END

GO

CREATE PROCEDURE BSO.UpdateUserByObjectID
   @OID NVARCHAR(300),
   @UserADGroupIDs [BSO].UserADGroupListForJob READONLY
AS
BEGIN
    BEGIN TRY
        ---BEGIN TRANSACTION;
        IF EXISTS (SELECT 1 FROM [BSO].[User] WHERE Oid = @OID)
        BEGIN
	IF EXISTS (SELECT 1 FROM [BSO].[User] WHERE Oid = @OID)
BEGIN

MERGE INTO [BSO].[UserADGroupMapping] AS target
USING (
    SELECT
        u.Id AS UserId,
        uag.ID AS UserADGroupID,
        1 AS IsActive
    FROM
        [BSO].[User] u
    JOIN
        [BSO].[UserADGroup] uag ON u.OID = @OID
    JOIN
        @UserADGroupIDs gid ON uag.GroupID = gid.UserADGroupID
    WHERE NOT EXISTS (
        SELECT 1
        FROM [BSO].[UserADGroupMapping] UM
        WHERE UM.UserId = u.Id AND UM.UserADGroupID = uag.ID
    )
	
) AS source ON target.UserId = source.UserId AND target.UserADGroupID = source.UserADGroupID

WHEN NOT MATCHED BY TARGET THEN
    -- Insert new records
    INSERT (UserId, UserADGroupID, IsActive)
    VALUES (source.UserId, source.UserADGroupID, source.IsActive);



UPDATE [BSO].[UserADGroupMapping]
SET IsActive = 1
WHERE UserADGroupID IN (
    SELECT uag.ID
    FROM [BSO].[User] u
    JOIN [BSO].[UserADGroup] uag ON u.OID = @OID
    JOIN @UserADGroupIDs gid ON uag.GroupID = gid.UserADGroupID
    WHERE [BSO].[UserADGroupMapping].UserId = u.Id
      AND [BSO].[UserADGroupMapping].UserADGroupID = uag.ID
)
AND UserId = (Select Id FROM [BSO].[User] WHERE Oid = @OID)


UPDATE [BSO].[UserADGroupMapping]
SET IsActive = 0
WHERE UserADGroupID  NOT IN (
    SELECT uag.ID
    FROM [BSO].[User] u
    JOIN [BSO].[UserADGroup] uag ON u.OID = @OID
    JOIN @UserADGroupIDs gid ON uag.GroupID = gid.UserADGroupID
    WHERE [BSO].[UserADGroupMapping].UserId = u.Id
      AND [BSO].[UserADGroupMapping].UserADGroupID = uag.ID
)
AND UserId = (Select Id FROM [BSO].[User] WHERE Oid = @OID)

END



			

ELSE
    SELECT -1 AS Result;

        END
        ELSE
        BEGIN       
            SELECT -1 AS Result;
        END
        --COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH       
      --  ROLLBACK TRANSACTION;    
        THROW;
    END CATCH
END;
GO