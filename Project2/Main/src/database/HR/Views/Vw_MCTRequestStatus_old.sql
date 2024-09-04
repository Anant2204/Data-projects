
CREATE View [HR].[Vw_MCTRequestStatus_old]
AS

SELECT * FROM(
SELECT distinct [IC]---------modified for testing(distinct)
      ,[R1_ConversationStatus]
      ,[R2_ConversationStatus]
      ,[R1_EDMValidation]
      ,[R2_EDMValidation]
      ,[RequestType]
      ,ISNULL([Comments],'-') AS [Comments]
      , ISNUll([ProposedOrg],'-') AS [ProposedOrg]
      ,ISNUll([ProposedRoleSummary],'-') AS [ProposedRoleSummary]
      ,ISNUll([ProposedQ1],'-') AS [ProposedQ1]
      ,ISNUll([ProposedQ2],'-') AS [ProposedQ2]
      ,[RequesterAlias]
      ,[RequestDate]
      ,ISNUll([ProposedManager],'-') AS [ProposedManager]
      ,[FY_ManagerAlias]
      ,[FY_Org]
      ,[FY_RoleSummary]
      ,[FY_Q1]
      ,[FY_Q2]
      ,[Status]
      ,[DecisionMakerAlias]
      ,[DecisionMadeOn]
      ,[DecisionMakerComments]
      ,[FYManagerChangeApprovedOn]
      ,[IsEDMOverride]
	  ,CASE WHEN [ProposedOrg] = [FY_Org] or ProposedOrg IS NULL THEN 'No' ELSE 'Yes' END IsOrgChange
	  ,CASE WHEN [ProposedRoleSummary] = [FY_RoleSummary]  or [ProposedRoleSummary] IS NULL  THEN 'No' ELSE 'Yes' END IsRSChange
	  ,CASE WHEN [ProposedQ1] = [FY_Q1] or [ProposedQ1] IS NULL THEN 'No' ELSE 'Yes' END IsQ1Change
	  ,CASE WHEN [ProposedQ2] = [FY_Q2] or [ProposedQ2] IS NULL THEN 'No' ELSE 'Yes' END IsQ2Change
	  ,CASE WHEN [ProposedManager] = [FY_ManagerAlias] or [ProposedManager] IS NULL THEN 'No' ELSE 'Yes' END IsMgrChange
	  ,ManagerAlias-----modified for testing
	  ,MCT_EDM_Data_Keeper_Alias-----modified for testing
	  --,AdditionalUser1
	  --  ,AdditionalUser2
		--  ,AdditionalUser3
		 --   ,AdditionalUser4
		 ,CASE WHEN ManagerAlias=(LEFT(CURRENT_USER, CHARINDEX('@', CURRENT_USER) - 1)) THEN ROW_NUMBER() OVER(PARTITION BY IC ORDER BY IC) 
		       WHEN MCT_EDM_Data_Keeper_Alias=(LEFT(CURRENT_USER, CHARINDEX('@', CURRENT_USER) - 1)) THEN Dense_RANK() OVER( ORDER BY MCT_EDM_Data_Keeper_Alias)
	 END AS row_num

	FROM (

SELECT  T.[IC]
      ,[R1_ConversationStatus]
	   ,[R2_ConversationStatus]
	   ,[R1_EDMValidation]
	   ,[R2_EDMValidation]
      ,CASE WHEN ([R1_EDMValidation] NOT IN ( '' , 'Correct', 'Pending')) THEN [R1_EDMValidation] ELSE [R2_EDMValidation] END AS RequestType
      ,CASE WHEN [R2_update] IS NULL OR  [R2_update] < [R1_update]  THEN [R1_Comments] ELSE [R2_Comments] END AS Comments
      ,CASE WHEN [R2_update] IS NULL OR [R2_update] < [R1_update]  THEN [R1_Org] ELSE [R2_Org] END AS  ProposedOrg
      ,CASE WHEN [R2_update] IS NULL OR [R2_update] < [R1_update] THEN [R1_RS] ELSE [R2_RS] END AS ProposedRoleSummary
      ,CASE WHEN [R2_update] IS NULL OR [R2_update] < [R1_update] THEN [R1_Q1] ELSE [R2_Q1] END AS ProposedQ1
      ,CASE WHEN [R2_update] IS NULL OR [R2_update] < [R1_update]  THEN [R1_Q2] ELSE [R2_Q2] END AS ProposedQ2
      ,CASE WHEN [R2_update] IS NULL OR [R2_update] < [R1_update]  THEN [R1_updatedby] ELSE [R2_updatedby] END  AS RequesterAlias
      ,CASE WHEN [R2_update] IS NULL OR [R2_update] < [R1_update]  THEN [R1_update] ELSE [R2_update] END  AS RequestDate 
           
      ,CASE WHEN [R2_update] IS NULL OR [R2_update] < [R1_update]  THEN [R1_FY23CorrectManager] ELSE [R2_FY23CorrectManager] END AS ProposedManager
     ,H.FY_ManagerAlias
	 ,H.FY_Org
	 ,H.FY_RoleSummary
	 ,H.FY_Q1
	 ,H.FY_Q2
	 ,T.Status
	 ,T.DecisionMakerAlias	,T.DecisionMadeOn	,T.DecisionMakerComments	,T.FYManagerChangeApprovedOn	,T.IsEDMOverride
	,EDM.ManagerAlias AS ManagerAlias-----modified for testing
	,EDM.MCT_EDM_Data_Keeper_Alias AS MCT_EDM_Data_Keeper_Alias-----modified for testing
	--,EDM.AdditionalUser1 AS AdditionalUser1
	--	,EDM.AdditionalUser2 AS AdditionalUser2
		--	,EDM.AdditionalUser3 AS AdditionalUser3
		--	,EDM.AdditionalUser4 AS AdditionalUser4
  FROM [HR].[Tbl_HRData_ToolInput] T
  -- LEFT JOIN [dbo].[MCT_EDMAppoversmapping] B ON T.IC=B.IC ---modified for testing

 LEFT JOIN [HR].[Tbl_HRData] H  On T.IC= H.IC
     JOIN ( SELECT DISTINCT [Area_Segment]
   
      ,[MCT_EDM_Data_Keeper_Alias] AS MCT_EDM_Data_Keeper_Alias
     -- ,[IC]
      ,[ManagerAlias] AS ManagerAlias   
      --,[MType]
--	,AdditionalUser1 AS AdditionalUser1
	-- ,AdditionalUser2 AS AdditionalUser2
	-- ,AdditionalUser3 As AdditionalUser3
	 -- ,AdditionalUser4 AS AdditionalUser4
     
  FROM [dbo].[MCT_EDMAppoversmapping]
  
  )  EDM ON EDM.ManagerAlias = T.IC
  Where 
  [R1_EDMValidation]  IN (  'Not Sure', 'Incorrect EDM','Incorrect Reporting Manager') OR [R2_EDMValidation]  IN ('Not Sure', 'Incorrect EDM','Incorrect Reporting Manager') 
 ---AND(
----EDM.[MCT_EDM_Data_Keeper_Alias] =(LEFT(CURRENT_USER, CHARINDEX('@', CURRENT_USER) - 1))  
---OR
---EDM.ManagerAlias=(LEFT(CURRENT_USER, CHARINDEX('@', CURRENT_USER) - 1))  
---)
------------OR
-----------EDM.AdditionalUser1=(LEFT(CURRENT_USER, CHARINDEX('@', CURRENT_USER) - 1))
--------OR
----------EDM.AdditionalUser2=(LEFT(CURRENT_USER, CHARINDEX('@', CURRENT_USER) - 1))
------OR
-------EDM.AdditionalUser3=(LEFT(CURRENT_USER, CHARINDEX('@', CURRENT_USER) - 1))
-------OR
----EDM.AdditionalUser4=(LEFT(CURRENT_USER, CHARINDEX('@', CURRENT_USER) - 1))
-------)--
--AND  (

 --[R1_EDMValidation]  IN (  'Not Sure', 'Incorrect EDM','Incorrect Reporting Manager') OR [R2_EDMValidation]  IN ('Not Sure', 'Incorrect EDM','Incorrect Reporting Manager') 
--)
)A
)B