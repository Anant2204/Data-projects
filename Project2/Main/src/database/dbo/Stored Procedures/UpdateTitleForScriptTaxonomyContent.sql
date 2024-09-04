CREATE PROCEDURE UpdateTitleForScriptTaxonomyContent
AS
BEGIN
   UPDATE HR.ScriptTaxonomyContent
SET title = 
    CASE 
        WHEN CYOrg = 'All' AND FYOrg = 'All' THEN ''
        WHEN CYOrg = 'All' AND FYOrg != 'All' THEN FYOrg
        WHEN CYOrg != 'All' AND FYOrg = 'All' THEN CYOrg
        WHEN CYOrg != FYOrg THEN CYOrg + ' To ' + FYOrg
        ELSE CYOrg
    END + 
    CASE 
        WHEN CYRoleSummary = 'All' AND FYRoleSummary = 'All' THEN ''
        WHEN CYRoleSummary = 'All' AND FYRoleSummary != 'All' THEN ' | ' + FYRoleSummary
        WHEN CYRoleSummary != 'All' AND FYRoleSummary = 'All' THEN ' | ' + CYRoleSummary
        WHEN CYRoleSummary != FYRoleSummary THEN ' | ' + CYRoleSummary + ' To ' + FYRoleSummary
        ELSE ' | ' + CYRoleSummary
    END + 
    CASE 
        WHEN CYRoleSummary = FYRoleSummary AND CYOrg = FYOrg THEN
            CASE 
                WHEN CyQ1 = 'All' AND FYQ1 = 'All' THEN ''
                WHEN CyQ1 = 'All' AND FYQ1 != 'All' THEN ' | ' + FYQ1
                WHEN CyQ1 != 'All' AND FYQ1 = 'All' THEN ' | ' + CyQ1
                WHEN CyQ1 != FYQ1 THEN ' | ' + CyQ1 + ' To ' + FYQ1
                ELSE ' | ' + CyQ1
            END +
            CASE 
                WHEN CYQ2 = 'All' AND FYQ2 = 'All' THEN ''
                WHEN CYQ2 = 'All' AND FYQ2 != 'All' THEN ' | ' + FYQ2
                WHEN CYQ2 != 'All' AND FYQ2 = 'All' THEN ' | ' + CYQ2
                WHEN CYQ2 != FYQ2 THEN ' | ' + CYQ2 + ' To ' + FYQ2
                ELSE ' | ' + CYQ2
            END +
            CASE 
                WHEN CyIncentivePlan = 'All' AND FyIncentivePlan = 'All' THEN ''
                WHEN CyIncentivePlan = 'All' AND FyIncentivePlan != 'All' THEN ' | ' + FyIncentivePlan
                WHEN CyIncentivePlan != 'All' AND FyIncentivePlan = 'All' THEN ' | ' + CyIncentivePlan
                WHEN CyIncentivePlan != FyIncentivePlan THEN ' | ' + CyIncentivePlan + ' To ' + FyIncentivePlan
                ELSE ' | ' + CyIncentivePlan
            END
        ELSE ''
    END
END;
