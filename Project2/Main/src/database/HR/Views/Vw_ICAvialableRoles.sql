


CREATE View [HR].[Vw_ICAvialableRoles] AS

With A AS (
select IC, cs.Value As [Role]
from HR.Tbl_ICRoleSelection
cross apply STRING_SPLIT (AvialableFutureRoles, ',') cs
)
SELECT IC, [Role] , [Role Definition] =  'Go to Field Commercial Planning Portal to learn more about this role'   FROM A