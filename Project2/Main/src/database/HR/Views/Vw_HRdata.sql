

CREATE View [HR].[Vw_HRdata]
AS

SELECT A.ID
       ,A.[IC]
	   ,A.[IC_FullName]
      ,[Location]
      ,[RoleChange]
      ,[CY_ManagerAlias]
      ,[CY_ManagerFullName]
      --,[CY_OU]
      ,[CY_Org]
      ,[CY_RoleSummary]
      ,[CY_Q1]
      ,[CY_Q2]
	  ,[CY_CareerStage]
	  ,[CY_IncentivePlan]
	  ,[CY_CostCenter]
      ,[FY_ManagerAlias]
      ,[FY_ManagerFullName]
      --,[FY_OU]
      ,[FY_Org]
      ,[FY_RoleSummary]
      ,[FY_Q1]
      ,[FY_Q2]
      ,A.[FY_Discipline]
	  ,A.[FY_Profession]
	  ,A.[CY_Profession]
	  ,A.[CY_Discipline]
	  ,A.[FY_IncentivePlan]
	  ,A.[FY_CostCenter]
      ,A.[FY_CareerStage]
      ,[FYManagerChange]
	  ,R1ManagerChange =  CASE WHEN FYManagerChange = 'Y' THEN 'Transfering Out' ELSE 'Maintaining' END
	  ,R2ManagerChange = CASE WHEN FYManagerChange = 'Y' THEN 'Transfering IN' ELSE 'Maintaining' END
	  ,R1_FY23CorrectManager
      ,[R1_ConversationStatus]
      ,[R1_EDMValidation]
      ,[R1_Comments]
      ,[R1_Org]
      ,[R1_RS]
      ,[R1_Q1]
      ,[R1_Q2]
      ,[R1_updatedby]
      ,[R1_update]
      ,[R1_CoversationLevel]
      ,[R2_ConversationStatus]
      ,[R2_EDMValidation]
      ,[R2_Comments]
	  ,R2_FY23CorrectManager
	  ,[R2_Org]
      ,[R2_RS]
      ,[R2_Q1]
      ,[R2_Q2]
      ,[R2_CoversationLevel]
      ,[R2_updatedby]
      ,[R2_update]
      ,CC.isp_glcompanycode AS FY_CompanyCode
	  ,Script
	  , NULL AS LOA
	  ,Sending_ScriptLink = CASE 
	  --WHEN [CY_ManagerAlias] <> [FY_ManagerAlias] and [FY_Org]='Core -Industry Solutions' THEN 'https://microsoft.sharepoint.com/:p:/r/teams/Transitions/_layouts/15/Doc.aspx?sourcedoc=%7B7ED2BFAA-AD13-46E0-8A22-176E0B301E9E%7D&file=Core%20%E2%80%93%20Industry%20Solutions%20Delivery-Domain%20to%20Area%20Delivery%20Realignment%E2%80%8B.pptx&action=edit&mobileredirect=true&share=IQGqv9J-E63gRooiF24LMB6eAagZrvC0gFQq3lOdpg6_XK0' 
							WHEN [CY_ManagerAlias] <> [FY_ManagerAlias] and [RoleChange]='Employee Conversation – Manager Checklist' THEN 'https://microsoft.sharepoint.com/:p:/t/Transitions/EVpfKFF7dzlDnrrZnHclZiEBo8vHOIHnwMpRsBxVtF_A_Q?e=8a20dY'
							ELSE Script END
	  ,Receiving_ScriptLink = Case when  [CY_ManagerAlias]=[FY_ManagerAlias]    then  'https://microsoft.sharepoint.com/:p:/t/Transitions/EVpfKFF7dzlDnrrZnHclZiEBo8vHOIHnwMpRsBxVtF_A_Q?e=8a20dY'
		 		                  else  'https://microsoft.sharepoint.com/:p:/t/Transitions/Ee9xGwMqNlhBn64aaXLik1kB907gAdKuv3DZ5vcd83HiUg?e=O8m0U3' 
								  End 

	 ,SendingFormatingStatus = CASE WHEN R1_Conversationstatus = 'Completed' THEN 'Completed' ELSE 'Pending' END
      ,ReceivingFormatingStatus = CASE WHEN R2_Conversationstatus = 'Completed' THEN 'Completed'  ELSE 'Pending' END
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
		   ,CASE WHEN A.[IsConversationRequired] = 1 THEN 'Required' ELSE 'Optional' END AS [Conversation]
  FROM [HR].[Tbl_HRData] A
  Left JOIN [HR].[Tbl_HRData_ToolInput] B ON A.IC = B.IC
  LEFT JOIN Isp_costcenter CC on CC.isp_name=A.[FY_CostCenter]
  -- where A.[CY_ManagerAlias] not in (select ManagerAlias from [HR].[Tbl_Manager_ExceptionList])