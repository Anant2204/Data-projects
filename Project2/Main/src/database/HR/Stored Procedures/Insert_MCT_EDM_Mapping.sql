CREATE PROCEDURE [HR].[Insert_MCT_EDM_Mapping]
AS
	Truncate table [HR].[MCT_EDM_Mapping_Staging]
	Insert into [HR].[MCT_EDM_Mapping_Staging] ([Org]
		,[RoleSummary]
		,[Q1]
		,[Q2]
		,[IncentivePlan]
		,[CareerStage]
	)
	SELECT DISTINCT isp_name AS [Org]
		,[RoleSummary]
		,[Q1]
		,[Q2]
		,[IncentivePlan]
		,[CareerStage]
	FROM [HR].[tmp_MCT_EDM_Mapping] MEM
	LEFT JOIN [dbo].[Isp_Org] ORG ON MEM.OrgCode=ORG.isp_orgcode