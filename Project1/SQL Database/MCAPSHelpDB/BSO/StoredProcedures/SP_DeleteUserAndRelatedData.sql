IF OBJECT_ID('[BSO].DeleteUserAndRelatedData', 'P') IS NOT NULL
    DROP PROCEDURE [BSO].DeleteUserAndRelatedData;
GO

CREATE PROCEDURE [BSO].DeleteUserAndRelatedData
    @UPN NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY  
        BEGIN TRAN;
        DECLARE @UserID INT;
        SELECT @UserID = Id FROM [BSO].[User] WHERE UPN = @UPN;
        IF @UserID IS NOT NULL
        BEGIN 
            DELETE FROM [BSO].[GiveUsFeedback] WHERE UserID = @UserID;
            DELETE FROM [BSO].[UserWorkSpaceServices] WHERE UserID = @UserID;
            DELETE FROM [BSO].[UserADGroupMapping] WHERE UserID = @UserID;
            DELETE FROM [BSO].[User] WHERE Id = @UserID;
            
            COMMIT;

            -- Print a message indicating that the user has been deleted
            PRINT 'User has been deleted.';
        END
        ELSE
        BEGIN
            -- Rollback the transaction and print a message indicating that the user was not found
            ROLLBACK;
            PRINT 'User not found. Transaction rolled back.';
        END
    END TRY
    BEGIN CATCH      
        IF @@TRANCOUNT > 0		         
            ROLLBACK;       
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
        PRINT 'Error: ' + @ErrorMessage;
    END CATCH;
END;
GO