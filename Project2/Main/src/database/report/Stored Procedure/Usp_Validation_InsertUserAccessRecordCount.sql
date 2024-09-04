
CREATE     PROCEDURE              [report].[Usp_InsertUserAccessRecordCount]
AS
BEGIN
    BEGIN TRY
        DECLARE @LoadDatetime DATETIME;
        SET @LoadDatetime = GETUTCDATE();

		   -- Insert 'all users from user table ' record
       INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
        SELECT 'Access_All_users', COUNT(distinct alias), 'Total count  of all users who are added manually in user table' AS [Description],
        @LoadDatetime
        FROM dbo.[user];

        -- Insert 'MCT_total_users' record
		        INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
        SELECT 'Access_All_Total_users_MCT', COUNT(distinct alias), 'Total count of  all users who are added manually in user table as MCT source ' AS [Description],
       @LoadDatetime
        FROM dbo.userrole where source='MCT';

        

			-- Insert 'Org leaders'  record
        INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
        SELECT 'Access_All_Org_leaders_MCT', (select count (*) from  (Select distinct alias  from dbo.userrole where roleid=1 and source ='MCT' and alias in 
		( select distinct manager from hr.tbl_orgleader))as tbl ),--), ,
		'Total count of all Org leaders  who are added manually as source Type MCT in user role table ' AS [Description],
        @LoadDatetime;

			-- Insert 'Org leaders from org leaders '  record
        INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
        SELECT 'Access_All_org_leaders_org_table', (select count(*) from 
		( select distinct manager from hr.tbl_orgleader)as tbl),
		'Total count of all Org leaders  who are present in the org leader table  ' AS [Description],
        @LoadDatetime;


		  -- Insert 'MCT Managers  record minus the org leaders' 
        INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
        SELECT 'Access_Managers_MCT_source',  COUNT(distinct alias) , 'Total count of all managers  who are added manually as source Type MCT and excludes org leaders' AS [Description],
       @LoadDatetime
        FROM dbo.userrole
        WHERE source = 'MCT' and roleid=1 and alias not in 
	
		( select distinct manager from hr.tbl_orgleader);


		-- Insert 'All EDM leads in user role table '  record
        INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
        SELECT 'Access_EDMlead_MCT_source', (select count (*) from (Select distinct alias  from dbo.userrole where roleid=3 and alias in
		(select distinct mct_edm_data_keeper_alias from dbo.MCT_EDMApprovers)) as tbl),
		'Total count of all EDM leads  who are added manually as source Type MCT and present in user role table ' AS [Description],
        @LoadDatetime;

			-- Insert 'All EDM leads EDM leads table '  record
        INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
        SELECT 'Access_EDMlead_MCT_EdmTable',(select count(*) from 
		(select distinct mct_edm_data_keeper_alias from dbo.MCT_EDMApprovers) as tbl),
		'Total count of all EDM leads  who are added manually as source Type MCT and present in user role table ' AS [Description],
        @LoadDatetime;

		  -- Insert 'Access_proxy_MCT_sources' record
      INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
        SELECT 'Access_proxy_MCT_source', (select count (*) from (Select distinct alias  from dbo.userrole where roleid=5) as tbl), 
		'Total count of proxy users  who have been added in userrole table' AS [Description],
        @LoadDatetime;
       -- FROM dbo.userrole
        --WHERE source = 'ISP';

			  -- Insert 'Access_proxy_MCT_from_proxy_table' record
      INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
        SELECT 'Access_proxy_MCT_proxy_table', 
		(SELECT COUNT(*) FROM (SELECT LTRIM(RTRIM(value)) AS proxy_value
       FROM HR.TBL_Proxy 
       CROSS APPLY STRING_SPLIT(REPLACE(proxy, '@', ''), ',')) AS tbl), 
		'Total count of proxy users  who are present in proxy table ' AS [Description],
        @LoadDatetime;
       -- FROM dbo.userrole
        --WHERE source = 'ISP';

		  -- Insert 'Admin, Super User,Contributor records ' 
       INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
        SELECT 'Access_miscellaneous', COUNT(distinct alias ), 
		'Total count of all Admin, Super User,Contributor record' AS [Description],
       @LoadDatetime
        FROM dbo.userrole
        WHERE source = 'MCT' and roleid in (2,4,6) ;


        -- Insert 'ISP_total_users' record
      INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
        SELECT 'Access_Managers_ISP_total', COUNT(distinct alias ), 'Total count of managers  who have been auto added as part of ISP pull' AS [Description],
    @LoadDatetime
        FROM dbo.userrole
        WHERE source = 'ISP' and roleId=1;

        -- Insert 'ISP_org_leader_users' record
       INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
        SELECT 'Access_Managers_ISP_org_leader_YES', COUNT(DISTINCT DirectManagerAlias), 
		'Total count of managers who have been added since their org leader has been mandated a conversation' AS [Description],
      @LoadDatetime
        FROM hr.Dim_Managerhierarchy MH
        INNER JOIN HR.TBL_OrgLeader OL ON MH.ManagerAlias = OL.Manager
        LEFT OUTER JOIN hr.Tbl_Seller_Details sds ON MH.DirectManagerAlias = sds.alias
        WHERE OL.ConversationRequired = 'Yes'
        AND ISNULL(sds.ReviewStatus, '') != 'Exception';

		

        -- Insert 'ISP_Taxonomy_change_CY' record
       INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
        SELECT 'Access_Managers(CY)_ISP_Taxonomy_change', COUNT(DISTINCT hrd.CY_ManagerAlias), 'Total count of managers who have been added because an IC under them is having taxonomy change' AS [Description],
			@LoadDatetime
        FROM hr.tbl_hrdata hrd
        LEFT OUTER JOIN hr.Tbl_Seller_Details sds ON hrd.CY_ManagerAlias = sds.alias
        WHERE ISNULL(sds.ReviewStatus, '') != 'Exception'
        AND (hrd.cy_org != hrd.fy_org
        OR hrd.CY_RoleSummary != hrd.FY_RoleSummary
        OR hrd.CY_Q1 != hrd.FY_Q1
        OR hrd.CY_Q2 != hrd.FY_Q2
        OR hrd.CY_Discipline != hrd.FY_Discipline
        OR hrd.CY_Profession != hrd.FY_Profession
        OR hrd.CY_IncentivePlan != hrd.FY_IncentivePlan
        OR hrd.CY_CareerStage != hrd.FY_CareerStage);

        -- Insert 'ISP_Manager_change_CY_FY' record
        INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
        SELECT 'Access_Managers(CY+FY)_ISP_Manager_change',
            (SELECT COUNT(*) FROM (
                SELECT DISTINCT hrd.CY_ManagerAlias
                FROM hr.tbl_hrdata_Staging hrd
                LEFT OUTER JOIN hr.Tbl_Seller_Details sds ON hrd.CY_ManagerAlias = sds.alias
                WHERE hrd.CY_ManagerAlias != hrd.FY_Manageralias
                AND ISNULL(sds.ReviewStatus, '') != 'Exception'
                UNION
                SELECT hrd.FY_ManagerAlias
                FROM hr.tbl_hrdata hrd
                LEFT OUTER JOIN hr.Tbl_Seller_Details sds ON hrd.FY_ManagerAlias = sds.alias
                WHERE hrd.CY_ManagerAlias != hrd.FY_Manageralias
                AND ISNULL(sds.ReviewStatus, '') != 'Exception'
            ) AS subquery),
            'Total count of managers(CY+FY manager) who have been added because an IC under a CY manager is having FY manager change' AS [Description],
        @LoadDatetime;

		--Below query takes the distinct count of all 3 above using union ( from the previously used queries)

		INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		Select 'Access_managers_distinct(Org+CYFY+taxonomy)',   (SELECT COUNT(*) FROM (
           SELECT DISTINCT DirectManagerAlias AS alias
           FROM hr.Dim_Managerhierarchy_Staging MH 
           INNER JOIN HR.TBL_OrgLeader OL ON MH.ManagerAlias = OL.Manager
           LEFT OUTER JOIN hr.Tbl_Seller_Details_Staging SDS 
           ON MH.DirectManagerAlias = SDS.alias
           WHERE (OL.ConversationRequired = 'Yes' AND ISNULL(SDS.ReviewStatus, '') != 'Exception')

           UNION 

           SELECT DISTINCT hrd.CY_ManagerAlias AS alias
           FROM hr.tbl_hrdata_Staging hrd
           LEFT OUTER JOIN hr.Tbl_Seller_Details_Staging SDS
           ON hrd.CY_ManagerAlias = SDS.alias
           WHERE hrd.CY_ManagerAlias != hrd.FY_ManagerAlias AND ISNULL(SDS.ReviewStatus, '') != 'Exception'

           UNION 

           SELECT DISTINCT hrd.FY_ManagerAlias AS alias
           FROM hr.tbl_hrdata_Staging hrd
           LEFT OUTER JOIN hr.Tbl_Seller_Details_Staging SDS 
           ON hrd.FY_ManagerAlias = SDS.alias
           WHERE hrd.CY_ManagerAlias != hrd.FY_ManagerAlias AND ISNULL(SDS.ReviewStatus, '') != 'Exception'

           UNION 

           SELECT DISTINCT hrd.CY_ManagerAlias AS alias
           FROM hr.tbl_hrdata_Staging hrd
           LEFT OUTER JOIN hr.Tbl_Seller_Details_Staging SDS ON hrd.CY_ManagerAlias = SDS.alias
           WHERE (ISNULL(SDS.ReviewStatus, '') != 'Exception' AND 
           (hrd.cy_org != hrd.fy_org 
           OR hrd.CY_RoleSummary != hrd.FY_RoleSummary 
           OR hrd.CY_Q1 != hrd.FY_Q1 OR hrd.CY_Q2 != hrd.FY_Q2 
           OR hrd.CY_Discipline != hrd.FY_Discipline
           OR hrd.CY_Profession != hrd.FY_Profession
           OR hrd.CY_IncentivePlan != hrd.FY_IncentivePlan 
           OR hrd.CY_CareerStage != hrd.FY_CareerStage)) ) as TBL ) ,
 'Total count of all managers distinct (Org+CYFY+taxonomy)' AS [Description],
 @LoadDatetime;

         --Insert list of users with multiple roles 
      INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		select  'Access_Users_with_multiple_roles',(select count (*) from (select distinct alias  from dbo.Userrole
		group by alias
		having COUNT(alias)>1) as TBL), 'Total count of Users who have multiple roles ' as [Description],
		@LoadDatetime;

	  --Insert Managers who are in exception list but are added in user role table 
	   INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		select 'Access_Managers_in_ExceptionList',
		( select count(*) from (select  distinct ur.Alias from dbo.Userrole ur
	    inner join hr.Tbl_Seller_Details sds ON ur.alias = sds.alias
        WHERE 
        ISNULL(sds.ReviewStatus, '') = 'Exception' and ur.roleid=1) As TBL),'Total count of managers who are in exception list but are added in user role table--This should always be zero' as [description] ,
		@LoadDatetime;
		
		 -- Insert Records where level 1 is judson and level 2 mitraa --- this should be zero 
		 INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'Access_manager_Exclusion(JUDSON+Mitra)',
		 (select count (*) from  (select distinct alias from dbo.userrole where roleid=1 and alias in  (select  distinct IC  from hr.Tbl_HRData where 
		 (ISNULL(Reports_To_Level_1_Email,'') = 'JUDSON'
		-- and ISNULL(Reports_To_Level_2_Email,'') <> 'kakers' 
		-- and ISNULL(Reports_To_Level_2_Email,'') <> 'csande'  
		--and ISNULL(Reports_To_Level_3_Email,'') <> 'bbelmont')
			and  ISNULL(Reports_To_Level_2_Email,'') = 'Mitraa'))) AS TBL),
			'Total count of managers who are present in user role table but are part of exclusion --Should be zero' As [description],
			@loaddatetime;


			-- Insert Records where level 1 is judson But level 2 and 3 is kakers/csande --- this should be zero 
		 INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'Access_manager_Exclusion(JUDSON+kakers/csande/belmont)',
		(select count (*) from  (select distinct alias from dbo.userrole where roleid=1 and alias in (select  distinct IC  from hr.Tbl_HRData where
		( (ISNULL(Reports_To_Level_1_Email,'') = 'JUDSON'
		 and ISNULL(Reports_To_Level_2_Email,'') IN( 'kakers','csande')
		and ISNULL(Reports_To_Level_3_Email,'') = 'bbelmont'))
		and  ISNULL(Reports_To_Level_2_Email,'') = 'Mitraa')) AS TBL),
		'Total count of  managers who are present in user role table but are part of exclusion --Should be zero' As [description],
		@loaddatetime ;


				 -- Insert Records where level 1 is judson and level 2 mitraa --- this should be zero 
		 INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'IC_Exclusion(JUDSON+Mitra)',
		 (select count (*) from   (select  distinct IC  from hr.Tbl_HRData where 
		 (ISNULL(Reports_To_Level_1_Email,'') = 'JUDSON'
		-- and ISNULL(Reports_To_Level_2_Email,'') <> 'kakers' 
		-- and ISNULL(Reports_To_Level_2_Email,'') <> 'csande'  
		--and ISNULL(Reports_To_Level_3_Email,'') <> 'bbelmont')
			and  ISNULL(Reports_To_Level_2_Email,'') = 'Mitraa')) AS TBL),
			'Total count of  managers who are present in user role table but are part of exclusion --Should be zero' As [description],
			@loaddatetime;


			-- Insert Records where level 1 is judson But level 2 and 3 is kakers/csande --- this should be zero 
		 INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'IC_Exclusion(JUDSON+kakers/csande/belmont)',
		(select count (*) from   (select  distinct IC  from hr.Tbl_HRData where
		( (ISNULL(Reports_To_Level_1_Email,'') = 'JUDSON'
		 and ISNULL(Reports_To_Level_2_Email,'') IN( 'kakers','csande')
		and ISNULL(Reports_To_Level_3_Email,'') = 'bbelmont'))
		and  ISNULL(Reports_To_Level_2_Email,'') = 'Mitraa') AS TBL),
		'Total count of  IC who are present in hr data table but are part of exclusion --Should be zero' As [description],
		@loaddatetime ;

		  INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		select 'IC_in_ExceptionList',
		( select count(*) from (select  distinct ur.IC from HR.Tbl_HRData ur
	    inner join hr.Tbl_Seller_Details sds ON ur.IC  = sds.alias
        WHERE 
        ISNULL(sds.ReviewStatus, '') = 'Exception' ) As TBL),'Total count of IC  who are in exception list but are added in HR data table --This should always be zero' as [description] ,
		@LoadDatetime;

		----Insert conversation Required yes recors 
		 INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'IC_Conversation_Required_Yes(Tbl_hrdata table count)',(select count(*) from hr.tbl_hrdata where isconversationrequired=1),
		 'Total Count of IC which have been marked as conversation Required ' as [description],
		 @loaddatetime;

	----Insert conversation Required yes records due to business logic 
		 INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'IC_Conversation_Required_Yes(Count using business logic)',(select count(distinct ic) from HR.tbl_hrdata where 

		   ((Reports_To_Level_1_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_2_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_3_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_4_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_5_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_6_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
       OR Reports_To_Level_7_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes'))  
                OR ([CY_Org]!=[FY_Org]   
                OR [CY_RoleSummary]!=[FY_RoleSummary]   
                OR [CY_Q1]!=[FY_Q1]   
             OR [CY_Q2]!=[FY_Q2]  
      -- TODO OR CY_Discipline!=FY_Discipline OR CY_Profession!=FY_Profession  
                OR [CY_IncentivePlan]!=[FY_IncentivePlan]   
                OR [CY_CareerStage]!=[FY_CareerStage])  
       OR [CY_ManagerAlias]!=[FY_ManagerAlias])),
		 'Total Count of IC which have been marked as conversation Required  using the business logic query ' as [description],
		 @loaddatetime;		

		 	----Insert conversation Required yes Due to org leader mandate
		 INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'IC_Conversation_Required_Yes(Org leader YES)',(select count(distinct ic) from HR.tbl_hrdata where 

		   (Reports_To_Level_1_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_2_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_3_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_4_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_5_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
    OR Reports_To_Level_6_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes')  
       OR Reports_To_Level_7_Email IN (SELECT Manager FROM [HR].[TBL_OrgLeader] WHERE ConversationRequired='Yes') )),
		 'Total Count of IC which have been marked as conversation Required as one of their level(1 to 7) has been mandated a change ' as [description],
		 @loaddatetime;		

		 	----Insert conversation Required due to taxonomy change
		 INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'IC_Conversation_Required_Yes(Taxonomy Change )',(select count(distinct ic) from HR.tbl_hrdata where 

		   
                 ([CY_Org]!=[FY_Org]   
                OR [CY_RoleSummary]!=[FY_RoleSummary]   
                OR [CY_Q1]!=[FY_Q1]   
             OR [CY_Q2]!=[FY_Q2]  
      -- TODO OR CY_Discipline!=FY_Discipline OR CY_Profession!=FY_Profession  
                OR [CY_IncentivePlan]!=[FY_IncentivePlan]   
                OR [CY_CareerStage]!=[FY_CareerStage])),
		 'Total Count of IC which have been marked as conversation Required as their taxonomy is changing ' as [description],
		 @loaddatetime;		

		 	----Insert conversation Required yes due to FY manager change
		 INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'IC_Conversation_Required_Yes(CY/FY Manager Change)',(select count(distinct ic) from HR.tbl_hrdata where 

		    ( [CY_ManagerAlias]!=[FY_ManagerAlias]) and IC  not in  (select distinct ic from HR.tbl_hrdata where 

		   
                 ([CY_Org]!=[FY_Org]   
                OR [CY_RoleSummary]!=[FY_RoleSummary]   
                OR [CY_Q1]!=[FY_Q1]   
             OR [CY_Q2]!=[FY_Q2]  
      -- TODO OR CY_Discipline!=FY_Discipline OR CY_Profession!=FY_Profession  
                OR [CY_IncentivePlan]!=[FY_IncentivePlan]   
                OR [CY_CareerStage]!=[FY_CareerStage]))),
		 'Total Count of IC which have been marked as conversation Required  as their FY manager is changing and excludes taxonomy change ' as [description],
		 @loaddatetime;		

		 --insert approved records in planseller 
		  INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'IC_Conversation_Required_Yes(Approved in Planseller)',(select count (distinct ic) from hr.tbl_hrdata hrd-- where hrd.IsConversationRequired=1
left outer join 
 isp_Seller seller on seller.isp_name=hrd.IC  
 left outer join PlanSeller ps on ps.edm_sellercy=seller.isp_sellerid
  where hrd.IsConversationRequired=1 and seller.isp_currentlyactive=1
  and Ps.[edm_reviewstatus] = 757580002),
		 'Total Count of IC which have been marked as conversation Required  and their records are approved in planseller ' as [description],
		 @loaddatetime;	

		 --- Insert pending records from plan seller 
		  INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'IC_Conversation_Required_Yes(Pending in PlanSeller)',( select count (distinct ic) from hr.tbl_hrdata hrd-- where hrd.IsConversationRequired=1
    left outer join 
   isp_Seller seller on seller.isp_name=hrd.IC  
   left outer join PlanSeller ps on ps.edm_sellercy=seller.isp_sellerid
    where hrd.IsConversationRequired=1 and seller.isp_currentlyactive=1
   and Ps.[edm_reviewstatus] = 757580000 ),
		 'Total Count of IC which have been marked as conversation Required  and their records are Pending in planseller ' as [description],
		 @loaddatetime;	


		 --insert exception records in plan seller 
		  INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'IC_Conversation_Required_Yes(Exception in Planseller)',( select count (distinct ic) from hr.tbl_hrdata hrd-- where hrd.IsConversationRequired=1
left outer join 
 isp_Seller seller on seller.isp_name=hrd.IC  
 left outer join PlanSeller ps on ps.edm_sellercy=seller.isp_sellerid
  where hrd.IsConversationRequired=1 and seller.isp_currentlyactive=1
  and Ps.[edm_reviewstatus] = 75758000),
		 'Total Count of IC which have been marked as conversation Required  and their records are Exception in planseller ' as [description],
		 @loaddatetime;	


		 ---insert reviewed records in plan seller 
		  INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'IC_Conversation_Required_Yes(Reviewed in Planseller)',(select count (distinct ic) from hr.tbl_hrdata hrd-- where hrd.IsConversationRequired=1
left outer join 
 isp_Seller seller on seller.isp_name=hrd.IC  
 left outer join PlanSeller ps on ps.edm_sellercy=seller.isp_sellerid
  where hrd.IsConversationRequired=1 and seller.isp_currentlyactive=1
  and Ps.[edm_reviewstatus] = 757580001 ),
		 'Total Count of IC which have been marked as conversation Required  and their records are Reviewed in planseller ' as [description],
		 @loaddatetime;	

		 

		 -- taxonomy + FY manager +org leader=1 
		 ----Insert conversation Required yes recors 
		 INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'IC_Error_with_missing_manager',(select count(*) from hr.Tbl_HRData where   Fy_manageralias is null or CY_manageralias is null ),
		 'Total Count of IC which have been marked as conversation Required ' as [description],
		 @loaddatetime;	

		 ----Insert conversation Required yes recors 
		 INSERT INTO [report].[Validation_userAccessRecordCount] (Record_source, Record_count, [Description], Load_datetime)
		 select 'IC_Error_with Circular_reference',(select count(*) from dbo.ErrorLogTable where Errortype in ('CY_circular_reference','FY_Circular_Reference')),
		 'Total Count of IC which have ae having circular reference  ' as [description],
		 @loaddatetime;	


		  
    END TRY
    BEGIN CATCH
        -- Handle the exception here
        -- You can log the error or perform any necessary actions
        -- Rethrow the exception if needed
        THROW;
    END CATCH
END;
