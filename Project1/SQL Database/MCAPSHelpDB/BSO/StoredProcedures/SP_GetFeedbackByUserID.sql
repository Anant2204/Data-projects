IF OBJECT_ID('BSO.GetFeedbackByUserID', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.GetFeedbackByUserID;
END
GO

CREATE PROCEDURE [BSO].[GetFeedbackByUserID]
    @UserID INT
AS
BEGIN
    DECLARE @EncryptedEmail VARBINARY(MAX);

    -- Get the encrypted email based on UserID
    SELECT @EncryptedEmail = CONVERT(VARBINARY(MAX), gf.EncryptedEmail)
    FROM [BSO].GiveUsFeedback gf
    WHERE gf.UserID = @UserID;

    -- Open the symmetric key with which to decrypt the data
   OPEN SYMMETRIC KEY MCAPSHELP_Key
            DECRYPTION BY CERTIFICATE MCAPSHELP_Cert
			WITH PASSWORD = '_+12mcaps__+help453)(*&^$2(*^_=';

    -- Decrypt the email using the symmetric key
    SELECT
        gf.FeedbackID,
        gf.UserID,
        CONVERT(NVARCHAR(MAX), DECRYPTBYKEY(@EncryptedEmail)) AS DecryptedEmail
    FROM [BSO].GiveUsFeedback gf
    WHERE gf.UserID = @UserID;

    -- Close the symmetric key
    CLOSE SYMMETRIC KEY MCAPSHELP_Key;
END;
GO