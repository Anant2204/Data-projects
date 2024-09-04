/****** Object:  StoredProcedure [BSO].[InsertFeedback]    Script Date: 20-02-2024 18:14:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [BSO].[InsertFeedback]
    @UserID INT = 0,
    @SatisfactionLevel VARCHAR(20),
    @PleaseTellUs NVARCHAR(MAX) = NULL,
    @ScreenshotURL NVARCHAR(MAX) = NULL,
	@VideoURL NVARCHAR(MAX) = NULL,
	@FileURL NVARCHAR(MAX) = NULL,
    @Email NVARCHAR(MAX) = NULL,
    @ENCRYPTBYPASSPHRASE NVARCHAR(MAX) = NULL,
    @TypeOfFeedback NVARCHAR(MAX),
    @Id INT OUTPUT
AS
BEGIN
    DECLARE @SatisfactionID INT = 0;
    DECLARE @EncryptedEmail VARBINARY(MAX);

    SELECT @SatisfactionID = SatisfactionID
    FROM [BSO].FeedbackSatisfaction
    WHERE SatisfactionLevel = @SatisfactionLevel;

    BEGIN TRY
        IF @Email IS NULL
        BEGIN
            SET @EncryptedEmail = NULL;
        END
        ELSE
        BEGIN
            OPEN SYMMETRIC KEY [MySymmetricKey] DECRYPTION BY CERTIFICATE [MySelfSignedCert]
			WITH PASSWORD = '_+12mcaps__+help453)(*&^$2(*^_=';

            SET @EncryptedEmail = ENCRYPTBYKEY(KEY_GUID('MySymmetricKey'), @Email);     

            CLOSE SYMMETRIC KEY [MySymmetricKey];
        END

        INSERT INTO [BSO].[GiveUsFeedback] (UserID, SatisfactionID, PleaseTellUs, ScreenshotURL, EncryptedEmail, TypeOfFeedback,VideoURL, FileURL)
        VALUES (@UserID, @SatisfactionID, @PleaseTellUs, @ScreenshotURL, @EncryptedEmail, @TypeOfFeedback, @VideoURL,@FileURL);

        SET @Id = SCOPE_IDENTITY();

        IF @Id = 0
        BEGIN
            SET @Id = -1;
        END
    END TRY
    BEGIN CATCH
        -- Handle errors here, e.g., log the error message
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
        PRINT 'Error: ' + @ErrorMessage;

        -- You may want to re-throw the error or perform other actions as needed
    END CATCH
END;