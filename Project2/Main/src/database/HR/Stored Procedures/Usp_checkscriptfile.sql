
CREATE PROCEDURE [HR].[Usp_checkscriptfile] (
	@FY22_org VARCHAR(1255)
	,@FY22_RoleSummary VARCHAR(1255)
	,@FY22_Q1 VARCHAR(1255)
	,@FY22_Q2 VARCHAR(1255)
	,@FY23_org VARCHAR(1255)
	,@FY23_RoleSummary VARCHAR(1255)
	,@FY23_Q1 VARCHAR(1255)
	,@FY23_Q2 VARCHAR(1255)
	
	)
AS
BEGIN

--select Link  from [HR].[Scripts_Logic]
--where  FY22_Standard_Title_Role_Summary=@FY22_RoleSummary and FY22_Org=@FY22_org and FY22_Qualifier_1=@FY22_Q1 and FY22_Qualifier_2=@FY22_Q2 and 
--        FY23_Standard_Title_Role_Summary=@FY23_RoleSummary and FY23_Org=@FY23_org and FY23_Qualifier_1=@FY23_Q2 and FY23_Qualifier_2=@FY23_Q2
--		RETURN  
--			END




  --[HR].[MCT_FY_23_Scripts_Logic]
 
-- select * from [HR].[Scripts_Logic]
--select * from hr.TBL_RoleChange
  
---*****************************
IF OBJECT_ID('Tempdb..#TBL_ROlECHANGEPVT1') IS NOT NULL 
BEGIN
DROP TABLE #TBL_ROlECHANGEPVT1
END 
 
SELECT [ROLESCenarioID], Field, FValue
INTO #TBL_ROlECHANGEPVT1
FROM   
   (SELECT  CY_Org, CY_RoleSummary, CY_Q1 , CY_Q2, FY_Org, FY_RoleSummary,FY_Q1,FY_Q2,[ROLESCenarioID]  
   FROM [HR].[TBL_RoleChange]) p
UNPIVOT  
   (FValue FOR Field IN   
      (CY_Org, CY_RoleSummary, CY_Q1 , CY_Q2,FY_Org,  FY_RoleSummary,FY_Q1,FY_Q2  )  
)AS unpvt  WHERE ISNULL(FValue,'') <> '';

--SELECT*FROM #TBL_ROlECHANGEPVT1  where FValue=''

IF OBJECT_ID('Tempdb..#FinalROleCHange1') IS NOT NULL 
BEGIN
DROP TABLE #FinalROleCHange1
END 

;WITH CTE AS(
 Select T1.ROLESCenarioID, STUFF(            
            
(SELECT Distinct ' AND ' + '[' +T.Field+'] = '+ '''' +T.FValue + '''' from             
#TBL_ROlECHANGEPVT1 T             
where T.ROLESCenarioID = T1.ROLESCenarioID                 
for XML PATH('') ),1,4, '')            
 AS [Condition]           
FROM #TBL_ROlECHANGEPVT1 T1            
GROUP by T1.ROLESCenarioID   
)
SELECT A.*,[Condition] = REPLACE(B.[Condition], 'amp;', '')
INTO #FinalROleCHange1
FROM HR.TBL_RoleChange A LEFT JOIN CTE B ON A.ROLESCenarioID = B.ROLESCenarioID
select ScriptLink from #FinalRoleCHange1
where condition =
(select top 1 condition from #FinalRoleCHange1
where  CY_RoleSummary=@FY22_RoleSummary and CY_Org=@FY22_org and CY_Q1=@FY22_Q1 and CY_Q2=@FY22_Q2 and 
FY_RoleSummary=@FY23_RoleSummary and FY_Org=@FY23_org and FY_Q1=@FY23_Q1 and FY_Q2=@FY23_Q2 )

END