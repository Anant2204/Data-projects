CREATE PROCEDURE [dbo].[Load_Employee_CYData]
AS
BEGIN
DECLARE @RCount INT
DECLARE @i INT=1

TRUNCATE TABLE [dbo].[Employee_CYData_Staging]
DROP TABLE IF EXISTS #tmpName
DROP TABLE IF EXISTS #tmprec

;WITH CTER AS 
(
SELECT DISTINCT S.isp_name
FROM [dbo].[Isp_seller] S 
LEFT JOIN [dbo].[Isp_worker] W ON W.isp_workerid=S.isp_worker AND W.statecode=0
LEFT JOIN 
(
	SELECT DISTINCT S.isp_name FROM [dbo].[Isp_seller] S
	INNER JOIN PlanSeller PS ON S.isp_sellerid = PS.edm_sellercy
) PS ON PS.isp_name=S.isp_name
WHERE W.isp_workerstatus NOT IN (863300003,863300006,863300007) AND S.isp_isfy=0 AND PS.isp_name IS NULL AND S.isp_currentlyactive=1
)
SELECT isp_name, ROW_NUMBER() OVER(ORDER BY isp_name DESC) AS RNO
INTO #tmpName
FROM CTER

SELECT @RCount=COUNT(1) FROM #tmpName
DECLARE @LEVEL1_EMAIL NVARCHAR(100) = NULL
	DECLARE @LEVEL2_EMAIL NVARCHAR(100) = NULL
	DECLARE @LEVEL3_EMAIL NVARCHAR(100) = NULL
	DECLARE @LEVEL4_EMAIL NVARCHAR(100) = NULL
	DECLARE @LEVEL5_EMAIL NVARCHAR(100) = NULL
	DECLARE @LEVEL6_EMAIL NVARCHAR(100) = NULL
	DECLARE @LEVEL7_EMAIL NVARCHAR(100) = NULL
	DECLARE @Level_1_Full_Name NVARCHAR(100) = NULL
	DECLARE @Level_2_Full_Name NVARCHAR(100) = NULL
	DECLARE @Level_3_Full_Name NVARCHAR(100) = NULL
	DECLARE @Level_4_Full_Name NVARCHAR(100) = NULL
	DECLARE @Level_5_Full_Name NVARCHAR(100) = NULL
	DECLARE @Level_6_Full_Name NVARCHAR(100) = NULL
	DECLARE @Level_7_Full_Name NVARCHAR(100) = NULL
	DECLARE @ISP_NAME NVARCHAR(100) = NULL
	DECLARE @W1_EMAIL NVARCHAR(100) = NULL
	DECLARE @W2_EMAIL NVARCHAR(100) = NULL
	DECLARE @W3_EMAIL NVARCHAR(100) = NULL
	DECLARE @W4_EMAIL NVARCHAR(100) = NULL
	DECLARE @W5_EMAIL NVARCHAR(100) = NULL
	DECLARE @W6_EMAIL NVARCHAR(100) = NULL
	DECLARE @W7_EMAIL NVARCHAR(100) = NULL
	DECLARE @W1_Full_Name NVARCHAR(100) = NULL
	DECLARE @W2_Full_Name NVARCHAR(100) = NULL
	DECLARE @W3_Full_Name NVARCHAR(100) = NULL
	DECLARE @W4_Full_Name NVARCHAR(100) = NULL
	DECLARE @W5_Full_Name NVARCHAR(100) = NULL
	DECLARE @W6_Full_Name NVARCHAR(100) = NULL
	DECLARE @W7_Full_Name NVARCHAR(100) = NULL
	DECLARE @Email NVARCHAR(100) = NULL
	DECLARE @Full_Name NVARCHAR(100) = NULL
	DECLARE @ManagerEmail NVARCHAR(100) = NULL
	DECLARE @Reports_To_Full_Name NVARCHAR(100) = NULL
	DECLARE @isp_worker UNIQUEIDENTIFIER = NULL
	DECLARE @isp_org UNIQUEIDENTIFIER = NULL
	DECLARE @isp_qualifier1 UNIQUEIDENTIFIER = NULL
	DECLARE @isp_costcenter UNIQUEIDENTIFIER = NULL
	DECLARE @isp_incentiveplan UNIQUEIDENTIFIER = NULL
	DECLARE @isp_careerstage UNIQUEIDENTIFIER = NULL
	DECLARE @isp_qualifier2 UNIQUEIDENTIFIER = NULL
	DECLARE @isp_rolesummary UNIQUEIDENTIFIER = NULL
	
	SELECT DISTINCT
		W.isp_name, 
		W.isp_alias, 
		W7.isp_name n7,
		W6.isp_name n6,
		W5.isp_name n5,
		W4.isp_name n4,
		W3.isp_name n3, 
		W2.isp_name n2,
		W1.isp_name n1,
		W7.isp_alias a7,
		W6.isp_alias a6,
		W5.isp_alias a5,
		W4.isp_alias a4,
		W3.isp_alias a3, 
		W2.isp_alias a2,
		W1.isp_alias a1,
		S.isp_worker,
		S.isp_org,
		S.isp_qualifier1,
		S.isp_costcenter,
		S.isp_incentiveplan,
		S.isp_careerstage,
		S.isp_qualifier2,
		S.isp_rolesummary
	INTO #tmprec
	FROM [dbo].[Isp_seller] S
	LEFT JOIN [dbo].Isp_worker W on W.isp_workerid=S.isp_worker and W.statecode=0
	LEFT JOIN [dbo].Isp_worker W7 on W.isp_manager=W7.isp_workerid and W7.statecode=0
	LEFT JOIN [dbo].Isp_worker W6 on W6.isp_workerid=W7.isp_manager and W6.statecode=0
	LEFT JOIN [dbo].Isp_worker W5 on W5.isp_workerid=W6.isp_manager and W5.statecode=0
	LEFT JOIN [dbo].Isp_worker W4 on W4.isp_workerid=W5.isp_manager and W4.statecode=0
	LEFT JOIN [dbo].Isp_worker W3 on W3.isp_workerid=W4.isp_manager and W3.statecode=0
	LEFT JOIN [dbo].Isp_worker W2 on W2.isp_workerid=W3.isp_manager and W2.statecode=0
	LEFT JOIN [dbo].Isp_worker W1 on W1.isp_workerid=W2.isp_manager and W1.statecode=0
	LEFT JOIN PlanSeller PS ON S.isp_sellerid = PS.edm_sellercy
	WHERE W.isp_workerstatus NOT IN (863300003,863300006,863300007) and s.isp_isfy=0
	and PS.edm_sellercy IS NULL AND isp_currentlyactive=1

