





CREATE VIEW [HR].[VW_MangerTimeline] AS

WITH CTE AS
(
SELECT A.ManagerAlias,B.CY_Org ,B.CY_RoleSummary , B.CY_Q1 , B.CY_Q2 
from

 (SELECT DISTINCT ManagerAlias FROM [HR].[Vw_ManagerSecurity])  A
LEFT JOIN HR.Tbl_HRData B ON A.ManagerAlias = B.IC
)

SELECT A.ManagerAlias, C.Proxy  FROM CTE A
LEFT JOIN HR.TBL_PROXY  C ON A.ManagerAlias = C.Manager