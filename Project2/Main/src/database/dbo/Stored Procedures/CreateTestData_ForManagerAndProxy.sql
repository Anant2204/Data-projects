--CreateTestData_ForManagerAndProxy 'hnoriega'
CREATE PROCEDURE [dbo].CreateTestData_ForManagerAndProxy @manageralias NVARCHAR(20)
	,@proxyAlias NVARCHAR(20)=''
AS
--validate the hierarchy is not broken and validate his record in hr data table
IF EXISTS (
		SELECT ManagerAlias
		FROM hr.Dim_Managerhierarchy
		WHERE ic = @manageralias
			AND ManagerAlias IN ('RIWAGNER','JUDSON')
		)
BEGIN
	IF EXISTS (
			SELECT 1
			FROM hr.Tbl_HRData
			WHERE CY_ManagerAlias = @manageralias
			)
	BEGIN

		IF NOT EXISTS (
				SELECT 1
				FROM [user]
				WHERE alias = @manageralias
				)
		BEGIN	
		
			INSERT INTO [user] (alias)
			VALUES (@manageralias)
		END

		IF NOT EXISTS (
				SELECT 1
				FROM [userrole]
				WHERE alias = @manageralias
					AND roleid = 1
				)
		BEGIN

			INSERT INTO [Userrole] (alias,roleId)
			VALUES (@manageralias,1	)
		END
--update taxonomy for test
		UPDATE hr.Tbl_HRData
		SET FY_Q2 = 'Azure'
			,IsConversationRequired = 1
			,FY_IncentivePlan = 'S2'
		WHERE ic IN (
				SELECT TOP 1 ic
				FROM hr.Tbl_HRData
				WHERE CY_ManagerAlias = @manageralias
				)

		--find peer
		DECLARE @dmanagerAlias NVARCHAR(20),@managerLevel INT

		SELECT @dmanagerAlias = max(DirectManagerAlias)
			,@managerLevel = max(ManagerLevel)
		FROM hr.Dim_Managerhierarchy
		WHERE ic = @manageralias
		GROUP BY ManagerLevel

		DECLARE @ic NVARCHAR(10)

		SELECT TOP 1 @ic = ic
		FROM hr.Tbl_HRData
		WHERE CY_ManagerAlias IN (
				SELECT ic
				FROM hr.Dim_Managerhierarchy
				WHERE ic NOT IN (@manageralias)
					AND DirectManagerAlias = @dmanagerAlias
					AND ManagerLevel = @managerLevel
				)
		--print @ic
		--update futuremanager for test
		UPDATE hr.Tbl_HRData
		SET FY_ManagerAlias = @manageralias
			,FY_ManagerFullName = (
				SELECT top 1 IC_FullName
				FROM hr.Dim_Managerhierarchy
				WHERE ic = @manageralias
				)
			,IsConversationRequired = 1
			,FymanagerChange = 'Y'
		WHERE ic IN (@ic)
	END
END

