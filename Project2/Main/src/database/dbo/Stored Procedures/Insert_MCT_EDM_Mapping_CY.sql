/* Created by tanmay on 04-04-2024 as part of 965663 to separate out CY and FY data */

CREATE PROCEDURE [HR].[Insert_MCT_EDM_Mapping_CY]
AS
	Truncate table [HR].[MCT_EDM_Mapping_CY_Staging]
	Insert into [HR].[MCT_EDM_Mapping_CY_Staging] ([Org]
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
	FROM [HR].[tmp_MCT_EDM_Mapping_CY] MEM
	LEFT JOIN [dbo].[Isp_Org] ORG ON MEM.OrgCode=ORG.isp_orgcode