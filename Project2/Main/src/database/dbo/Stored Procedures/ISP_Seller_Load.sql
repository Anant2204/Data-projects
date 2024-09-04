CREATE procedure [dbo].[ISP_Seller_Load]
AS
-- DROP TABLE [HR].[Tbl_Seller_Details_Staging]
 Truncate table [HR].[Tbl_Seller_Details_Staging]

INSERT INTO [HR].[Tbl_Seller_Details_Staging]
           ([Alias]
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
           ,[ISPReviewReason]
           ,[isp_reviewed]
		   ,[isp_level1]
           ,[isp_level2]
           ,[isp_Level3]
		    ,[Reports_To_Level_1_Email]
      ,[Reports_To_Level_1_Full_Name]
      ,[Reports_To_Level_2_Email]
      ,[Reports_To_Level_2_Full_Name]
      ,[Reports_To_Level_3_Email]
      ,[Reports_To_Level_3_Full_Name]
      ,[Reports_To_Level_4_Email]
      ,[Reports_To_Level_4_Full_Name]
      ,[Reports_To_Level_5_Email]
      ,[Reports_To_Level_5_Full_Name]
      ,[Reports_To_Level_6_Email]
      ,[Reports_To_Level_6_Full_Name]
      ,[Reports_To_Level_7_Email]
      ,[Reports_To_Level_7_Full_Name]
           ,[ISPLastModifiedDate]
           ,[statecode],[FY_IncentivePlan]
      ,[FY_CostCenter]
      ,[CY_CareerStage]
      ,[CY_IncentivePlan]
      ,[CY_CostCenter],[FY_CareerStage])
  SELECT 
 CY.Email As [Alias]
,CY.Full_Name AS FullName
,CY.[Position_Number]  AS [PositionNumber]
,CY.[Personnel_Number] AS PersonnelNumber
,Cn.isp_name AS [Country]


,case WHEN P.[edm_reviewstatus] = 757580002 THEN FYSeller.[isp_name] else CY.[ManagerEmail] end AS [FY_ManagerAlias]
,case WHEN P.[edm_reviewstatus] = 757580002 THEN   FYManagername.Full_Name ELSE CY.[Reports_To_Full_Name] end [FY_ManagerFullName] 
--,case WHEN P.[edm_reviewstatus] = 757580002 THEN M.FYManagerAlias else CY.[ManagerEmail] end AS [FY_ManagerAlias]
--,case WHEN P.[edm_reviewstatus] = 757580002 THEN M.FYManagerName   else  CY.[Reports_To_Full_Name] end [FY_ManagerFullName] 
,case WHEN P.[edm_reviewstatus] = 757580002 THEN  FYOrg.[isp_name] else CY.[Org] end [FY_Org]
,case WHEN P.[edm_reviewstatus] = 757580002 THEN FYRS.[isp_name] else CY.[Role_Summary] end [FY_RS]
,case WHEN P.[edm_reviewstatus] = 757580002 THEN FYQ1.[isp_name] else CY.[Qualifier_1]  end [FY_Q1]
,case WHEN P.[edm_reviewstatus] = 757580002 THEN FYQ2.[isp_name] else CY.[Qualifier_2] end [FY_Q2]
/*,FYManager.[isp_name] AS [FY_ManagerAlias]
,FYMgr.Full_Name      AS [FY_ManagerFullName]  
--,CONCAT( FYSeller.[isp_firstname] ,' ', FYSeller.[isp_lastname])  AS [FY_ManagerFullName]
,FYOrg.[isp_name] AS [FY_Org]
,FYRS.[isp_name] AS [FY_RS]
,FYQ1.[isp_name] AS [FY_Q1]
,FYQ2.[isp_name] AS [FY_Q2]*/
,CY.[ManagerEmail] AS [CY_ManagerAlias]
,CY.[Reports_To_Full_Name] AS [CY_ManagerFullName]
,CY.[Org] AS [CY_Org]
,CY.[Role_Summary] AS [CY_RoleSummary]
,CY.[Qualifier_1] AS [CY_Q1]
,CY.[Qualifier_2] AS [CY_Q2]

/*
,CONCAT( CYManager.[isp_firstname] ,' ', CYManager.[isp_lastname]) 
,CYManager.[isp_name] 
,CYOrg.[isp_name] 
,CYRS.[isp_name] 
,CYQ1.[isp_name] 
,CYQ2.[isp_name] */
, CASE WHEN P.[edm_reviewstatus] = 757580000 THEN 'Pending'
	 WHEN P.[edm_reviewstatus] = 757580002 THEN 'Approved'
	 WHEN P.[edm_reviewstatus] = 757580003 THEN 'Exception'
	  WHEN P.[edm_reviewstatus] = 757580001 THEN 'Reviewed'
	  
	 END ReviewStatus 

