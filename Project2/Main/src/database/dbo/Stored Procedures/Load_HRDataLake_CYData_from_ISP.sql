CREATE procedure [dbo].[Load_HRDataLake_CYData_from_ISP]
AS
 Truncate table [dbo].[HRDataLake_CYData_Staging]
 Insert into [dbo].[HRDataLake_CYData_Staging] ([Personnel_Number]
      ,[Email]
      ,[Full_Name]
      ,[ManagerEmail]
      ,[Reports_To_Full_Name]
      ,[Skip_Level_Email]
      ,[Org]
      ,[Position_Number]
      ,[Qualifier_1]
      ,[Qualifier_2]
      ,[Role_Summary]
      ,[Reports_To_Level_1_Email]
      ,[Reports_To_Level_2_Email]
      ,[Reports_To_Level_3_Email]
      ,[Reports_To_Level_4_Email]
      ,[Reports_To_Level_5_Email]
      ,[Reports_To_Level_6_Email]
      ,[Reports_To_Level_7_Email]
      ,[Reports_To_Level_1_Full_Name]
      ,[Reports_To_Level_2_Full_Name]
      ,[Reports_To_Level_3_Full_Name]
      ,[Reports_To_Level_4_Full_Name]
      ,[Reports_To_Level_5_Full_Name]
      ,[Reports_To_Level_6_Full_Name]
      ,[Reports_To_Level_7_Full_Name]
      ,[CostCenter]
      ,[IncentivePlan]
      ,[CareerStage])
select
	W.isp_personnelnumber as Personnel_Number, 
	W.isp_name as Email, 
	W.isp_alias as Full_Name, 
	W2.isp_name as ManagerEmail, 
	W2.isp_alias as Reports_To_Full_Name, 
	null as Skip_Level_Email,
	O.isp_name as Org,
	W.isp_positionnumber as Position_Number,
	Q1.isp_name as Qualifier1,
	Q2.isp_name as Qualifier2,
	RS.isp_name as Role_Summary,
	Level1.isp_name as Reports_To_Level_1_Email,
	Level2.isp_name as Reports_To_Level_2_Email,
	Level3.isp_name as Reports_To_Level_3_Email,
	Level4.isp_name as Reports_To_Level_4_Email,
	Level5.isp_name as Reports_To_Level_5_Email,
	Level6.isp_name as Reports_To_Level_6_Email,
	Level7.isp_name as Reports_To_Level_7_Email,
	Level1.isp_alias as Reports_To_Level_1_Full_Name,
	Level2.isp_alias as Reports_To_Level_2_Full_Name,
	Level3.isp_alias as Reports_To_Level_3_Full_Name,
	Level4.isp_alias as Reports_To_Level_4_Full_Name,
	Level5.isp_alias as Reports_To_Level_5_Full_Name,
	Level6.isp_alias as Reports_To_Level_6_Full_Name,
	Level7.isp_alias as Reports_To_Level_7_Full_Name,
	CS.isp_name as CostCenter,
	IPlan.isp_name as IncentivePlan,
	Cstage.isp_name as CareerStage
