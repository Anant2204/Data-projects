CREATE Procedure [dbo].[FYManagerCorrectionsApprovalAccess]                            
@loggedInUserAlias NVARCHAR(200),                                    
@icAliases nvarchar(max),                            
@rolesList NVARCHAR(100)                                    
as                            
Begin
  BEGIN TRY                                
    DECLARE @icAccess TABLE (icAlias NVARCHAR(50), hasAccess bit DEFAULT 0, TwoLevelApprovalRequired BIT DEFAULT 0)                              
    DECLARE @accessGranted BIT=0              
    DECLARE @roles TABLE (value NVARCHAR(100));               

    INSERT INTO @roles                                  
    SELECT value FROM STRING_SPLIT(@rolesList, ',');              

    DECLARE @managers TABLE (ManagerAlias NVARCHAR(50))              

    INSERT INTO @icAccess ([icAlias])                          
    SELECT value FROM STRING_SPLIT(@icAliases, ',');               


    --Check Commom validation       
    IF  (EXISTS (SELECT 1 FROM @roles WHERE value = 'EDM Lead') and EXISTS (SELECT 1 FROM @roles WHERE value In( 'Manager','Delegate')))      
    Begin      
      --update 0       
      select @accessGranted as accessGranted       
      return      
    End      
    IF  ((SELECT COUNT(*) FROM @roles WHERE value = 'Admin') >0 and (SELECT COUNT(*) FROM @roles)=1)      
    Begin      
     --update 0       
     select @accessGranted as accessGranted       
     return      
    End      
      
    IF Exists (SELECT 1 FROM @roles WHERE value in('Manager','Delegate'))      
    Begin      
      IF EXISTS(SELECT 1               
        FROM [HR].Tbl_HRData_FYManagerCorrection               
        WHERE icAlias IN (SELECT icAlias FROM @icAccess) and [status] = 'Interim Approved')      
        Begin      
          --update 0      
          select @accessGranted as accessGranted       
          return      
        end      
    End      
          
   --update its level      
    UPDATE a              
    SET a.TwoLevelApprovalRequired = r.TwoLevelApprovalRequired              
    FROM @icAccess a              
    INNER JOIN  [HR].Tbl_HRData_FYManagerCorrection r ON a.icAlias = r.icAlias         
       
  ---edm Lead                            
    IF EXISTS (SELECT 1 FROM @roles WHERE value = 'EDM Lead')                            
    BEGIN        
      
	  UPDATE a                
       SET a.hasAccess = 1      
       FROM @icAccess a         
      where icAlias in( select icAlias   FROM [HR].Tbl_HRData_FYManagerCorrection     
                   where  [status] = 'Interim Approved' and TwoLevelApprovalRequired=1  
                   and icAlias IN (SELECT icAlias FROM @icAccess)  
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
      AND a.icAlias IN (              
          SELECT icAlias              
          FROM [HR].Tbl_HRData_FYManagerCorrection              
          WHERE (fyCorrectManagerAlias = @loggedInUserAlias) and [status] = 'Pending Approval'               
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
      AND a.icAlias IN (              
          SELECT icAlias              
          FROM [HR].Tbl_HRData_FYManagerCorrection              
      WHERE fyCorrectManagerAlias IN (              
              SELECT ManagerAlias               
              FROM @managers              
          )   and [status] = 'Pending Approval'          
      )                            
    End            
        
    if NOT EXISTS ( SELECT 1 from @icAccess where hasAccess = 0)              
        SET @accessGranted = 1              
        select @accessGranted  as accessGranted   

  END TRY
  BEGIN CATCH
    THROW;
  END CATCH         
END