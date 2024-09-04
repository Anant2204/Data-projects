CREATE PROCEDURE   [dbo].[Usp_Delete_Script_Contributor] 
    @alias NVARCHAR(50)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION

        DECLARE @roleid INT

        -- Get the roleid for 'Script Contributor'
        SELECT @roleid = id FROM dbo.[role] WHERE name = 'Script Contributor'

        -- Delete the alias from dbo.[userrole] where roleid = @roleid
        DELETE FROM dbo.[userrole] WHERE alias = @alias AND roleid = @roleid

        -- Check if the alias exists in dbo.[userrole] with other roleid than @roleid
        IF NOT EXISTS (SELECT 1 FROM dbo.[Userrole] WHERE alias = @alias AND roleId <> @roleid)
        BEGIN
            -- Delete the alias from dbo.[user] if no other role exists in dbo.[userrole]
            DELETE FROM dbo.[user] WHERE alias = @alias
        END

        COMMIT

		SELECT  'Script Contributor has been removed '
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if there was an error
        ROLLBACK;

        -- Re-throw the error
		THROW;
    END CATCH
END