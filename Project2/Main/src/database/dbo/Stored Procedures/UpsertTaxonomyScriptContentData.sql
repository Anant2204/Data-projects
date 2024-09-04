CREATE PROCEDURE [dbo].[UpsertTaxonomyScriptContentData]              
    @ID INT,              
    @cyOrg NVARCHAR(40),              
    @cyRoleSummary NVARCHAR(50),              
    @cyQ1 NVARCHAR(50),              
    @cyQ2 NVARCHAR(50),              
    @fyOrg NVARCHAR(40),              
    @fyRoleSummary NVARCHAR(50),              
    @fyQ1 NVARCHAR(50),              
    @fyQ2 NVARCHAR(50),    
	@cyIncentivePlan NVARCHAR(50),
    @fyIncentivePlan NVARCHAR(50),
    @content NVARCHAR(MAX),              
    @status NVARCHAR(50),              
    @title NVARCHAR(500),              
    @loggedInUserAlias NVARCHAR(40),                
    @exclusions NVARCHAR(Max)              
AS              
BEGIN        
      
     BEGIN TRY    
  BEGIN TRANSACTION  
    -- Create a temporary table              
    DECLARE @ExclusionAlias TABLE (Alias NVARCHAR(Max))                            
            
    DECLARE @Date datetime= GETUTCDATE()        
    IF @exclusions IS NOT NULL              
    BEGIN              
        INSERT INTO @ExclusionAlias (Alias) SELECT value FROM STRING_SPLIT(@exclusions, ',');              
    END;              
        
    DECLARE @InsertedId INT;              
              
    IF ISNULL(@ID, 0) = 0              
    BEGIN              
        INSERT INTO [HR].[ScriptTaxonomyContent]([cyOrg],[cyRoleSummary],[cyQ1],[cyQ2],[fyOrg],[fyRoleSummary],[fyQ1],[fyQ2],[cyIncentivePlan],[fyIncentivePlan],[content],[status],[title],[createdBy],[createdDate],[modifiedBy],[modifiedDate])              
        OUTPUT Inserted.ID               
        VALUES (@cyOrg, @cyRoleSummary, @cyQ1, @cyQ2, @fyOrg, @fyRoleSummary, @fyQ1, @fyQ2,@cyIncentivePlan ,@fyIncentivePlan,@content, @status, @title, @loggedInUserAlias, @Date, @loggedInUserAlias, @Date);              
              
        SET @InsertedId = SCOPE_IDENTITY();              
              
        IF ((@exclusions IS NOT NULL AND @exclusions <> '') And @InsertedId>0)              
          BEGIN              
              
            -- Insert new exclusions           
   INSERT INTO [dbo].[ScriptExclusion]([scriptId],[alias],[isActive],[createdBy],[createdDate],[modifiedBy],[modifiedDate])         
   SELECT @InsertedId, Alias, 1, @loggedInUserAlias, @Date, @loggedInUserAlias, @Date        
   FROM @ExclusionAlias              
        END;              
    END              
                   
    ELSE              
    BEGIN              
        IF EXISTS (SELECT 1 FROM [HR].[ScriptTaxonomyContent] WHERE ID = @ID)              
        BEGIN              
                      
        UPDATE [HR].[ScriptTaxonomyContent]         
  SET [cyOrg] = @cyOrg,[cyRoleSummary] = @cyRoleSummary,[cyQ1] = @cyQ1,[cyQ2] = @cyQ2,[fyOrg] = @fyOrg ,[fyRoleSummary] = @fyRoleSummary,[fyQ1] = @fyQ1              
            ,[fyQ2] = @fyQ2,
			[cyIncentivePlan] = @cyIncentivePlan,
			[fyIncentivePlan] = @fyIncentivePlan,		
			[content] = @content,[status] = @status,[title] = @title,[modifiedBy] = @loggedInUserAlias,[modifiedDate] = @Date              
        WHERE ID = @ID;              
              
            IF (@exclusions IS NOT NULL AND @exclusions <> '')           
              BEGIN              
                   
                -- Deactivate old exclusions                        
             UPDATE [dbo].[ScriptExclusion]        
             SET isActive = 0         
             WHERE ScriptId = @ID AND isActive=1 AND Alias Not In (SELECT alias FROM @ExclusionAlias);             
            
          -- Update  exsisting  exclusions                        
             UPDATE [dbo].[ScriptExclusion]        
             SET isActive = 1         
             WHERE ScriptId = @ID AND  isActive = 0 And Alias  In (SELECT alias FROM @ExclusionAlias);        
      
             -- Insert new exclusions         
             INSERT INTO [dbo].[ScriptExclusion]([scriptId],[alias],[isActive],[createdBy],[createdDate],[modifiedBy],[modifiedDate])         
             SELECT @ID, Alias, 1, @loggedInUserAlias, @Date, @loggedInUserAlias, @Date FROM @ExclusionAlias as e       
             WHERE NOT EXISTS (SELECT 1 FROM [dbo].[ScriptExclusion] WHERE ScriptId = @ID AND Alias = e.Alias AND isActive = 1);                  
              END;                                                
			   Else
	          BEGIN
	           UPDATE [dbo].[ScriptExclusion]        
               SET isActive = 0         
               WHERE ScriptId = @ID AND isActive=1 ; 
               END;
	   END;               
    END;     
  
 COMMIT  
    END TRY    
     BEGIN CATCH    
       -- Rollback the transaction if there was an error  
        ROLLBACK;  
  throw;  
        -- Re-throw the error  
  END CATCH    
END;