WHILE (@i<=@RCount)
BEGIN
	SET @LEVEL1_EMAIL =NULL
	SET @LEVEL2_EMAIL =NULL
	SET @LEVEL3_EMAIL =NULL
	SET @LEVEL4_EMAIL =NULL
	SET @LEVEL5_EMAIL =NULL
	SET @LEVEL6_EMAIL =NULL
	SET @LEVEL7_EMAIL =NULL
	SET @Level_1_Full_Name = NULL
	SET @Level_2_Full_Name = NULL
	SET @Level_3_Full_Name = NULL
	SET @Level_4_Full_Name = NULL
	SET @Level_5_Full_Name = NULL
	SET @Level_6_Full_Name = NULL
	SET @Level_7_Full_Name = NULL
	SET @ISP_NAME = NULL
	SET @W1_EMAIL = NULL
	SET @W2_EMAIL = NULL
	SET @W3_EMAIL = NULL
	SET @W4_EMAIL = NULL
	SET @W5_EMAIL = NULL
	SET @W6_EMAIL = NULL
	SET @W7_EMAIL = NULL
	SET @W1_Full_Name = NULL
	SET @W2_Full_Name = NULL
	SET @W3_Full_Name = NULL
	SET @W4_Full_Name = NULL
	SET @W5_Full_Name = NULL
	SET @W6_Full_Name = NULL
	SET @W7_Full_Name = NULL
	SET @Email = NULL
	SET @Full_Name = NULL
	SET @ManagerEmail = NULL
	SET @Reports_To_Full_Name = NULL
	SET @isp_worker = NULL
	SET @isp_org = NULL
	SET @isp_qualifier1 = NULL
	SET @isp_costcenter = NULL
	SET @isp_incentiveplan = NULL
	SET @isp_careerstage = NULL
	SET @isp_qualifier2 = NULL
	SET @isp_rolesummary = NULL
	
	SELECT @ISP_NAME=isp_name FROM #tmpName WHERE RNO=@i

	SELECT
		@Email=t.isp_name, 
		@Full_Name=t.isp_alias, 
		@ManagerEmail=t.n7, 
		@Reports_To_Full_Name=t.a7,
		@W7_EMAIL=t.n7,
		@W6_EMAIL=t.n6,
		@W5_EMAIL=t.n5,
		@W4_EMAIL=t.n4,
		@W3_EMAIL=t.n3, 
		@W2_EMAIL=t.n2,
		@W1_EMAIL=t.n1,
		@W7_Full_Name=t.a7,
		@W6_Full_Name=t.a6,
		@W5_Full_Name=t.a5,
		@W4_Full_Name=t.a4,
		@W3_Full_Name=t.a3, 
		@W2_Full_Name=t.a2,
		@W1_Full_Name=t.a1,
		@isp_worker=t.isp_worker,
		@isp_org=t.isp_org,
		@isp_qualifier1=t.isp_qualifier1,
	    @isp_costcenter=t.isp_costcenter,
		@isp_incentiveplan=t.isp_incentiveplan,
		@isp_careerstage=t.isp_careerstage,
		@isp_qualifier2=t.isp_qualifier2,
	    @isp_rolesummary=t.isp_rolesummary
	FROM #tmprec t where t.isp_name=@ISP_NAME

	IF ISNULL(@W1_EMAIL,'') = 'JUDSON'
	BEGIN
		SET @LEVEL1_EMAIL = @W1_EMAIL
		SET @LEVEL2_EMAIL = @W2_EMAIL
		SET @LEVEL3_EMAIL = @W3_EMAIL
		SET @LEVEL4_EMAIL = @W4_EMAIL
		SET @LEVEL5_EMAIL = @W5_EMAIL
		SET @LEVEL6_EMAIL = @W6_EMAIL
		SET @LEVEL7_EMAIL = @W7_EMAIL

		SET @Level_1_Full_Name = @W1_Full_Name
		SET @LEVEL_2_Full_Name = @W2_Full_Name
		SET @LEVEL_3_Full_Name = @W3_Full_Name
		SET @LEVEL_4_Full_Name = @W4_Full_Name
		SET @LEVEL_5_Full_Name = @W5_Full_Name
		SET @LEVEL_6_Full_Name = @W6_Full_Name
		SET @LEVEL_7_Full_Name = @W7_Full_Name
	END	
	
	ELSE IF ISNULL(@W2_EMAIL,'') = 'JUDSON'
	BEGIN
		SET @LEVEL1_EMAIL = @W2_EMAIL
		SET @LEVEL2_EMAIL = @W3_EMAIL
		SET @LEVEL3_EMAIL = @W4_EMAIL
		SET @LEVEL4_EMAIL = @W5_EMAIL
		SET @LEVEL5_EMAIL = @W6_EMAIL
		SET @LEVEL6_EMAIL = @W7_EMAIL

		SET @Level_1_Full_Name = @W2_Full_Name
		SET @LEVEL_2_Full_Name = @W3_Full_Name
		SET @LEVEL_3_Full_Name = @W4_Full_Name
		SET @LEVEL_4_Full_Name = @W5_Full_Name
		SET @LEVEL_5_Full_Name = @W6_Full_Name
		SET @LEVEL_6_Full_Name = @W7_Full_Name
	END

	ELSE IF ISNULL(@W3_EMAIL,'') = 'JUDSON'
	BEGIN
		SET @LEVEL1_EMAIL = @W3_EMAIL
		SET @LEVEL2_EMAIL = @W4_EMAIL
		SET @LEVEL3_EMAIL = @W5_EMAIL
		SET @LEVEL4_EMAIL = @W6_EMAIL
		SET @LEVEL5_EMAIL = @W7_EMAIL

		SET @Level_1_Full_Name = @W3_Full_Name
		SET @LEVEL_2_Full_Name = @W4_Full_Name
		SET @LEVEL_3_Full_Name = @W5_Full_Name
		SET @LEVEL_4_Full_Name = @W6_Full_Name
		SET @LEVEL_5_Full_Name = @W7_Full_Name
	END

	ELSE IF ISNULL(@W4_EMAIL,'') = 'JUDSON'
	BEGIN
		SET @LEVEL1_EMAIL = @W4_EMAIL
		SET @LEVEL2_EMAIL = @W5_EMAIL
		SET @LEVEL3_EMAIL = @W6_EMAIL
		SET @LEVEL4_EMAIL = @W7_EMAIL

		SET @Level_1_Full_Name = @W4_Full_Name
		SET @LEVEL_2_Full_Name = @W5_Full_Name
		SET @LEVEL_3_Full_Name = @W6_Full_Name
		SET @LEVEL_4_Full_Name = @W7_Full_Name
	END

	ELSE IF ISNULL(@W5_EMAIL,'') = 'JUDSON'
	BEGIN
		SET @LEVEL1_EMAIL = @W5_EMAIL
		SET @LEVEL2_EMAIL = @W6_EMAIL
		SET @LEVEL3_EMAIL = @W7_EMAIL

		SET @Level_1_Full_Name = @W5_Full_Name
		SET @LEVEL_2_Full_Name = @W6_Full_Name
		SET @LEVEL_3_Full_Name = @W7_Full_Name
	END

	ELSE IF ISNULL(@W6_EMAIL,'') = 'JUDSON'
	BEGIN
		SET @LEVEL1_EMAIL = @W6_EMAIL
		SET @LEVEL2_EMAIL = @W7_EMAIL
		
		SET @Level_1_Full_Name = @W6_Full_Name
		SET @LEVEL_2_Full_Name = @W7_Full_Name
	END

	ELSE IF ISNULL(@W7_EMAIL,'') = 'JUDSON'
	BEGIN
		SET @LEVEL1_EMAIL = @W7_EMAIL		
		SET @Level_1_Full_Name = @W7_Full_Name
	END

	ELSE IF ISNULL(@W2_EMAIL,'') = 'Mitraa'
	BEGIN
		SET @LEVEL1_EMAIL = @W1_EMAIL
		SET @LEVEL2_EMAIL = @W2_EMAIL
		SET @LEVEL3_EMAIL = @W3_EMAIL
		SET @LEVEL4_EMAIL = @W4_EMAIL
		SET @LEVEL5_EMAIL = @W5_EMAIL
		SET @LEVEL6_EMAIL = @W6_EMAIL
		SET @LEVEL7_EMAIL = @W7_EMAIL

		SET @Level_1_Full_Name = @W1_Full_Name
		SET @LEVEL_2_Full_Name = @W2_Full_Name
		SET @LEVEL_3_Full_Name = @W3_Full_Name
		SET @LEVEL_4_Full_Name = @W4_Full_Name
		SET @LEVEL_5_Full_Name = @W5_Full_Name
		SET @LEVEL_6_Full_Name = @W6_Full_Name
		SET @LEVEL_7_Full_Name = @W7_Full_Name
	END	
	
	ELSE IF ISNULL(@W3_EMAIL,'') = 'Mitraa'
	BEGIN
		SET @LEVEL1_EMAIL = @W2_EMAIL
		SET @LEVEL2_EMAIL = @W3_EMAIL
		SET @LEVEL3_EMAIL = @W4_EMAIL
		SET @LEVEL4_EMAIL = @W5_EMAIL
		SET @LEVEL5_EMAIL = @W6_EMAIL
		SET @LEVEL6_EMAIL = @W7_EMAIL

		SET @Level_1_Full_Name = @W2_Full_Name
		SET @LEVEL_2_Full_Name = @W3_Full_Name
		SET @LEVEL_3_Full_Name = @W4_Full_Name
		SET @LEVEL_4_Full_Name = @W5_Full_Name
		SET @LEVEL_5_Full_Name = @W6_Full_Name
		SET @LEVEL_6_Full_Name = @W7_Full_Name
	END

	ELSE IF ISNULL(@W4_EMAIL,'') = 'Mitraa'
	BEGIN
		SET @LEVEL1_EMAIL = @W3_EMAIL
		SET @LEVEL2_EMAIL = @W4_EMAIL
		SET @LEVEL3_EMAIL = @W5_EMAIL
		SET @LEVEL4_EMAIL = @W6_EMAIL
		SET @LEVEL5_EMAIL = @W7_EMAIL

		SET @Level_1_Full_Name = @W3_Full_Name
		SET @LEVEL_2_Full_Name = @W4_Full_Name
		SET @LEVEL_3_Full_Name = @W5_Full_Name
		SET @LEVEL_4_Full_Name = @W6_Full_Name
		SET @LEVEL_5_Full_Name = @W7_Full_Name
	END

	ELSE IF ISNULL(@W5_EMAIL,'') = 'Mitraa'
	BEGIN
		SET @LEVEL1_EMAIL = @W4_EMAIL
		SET @LEVEL2_EMAIL = @W5_EMAIL
		SET @LEVEL3_EMAIL = @W6_EMAIL
		SET @LEVEL4_EMAIL = @W7_EMAIL

		SET @Level_1_Full_Name = @W4_Full_Name
		SET @LEVEL_2_Full_Name = @W5_Full_Name
		SET @LEVEL_3_Full_Name = @W6_Full_Name
		SET @LEVEL_4_Full_Name = @W7_Full_Name
	END

	ELSE IF ISNULL(@W6_EMAIL,'') = 'Mitraa'
	BEGIN
		SET @LEVEL1_EMAIL = @W5_EMAIL
		SET @LEVEL2_EMAIL = @W6_EMAIL
		SET @LEVEL3_EMAIL = @W7_EMAIL
		
		SET @Level_1_Full_Name = @W5_Full_Name
		SET @LEVEL_2_Full_Name = @W6_Full_Name
		SET @LEVEL_3_Full_Name = @W7_Full_Name
	END

	ELSE IF ISNULL(@W7_EMAIL,'') = 'Mitraa'
	BEGIN
		SET @LEVEL1_EMAIL = @W6_EMAIL
		SET @LEVEL2_EMAIL = @W7_EMAIL		

		SET @Level_1_Full_Name = @W6_Full_Name
		SET @LEVEL_2_Full_Name = @W7_Full_Name
	END

	IF (@LEVEL1_EMAIL='JUDSON' OR @LEVEL2_EMAIL='Mitraa')
	BEGIN
		INSERT INTO [dbo].[Employee_CYData_Staging] (
			[Email]
			,[Full_Name]
			,[ManagerEmail]
			,[Reports_To_Full_Name]
			,[Reports_To_Level_1_Email]
			,[Reports_To_Level_2_Email]
			,[Reports_To_Level_3_Email]
			,[Reports_To_Level_4_Email]
			,[Reports_To_Level_5_Email]
			,[Reports_To_Level_6_Email]
			,[Reports_To_Level_7_Email]
			,[Reports_To_Level_1_Full_Name]
			,[Reports_To_Level_2_Full_Name]
			,[Reports_To_Level_3_Full_Name]
			,[Reports_To_Level_4_Full_Name]
			,[Reports_To_Level_5_Full_Name]
			,[Reports_To_Level_6_Full_Name]
			,[Reports_To_Level_7_Full_Name]
			,[isp_worker]
			,[isp_org]
			,[isp_qualifier1]  
			,[isp_costcenter]              
			,[isp_incentiveplan]           
			,[isp_careerstage]             
			,[isp_qualifier2]              
			,[isp_rolesummary]
		)
		VALUES (
			@Email
			,@Full_Name
			,@ManagerEmail
			,@Reports_To_Full_Name
			,@LEVEL1_EMAIL
			,@LEVEL2_EMAIL
			,@LEVEL3_EMAIL
			,@LEVEL4_EMAIL
			,@LEVEL5_EMAIL
			,@LEVEL6_EMAIL
			,@LEVEL7_EMAIL
			,@Level_1_Full_Name
			,@LEVEL_2_Full_Name
			,@LEVEL_3_Full_Name
			,@LEVEL_4_Full_Name
			,@LEVEL_5_Full_Name
			,@LEVEL_6_Full_Name
			,@LEVEL_7_Full_Name
			,@isp_worker
			,@isp_org
			,@isp_qualifier1
			,@isp_costcenter
			,@isp_incentiveplan
			,@isp_careerstage
			,@isp_qualifier2
			,@isp_rolesummary
		)
	END
	SET @i=@i+1
END

DROP TABLE IF EXISTS #tmpName
DROP TABLE IF EXISTS #tmprec

END