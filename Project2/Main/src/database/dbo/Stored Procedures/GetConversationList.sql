Create PROCEDURE [dbo].[GetConversationList]        
 @employeeManagerAliases NVARCHAR(MAX),    
 @requestFrom NVARCHAR(50)    
AS          
BEGIN    
 DECLARE @employeeManagerAliasList TABLE (EmployeeManagerAlias NVARCHAR(100));              
            
   INSERT INTO @employeeManagerAliasList              
    SELECT value FROM STRING_SPLIT(@employeeManagerAliases, ',');    
    
        SELECT    
  A.[IC] AS icAlias,    
  A.[IC_FullName] AS [IC_FullName],    
  A.[CY_ManagerAlias],    
  A.[CY_ManagerFullName],    
  A.[CY_Org],    
  A.[CY_RoleSummary],    
  A.[CY_Q1],    
  A.[CY_Q2],    
  A.[CY_CareerStage],    
  A.[CY_IncentivePlan],    
  A.[CY_CostCenter],    
  A.[FY_ManagerAlias],    
  A.[FY_ManagerFullName],    
  A.[FY_Org],    
  A.[FY_RoleSummary],    
  A.[FY_Q1],    
  A.[FY_Q2],    
  A.[FY_IncentivePlan],    
  A.[FY_CostCenter],    
  A.[FY_CareerStage],    
  A.[FYManagerChange],    
  B.[R1_ConversationStatus],    
  B.[R1_EDMValidation],    
  B.[R2_ConversationStatus],    
  B.[R2_EDMValidation],      
  SendingFormatingStatus = CASE WHEN B.[R1_Conversationstatus] = 'Completed' THEN 'Completed' ELSE 'Pending' END,    
  ReceivingFormatingStatus = CASE WHEN B.[R2_Conversationstatus] = 'Completed' THEN 'Completed' ELSE 'Pending' END,    
  CASE WHEN A.[IsConversationRequired] = 1 THEN 'Required' ELSE 'Optional' END AS [Conversation],    
  CASE WHEN FYMC.[status] IS NULL THEN CAST(0 AS BIT) ELSE CAST(1 AS BIT) END AS HasActiveFutureManagerRequest,    
  CASE WHEN TxC.[status] IS NULL THEN CAST(0 AS BIT) ELSE CAST(1 AS BIT) END AS HasActiveTaxonomyManagerRequest,
  CASE WHEN SD.[ReviewStatus] = 'Approved' THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END AS IsEmployeeRecordApproved, 
  FYMC.[createdBy] AS FutureManagerRequestSubmittedBy,  
  TxC.[createdBy] AS TaxonomyCorrectionRequestSubmittedBy    
  
 FROM [HR].[Tbl_HRData] A WITH (NOLOCK)    
 LEFT JOIN [HR].[Tbl_HRData_ToolInput] B WITH (NOLOCK) ON A.IC = B.IC    
 LEFT JOIN [HR].Tbl_HRData_FYManagerCorrection FYMC WITH (NOLOCK) ON A.IC = FYMC.icAlias AND FYMC.isActive = 1 AND FYMC.status not in ('Approved','Rejected')  
 LEFT JOIN (  
    SELECT *, ROW_NUMBER() OVER(PARTITION BY icAlias ORDER BY modifieddate DESC) as rn  
    FROM [HR].Tbl_HRData_TaxonomyCorrection  
    WHERE isActive = 1 AND status not in ('Approved','Rejected')  
 ) TxC ON A.IC = TxC.icAlias AND TxC.rn = 1  
  LEFT JOIN [HR].Tbl_Seller_Details SD WITH (NOLOCK) ON A.IC = Sd.Alias
 WHERE (@requestFrom = 'sendstay' AND A.[CY_ManagerAlias] IN (SELECT EmployeeManagerAlias FROM @employeeManagerAliasList))     
 OR (@requestFrom = 'receive' AND A.[FY_ManagerAlias] IN (SELECT EmployeeManagerAlias FROM @employeeManagerAliasList))    
END