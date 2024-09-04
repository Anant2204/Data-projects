CREATE   Proc [HR].[Usp_Load_HR_BaseData]    
AS    
--Drop table [HR].[Tbl_HRData_Staging]    
Truncate Table [HR].[Tbl_HRData_Staging]    
 
 --Declare variable for inclusion and exclusion of reports_to level 1 ,2,3,
    DECLARE @R2l1_Email NVARCHAR(100),
   @R2l2_Email NVARCHAR(100),
   @R2l2_Email_Exclude NVARCHAR(100),
   @R2l3_email_Exclude NVARCHAR(100);


    SET @R2l1_Email= (SELECT Value FROM dbo.Configuration WHERE [key] = 'Reports_To_Level_1_Email_inclusion');

    SET @R2l2_Email= (SELECT Value FROM dbo.Configuration WHERE [key] = 'Reports_To_Level_2_Email_inclusion');

    SET @R2l2_Email_Exclude= (SELECT Value FROM dbo.Configuration WHERE [key] = 'Reports_To_Level_2_Email_Exclusion');

    SET @R2l3_email_Exclude= (SELECT Value FROM dbo.Configuration WHERE [key] = 'Reports_To_Level_3_Email_Exclusion');

    	-----Adding the split value table below to handle multiple value for any reports to level 
		    SET NOCOUNT ON;--To avoid messing with rowcount feature that captures row count for each SP 
            DECLARE @SplitValuesR2l1_Include TABLE (Value NVARCHAR(MAX));
			INSERT INTO @SplitValuesR2l1_Include (Value)
			SELECT value
			FROM STRING_SPLIT(@R2l1_Email, ',');

			DECLARE @SplitValuesR2l2_Exclude TABLE (Value NVARCHAR(MAX));
			INSERT INTO @SplitValuesR2l2_Exclude (Value)
			SELECT value
			FROM STRING_SPLIT(@R2l2_Email_Exclude, ',');

			DECLARE @SplitValuesR2l3_Exclude TABLE (Value NVARCHAR(MAX));
			INSERT INTO @SplitValuesR2l3_Exclude (Value)
			SELECT value
			FROM STRING_SPLIT(@R2l3_Email_Exclude, ',');

			DECLARE @SplitValuesR2l2_Include TABLE (Value NVARCHAR(MAX));
			INSERT INTO @SplitValuesR2l2_Include (Value)
			SELECT value
			FROM STRING_SPLIT(@R2l2_Email, ',');
			SET NOCOUNT OFF;--enabled rowcount for queries below this 
           ---- ------------------------------------------

INSERT INTO [HR].[Tbl_HRData_Staging]    
           ([IC]    
           ,[IC_FullName]    
           ,[Location]    
  --  ,[MgrofMgrsInd]    
           ,[RoleChange]    
           ,[CY_ManagerAlias]    
           ,[CY_ManagerFullName]    
              
           ,[CY_Org]    
           ,[CY_RoleSummary]    
           ,[CY_Q1]    
           ,[CY_Q2]    
           ,[FY_ManagerAlias]    
           ,[FY_ManagerFullName]    
               
           ,[FY_Org]    
           ,[FY_RoleSummary]    
           ,[FY_Q1]    
           ,[FY_Q2]    
           ,[FYManagerChange]    
          ,[RecordModifiedDate]    
    ,[Script]    
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
   ,[FY_IncentivePlan]  
      ,[FY_CostCenter]  
      ,[CY_CareerStage]  
      ,[CY_IncentivePlan]  
      ,[CY_CostCenter]  
      ,[FY_CareerStage]  
   ,[IsConversationRequired]  
   )    
        
 SELECT Distinct     
        Alias AS [IC]    
           ,FullName  AS [IC_FullName]    
           ,Country AS [Location]    
   --,[MgrofMgrsInd] =''    
           ,RoleChange=''    
         
           ,[CY_ManagerAlias]    
           ,[CY_ManagerFullName] =  ISNULL([CY_ManagerFullName],[CY_ManagerAlias])    
               
           ,[CY_Org]    
           ,[CY_RoleSummary]    
     ,[CY_Q1]    
           ,[CY_Q2]     
           ,[FY_ManagerAlias]    
           ,[FY_ManagerFullName] = ISNULL([FY_ManagerFullName],[FY_ManagerAlias])    
               
           ,[FY_Org]    
           ,FY_RS AS FY_RoleSummary    
      ,[FY_Q1]    
   ,[FY_Q2]    
            ,[FYManagerChange] = CASE WHEN CY_ManagerAlias = FY_ManagerAlias THEN 'N' ELSE 'Y' END    
           ,[ISPLastModifiedDate] AS [RecordModifiedDate]    
    ,Script=''    
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
   ,[FY_IncentivePlan]  
      ,[FY_CostCenter]  
      ,[CY_CareerStage]  
      ,[CY_IncentivePlan]  
      ,[CY_CostCenter]  
      ,[FY_CareerStage]  
      ,CASE WHEN ((Reports_To_Level_1_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_2_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_3_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_4_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_5_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_6_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
       OR Reports_To_Level_7_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes'))  
                OR ([CY_Org]!=[FY_Org]   
                OR [CY_RoleSummary]!=[FY_RS]   
                OR [CY_Q1]!=[FY_Q1]   
             OR [CY_Q2]!=[FY_Q2]  
      -- TODO OR CY_Discipline!=FY_Discipline OR CY_Profession!=FY_Profession  
                OR [CY_IncentivePlan]!=[FY_IncentivePlan]   
                OR [CY_CareerStage]!=[FY_CareerStage])  
       OR [CY_ManagerAlias]!=[FY_ManagerAlias]
	   /*OR ((SELECT Distinct DirectManagerAlias FROM hr.Dim_Managerhierarchy WHERE MType='CY' AND IC = CY_ManagerAlias)!=
	   (SELECT Distinct DirectManagerAlias FROM hr.Dim_Managerhierarchy WHERE  MType='FY' AND IC = FY_ManagerAlias ))*/ --Commented this as this is not needed on 4th April 2024
	   ) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END  
  -- INTO [HR].[Tbl_HRData]    
 FROM [HR].[Tbl_Seller_Details_Staging] SP  
 --JOIN  [dbo].[HRDataLake_CYData] CY ON SP.Alias = CY.Email    
 --HR.Plan_Seller_Advanced_Prod      
    
 where (ISNULL(Reports_To_Level_1_Email,'') IN (select * from @SplitValuesR2l1_Include)
 and ISNULL(Reports_To_Level_2_Email,'') NOT IN (Select * from @SplitValuesR2l2_Exclude) 

 and ISNULL(Reports_To_Level_3_Email,'') NOT IN (Select * from @SplitValuesR2l3_Exclude) )
 OR ISNULL(Reports_To_Level_2_Email,'') IN  (select * from @SplitValuesR2l2_Include)   
   
 --[isp_level2] NOT IN ('CBDB3AA6-18AF-EB11-A812-000D3A5AD29E','452CF0BE-19AF-EB11-A812-000D3A5AD29E')    
-- AND [isp_level1]='D47C31A6-18AF-EB11-A812-000D3A5ADB97'    
 --Country!='United States'  -- This is resuling in other org not showing up so updated the correct condition above    
    
   -- FIX FY Manager change flag