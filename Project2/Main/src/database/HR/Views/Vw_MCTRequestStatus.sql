









CREATE View [HR].[Vw_MCTRequestStatus]
AS
SELECT distinct [IC]---------modified for testing(distinct)
      ,IC_FullName
	  ,PS_Worker_ID
	  ,[R1_ConversationStatus]
      ,[R2_ConversationStatus]
      ,[R1_EDMValidation]
      ,[R2_EDMValidation]
      ,[RequestType]
      ,CASE WHEN [Comments]='' or [Comments] IS NULL THEN '-' ELSe [Comments] END  AS [Comments]
      , ISNUll([ProposedOrg],'-') AS [ProposedOrg]
      ,ISNUll([ProposedRoleSummary],'-') AS [ProposedRoleSummary]
      ,ISNUll([ProposedQ1],'-') AS [ProposedQ1]
      ,ISNUll([ProposedQ2],'-') AS [ProposedQ2]
      ,[RequesterAlias]
      ,[RequestDate]
      ,ISNUll([ProposedManager],'-') AS [ProposedManager]
      ,[FY_ManagerAlias]
	  ,[FY_ManagerFullName]
      ,[FY_Org]
	  ,FY_Org_ID
      ,[FY_RoleSummary]
	  ,FY_RS_ID
      ,[FY_Q1]
	  ,FY_Q1_ID
      ,[FY_Q2]
	  ,FY_Q2_ID
      ,[Status]
      ,[DecisionMakerAlias]
      ,[DecisionMadeOn]
      ,[DecisionMakerComments]
	  ,DecisionMakerName
      ,[FYManagerChangeApprovedOn]
      ,[IsEDMOverride]
	  ,CASE WHEN [ProposedOrg] = [FY_Org] or ProposedOrg IS NULL THEN 'No' ELSE 'Yes' END IsOrgChange
	  ,CASE WHEN [ProposedRoleSummary] = [FY_RoleSummary]  or [ProposedRoleSummary] IS NULL  THEN 'No' ELSE 'Yes' END IsRSChange
	  ,CASE WHEN [ProposedQ1] = [FY_Q1] or [ProposedQ1] IS NULL THEN 'No' ELSE 'Yes' END IsQ1Change
	  ,CASE WHEN [ProposedQ2] = [FY_Q2] or [ProposedQ2] IS NULL THEN 'No' ELSE 'Yes' END IsQ2Change
	  ,CASE WHEN [ProposedManager] = [FY_ManagerAlias] or [ProposedManager] IS NULL THEN 'No' ELSE 'Yes' END IsMgrChange
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
		   ,ISNUll(Location,'-') AS [Location]
		    ,[CY_ManagerAlias]
      ,[CY_ManagerFullName]
      --,[CY_OU]
      ,[CY_Org]
      ,[CY_RoleSummary]
      ,[CY_Q1]
      ,[CY_Q2]
	  ,FY_CareerStage,FY_CostCenter,FY_IncentivePlan,CY_CareerStage,CY_CostCenter,CY_IncentivePlan,FY_ManagerID,ISP_ReviewStatus
	  ,FY_CompanyCode
      ,CASE WHEN [ISPUpdateStatus]  IS NULL THEN 'Sync Pending' ELSE [ISPUpdateStatus] END [ISPUpdateStatus]
      ,[ISPErrorDetails],
	  ProposedIncentivePlan,
	  ProposedCostcenter
	FROM (

SELECT DISTINCT  T.[IC], H.IC_FullName
      ,[R1_ConversationStatus]
	   ,[R2_ConversationStatus]
	   ,[R1_EDMValidation]
	   ,[R2_EDMValidation]
	   ,Q1.isp_qualifier1id as FY_Q1_ID
	   ,Q2.isp_qualifier2id as FY_Q2_ID
	   ,FYO.isp_orgid as FY_Org_ID
	   ,RS.isp_rolesummaryid as FY_RS_ID
	   ,PS.edm_plansellerid as PS_Worker_ID
	   ,CASE WHEN (PS.edm_reviewstatus=757580000) THEN 'Pending'  WHEN (PS.edm_reviewstatus=757580001) THEN 'Reviewed' WHEN (PS.edm_reviewstatus=757580002) THEN 'Approved' ELSE 'Exception' END as ISP_ReviewStatus
      ,CASE WHEN ([R1_EDMValidation] NOT IN ( '' , 'Correct', 'Pending')) THEN [R1_EDMValidation] ELSE [R2_EDMValidation] END AS RequestType
      ,CASE WHEN [R2_update] IS NULL OR  [R2_update] < [R1_update]  THEN [R1_Comments] ELSE [R2_Comments] END AS Comments
      ,CASE WHEN [R2_update] IS NULL OR [R2_update] < [R1_update]  THEN [R1_Org] ELSE [R2_Org] END AS  ProposedOrg
      ,CASE WHEN [R2_update] IS NULL OR [R2_update] < [R1_update] THEN [R1_RS] ELSE [R2_RS] END AS ProposedRoleSummary
      ,CASE WHEN [R2_update] IS NULL OR [R2_update] < [R1_update] THEN [R1_Q1] ELSE [R2_Q1] END AS ProposedQ1
      ,CASE WHEN [R2_update] IS NULL OR [R2_update] < [R1_update]  THEN [R1_Q2] ELSE [R2_Q2] END AS ProposedQ2
      ,T.FY_IncentivePlan AS ProposedIncentivePlan
      ,T.FY_CostCenter AS ProposedCostcenter
      ,CASE WHEN [R2_update] IS NULL OR [R2_update] < [R1_update]  THEN [R1_updatedby] ELSE [R2_updatedby] END  AS RequesterAlias
      ,CASE WHEN [R2_update] IS NULL OR [R2_update] < [R1_update]  THEN [R1_update] ELSE [R2_update] END  AS RequestDate 
           
      ,CASE WHEN [R2_update] IS NULL OR [R2_update] < [R1_update]  THEN [R1_FY23CorrectManager] ELSE [R2_FY23CorrectManager] END AS ProposedManager
     ,H.FY_ManagerAlias
	 ,H.FY_ManagerFullName
	 ,H.FY_Org
	 ,H.FY_RoleSummary
	 ,H.FY_Q1
	 ,H.FY_Q2
	 ,T.Status
	 ,T.DecisionMakerAlias	,T.DecisionMadeOn	,T.DecisionMakerComments,T.DecisionMakerName	,T.FYManagerChangeApprovedOn	,T.IsEDMOverride
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
		   ,H.Location
		    ,[CY_ManagerAlias]
      ,[CY_ManagerFullName]
      --,[CY_OU]
      ,[CY_Org]
      ,[CY_RoleSummary]
      ,[CY_Q1]
      ,[CY_Q2]
	  ,FY_CareerStage,H.FY_CostCenter,H.FY_IncentivePlan,H.CY_CareerStage,H.CY_CostCenter,H.CY_IncentivePlan, WM.Isp_workerid as FY_ManagerID
	  ,CC.isp_glcompanycode AS FY_CompanyCode
	  ,T.[ISPUpdateStatus], T.[ISPErrorDetails] 
  FROM [HR].[Tbl_HRData_ToolInput] T
  -- LEFT JOIN [dbo].[MCT_EDMAppoversmapping] B ON T.IC=B.IC ---modified for testing
   LEFT JOIN [HR].[Tbl_HRData] H  On T.IC= H.IC
   LEFT JOIN Isp_Org FYO on FYO.isp_name=H.FY_Org
   LEFT JOIN Isp_qualifier1 Q1 on Q1.isp_name=H.FY_Q1
   LEFT JOIN Isp_qualifier2 Q2 on Q2.isp_name=H.FY_Q2
   LEFT JOIN Isp_rolesummary RS on RS.isp_name=H.FY_RoleSummary
   LEFT JOIN Isp_careerstage CS on CS.isp_name=H.FY_CareerStage
   LEFT JOIN Isp_costcenter CC on CC.isp_name=H.FY_CostCenter
   LEFT JOIN Isp_incentiveplan IPlan on IPlan.isp_name=H.FY_IncentivePlan
   LEFT JOIN Isp_worker W on W.isp_name=H.IC
   LEFT JOIN Isp_worker WM on WM.isp_name=H.FY_ManagerAlias
   LEFT JOIN PlanSeller PS on PS.edm_worker=W.isp_workerid
   LEFT JOIN PlanSeller PS1 on PS1.isp_companycode=CC.isp_companycode
   LEFT JOIN (Select DISTINCT IC, ManagerAlias FROM [HR].[Dim_Managerhierarchy] WHERE MType='CY') M On M.IC= H.IC
   LEFT JOIN [dbo].[MCT_EDMAppoversmapping] EDM ON EDM.ManagerAlias = M.ManagerAlias
 WHERE ([R1_EDMValidation]  IN ('Not Sure', 'Incorrect EDM','Incorrect Reporting Manager') OR [R2_EDMValidation]  IN ('Not Sure', 'Incorrect EDM','Incorrect Reporting Manager') )
	-- Uncomment this when moving to prod/uat. This is a temporary fix for DEV
	 --AND (EDM.[MCT_EDM_Data_Keeper_Alias] =(LEFT(CURRENT_USER, CHARINDEX('@', CURRENT_USER) - 1)) OR CURRENT_USER='mct@microsoft.com')
 )A