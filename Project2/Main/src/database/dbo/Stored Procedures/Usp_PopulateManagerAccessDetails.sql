CREATE  PROCEDURE    [dbo].[Usp_PopulateManagerAccessDetails]
AS 
BEGIN 
    -- Add missing table declaration for #tbl_user_staging
    CREATE TABLE #tbl_user_staging (
        alias nvarchar(100),
        isactive BIT DEFAULT ((1)),
        createdBy nvarchar(100) DEFAULT ('system'),
        createdDate datetime DEFAULT (getutcdate()),
        modifiedBy nvarchar(100) DEFAULT ('system'),
        modifiedDate datetime DEFAULT (getutcdate())
    );

    -- Add missing table declaration for #tbl_userrole_staging
    CREATE TABLE #tbl_userrole_staging (
        roleid INT,
        isactive BIT DEFAULT ((1)),
        alias NVARCHAR(100),
        source NVARCHAR(100),
        createdBy nvarchar(100) DEFAULT ('system'),
        createdDate datetime DEFAULT (getutcdate()),
        modifiedBy nvarchar(100) DEFAULT ('system'),
        modifiedDate datetime DEFAULT (getutcdate())
    );

    /*Statement till "EXEC sp_executesql @SQL" added since user_staging table was not getting truncated  to 
     foreign key reference in userrole_staging table */
    DECLARE @FK nvarchar(100);
    DECLARE @SQL nvarchar(max);
    DECLARE @managerrole INT;

    SELECT @managerrole = id FROM dbo.[role] WHERE name = 'Manager';

    -- Get the constraint name dynamically since the names changes everytime it is created 
    SET @FK = (
        SELECT CAST(f.name AS nvarchar(128))
        FROM sys.foreign_keys AS f
        INNER JOIN sys.foreign_key_columns AS fc ON f.OBJECT_ID = fc.constraint_object_id
        INNER JOIN sys.tables t ON t.OBJECT_ID = fc.referenced_object_id
        WHERE OBJECT_NAME(f.referenced_object_id) = 'user_staging'
    );

    --TODO fix this logic
    -- Construct the dynamic SQL statement
    SET @SQL = N'ALTER TABLE [dbo].[userrole_staging] DROP CONSTRAINT ' + QUOTENAME(@FK);

    -- Execute the dynamic SQL to drop the constraint from userrole_Staging table
    EXEC sp_executesql @SQL;

    -- Truncate staging tables
    TRUNCATE TABLE dbo.userrole_staging;
    TRUNCATE TABLE dbo.user_staging;

    -- Add the foreign key back post dropping user_staging table 
    ALTER TABLE [dbo].[userrole_staging] WITH CHECK ADD FOREIGN KEY([alias])
    REFERENCES [dbo].[user_staging] ([alias]);

    -- Insert into #tbl_user_staging
    INSERT INTO #tbl_user_staging (alias)
    SELECT DISTINCT DirectManagerAlias AS alias --All managers whose org leader has been mandated as conversation Required 
    FROM hr.Dim_Managerhierarchy_Staging MH 
    INNER JOIN HR.TBL_OrgLeader OL ON mh.ManagerAlias = ol.Manager
    LEFT OUTER JOIN hr.Tbl_Seller_Details_Staging sds 
    ON mh.DirectManagerAlias = sds.alias
    WHERE (OL.ConversationRequired = 'Yes' AND ISNULL(sds.ReviewStatus, '') != 'Exception')

    UNION 
    --Add all CY and FY managers if the FY manager is getting changed for an IC
    SELECT DISTINCT hrd.CY_ManagerAlias AS alias--Get CY manager 
    FROM hr.tbl_hrdata_Staging hrd
    LEFT OUTER JOIN hr.Tbl_Seller_Details_Staging sds
    ON hrd.CY_ManagerAlias = sds.alias
    WHERE hrd.CY_ManagerAlias != hrd.FY_Manageralias AND ISNULL(sds.ReviewStatus, '') != 'Exception'

    UNION 

    SELECT DISTINCT hrd.FY_ManagerAlias AS alias  ---Get Fy manager 
    FROM hr.tbl_hrdata_Staging hrd
    LEFT OUTER JOIN hr.Tbl_Seller_Details_Staging sds 
    ON hrd.FY_ManagerAlias = sds.alias
    WHERE hrd.CY_ManagerAlias != hrd.FY_Manageralias AND ISNULL(sds.ReviewStatus, '') != 'Exception'

    UNION 
    --For Taxonomy change of an IC, their CY managers should get access to have a conversation
    SELECT DISTINCT hrd.CY_ManagerAlias AS alias 
    FROM hr.tbl_hrdata_Staging hrd
    LEFT OUTER JOIN hr.Tbl_Seller_Details_Staging sds ON hrd.CY_ManagerAlias = sds.alias
    WHERE (ISNULL(sds.ReviewStatus, '') != 'Exception' AND 
    (hrd.cy_org != hrd.fy_org 
    OR hrd.CY_RoleSummary != hrd.FY_RoleSummary 
    OR hrd.CY_Q1 != hrd.FY_Q1 OR hrd.CY_Q2 != hrd.FY_Q2 
    OR hrd.CY_Discipline != hrd.FY_Discipline
    OR hrd.CY_Profession != hrd.FY_Profession
    OR hrd.CY_IncentivePlan != hrd.FY_IncentivePlan 
    OR hrd.CY_CareerStage != hrd.FY_CareerStage));

    ----loading managers 
	    INSERT INTO DBO.[user_staging] (alias)
    select distinct ManagerAlias
    from hr.Dim_Managerhierarchy_Staging
    where ic in (select alias from dbo.[user_staging])
    except 
    select alias from dbo.[user_staging]

    --- insert user roles into the user role table
	insert into  #tbl_userrole_staging (roleid, isactive, alias, source,createdBy,createdDate,modifiedBy,modifiedDate)
	--** Users with Existing non manager roles to be retained from userole table and joined with user table

    SELECT ur.Roleid, ur.isactive, ur.alias, 'MCT' AS Source,createdBy,createdDate,modifiedBy,modifiedDate
    FROM dbo.userRole ur
    WHERE ur.source = 'MCT'
    UNION  

    ---TO add ISP users as managerrole 
    SELECT @managerrole AS roleid, isactive, alias, 'ISP' AS Source,createdBy,createdDate,modifiedBy,modifiedDate
	FROM #tbl_user_staging 
    WHERE alias NOT IN (
        SELECT u.alias
        FROM dbo.[user] u 
        JOIN dbo.[Userrole] ur ON u.alias = ur.alias
        WHERE ur.source = 'MCT' and ur.roleId = @managerrole ) 



        ---Taking Active MCT users from userrole table 
	 insert into #tbl_user_staging ( isactive, alias)
    select  distinct isactive, alias 
	from #tbl_userrole_staging
    where source = 'MCT' and  alias not in  (
    SELECT distinct alias  FROM #tbl_user_staging)


    -- Insert into user_staging from #tbl_user_staging
    INSERT INTO dbo.user_staging (alias, createdBy, createdDate, modifiedBy, modifiedDate)
    SELECT DISTINCT alias, createdBy, createdDate, modifiedBy, modifiedDate
    FROM #tbl_user_staging;

    -- Insert into user_role_staging from #tbl_user_role_staging 
    INSERT INTO dbo.userrole_staging (roleid, isactive, alias, source, createdBy, createdDate, modifiedBy, modifiedDate)
    SELECT roleid, isactive, alias, source, createdBy, createdDate, modifiedBy, modifiedDate
    FROM #tbl_userrole_staging;

    -- Cleanup temporary tables
    IF OBJECT_ID('tempdb..#tbl_user_staging') IS NOT NULL
        DROP TABLE #tbl_user_staging;

    IF OBJECT_ID('tempdb..#tbl_userrole_staging') IS NOT NULL
        DROP TABLE #tbl_userrole_staging;
END