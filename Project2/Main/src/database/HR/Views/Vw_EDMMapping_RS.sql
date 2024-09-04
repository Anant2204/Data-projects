








/****** Script for SelectTopNRows command from SSMS  ******/

CREATE VIEW [HR].[Vw_EDMMapping_RS]
AS

SELECT  [Org] , RoleSummary 
      
  FROM  [HR].[MCT_EDM_Mapping]
  Group by [Org], RoleSummary