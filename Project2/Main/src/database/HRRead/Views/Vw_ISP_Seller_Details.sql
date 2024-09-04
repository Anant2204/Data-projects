






CREATE View [HRRead].[Vw_ISP_Seller_Details]
AS
SELECT [Alias]
,[FullName]
,[PositionNumber]
,[PersonnelNumber]
,[Country]
,[FY_ManagerAlias]
,[FY_ManagerFullName]
,[FY_Org]
,[FY_RS]
,[FY_Q1]
,[FY_Q2]
,[CY_ManagerAlias]
,[CY_ManagerFullName]
,[CY_Org]
,[CY_RoleSummary]
,[CY_Q1]
,[CY_Q2]
,[ReviewStatus]
,[edm_fyenddate]
,[edm_fystartdate]
,[edm_plansellerid]
,[isp_isbubbled]
,[isp_istouched]
,[isp_level2]
,[isp_Level3]
,[ISPReviewReason]
,[isp_reviewed]
,[ISPLastModifiedDate]
,[statecode]
FROM [HR].[Tbl_Seller_Details]