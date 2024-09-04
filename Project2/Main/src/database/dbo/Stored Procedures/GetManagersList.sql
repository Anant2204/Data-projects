/*
This stored procedure is used to get the list of managers in the hierarchy for the logged in user based on the roles assigned to the user.
It takes the logged in user alias, complete view and roles list as input parameters.
It returns the list of managers for the logged in user based on the roles assigned to the user.
*/
CREATE PROCEDURE [dbo].[getManagersList]      
 @loggedInUserAlias NVARCHAR(200),      
 @completeView BIT,      
 @rolesList NVARCHAR(100)      
AS      
BEGIN      
    DECLARE @roles TABLE (value NVARCHAR(100));    
    INSERT INTO @roles    
    SELECT value FROM STRING_SPLIT(@rolesList, ',');    
    DECLARE @managers TABLE (ManagerAlias NVARCHAR(50), FullName NVARCHAR(300), IsDefaultSelection BIT DEFAULT 0)    
    DECLARE @defaultSelection NVARCHAR(100);   
  
    -- Handle 'Admin' role  
    IF EXISTS (SELECT 1 FROM @roles WHERE value = 'Admin') BEGIN    
		
		SELECT @defaultSelection = Manager FROM (SELECT TOP 1 Manager FROM hr.tbl_orgleader ORDER BY Manager ASC) AS subquery   
		IF(@completeView = 1)
		BEGIN
			INSERT INTO @managers (ManagerAlias, FullName)    
			SELECT DISTINCT [v].[DirectManagerAlias] AS [ManagerAlias], [v].DirectManagerFullName as FullName    
			FROM [HR].[Dim_Managerhierarchy] AS [v]    
			INNER JOIN hr.tbl_orgleader AS ol ON [v].[ManagerAlias] = ol.Manager  
		End
		ELSE
		BEGIN
		
		    SELECT @defaultSelection = Manager FROM (SELECT TOP 1 Manager FROM hr.tbl_orgleader ORDER BY Manager ASC) AS subquery 
			
			INSERT INTO @managers (ManagerAlias, FullName) 
			SELECT DISTINCT [v].[DirectManagerAlias] AS [ManagerAlias], [v].DirectManagerFullName as FullName    
			FROM HR.tbl_orgleader AS ol 
			INNER JOIN [HR].[Dim_Managerhierarchy] AS [v] ON [v].[ManagerAlias] = ol.Manager
			Where (v.ManagerLevel = 1 Or v.ManagerLevel = 2) 
		END

    END    
    -- Handle 'EDM Lead' role  
   IF EXISTS (SELECT 1 FROM @roles WHERE value = 'EDM Lead') BEGIN  
   
		SELECT @defaultSelection = Org_Leader FROM (SELECT TOP 1 Org_Leader FROM dbo.mct_edmapprovers where MCT_EDM_Data_Keeper_Alias = @loggedInUserAlias ORDER BY Org_Leader ASC) AS subquery   

		IF(@completeView = 1)
		BEGIN
			INSERT INTO @managers (ManagerAlias, FullName)    
			SELECT DISTINCT [v].[DirectManagerAlias] AS [ManagerAlias], [v].[DirectManagerFullName] AS FullName    
			FROM dbo.mct_edmapprovers AS ea    
			INNER JOIN [HR].[Dim_Managerhierarchy] AS [v] ON [v].[ManagerAlias] = ea.Org_Leader  
			WHERE ea.MCT_EDM_Data_Keeper_Alias = @loggedInUserAlias  
			EXCEPT
			SELECT ManagerAlias, FullName FROM @managers
		END
		ELSE
		BEGIN
			SELECT @defaultSelection = Org_Leader from (Select top (1) Org_Leader from  dbo.mct_edmapprovers WHERE MCT_EDM_Data_Keeper_Alias = @loggedInUserAlias ORDER BY Org_Leader ASC) as subquery

			INSERT INTO @managers (ManagerAlias, FullName)  
			SELECT DISTINCT [v].[DirectManagerAlias] AS [ManagerAlias], [v].DirectManagerFullName as FullName    
			FROM dbo.mct_edmapprovers as ea
			INNER JOIN [HR].[Dim_Managerhierarchy] AS [v] ON [v].[ManagerAlias] = ea.Org_Leader
			Where (v.ManagerLevel = 1 Or v.ManagerLevel = 2) AND ea.MCT_EDM_Data_Keeper_Alias = @loggedInUserAlias
			EXCEPT
			SELECT ManagerAlias, FullName FROM @managers
		END
    END    
  
    -- Handle 'Delegate' role  
    IF EXISTS (SELECT 1 FROM @roles WHERE value = 'Delegate') BEGIN    

		SELECT @defaultSelection = Manager FROM (SELECT TOP 1 Manager FROM hr.Tbl_Proxy WHERE Proxy LIKE '%' + CONCAT('@', @loggedInUserAlias, '@') + '%' ORDER BY Manager ASC) AS subquery   
        
		IF(@completeView = 1)
		BEGIN
			INSERT INTO @managers (ManagerAlias, FullName)    
			SELECT DISTINCT [v].[DirectManagerAlias] AS [ManagerAlias], [v].[DirectManagerFullName] AS FullName    
			FROM [HR].[Dim_Managerhierarchy] AS [v]    
			INNER JOIN hr.Tbl_Proxy AS p ON [v].[ManagerAlias] = p.Manager  
			WHERE p.Proxy LIKE '%' + CONCAT('@', @loggedInUserAlias, '@') + '%' 
			EXCEPT
			SELECT ManagerAlias, FullName FROM @managers
		END
		ELSE
		BEGIN
			
			INSERT INTO @managers (ManagerAlias, FullName)   
			SELECT DISTINCT [v].[DirectManagerAlias] AS [ManagerAlias],[V].DirectManagerFullName as FullName    
			FROM [HR].[Dim_Managerhierarchy] AS [v] 
			INNER JOIN HR.Tbl_Proxy AS p ON [v].[ManagerAlias] = p.Manager  
			WHERE (v.ManagerLevel = 1 or v.ManagerLevel = 2)
			and p.Proxy LIKE '%' + CONCAT('@', @loggedInUserAlias, '@') + '%'
			EXCEPT
			SELECT ManagerAlias, FullName FROM @managers
		END
    END    
  
    -- Handle 'Manager' role  
    IF EXISTS (SELECT 1 FROM @roles WHERE value = 'Manager') BEGIN    
        SET @defaultSelection = @loggedInUserAlias    

		IF(@completeView = 1)
		BEGIN
			INSERT INTO @managers (ManagerAlias, FullName)    
			SELECT DISTINCT [v].[DirectManagerAlias] AS [ManagerAlias], [v].[DirectManagerFullName] As FullName    
			FROM [HR].[Dim_Managerhierarchy] AS [v]    
			WHERE [v].[ManagerAlias] = @loggedInUserAlias  
			EXCEPT
			SELECT ManagerAlias, FullName FROM @managers
		END
		ELSE
		BEGIN

			SELECT @defaultSelection = @loggedInUserAlias;
			
			INSERT INTO @managers (ManagerAlias, FullName)   
			SELECT DISTINCT [v].[DirectManagerAlias] AS [ManagerAlias], [v].DirectManagerFullName as FullName    
			FROM [HR].[Dim_Managerhierarchy] AS [v]  
			where (v.ManagerLevel = 1 OR v.ManagerLevel = 2) AND v.ManagerAlias = @loggedInUserAlias 
			EXCEPT
			SELECT ManagerAlias, FullName FROM @managers
		END
    END    
   
   
    -- Update the IsDefaultSelection column for the default selection  
    UPDATE @managers SET IsDefaultSelection = 1 WHERE ManagerAlias = @defaultSelection  
  
    -- Return the result set  
    SELECT ManagerAlias, FullName, IsDefaultSelection FROM @managers      
END