create  proc  [HR].[Usp_Generate_ManagerHierarchy]
AS
BEGIN

--BaseTable

 IF OBJECT_ID('HR.Brdg_AliasMgrMapping') IS NOT NULL  
 
 BEGIN  
  truncate Table   HR.Brdg_AliasMgrMapping 
  END

--CREATE TABLE HR.Brdg_AliasMgrMapping ( IC Varchar(100) NOT NULL Primary Key  ,CY_ManagerAlias Varchar(200)  , CY_ManagerFullName Varchar(200), FY_ManagerAlias Varchar(200) ,FY_ManagerFullName Varchar(200),MangerLevel INT)
INSERT INTO HR.Brdg_AliasMgrMapping (IC,CY_ManagerAlias,CY_ManagerFullName,FY_ManagerAlias,FY_ManagerFullName,fullName)
SELECT IC,CY_ManagerAlias,CY_ManagerFullName,FY_ManagerAlias,FY_ManagerFullName, IC_FullName FROM HR.Tbl_HRData_Staging
--CREATE NONCLUSTERED INDEX [NCI_HRDATAMAIN] ON HR.Brdg_AliasMgrMapping (CY_ManagerAlias,CY_ManagerFullName,FY_ManagerAlias,FY_ManagerFullName)


 IF OBJECT_ID('tempdb..#Dim_Managerhierarchy') IS NOT NULL  
 
 BEGIN  
  DROP Table  #Dim_Managerhierarchy
  END
SELECT * INTO #Dim_Managerhierarchy FROM HR.Dim_Managerhierarchy where 1 = 2

 BEGIN


--- CY Manager Hirerarchy 
 INSERT INTO  #Dim_Managerhierarchy (
 IC,
ManagerAlias,
MType,
DirectManagerFullName,
DirectManagerAlias,
ManagerLevel
)
SELECT
Ufn.IC,
Ufn.CY_ManagerAlias,
MType  ='CY',
DirectManagerFullName =  Tbl.CY_ManagerFullName,
DirectManagerAlias = TBL.CY_ManagerAlias,
ufn.mangerlevel as managerlevel
 FROM (  
   SELECT IC  ,CY_ManagerAlias , CY_ManagerFullName,mangerlevel
   FROM  HR.Brdg_AliasMgrMapping 
   ) Tbl  
  CROSS APPLY [HR].[Ufn_GetCYManagers](Tbl.IC) Ufn  

--- FY Manager Hirerarchy 
 INSERT INTO  #Dim_Managerhierarchy (
 IC,
ManagerAlias,
MType,
DirectManagerFullName,
DirectManagerAlias,
ManagerLevel
)
SELECT
Ufn.IC,
Ufn.FY_ManagerAlias,
MType  ='FY',
DirectManagerFullName =  Tbl.FY_ManagerFullName,
DirectManagerAlias = TBL.FY_ManagerAlias,
ufn.mangerlevel as managerlevel 
 FROM (  
   SELECT IC  ,FY_ManagerAlias , FY_ManagerFullName,mangerlevel
   FROM  HR.Brdg_AliasMgrMapping --WHere IC = 'NEKUM'  
   ) Tbl  
  CROSS APPLY [HR].[Ufn_GetFYManagers](Tbl.IC) Ufn  

END 


 
 IF OBJECT_ID('tempdb..#Dim_Managerhierarchy') IS NOT NULL  
 
BEGIN  

TRUNCATE  Table [HR].[Dim_Managerhierarchy_Staging]

INSERT INTO [HR].[Dim_Managerhierarchy_Staging] (
 IC,
ManagerAlias,
MType,
DirectManagerFullName,
DirectManagerAlias,
ManagerLevel
)
SELECT
IC,
ManagerAlias,
MType  ,
DirectManagerFullName ,
DirectManagerAlias ,
ManagerLevel
FROM #Dim_Managerhierarchy
END

Update A
SET A.ID = B.ID
FROM [HR].[Dim_Managerhierarchy_Staging] A LEFT JOIN HR.Tbl_HRData_Staging B ON A.IC = B.IC



END