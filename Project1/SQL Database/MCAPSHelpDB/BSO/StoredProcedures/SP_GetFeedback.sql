IF OBJECT_ID('BSO.GetFeedback', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.GetFeedback;
END
GO

CREATE PROCEDURE [BSO].GetFeedback
@ID INT = NULL
AS
BEGIN
		IF @ID IS NULL
		BEGIN
        OPEN SYMMETRIC KEY [MySymmetricKey] DECRYPTION BY CERTIFICATE [MySelfSignedCert];
        SELECT FeedBackID, UserID, SatisfactionID, PleaseTellUs, ScreenShotURL,TypeOfFeedback,
		VideoURL, FileURL,
		CONVERT(NVARCHAR(MAX), DECRYPTBYKEY(EncryptedEmail)) AS EmailAddress, EmailTriggerdDate FROM [BSO].[GiveUsFeedback] Order BY FeedbackID DESC
        CLOSE SYMMETRIC KEY [MySymmetricKey];
		END
		ELSE
		BEGIN
		OPEN SYMMETRIC KEY [MySymmetricKey] DECRYPTION BY CERTIFICATE [MySelfSignedCert];
        SELECT FeedBackID, UserID, SatisfactionID, PleaseTellUs, ScreenShotURL,TypeOfFeedback , 
		VideoURL, FileURL,
		CONVERT(NVARCHAR(MAX), DECRYPTBYKEY(EncryptedEmail)) AS EmailAddress, EmailTriggerdDate FROM [BSO].[GiveUsFeedback]
		WHERE FeedbackID = @ID
        CLOSE SYMMETRIC KEY [MySymmetricKey];
		END
END;
GO
