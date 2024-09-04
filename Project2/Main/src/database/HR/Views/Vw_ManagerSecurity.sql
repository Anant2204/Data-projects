







CREATE VIEW [HR].[Vw_ManagerSecurity]

AS

SELECT A.ID, A.IC , A.ManagerAlias    , A.MType  , A.DirectManagerFullName  , A.DirectManagerAlias,B.Proxy 
FROM HR.Dim_Managerhierarchy A
LEFT JOIN  HR.TBL_PROXY  B ON A.ManagerAlias = B.Manager  Where ManagerAlias IS NOT NULL