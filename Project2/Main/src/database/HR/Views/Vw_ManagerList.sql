










/****** Script for SelectTopNRows command from SSMS  ******/

CREATE View [HR].[Vw_ManagerList]
AS

Select CY_ManagerAlias ,[CY_ManagerFullName]
FROm 
[HR].[Tbl_HRData]
GROUP BY CY_ManagerAlias,[CY_ManagerFullName]

Union

Select FY_ManagerAlias ,[FY_ManagerFullName]
FROm 
[HR].[Tbl_HRData]
GROUP BY FY_ManagerAlias ,[FY_ManagerFullName]

Union 
Select  [CY_ManagerAlias]
      ,[CY_ManagerFullName]   FROM [HR].[Tbl_Seller_Details]
	  GROUP BY  [CY_ManagerAlias]
      ,[CY_ManagerFullName]