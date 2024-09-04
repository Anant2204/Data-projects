









/****** Script for SelectTopNRows command from SSMS  ******/

CREATE View [HR].[Vw_EDMMapping_Org]
AS

SELECT Distinct [Org] 
      
  FROM  [HR].[MCT_EDM_Mapping]