CREATE PROCEDURE BSO.AddUser
    @UPN NVARCHAR(255),
    @UserArea INT,
    @UserRole INT,
    @UserADGroupID INT,
    @Segment INT,
    @SubSegment INT,
    @DataverseRowID NVARCHAR(255),
    @IsActive BIT
AS
BEGIN
    INSERT INTO BSO.[User] (UPN, UserArea, UserRole, UserADGroupID, Segment, SubSegment, DataverseRowID, IsActive)
    VALUES (@UPN, @UserArea, @UserRole, @UserADGroupID, @Segment, @SubSegment, @DataverseRowID, @IsActive);
END;
