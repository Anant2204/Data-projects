/*IF NOT EXISTS (SELECT 1 FROM sys.types WHERE name = 'UserADGroupIDList' AND SCHEMA_NAME(schema_id) = 'BSO')
BEGIN
 CREATE TYPE [BSO].UserADGroupIDList AS TABLE
(
    UserADGroupID INT
);
END;
GO

IF OBJECT_ID('[BSO].[AddUser]', 'P') IS NOT NULL
BEGIN 
    DROP PROCEDURE [BSO].[AddUser];
END
GO

EXEC('
CREATE PROCEDURE [BSO].[AddUser]
    @UPN NVARCHAR(255),
	@Oid NVARCHAR(300),
    @UserArea INT,
    @UserRole INT,
    @UserADGroupIDs [BSO].UserADGroupIDList READONLY,
    @Segment INT,
    @SubSegment INT null,
    @DataverseRowID UNIQUEIDENTIFIER,
    @IsActive BIT,
	@IsWelcomeMessage BIT,
    @GeneratedId INT OUTPUT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM [BSO].[User] WHERE UPN = @UPN)
    BEGIN
        -- Insert into User table
        INSERT INTO [BSO].[User] (UPN,  UserArea, UserRole, Segment, SubSegment, DataverseRowID, IsActive,IsWelcomeMessage,Oid)
        OUTPUT INSERTED.Id 
        VALUES (@UPN, @UserArea, @UserRole, @Segment, @SubSegment, @DataverseRowID, @IsActive,@IsWelcomeMessage, @Oid);

        SET @GeneratedId = SCOPE_IDENTITY();

        -- Insert into UserADGroupMapping for each UserADGroupID in the list
       -- INSERT INTO [BSO].[UserADGroupMapping] (UserId, UserADGroupID)
       -- SELECT @GeneratedId, UserADGroupID
       -- FROM @UserADGroupIDs;
    END
    ELSE
    BEGIN
        SET @GeneratedId = -1;
    END
END

');
GO
*/


IF NOT EXISTS (SELECT 1 FROM sys.types WHERE name = 'UserADGroupIDList' AND SCHEMA_NAME(schema_id) = 'BSO')
BEGIN
 CREATE TYPE [BSO].UserADGroupIDList AS TABLE
(
    UserADGroupID INT
);
END;
GO

IF OBJECT_ID('[BSO].[AddUser]', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE [BSO].[AddUser];
END
GO

CREATE PROCEDURE [BSO].[AddUser]
    @UPN NVARCHAR(255),
	@Oid NVARCHAR(300),
    @UserArea INT,
    @UserRole INT,
    @UserADGroupIDs [BSO].UserADGroupIDList READONLY,
    @Segment INT,
    @SubSegment INT null,
    @DataverseRowID UNIQUEIDENTIFIER,
    @IsActive BIT,
	@IsWelcomeMessage BIT,
    @GeneratedId INT OUTPUT,
	@OutUserArea INT OUTPUT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM [BSO].[User] WHERE UPN = @UPN)
    BEGIN
        -- Insert into User table
        INSERT INTO [BSO].[User] (UPN,  UserArea, UserRole, Segment, SubSegment, DataverseRowID, IsActive,IsWelcomeMessage,Oid)
        OUTPUT INSERTED.Id 
        VALUES (@UPN, @UserArea, @UserRole, @Segment, @SubSegment, @DataverseRowID, @IsActive,@IsWelcomeMessage, @Oid);

        SET @GeneratedId = SCOPE_IDENTITY();
		Select @OutUserArea = IsNull(UserArea,0) from [BSO].[User] WHERE
		ID= @GeneratedId
    
    END
    ELSE
    BEGIN
        SET @GeneratedId = -1;
    END
END