


Create View [HR].[Vw_ISPExport] AS

SELECT 
 [Source] = 'MCT'
,[Alias] = IC
,[CY_RoleSummary]
,[CY_Q1]
,[CY_Q2]
,[CY_ManagerAlias]
,[CY_ManagerFullName]
,[CY_Org]
--,[FY21 OU] = CY_OU
,[FY_RoleSummary] 
,[FY_Q1]
,[FY_Q2]
,[FY_ManagerAlias]
,[FY_ManagerFullName]
,[FY_Org]
--,[FY22 OU] = FY_Org

FROM HR.Tbl_HRData