,P.[edm_fyenddate]
,P.[edm_fystartdate] 
,P.[edm_plansellerid] -- UniqueID    
,P.[isp_isbubbled]
,P.[isp_istouched]
,P.[isp_rereviewreason] AS ISPReviewReason
,P.[isp_reviewed]  
,P.[isp_level1]
,P.[isp_level2]
,P.[isp_Level3]
,CY.[Reports_To_Level_1_Email]
,CY.[Reports_To_Level_1_Full_Name]
,CY.[Reports_To_Level_2_Email]
,CY.[Reports_To_Level_2_Full_Name]
,CY.[Reports_To_Level_3_Email]
,CY.[Reports_To_Level_3_Full_Name]
,CY.[Reports_To_Level_4_Email]
,CY.[Reports_To_Level_4_Full_Name]
,CY.[Reports_To_Level_5_Email]
,CY.[Reports_To_Level_5_Full_Name]
,CY.[Reports_To_Level_6_Email]
,CY.[Reports_To_Level_6_Full_Name]
,CY.[Reports_To_Level_7_Email]
,CY.[Reports_To_Level_7_Full_Name]
,P.[modifiedon] AS ISPLastModifiedDate
,P.[statecode]
,case WHEN P.[edm_reviewstatus] = 757580002 THEN FYIP.[isp_name] else CY.IncentivePlan  end [FYIP]
,case WHEN P.[edm_reviewstatus] = 757580002 THEN FYCC.[isp_name] else CY.CostCenter end [FYCC]
,CY.CareerStage AS [CY_CareerStage]
,CY.IncentivePlan AS [CY_IncentivePlan]
,CY.CostCenter AS [CY_CostCenter]
,case WHEN P.[edm_reviewstatus] = 757580002 THEN FYCS.[isp_name] else CY.CareerStage  end [FYCS]
--INTO [HR].[Tbl_Seller_Details] -- commented as we need to drop/truncate this table when we add this to sproc
FROM [dbo].[HRDataLake_CYData_Staging] CY 
LEFT JOIN [dbo].[Isp_worker] PSeller ON PSeller.isp_name = CY.Email AND PSeller.statecode=0
LEFT JOIN  [dbo].[PlanSeller] P ON P.edm_worker = PSeller.[isp_workerid] 
LEFT JOIN [dbo].[Isp_country] Cn On PSeller.[isp_country] = Cn.[isp_countryid]
-- All FY Seller Info
LEFT JOIN [dbo].[Isp_Org] FYOrg On FYOrg.[isp_orgid] = P.[edm_org]
LEFT JOIN [dbo].[Isp_qualifier1] FYQ1 on P.edm_qualifier1 = FYQ1.[isp_qualifier1id]
LEFT JOIN [dbo].[Isp_qualifier2] FYQ2 on P.edm_qualifier2 = FYQ2.[isp_qualifier2id]
LEFT JOIN [dbo].Isp_costcenter FYCC on P.edm_costcenter = FYCC.[Isp_costcenterid]
LEFT JOIN [dbo].Isp_careerstage FYCS on P.isp_fycareerstage = FYCS.[Isp_careerstageid]
LEFT JOIN [dbo].Isp_incentiveplan FYIP on P.[edm_incentiveplan] = FYIP.[Isp_incentiveplanid]
LEFT JOIN [dbo].[Isp_rolesummary] FYRS on P.isp_rolesummary = FYRS.[isp_rolesummaryid]
LEFT JOIN [dbo].[Isp_worker] FYSeller ON FYSeller.isp_workerid =P.isp_fymanager
LEFT JOIN [dbo].[HRDataLake_CYData_Staging] FYManagerName on FYManagerName.Email= FYSeller.[isp_name]


--LEFT JOIN [dbo].[Isp_seller] FYSeller ON  FYSeller.[isp_sellerid] = P.[edm_sellerfy]
--Manual data pull
--LEFT JOIN [dbo].[TBl_FYManagerMapping] M On P.edm_plansellerid =  M.SellerID
-- Commented to Test 
/*
LEFT JOIN [dbo].[Isp_worker]  FYManager On FYSeller.[isp_manager] = FYManager.[isp_workerid]
LEFT JOIN [dbo].[HRDataLake_CYData] FYMgr on FYManager.isp_name = FYMgr.Email*/

WHere  CY.Email <> 'N/A'