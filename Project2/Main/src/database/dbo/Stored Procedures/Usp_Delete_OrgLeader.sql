/*** SP created by tanmay on 22/02/2024 as part of task 960812 to delete an org leader ****/
CREATE PROCEDURE [dbo].[Usp_Delete_OrgLeader]
    @org_leader NVARCHAR(50)
    
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @ManagerRoleId INT;
        DECLARE @EDMLeadRole INT;

        -- Get the role ID for 'Manager'
        SELECT @ManagerRoleId = id FROM dbo.[role] WHERE name = 'Manager';

        -- Get the role ID for 'EDM Lead'
        SELECT @EDMLeadRole = id FROM dbo.[role] WHERE name = 'EDM Lead';

        -- Delete the org leader from [dbo].[MCT_EDMApprovers] since org leader here is FK to org_leader in tbl_orgleader table 
        DELETE FROM [dbo].[MCT_EDMApprovers]
        WHERE org_leader = @org_leader;

        -- Delete the org leader from hr.tbl_orgleader 
        IF EXISTS (SELECT 1 FROM hr.tbl_orgleader WHERE Manager = @org_leader)
        BEGIN 
            DELETE FROM hr.tbl_orgleader
            WHERE Manager = @org_leader;
            SELECT 'Orgleader ' + @org_leader + ' and associated unique EDM leads deleted successfully';
        END
        ELSE 
        BEGIN 
            SELECT 'Orgleader ' + @org_leader + ' not present';
        END

        -- Remove the org leader from dbo.[userrole] table
        DELETE FROM dbo.[userrole]
        WHERE alias = @org_leader AND roleid = @ManagerRoleId;

        -- Check if the user has any other role
        IF NOT EXISTS (SELECT 1 FROM dbo.[userrole] WHERE alias = @org_leader)
        BEGIN
            -- Delete the user from dbo.[user] table
            DELETE FROM dbo.[user]
            WHERE alias = @org_leader;
        END

        -- Delete the related EDM lead role if the edm lead is not present for any other org leader 
        DELETE FROM [dbo].[userrole] 
        WHERE roleid = @EDMLeadRole AND 
        alias NOT IN (SELECT DISTINCT MCT_EDM_Data_Keeper_alias
                      FROM [dbo].[MCT_EDMApprovers]);

        -- Cleanup orphaned records from user table which are not present in userrole table 
        DELETE FROM [dbo].[user] WHERE alias NOT IN (SELECT DISTINCT ALIAS FROM DBO.USERROLE);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
			--COMMIT TRANSACTION--Added this line to commit the transaction after rolling it back
        END
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
		DECLARE @ErrorState INT = ERROR_STATE();
		RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);;
    END CATCH;
END