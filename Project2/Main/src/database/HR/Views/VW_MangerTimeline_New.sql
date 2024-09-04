





CREATE VIEW [HR].[VW_MangerTimeline_New] AS

WITH CTE AS
(
SELECT A.ManagerAlias,B.CY_Org ,B.CY_RoleSummary , B.CY_Q1 , B.CY_Q2 
,Timeline = CASE WHEN (CY_Org = 'Core - Industry Solutions' OR CY_Org = 'Microsoft Consulting' ) THEN 2 
									   
ELSE 1 END   
FROM
 (SELECT DISTINCT ManagerAlias FROM [HR].[Vw_ManagerSecurity] ) A
LEFT JOIN HR.Tbl_HRData B ON A.ManagerAlias = B.IC
)

SELECT A.ManagerAlias, C.Proxy ,Timeline =  Timeline FROM CTE A
LEFT JOIN HR.TBL_PROXY  C ON A.ManagerAlias = C.Manager