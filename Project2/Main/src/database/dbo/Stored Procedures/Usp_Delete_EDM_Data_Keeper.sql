CREATE PROCEDURE [dbo].[Usp_Delete_EDM_Data_Keeper] 
    @MCT_EDM_Data_Keeper_alias NVARCHAR(50),
    @org_leader NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    BEGIN TRY
        BEGIN TRANSACTION;
    DECLARE @EDMLeadRole INT
    -- Get the role ID for 'EDM Lead'
    SELECT @EDMLeadRole = id FROM dbo.[role] WHERE name = 'EDM Lead'
    -- Delete from [dbo].[MCT_EDMApprovers]  if it exists 
	IF  EXISTS (
        SELECT 1 FROM [dbo].[MCT_EDMApprovers] WHERE MCT_EDM_Data_Keeper_alias = @MCT_EDM_Data_Keeper_alias AND org_leader = @org_leader)
	BEGIN 
    DELETE FROM [dbo].[MCT_EDMApprovers] 
    WHERE MCT_EDM_Data_Keeper_alias = @MCT_EDM_Data_Keeper_alias 
    AND org_leader = @org_leader  
	Select 'EDM lead ' +@MCT_EDM_Data_Keeper_alias + ' tagged to org_leader ' + @org_leader + ' deleted successfully'
	END
	ELSE 
	BEGIN
	Select  'EDM lead ' +@MCT_EDM_Data_Keeper_alias + ' does not exist in the table '
    END
    -- Check if the MCT_EDM_Data_Keeper_alias exists for any other org_leader in [dbo].[MCT_EDMApprovers]
    IF NOT EXISTS (
        SELECT 1 
        FROM [dbo].[MCT_EDMApprovers] 
        WHERE MCT_EDM_Data_Keeper_alias = @MCT_EDM_Data_Keeper_alias 
        AND org_leader <> @org_leader
    )
    BEGIN
        -- Delete from [dbo].[userrole]
        DELETE FROM [dbo].[userrole] 
        WHERE alias = @MCT_EDM_Data_Keeper_alias 
        AND roleid = @EDMLeadRole
        -- Check if the alias exists in [dbo].[userrole] with other roles
        IF NOT EXISTS (SELECT 1 FROM [dbo].[userrole] WHERE alias = @MCT_EDM_Data_Keeper_alias)
        BEGIN
            -- Delete from [dbo].[user] if no other roles exist
            DELETE FROM [dbo].[user] WHERE alias = @MCT_EDM_Data_Keeper_alias
        END
        ELSE
        BEGIN
            -- Show message if other roles exist for the user
            SELECT 'User not deleted from user table since other roles exist for user'
        END
    END

            COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
		DECLARE @ErrorState INT = ERROR_STATE();
		RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);;
    END CATCH;
END
GO