Create PROCEDURE [dbo].[FyManagerTwoLevelApprovalRequired]  
@employeeAlias nvarchar(50)  
AS  
BEGIN  
  
DECLARE @isTwoLevelApprovalRequired BIT  
  
SELECT @isTwoLevelApprovalRequired = CASE WHEN (Reports_To_Level_1_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE TwoLevelApprovalRequired=1)  
 OR Reports_To_Level_2_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE TwoLevelApprovalRequired=1)  
 OR Reports_To_Level_3_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE TwoLevelApprovalRequired=1)  
 OR Reports_To_Level_4_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE TwoLevelApprovalRequired=1)  
 OR Reports_To_Level_5_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE TwoLevelApprovalRequired=1)  
 OR Reports_To_Level_6_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE TwoLevelApprovalRequired=1)  
    OR Reports_To_Level_7_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE TwoLevelApprovalRequired=1))  
    THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END   
    FROM [HR].[tbl_hrdata]   
    WHERE IC = @employeeAlias  
  
 select @isTwoLevelApprovalRequired   as TwoLevelApprovalRequired
END  