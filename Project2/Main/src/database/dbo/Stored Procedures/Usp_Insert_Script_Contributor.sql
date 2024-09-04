CREATE  PROCEDURE [dbo].[Usp_Insert_Script_Contributor]
    @alias NVARCHAR(50)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Check if the alias already exists in dbo.[user]
        IF NOT EXISTS (SELECT 1 FROM dbo.[user] WHERE alias = @alias)
        BEGIN
            INSERT INTO dbo.[user] (alias, isactive)
            VALUES (@alias, 1);
        END
         
		 ELSE 
          SELECT 'Selected Script Contributor ' + @alias + ' is already added';
     
        -- Check if the alias already exists in dbo.[userrole]
        -- Find the roleid from dbo.[role] where name = 'Script Contributor'
        DECLARE @roleid INT;
        SELECT @roleid = id FROM dbo.[role] WHERE name = 'Script Contributor';
        IF NOT EXISTS (SELECT 1 FROM dbo.[userrole] WHERE alias = @alias AND roleid = @roleid)
        BEGIN
            -- Insert the alias into dbo.[userrole]
            INSERT INTO dbo.[userrole] (roleid, isactive, alias, source)
            VALUES (@roleid, 1, @alias, 'MCT');
			SELECT 'Script contributor ' + @alias + ' added successfully';
        END

        COMMIT TRANSACTION
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK;
        END
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END;
