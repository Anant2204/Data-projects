Create     PROCEDURE [dbo].[Usp_Insert_Proxy]
    @ManagerAlias NVARCHAR(50),
    @ProxyAlias NVARCHAR(50)
AS
BEGIN
    DECLARE @ProxyRole INT
    SELECT @ProxyRole = id  FROM dbo.[role] WHERE name = 'Delegate'
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        IF EXISTS (SELECT 1 FROM [HR].[TBL_Proxy] WHERE Manager = @ManagerAlias)
        BEGIN
            IF NOT EXISTS (SELECT 1  FROM [HR].[TBL_Proxy] WHERE  Proxy  LIKE '%@' + @ProxyAlias + '@%' AND Manager =  @ManagerAlias)
            BEGIN
                UPDATE [HR].[TBL_Proxy]
                SET Proxy = Proxy + ',@' + @ProxyAlias+'@'
                WHERE Manager = @ManagerAlias;
                SELECT 'Proxy ' + @ProxyAlias +' Added successfully for manager ' +@ManagerAlias
            END
            ELSE 
                SELECT 'Proxy ' + @ProxyAlias +' Already exists for manager ' +@ManagerAlias
        END
        ELSE
        BEGIN
        --insert manager and proxy into the table
            INSERT INTO [HR].[TBL_Proxy] (Manager, Proxy)
            VALUES (@ManagerAlias, '@' + @ProxyAlias + '@');
            SELECT 'Proxy ' + @ProxyAlias +' Added successfully along with  manager ' +@ManagerAlias
        END

        IF NOT EXISTS (SELECT 1 FROM [dbo].[user] WHERE alias = @ProxyAlias)
        BEGIN
            INSERT INTO [dbo].[user] (alias, isactive)
            VALUES (@ProxyAlias, 1)
        END

        -- Insert into [dbo].[userrole] if not already exists
        IF NOT EXISTS (SELECT 1 FROM [dbo].[userrole] WHERE alias = @ProxyAlias AND roleid = @ProxyRole)
        BEGIN
            INSERT INTO [dbo].[userrole] (alias, roleid, isactive, source)
            VALUES (@ProxyAlias, @ProxyRole, 1, 'MCT')
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END