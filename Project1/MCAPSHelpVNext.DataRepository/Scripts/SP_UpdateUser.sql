ALTER PROCEDURE BSO.UpdateUser
	@ID INT,
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
    UPDATE BSO.[User]
    SET
		UPN = @UPN,
        UserArea = @UserArea,
        UserRole = @UserRole,
        Segment = @Segment,
        SubSegment = @SubSegment,
        DataverseRowID = @DataverseRowID,
        IsActive = @IsActive
    WHERE ID = @Id;
END;
