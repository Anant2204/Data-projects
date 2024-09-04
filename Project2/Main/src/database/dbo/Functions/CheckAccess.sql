-- Create a function to check access
CREATE FUNCTION dbo.CheckAccess
    (@level2Manager NVARCHAR(50),
     @level3Manager NVARCHAR(50))
RETURNS @Result TABLE 
(
    HasAccess BIT,
    EDMLeadName NVARCHAR(100)
)
AS
BEGIN
    DECLARE @hasAccess BIT, @edmLeadName NVARCHAR(100)

    -- Check for access
    SELECT 
        @hasAccess = CASE
                        WHEN EXISTS (SELECT 1 FROM hr.TBL_OrgLeader WHERE Manager IN (@level2Manager, @level3Manager) AND ConversationRequired = 'yes') THEN 1
                        WHEN EXISTS (SELECT 1 FROM hr.Vw_HRdata WHERE (CY_ManagerAlias = @level2Manager OR FY_ManagerAlias = @level3Manager) AND (FYManagerChange = 'Y' OR Conversation = 'Required')) THEN 1
                        ELSE 0
                    END,
        @edmLeadName = CASE
                        WHEN @hasAccess = 1 THEN ''
                        ELSE (SELECT TOP 1 ol.MCT_EDM_Data_Keeper_Alias + '@microsoft.com' FROM Dbo.MCT_EDMApprovers ol WHERE ol.Org_Leader = @level2Manager)
                    END

    INSERT INTO @Result (HasAccess, EDMLeadName)
    VALUES (@hasAccess, @edmLeadName)

    RETURN;
END;