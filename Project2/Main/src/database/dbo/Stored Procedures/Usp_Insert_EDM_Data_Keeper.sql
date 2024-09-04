CREATE PROCEDURE [dbo].[Usp_Insert_EDM_Data_Keeper] 
    @Area_Segment NVARCHAR(50),
    @Org_leader NVARCHAR(50),
    @MCT_EDM_Data_Keeper_alias NVARCHAR(50)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @EDMLeadRole INT
        SELECT @EDMLeadRole = id FROM dbo.[role] WHERE name = 'EDM Lead'

        IF NOT EXISTS (SELECT 1 FROM hr.tbl_orgleader WHERE MANAGER = @Org_leader)
        BEGIN
            Select  'Org Leader not present in Org leader table, cannot add an EDM lead for selected org leader'
            RETURN
        END

        IF EXISTS (SELECT 1 FROM [dbo].[MCT_EDMApprovers] WHERE org_leader = @Org_leader and  Area_Segment=@Area_Segment and  MCT_EDM_Data_Keeper_alias=@MCT_EDM_Data_Keeper_alias)
        BEGIN
            SELECT 'EDM lead already present'
        END
        ELSE 
        BEGIN
            INSERT INTO [dbo].[MCT_EDMApprovers] (area_segment, org_leader,MCT_EDM_Data_Keeper_alias)
            VALUES (@Area_Segment, @Org_leader,@MCT_EDM_Data_Keeper_alias)
            select 'EDM lead ' +  @mct_edm_data_keeper_alias + ' added for org leader ' + @Org_leader
        END

        IF NOT EXISTS (SELECT 1 FROM [dbo].[user] WHERE alias = @MCT_EDM_Data_Keeper_alias)
        BEGIN
             
            INSERT INTO [dbo].[user] (alias, isactive)
            VALUES (@MCT_EDM_Data_Keeper_alias, 1)
        END

        -- Insert into [dbo].[userrole] if not already exists
        IF NOT EXISTS (SELECT 1 FROM [dbo].[userrole] WHERE alias = @MCT_EDM_Data_Keeper_alias AND roleid = @EDMLeadRole)
        BEGIN
            INSERT INTO [dbo].[userrole] (alias, roleid, isactive, source)
            VALUES (@MCT_EDM_Data_Keeper_alias, @EDMLeadRole, 1, 'MCT')
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO