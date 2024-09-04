
CREATE Procedure [dbo].[EDMApproversmappingwithManagers]
AS
BEGIN
DROP TABLE [dbo].[MCT_EDMAppoversmapping_Staging]
select distinct Area_Segment,Org_Leader,
--IC,
MCT_EDM_Data_Keeper_Alias,ManagerAlias
--,AdditionalUser1,AdditionalUser2,AdditionalUser3,AdditionalUser4 
INTO [dbo].[MCT_EDMAppoversmapping_Staging]
 from   [dbo].[MCT_EDMApprovers] A
 JOIN [HR].[Dim_Managerhierarchy_Staging] B
ON A.Org_Leader=B.ManagerAlias

END