from PlanSeller PS
LEFT JOIN [dbo].[Isp_seller] S on S.isp_sellerid= PS.edm_sellercy
LEFT JOIN [dbo].Isp_worker W on W.isp_workerid=S.isp_worker and W.statecode=0
LEFT JOIN [dbo].Isp_worker W2 on W.isp_manager=W2.isp_workerid and W2.statecode=0
LEFT JOIN [dbo].Isp_Org O on O.isp_orgid=S.isp_org
LEFT JOIN [dbo].Isp_qualifier1 as Q1 on Q1.isp_qualifier1id=S.isp_qualifier1
LEFT JOIN [dbo].Isp_costcenter as cs on cs.isp_costcenterid=S.isp_costcenter
LEFT JOIN [dbo].Isp_incentiveplan as IPlan on IPlan.Isp_incentiveplanid=S.Isp_incentiveplan
LEFT JOIN [dbo].Isp_careerstage as CStage on Cstage.Isp_careerstageid=S.Isp_careerstage
LEFT JOIN [dbo].Isp_qualifier2 as Q2 on Q2.isp_qualifier2id=S.isp_qualifier2
LEFT JOIN [dbo].Isp_rolesummary as RS on RS.isp_rolesummaryid=S.isp_rolesummary
LEFT JOIN [dbo].Isp_worker as Level1 on Level1.isp_workerid=PS.isp_level1
LEFT JOIN [dbo].Isp_worker as Level2 on Level2.isp_workerid=PS.isp_level2
LEFT JOIN [dbo].Isp_worker as Level3 on Level3.isp_workerid=PS.isp_level3
LEFT JOIN [dbo].Isp_worker as Level4 on Level4.isp_workerid=PS.isp_level4
LEFT JOIN [dbo].Isp_worker as Level5 on Level5.isp_workerid=PS.isp_level5
LEFT JOIN [dbo].Isp_worker as Level6 on Level6.isp_workerid=PS.isp_level6
LEFT JOIN [dbo].Isp_worker as Level7 on Level7.isp_workerid=PS.isp_level7
--Excluded Workerstatus for Terminated, Inactive contingent, Active contingent respectively
WHERE W.isp_workerstatus NOT IN (863300003,863300006,863300007) AND Cstage.isp_name <> 'INTERN'
UNION
select
	W.isp_personnelnumber as Personnel_Number, 
	PS.Email, 
	PS.Full_Name, 
	PS.ManagerEmail, 
	PS.Reports_To_Full_Name, 
	null as Skip_Level_Email,
	O.isp_name as Org,
	W.isp_positionnumber as Position_Number,
	Q1.isp_name as Qualifier1,
	Q2.isp_name as Qualifier2,
	RS.isp_name as Role_Summary,
	PS.Reports_To_Level_1_Email,
	PS.Reports_To_Level_2_Email,
	PS.Reports_To_Level_3_Email,
	PS.Reports_To_Level_4_Email,
	PS.Reports_To_Level_5_Email,
	PS.Reports_To_Level_6_Email,
	PS.Reports_To_Level_7_Email,
	PS.Reports_To_Level_1_Full_Name,
	PS.Reports_To_Level_2_Full_Name,
	PS.Reports_To_Level_3_Full_Name,
	PS.Reports_To_Level_4_Full_Name,
	PS.Reports_To_Level_5_Full_Name,
	PS.Reports_To_Level_6_Full_Name,
	PS.Reports_To_Level_7_Full_Name,
	CS.isp_name as CostCenter,
	IPlan.isp_name as IncentivePlan,
	Cstage.isp_name as CareerStage
FROM [dbo].[Employee_CYData_Staging] PS
LEFT JOIN [dbo].Isp_worker W on W.isp_workerid=PS.isp_worker and W.statecode=0
LEFT JOIN [dbo].Isp_Org O on O.isp_orgid=PS.isp_org
LEFT JOIN [dbo].Isp_qualifier1 as Q1 on Q1.isp_qualifier1id=PS.isp_qualifier1
LEFT JOIN [dbo].Isp_costcenter as cs on cs.isp_costcenterid=PS.isp_costcenter
LEFT JOIN [dbo].Isp_incentiveplan as IPlan on IPlan.Isp_incentiveplanid=PS.Isp_incentiveplan
LEFT JOIN [dbo].Isp_careerstage as CStage on Cstage.Isp_careerstageid=PS.Isp_careerstage
LEFT JOIN [dbo].Isp_qualifier2 as Q2 on Q2.isp_qualifier2id=PS.isp_qualifier2
LEFT JOIN [dbo].Isp_rolesummary as RS on RS.isp_rolesummaryid=PS.isp_rolesummary
--Excluded Workerstatus for Terminated, Inactive contingent, Active contingent respectively
WHERE W.isp_workerstatus NOT IN (863300003,863300006,863300007) AND Cstage.isp_name <> 'INTERN'