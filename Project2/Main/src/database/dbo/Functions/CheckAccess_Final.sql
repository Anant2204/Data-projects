
-- Create a function to check access
CREATE FUNCTION [dbo].[CheckAccess_Final]
    ( @managerAlias NVARCHAR(50))
RETURNS @Result TABLE 
(
    HasAccess BIT,
    EDMLeadName NVARCHAR(100)
)
AS
BEGIN
    DECLARE @hasAccess BIT, @edmLeadName NVARCHAR(100),@level2Manager NVARCHAR(50), @level3Manager NVARCHAR(50)

	SELECT @level2Manager = hr.Reports_To_Level_2_Email, @level3Manager = hr.Reports_To_Level_3_Email
    FROM hr.Tbl_HRData hr
    WHERE hr.Ic = @managerAlias
    -- Check for access
    SELECT 
        @hasAccess = CASE
                        WHEN EXISTS (SELECT 1 FROM hr.TBL_OrgLeader WHERE Manager IN (@level2Manager, @level3Manager) AND ConversationRequired = 'yes') THEN 1
                        WHEN EXISTS (SELECT 1 FROM hr.Vw_HRdata WHERE (CY_ManagerAlias = @managerAlias OR FY_ManagerAlias = @managerAlias) AND (FYManagerChange = 'Y' OR Conversation = 'Required')) THEN 1
                        ELSE 0
                    END,
        @edmLeadName = CASE
                        WHEN @hasAccess = 1 THEN ''
                        ELSE (SELECT TOP 1 ol.MCT_EDM_Data_Keeper_Alias + '@microsoft.com' FROM Dbo.MCT_EDMApprovers ol WHERE ol.Org_Leader IN (@level2Manager, @level3Manager))
                    END

    INSERT INTO @Result (HasAccess, EDMLeadName)
    VALUES (@hasAccess, @edmLeadName)

    RETURN;
END;