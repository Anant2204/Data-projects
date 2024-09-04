IF OBJECT_ID('[BSO].[UpdateUser]', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE [BSO].[UpdateUser];
END
GO



CREATE PROCEDURE [BSO].[UpdateUser]
    @UserId INT,
    @UPN NVARCHAR(255),
    @UserArea INT,
    @UserRole INT,
    @Segment INT,
    @SubSegment INT NULL,
    @DataverseRowID UNIQUEIDENTIFIER,
    @IsActive BIT,
	@IsWelcomeMessage BIT = NULL,
    @UserADGroupIDs [BSO].UserADGroupIDList READONLY
AS
BEGIN
    BEGIN TRY
	
	BEGIN TRANSACTION;
        IF EXISTS (SELECT 1 FROM [BSO].[User] WHERE Id = @UserId)
        BEGIN 

		DECLARE @WelcomeMessgae BIT = NULL
		SET @WelcomeMessgae = (SELECT IsWelcomeMessage FROM [BSO].[User] WHERE Id = @UserId)
		IF @IsWelcomeMessage IS NULL
		BEGIN
		SET @IsWelcomeMessage = @WelcomeMessgae
		END

		IF NOT EXISTS(SELECT 1 FROM [BSO].[User] WHERE UPN = @UPN AND
                UserArea = @UserArea AND
                UserRole = @UserRole AND
                Segment = @Segment AND
                SubSegment = @SubSegment AND
                DataverseRowID = @DataverseRowID AND
                IsActive = @IsActive AND Id = @UserId )
			BEGIN
				EXEC BSO.InActiveUserWorkSpaceByPreference @UserId
			END


            UPDATE [BSO].[User]
                SET UPN = @UPN,
                UserArea = @UserArea,
                UserRole = @UserRole,
                Segment = @Segment,
                SubSegment = @SubSegment,
                DataverseRowID = @DataverseRowID,
                IsActive = @IsActive,
				IsWelcomeMessage=@IsWelcomeMessage
                WHERE Id = @UserId;          
           
				

		   --DELETE FROM [BSO].UserADGroupMapping WHERE UserId = @UserId;       
            --INSERT INTO [BSO].UserADGroupMapping (UserId, UserADGroupID)
            --SELECT @UserId, UserADGroupID
            --FROM @UserADGroupIDs;

        END
        ELSE
        BEGIN       
            SELECT -1 AS Result;
        END
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH       
        ROLLBACK TRANSACTION;    
        THROW;
    END CATCH
END;

