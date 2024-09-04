/*  
This stored procedure checks the logged in user has access to the selected manager or not.  
It takes the logged in user alias, selected manager aliases and roles list as input parameters.  
It returns 1 if the logged in user has access to the selected manager, otherwise it returns 0.  
*/  
CREATE PROCEDURE [dbo].[CheckUserAccessForSelectedManager]          
 @loggedInUserAlias NVARCHAR(100),          
 @selectedManagerAliases NVARCHAR(100),          
 @rolesList NVARCHAR(MAX)      
AS          
BEGIN          
                   
    DECLARE @roles TABLE (value NVARCHAR(100));

    INSERT INTO @roles          
    SELECT value FROM STRING_SPLIT(@rolesList, ',');         
         
    IF NOT EXISTS (          
        SELECT 1
        FROM @roles
    )          
    BEGIN          
        select 0 as HasAccess      
        RETURN;          
    END          
         
 -- added for multiple manager          
   DECLARE @selectedManagerAliasList TABLE (SelectedManagerAlias NVARCHAR(100));            
         
   INSERT INTO @selectedManagerAliasList            
    SELECT value FROM STRING_SPLIT(@selectedManagerAliases, ',');
    
    IF EXISTS (
        SELECT 1
        FROM @roles
        WHERE value = 'Admin'
    )
    OR EXISTS (
        SELECT 1
        FROM @roles
        WHERE value = 'EDM Lead'
        AND EXISTS (
            SELECT 1
            FROM dbo.mct_edmapprovers a
            JOIN HR.Dim_Managerhierarchy v ON v.ManagerAlias = a.Org_Leader
            WHERE a.MCT_EDM_Data_Keeper_Alias = @loggedInUserAlias
            AND v.DirectManagerAlias IN (
                SELECT SelectedManagerAlias
                FROM @selectedManagerAliasList
            )
        )
    )
    OR EXISTS (
        SELECT 1
        FROM @roles
        WHERE value = 'Delegate'
        AND EXISTS (
            SELECT 1
            FROM hr.Tbl_Proxy p
            JOIN HR.Dim_Managerhierarchy v ON v.ManagerAlias = p.Manager
            WHERE p.Proxy LIKE '%' + CONCAT('@', @loggedInUserAlias, '@') + '%'
            AND v.DirectManagerAlias IN (
                SELECT SelectedManagerAlias
                FROM @selectedManagerAliasList
            )
        )
    )
    OR EXISTS (
        SELECT 1
        FROM @roles
        WHERE value = 'Manager'
        AND EXISTS (
            SELECT 1
            FROM HR.Dim_Managerhierarchy v
            WHERE v.ManagerAlias = @loggedInUserAlias
            AND v.DirectManagerAlias IN (
                SELECT SelectedManagerAlias
                FROM @selectedManagerAliasList
            )
        )
    )
    BEGIN
        SELECT 1 AS HasAccess;
        RETURN;
    END
   
  select 0 as HasAccess
  
END
GO