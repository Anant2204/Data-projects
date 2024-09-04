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
		--OPEN SYMMETRIC KEY [MySymmetricKey] DECRYPTION BY CERTIFICATE [MySelfSignedCert]
        OPEN SYMMETRIC KEY [MySymmetricKey] DECRYPTION BY CERTIFICATE [MySelfSignedCert]
			WITH PASSWORD = '_+12mcaps__+help453)(*&^$2(*^_=';
        SELECT FeedBackID, UserID, SatisfactionID, PleaseTellUs, ScreenShotURL,TypeOfFeedback , VideoURL, FileURL
		, CONVERT(NVARCHAR(MAX), DECRYPTBYKEY(EncryptedEmail)) AS EmailAddress, EmailTriggerdDate FROM [BSO].[GiveUsFeedback] Order BY FeedbackID DESC
        CLOSE SYMMETRIC KEY [MySymmetricKey];
		END
		ELSE
		BEGIN
		--OPEN SYMMETRIC KEY [MySymmetricKey] DECRYPTION BY CERTIFICATE [MySelfSignedCert];
		OPEN SYMMETRIC KEY [MySymmetricKey] DECRYPTION BY CERTIFICATE [MySelfSignedCert]
			WITH PASSWORD = '_+12mcaps__+help453)(*&^$2(*^_=';
        SELECT FeedBackID, UserID, SatisfactionID, PleaseTellUs, ScreenShotURL,TypeOfFeedback 
		, VideoURL, FileURL, CONVERT(NVARCHAR(MAX), DECRYPTBYKEY(EncryptedEmail)) AS EmailAddress, EmailTriggerdDate FROM [BSO].[GiveUsFeedback]
		WHERE FeedbackID = @ID
        CLOSE SYMMETRIC KEY [MySymmetricKey];
		END
END;
GO

