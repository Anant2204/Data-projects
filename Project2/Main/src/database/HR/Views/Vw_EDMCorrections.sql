







CREATE  View [HR].[Vw_EDMCorrections]
AS

SELECT 
R1.R1_update AS SubmittedOn,
[Source] = 'ConversationTool',
--ISNULL(H.CY_OU,'Undefined') AS Current_OU,
R1.IC, 
[Round] = 'Sending',
R1.R1_EDMValidation AS EDMValidationStatus,
R1.R1_Comments AS ManagerComments,
R1.R1_updatedby AS SubmittedBy,
R1.R1_RS AS Suggested_RoleSummary,
R1.R1_Q1 AS Suggested_Q1,
R1.R1_Q2 AS Suggested_Q2,
NULL AS FY_ManagerAlias,
R1.R1_Org AS Suggested_Org,
R1.R1_FY23CorrectManager as Suggested_Manager,
R1.FY_IncentivePlan AS Suggested_IncentivePlan,
R1.FY_CostCenter AS Suggested_CostCenter,
H.FY_CareerStage AS Suggested_CareerStage,
--NULL AS FY_OU,
IS_Processed =  'N',
R1.status as Status
 ,R1.[DecisionMakerAlias],
R1.[DecisionMadeOn],
R1.[DecisionMakerComments],
R1.[DecisionMakerName],
R1.[FYManagerChangeApprovedOn]
FROM HR.Tbl_HRData_ToolInput R1 WITH (NOLOCK) 
LEFT JOIN HR.Tbl_HRData H  WITH (NOLOCK)  ON R1.IC =  H.IC 
Where R1.R1_EDMValidation NOT IN ('Pending','Correct')
UNION
SELECT 
R2.R2_update AS SubmittedOn,
[Source] = 'ConversationTool',
--ISNULL(H.CY_OU,'Undefined') AS Current_OU,
R2.IC, 
[Round] = 'Receiving',
R2.R2_EDMValidation AS EDMValidationStatus,
R2.R2_Comments AS ManagerComments,
R2.R2_updatedby AS SubmittedBy,
R2.R2_RS AS Suggested_RoleSummary,
R2.R2_Q1 AS Suggested_Q1,
R2.R2_Q2 AS Suggested_Q2,
NULL AS FY_ManagerAlias,
R2.R2_Org AS Suggested_Org,
R2.R2_FY23CorrectManager as Suggested_Manager,
R2.FY_IncentivePlan AS Suggested_IncentivePlan,
R2.FY_CostCenter AS Suggested_CostCenter,
H.FY_CareerStage AS Suggested_CareerStage,
--NULL AS FY_OU,
IS_Processed =  'N',
R2.Status as Status
 ,R2.[DecisionMakerAlias],
R2.[DecisionMadeOn],
R2.[DecisionMakerComments],
R2.[DecisionMakerName],
[FYManagerChangeApprovedOn]
FROM HR.Tbl_HRData_ToolInput R2 WITH (NOLOCK) 
LEFT JOIN HR.Tbl_HRData H  WITH (NOLOCK)  ON R2.IC =  H.IC 
Where R2.R2_EDMValidation NOT IN ('Pending','Correct')