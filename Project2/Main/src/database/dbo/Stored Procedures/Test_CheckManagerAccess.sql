CREATE PROCEDURE [dbo].[Test_CheckManagerAccess]
    @managerAlias NVARCHAR(100),
    @hasAccess BIT OUTPUT,
    @edmLeadName NVARCHAR(500) OUTPUT
AS
BEGIN
    -- Declare variables
    DECLARE @role NVARCHAR(20), @level2Manager NVARCHAR(50), @level3Manager NVARCHAR(50)

	-- Check if logged in user is an exception
	IF EXISTS (SELECT 1 from hr.Tbl_Seller_Details WHERE Alias = @managerAlias and ReviewStatus = 'Exception')
		BEGIN
			-- No valid role found, set access to 0 and determine EDM lead name
			SET @hasAccess = 0
			SET @edmLeadName = (SELECT TOP 1 ol.MCT_EDM_Data_Keeper_Alias + '@microsoft.com' FROM Dbo.MCT_EDMApprovers ol WHERE ol.Org_Leader IN (@level2Manager, @level3Manager))
			RETURN
		END		

    -- Get manager hierarchy information
    SELECT @level2Manager = hr.Reports_To_Level_2_Email, @level3Manager = hr.Reports_To_Level_3_Email
    FROM hr.Tbl_HRData hr
    WHERE hr.Ic = @managerAlias

    -- Determine the role
    IF EXISTS (SELECT 1 FROM hr.Dim_Managerhierarchy WHERE ManagerAlias = @managerAlias)
        SET @role = 'Manager'
    ELSE IF EXISTS (SELECT 1 FROM hr.Tbl_Proxy WHERE Proxy LIKE '%' + CONCAT('@', @managerAlias, '@') + '%')
        SET @role = 'Proxy'
    ELSE
    BEGIN
        -- No valid role found, set access to 0 and determine EDM lead name
        SET @hasAccess = 0
        SET @edmLeadName = (SELECT TOP 1 ol.MCT_EDM_Data_Keeper_Alias + '@microsoft.com' FROM Dbo.MCT_EDMApprovers ol WHERE ol.Org_Leader IN (@level2Manager, @level3Manager))
        RETURN
    END

    -- Call the function to check access
    DECLARE @managers TABLE (ManagerAlias NVARCHAR(100), ID INT IDENTITY(1,1));

    -- Populate @managers based on the role
    INSERT INTO @managers (ManagerAlias)
    SELECT DISTINCT [v].[DirectManagerAlias] AS [ManagerAlias]
    FROM [HR].[Vw_ManagerSecurity] AS [v]
    WHERE 
        (@role = 'Manager' AND [v].[ManagerAlias] = @managerAlias)
        OR
        (@role = 'Proxy' AND [v].[ManagerAlias] IN (SELECT Manager FROM hr.Tbl_Proxy WHERE Proxy LIKE '%' + CONCAT('@', @managerAlias, '@') + '%'));

    DECLARE @id INT = 1;
    DECLARE @maxId INT = (SELECT MAX(ID) FROM @managers);

    -- Iterate over managers
    WHILE @id <= @maxId
    BEGIN
        SELECT @managerAlias = ManagerAlias FROM @managers WHERE ID = @id;

        -- Check access using the CheckAccess_Final stored procedure
        SELECT @hasAccess = HasAccess, @edmLeadName = EDMLeadName
        FROM dbo.CheckAccess_Final(@managerAlias);

        -- If access is granted, exit the loop
        IF @hasAccess = 1
            BREAK;

        SET @id = @id + 1;
    END

    -- Return the final results
    SELECT @hasAccess, @edmLeadName
END
