  
/****** Object:  StoredProcedure [dbo].[GetTaxonomyCorrectionRequests]    Script Date: 15-03-2024 14:12:49 ******/  
  
CREATE PROCEDURE [dbo].[GetTaxonomyCorrectionRequests]            
 @loggedInUserAlias NVARCHAR(100),            
 @completeView BIT,            
 @rolesList NVARCHAR(200)            
AS            
BEGIN         
DECLARE @managers TABLE (ManagerAlias NVARCHAR(50), FullName NVARCHAR(300), IsDefaultSelection BIT DEFAULT 0)            
INSERT INTO @managers (ManagerAlias, FullName, IsDefaultSelection)        
EXEC [dbo].[getManagersList] @loggedInUserAlias, @completeView, @rolesList        
       
SELECT         
TCR.[icAlias],        
HRD.IC_FullName as [EmployeeName],  
TCR.status as [RequestStatus],  
TCR.CreatedByUserFullName as [RequestBy],    
TCR.[createdBy] as [RequestByIcAlias],  
TCR.[createdDate] as [RequestDate],  
TCR.[comments],  
TCR.[cyManagerAlias],          
HRD.CY_ManagerFullName as [CurrentYearManager],
NULL as [Reviewer],  
TCR.[CyOrg],  
TCR.[FyOrg],  
TCR.[ProposedOrg],  
TCR.[CyRoleSummary],  
TCR.[FyRoleSummary],  
TCR.[ProposedRoleSummary],  
TCR.[CyQ1],  
TCR.[FyQ1],  
TCR.[ProposedQ1],  
TCR.[CyQ2],  
TCR.[FyQ2],  
TCR.[ProposedQ2],  
TCR.[CyCareerStage],  
TCR.[FyCareerStage],  
TCR.[ProposedCareerStage],  
TCR.[CyCostCenter],  
TCR.[FyCostCenter],  
TCR.[ProposedCostCenter],  
TCR.[FyIncentivePlan],  
TCR.[CyIncentivePlan],  
TCR.[ProposedIncentivePlan]  
FROM [HR].[Tbl_HRData_TaxonomyCorrection] TCR        
LEFT JOIN [HR].TBL_HrData HRD ON HRD.IC = TCR.icAlias  
LEFT JOIN @managers CYMGR ON TCR.cyManagerAlias = CYMGR.ManagerAlias         
LEFT JOIN @managers FYMGR ON TCR.fyManagerAlias = FYMGR.ManagerAlias              
WHERE TCR.isActive = 1 AND (CYMGR.ManagerAlias IS NOT NULL         
OR FYMGR.ManagerAlias IS NOT NULL)        
      
END  