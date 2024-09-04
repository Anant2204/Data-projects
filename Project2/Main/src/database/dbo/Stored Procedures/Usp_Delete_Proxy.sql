create      PROCEDURE [dbo].[Usp_Delete_Proxy]
    @ManagerAlias NVARCHAR(50),
    @ProxyAlias NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @ProxyRoleId INT;
        DECLARE @ManagerRoleId INT;

        -- Get the role IDs for 'Delegate' and 'Manager' in a single query
        SELECT 
            @ProxyRoleId = CASE WHEN name = 'Delegate' THEN id END,
            @ManagerRoleId = CASE WHEN name = 'Manager' THEN id END
               FROM dbo.[role]
               WHERE name IN ('Delegate', 'Manager');

        -- Delete the proxy from hr.tbl_proxy for the specified manager if it exists 
       IF EXISTS (SELECT 1 FROM [HR].[TBL_Proxy] WHERE Manager = @ManagerAlias)
       BEGIN
          DECLARE @CurrentProxy NVARCHAR(MAX);
          SELECT @CurrentProxy = Proxy FROM [HR].[TBL_Proxy] WHERE Manager = @ManagerAlias;

          DECLARE @UpdatedProxy NVARCHAR(MAX);
          SET @UpdatedProxy = REPLACE(',' + @CurrentProxy + ',', ',@' + @ProxyAlias + '@,', ',');


            IF @UpdatedProxy = ',' OR @UpdatedProxy = ',,'
            BEGIN
                -- Delete the entire row if there is only one proxy left
                DELETE FROM hr.tbl_proxy
                WHERE Manager = @ManagerAlias;
                SELECT 'Proxy ' + @ProxyAlias + ' deleted successfully along with  manager ' + @ManagerAlias;
            END
            ELSE IF EXISTS  (SELECT 1  FROM [HR].[TBL_Proxy] WHERE  Proxy  LIKE '%@' + @ProxyAlias + '@%'  AND Manager =  @ManagerAlias)
            BEGIN
                -- Update the proxy column if there are multiple proxies
                --SET @UpdatedProxy = STUFF(@UpdatedProxy, 1, 1, '');
                --SET @UpdatedProxy = STUFF(@UpdatedProxy, LEN(@UpdatedProxy), 1, '');
                SET @UpdatedProxy = LTRIM(RTRIM(@UpdatedProxy, ','), ',');
                
                UPDATE hr.tbl_proxy
                SET Proxy = @UpdatedProxy
                WHERE Manager = @ManagerAlias;
                SELECT 'Proxy ' + @ProxyAlias + ' deleted  successfully for manager ' + @ManagerAlias;
            END
            ELSE
            BEGIN
                -- Proxy and manager both dont exist 
                SELECT 'Proxy ' + @ProxyAlias + ' does not exist for manager ' + @ManagerAlias;
            END
        END
      ELSE
       BEGIN
            --Proxy does not exist for the specified manager
           SELECT 'Proxy ' + @ProxyAlias + ' and  manager ' + @ManagerAlias + ' does not exist ';
       END

        -- Check if the proxy is not a proxy to any other manager
        IF NOT EXISTS (SELECT 1  FROM [HR].[TBL_Proxy] WHERE  Proxy  LIKE '%@' + @ProxyAlias + '@%')
        BEGIN
            -- Remove the proxy from dbo.[userrole] table
            DELETE FROM dbo.[userrole]
            WHERE alias = @proxyAlias AND roleid = @ProxyRoleId;

            -- Check if the user has any other role
            IF NOT EXISTS (SELECT 1 FROM dbo.[userrole] WHERE alias = @proxyAlias)
            BEGIN
                -- Delete the user from dbo.[user] table
                DELETE FROM dbo.[user]
                WHERE alias = @proxyAlias;
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
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;
END