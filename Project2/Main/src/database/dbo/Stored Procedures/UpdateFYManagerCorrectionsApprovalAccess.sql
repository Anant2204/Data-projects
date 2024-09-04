Create Procedure [dbo].[UpdateFYManagerCorrectionsApprovalAccess]                                  
@loggedInUserAlias NVARCHAR(200),                                          
@id varchar(max),                                  
@rolesList NVARCHAR(100)                                          
as                                  
Begin
    BEGIN TRY                                       
      DECLARE @icAccess TABLE (id int , hasAccess bit DEFAULT 0, TwoLevelApprovalRequired BIT DEFAULT 0)                                    
      DECLARE @roles TABLE (value NVARCHAR(100));                     
      INSERT INTO @roles                                        
      SELECT value FROM STRING_SPLIT(@rolesList, ',');                    
      DECLARE @managers TABLE (ManagerAlias NVARCHAR(50))                    
      INSERT INTO @icAccess (id)                                
      SELECT value FROM STRING_SPLIT(@id, ',');                     

      --Check Commom validation             
       IF  (EXISTS (SELECT 1 FROM @roles WHERE value = 'EDM Lead') and EXISTS (SELECT 1 FROM @roles WHERE value In( 'Manager','Delegate')))            
       Begin            
        --update 0          
        select id,hasAccess from @icAccess      
          return            
       End            
       IF  (EXISTS (SELECT 1 FROM @roles WHERE value = 'Admin') and (SELECT COUNT(*) FROM @roles)=1)            
       Begin            
        select id,hasAccess from @icAccess      
          return                  
       End               
       --update its level            
        UPDATE a                    
        SET a.TwoLevelApprovalRequired = r.TwoLevelApprovalRequired                    
        FROM @icAccess a                    
        INNER JOIN  [HR].Tbl_HRData_FYManagerCorrection r ON a.id = r.id               
      ---edm Lead                                  
        IF EXISTS (SELECT 1 FROM @roles WHERE value = 'EDM Lead')                                  
        BEGIN              
         UPDATE a                
           SET a.hasAccess = 1      
           FROM @icAccess a         
          where id in( select id   FROM [HR].Tbl_HRData_FYManagerCorrection     
                       where  [status] = 'Interim Approved' and TwoLevelApprovalRequired=1  
                       and id IN (SELECT id FROM @icAccess)  
           and cyManagerAlias in( select v.DirectManagerAlias FROM dbo.mct_edmapprovers a                    
                                                 JOIN HR.Dim_Managerhierarchy v ON v.ManagerAlias = a.Org_Leader                    
                                                 WHERE a.MCT_EDM_Data_Keeper_Alias = @loggedInUserAlias ) )   
        end                        
         ---Manager                                  
        IF EXISTS (SELECT 1 FROM @roles WHERE value = 'Manager')                                  
        BEGIN             
          UPDATE a                    
          SET a.hasAccess = 1                    
          FROM @icAccess a                    
          Where a.hasAccess = 0                    
          AND a.id IN (                    
              SELECT id                    
              FROM [HR].Tbl_HRData_FYManagerCorrection                    
              WHERE (fyCorrectManagerAlias = @loggedInUserAlias)  and  [status] = 'Pending Approval'                   
              OR fyCorrectManagerAlias IN (                    
         SELECT DirectManagerAlias                     
                  FROM Hr.Dim_Managerhierarchy                     
                  WHERE ManagerAlias = @loggedInUserAlias                    
              )                    
          )                      
        END                     
        ---Proxy                                  
        IF EXISTS (SELECT 1 FROM @roles WHERE value = 'Delegate')                                  
          BEGIN                    
          DELETE FROM @managers                    
        INSERT INTO @managers (ManagerAlias)                    
          SELECT DISTINCT DirectManagerAlias                     
          FROM HR.Dim_Managerhierarchy                     
          WHERE ManagerAlias IN (                    
              SELECT Manager                     
              FROM HR.Tbl_Proxy                      
              WHERE Proxy LIKE '%' + CONCAT('@', @loggedInUserAlias, '@') + '%'                    
          )                    
          UPDATE a                    
          SET a.hasAccess = 1                    
          FROM @icAccess a                    
          WHERE a.hasAccess = 0                    
          AND a.id IN (                    
              SELECT id                    
              FROM [HR].Tbl_HRData_FYManagerCorrection                    
          WHERE fyCorrectManagerAlias IN (                    
                  SELECT ManagerAlias                     
                  FROM @managers                    
              )   and [status] = 'Pending Approval'                   
          )                                  
        End                  

        select id,hasAccess from @icAccess
    END TRY
  BEGIN CATCH
    THROW;
  END CATCH      
END