CREATE  PROCEDURE dbo.Usp_CleanupProxyUsers
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Step 0: Insert data from HR.TBL_Proxy to HR.TBL_Proxy_Staging (existing table)
        truncate table HR.TBL_Proxy_Staging; -- to ensure duplicates are not entered 
        INSERT INTO HR.TBL_Proxy_Staging([Manager],[Proxy],[RecordModifiedDate])
        SELECT [Manager],[Proxy],[RecordModifiedDate]
        FROM HR.TBL_Proxy;

        -- Step 1: Delete orphaned records from dbo.user table which are not present in userrole table due to manual deletion in userrole tables 
        DELETE u
        FROM dbo.[user] u
        LEFT JOIN dbo.userrole ur ON u.alias = ur.alias
        WHERE ur.alias IS NULL;

        -- Step 2: Delete managers from hr.tbl_proxy not present in dbo.[user] table
        DELETE p  
        FROM HR.TBL_Proxy p
        LEFT JOIN dbo.[user] u ON p.manager = u.alias
        WHERE u.alias IS NULL;

        -- Step 3: Cleanup dbo.userrole where managers (alias) not present in user table
        -- This Step may not be needed since alias is FK in userrole table to users table
        DELETE ur 
        FROM dbo.userrole ur
        LEFT JOIN dbo.[user] u ON ur.alias = u.alias
        WHERE u.alias IS NULL;

        -- Step 4: Delete proxy from userrole table if manager is missing in user table and proxy table 
        DELETE ur
        FROM dbo.userrole ur
        WHERE roleid  in
        --the below step ensures that managers , admin, EDM and others dont lose access , only delegates will be deleted
        (select distinct ID from dbo.role where name ='Delegate') -- to get role id for delegates as id can change 
        and  
        alias  not in 
        (
            SELECT value
            FROM HR.TBL_Proxy
            CROSS APPLY STRING_SPLIT(REPLACE(proxy, '@', ''), ',') -- checks if a proxy is present for any other manager which is not deleted in step 2 
        );

        -- Step 5 : Delete orphaned records from dbo.user table which are not present in userrole table( performed already in step 1
        --- but adding in step 5 to be sure of any leftovers) 
        DELETE u
        FROM dbo.[user] u
        LEFT JOIN dbo.userrole ur ON u.alias = ur.alias
        WHERE ur.alias IS NULL;

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;

        THROW;
    END CATCH;
END;