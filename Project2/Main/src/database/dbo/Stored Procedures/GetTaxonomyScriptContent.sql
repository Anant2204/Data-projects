CREATE Procedure [dbo].GetTaxonomyScriptContent                                                                                           
AS                                              
BEGIN                                                    
                        
SELECT s.[ID]          
      ,s.[cyOrg]          
      ,s.[cyRoleSummary]          
      ,s.[cyQ1]          
      ,s.[cyQ2]          
      ,s.[fyOrg]          
      ,s.[fyRoleSummary]          
      ,s.[fyQ1]          
      ,s.[fyQ2]       
	  ,s.[cyIncentivePlan]
	  ,s.[fyIncentivePlan]
      ,s.[content]  as ScriptContent          
      ,s.[status]          
      ,s.[title]  as ScriptTitle          
      ,s.[isActive]          
      ,s.[createdBy]          
      ,s.[createdDate]          
      ,s.[modifiedBy]          
      ,s.[modifiedDate]          
      ,( SELECT STRING_AGG(DirectManagerFullName+','+ DirectManagerAlias , ';')    
        FROM (    
            SELECT DISTINCT h.DirectManagerFullName ,h.DirectManagerAlias    
            FROM dbo.scriptExclusion AS e    
            JOIN hr.Dim_Managerhierarchy AS h ON e.alias = h.DirectManagerAlias    
            WHERE s.id = e.scriptId AND e.isActive = 1 AND h.MType = 'FY'    
        ) AS distinctManagers    
  ) as exclusions            
      ,(SELECT COUNT(h.IC) from Hr.tbl_hrdata as h Where (                                             
                 (s.cyOrg = 'All' or s.cyOrg = h.Cy_Org ) and (s.cyQ1 = 'All' or s.cyQ1 = h.CY_Q1 ) and                                             
                 (s.cyQ2 = 'All' or s.cyQ2 = h.CY_Q2  ) and (s.cyRoleSummary = 'All' or s.cyRoleSummary = h.CY_RoleSummary ) 
                 and (s.cyIncentivePlan = 'All' or s.cyIncentivePlan = h.CY_IncentivePlan)
                 and (s.fyIncentivePlan = 'All' or s.fyIncentivePlan = h.FY_IncentivePlan)                        
                  and  (s.FyQ1 = 'All' or s.FyQ1 = h.FY_Q1 ) and (s.FyQ2 = 'All' or s.FyQ2 = h.FY_Q2) and                                            
                 (s.fyRoleSummary = 'All' or s.fyRoleSummary = h.FY_RoleSummary  ) and(s.fyOrg = 'All' or s.fyOrg = h.FY_Org )                                         
                   ) and NOT Exists( SELECT 1  FROM dbo.scriptExclusion as e where  e.scriptId = s.id and e.isActive=1 and alias    
        IN (select ManagerAlias from Hr.Dim_Managerhierarchy where ic=h.Ic and MType='FY'))    
       ) as scriptAppliedEmployeesCount         
  FROM [HR].[ScriptTaxonomyContent] as s        
  Order by s.cyOrg,s.cyRoleSummary,s.cyQ1,s.cyQ2,s.fyOrg,s.fyRoleSummary,s.fyQ1,s.fyQ2      
END 