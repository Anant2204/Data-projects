



CREATE PROCEDURE [HR].[Usp_SubmitFyMgrTalksReponse]
     (@Round varchar(10),
      @IC VARCHAR(200),
      @TeamUpdate VARCHAR (10),
      @CStatus varchar(255),
      @EDMStatus varchar(255),
      @Comments varchar(500), 
      @Org varchar(255),
      @RS varchar(255),
      @Q1 varchar(255),
      @Q2 varchar(255),
      @Updatedy varchar(255),
	  @FY23CorrectManager varchar(255))
AS
BEGIN

Declare @R1Manager varchar(255)
Declare @R2Manager varchar(255)
Declare @Return VARCHAR(200)




SET @R1Manager =  (Select MAX(CY_ManagerAlias) from HR.Tbl_HRData where IC = @IC)
SET @R2Manager =  (Select MAX(FY_ManagerAlias) from HR.Tbl_HRData where IC = @IC)

--Update R1 Team Records

IF @Round =  'R1' and @TeamUpdate = 'true' 
BEGIN
	BEGIN TRY
			BEGIN TRAN
Update A 
     SET  R1_ConversationStatus =  @CStatus
	     ,R1_EDMValidation = CASE WHEN @EDMStatus = 'Select one' then 'Pending' Else @EDMStatus END
        /* ,R1_Comments =  @Comments
        ,R1_Org = @Org
        ,R1_RS = @RS
        ,R1_Q1 = @Q1
        ,R1_Q2 = @Q2
        
		 ,R1_FY23CorrectManager = @FY23CorrectManager*/
         ,R1_update =  GETDATE()	
		  ,R1_updatedby = @Updatedy
         ,R1_CoversationLevel = 'Team'
		-- ,[Status]= 'Request Iniated'
FROM HR.Tbl_HRData_ToolInput A
INNER JOIN HR.Tbl_HRData B ON A.IC = B.IC
Where  CY_ManagerAlias = @R1Manager --AND LOA = 'N'

			COMMIT TRAN

			SET @Return = 'Response Submitted successfully!'
		END TRY
BEGIN CATCH
			ROLLBACK TRAN

			SET @Return = 'Something went wrong please report this to mct@microsoft.com. Ref:' + ERROR_MESSAGE()
		END CATCH

		SELECT Returnparam = @Return

		RETURN
	END

END

--Update R1 Individual Record for Pending and Correct status

IF @Round =  'R1' and @TeamUpdate = 'false' and @EDMStatus in ('Pending','Correct')
BEGIN
	BEGIN TRY
			BEGIN TRAN

	Update A
     SET  R1_ConversationStatus =  @CStatus
	     ,R1_EDMValidation = CASE WHEN @EDMStatus = 'Select one' then 'Pending' Else @EDMStatus END
         ,R1_Comments =  @Comments
         ,R1_Org = @Org
         ,R1_RS = @RS
        ,R1_Q1 = @Q1
        ,R1_Q2 = @Q2
         
		 ,R1_FY23CorrectManager=@FY23CorrectManager
         ,R1_update =  GETDATE()	
		 ,R1_updatedby = @Updatedy
         ,R1_CoversationLevel = 'Individual'	
		-- ,[Status]= 'Request Initiated'
FROM HR.Tbl_HRData_ToolInput A
Where  IC = @IC

			COMMIT TRAN

			SET @Return = 'Response Submitted successfully!'
		END TRY
BEGIN CATCH
			ROLLBACK TRAN

			SET @Return = 'Something went wrong please report this to mct@microsoft.com. Ref:' + ERROR_MESSAGE()
		END CATCH

		SELECT Returnparam = @Return

		RETURN
	END
--

IF @Round =  'R1' and @TeamUpdate = 'false' and @EDMStatus not in ('Pending','Correct')
BEGIN
	BEGIN TRY
			BEGIN TRAN
IF @EDMStatus = 'Incorrect Reporting Manager' 
Begin
	Update A
     SET  R1_ConversationStatus =  @CStatus
	     ,R1_EDMValidation = CASE WHEN @EDMStatus = 'Select one' then 'Pending' Else @EDMStatus END
         ,R1_Comments =  @Comments
         
         ,R1_updatedby = @Updatedy
		 ,R1_FY23CorrectManager=@FY23CorrectManager
         ,R1_update =  GETDATE()		
         ,R1_CoversationLevel = 'Individual'	
		 ,[Status]= 'Request Initiated'
FROM HR.Tbl_HRData_ToolInput A
Where  IC = @IC
END

IF @EDMStatus in ( 'Incorrect EDM' , 'Not Sure')
Begin
Update A
     SET  R1_ConversationStatus =  @CStatus
	     ,R1_EDMValidation = CASE WHEN @EDMStatus = 'Select one' then 'Pending' Else @EDMStatus END
         ,R1_Comments =  @Comments
         ,R1_Org = @Org
         ,R1_RS = @RS
        ,R1_Q1 = @Q1
        ,R1_Q2 = @Q2       
		 
         ,R1_update =  GETDATE()	
		 ,R1_updatedby = @Updatedy
         ,R1_CoversationLevel = 'Individual'	
		 ,[Status]= 'Request Initiated'
FROM HR.Tbl_HRData_ToolInput A
Where  IC = @IC
END
			COMMIT TRAN

			SET @Return = 'Response Submitted successfully!'
		END TRY
BEGIN CATCH
			ROLLBACK TRAN

			SET @Return = 'Something went wrong please report this to mct@microsoft.com. Ref:' + ERROR_MESSAGE()
		END CATCH

		SELECT Returnparam = @Return

		RETURN
	END

-------------------------------R2 updates-------------------------------------------------------------


IF @Round =  'R2' and @TeamUpdate = 'true'
BEGIN
	BEGIN TRY
			BEGIN TRAN
Update A 
     SET  R2_ConversationStatus =  @CStatus
	     ,R2_EDMValidation = CASE WHEN @EDMStatus = 'Select one' then 'Pending' Else @EDMStatus END
         /*,R2_Comments =  @Comments
         ,R2_Org = @Org
        ,R2_RS = @RS
        ,R2_Q1 = @Q1
        ,R2_Q2 = @Q2
         
		 ,R2_FY23CorrectManager=@FY23CorrectManager*/
         ,R2_update =  GETDATE()	
		 ,R2_updatedby = @Updatedy
         ,R2_CoversationLevel = 'Team'
		 --,[Status]= 'Request Initiated'
FROM HR.Tbl_HRData_ToolInput A
INNER JOIN HR.Tbl_HRData B ON A.IC = B.IC
Where  CY_ManagerAlias = @R2Manager --AND LOA = 'N'

			COMMIT TRAN

			SET @Return = 'Response Submitted successfully!'
		END TRY
BEGIN CATCH
			ROLLBACK TRAN

			SET @Return = 'Something went wrong please report this to mct@microsoft.com. Ref:' + ERROR_MESSAGE()
		END CATCH

		SELECT Returnparam = @Return

		RETURN
	END


IF @Round =  'R2' and @TeamUpdate = 'false' and @EDMStatus in ('Pending','Correct')
BEGIN
	BEGIN TRY
			BEGIN TRAN
--Update R2 Individual Record
	Update A
     SET  R2_ConversationStatus =  @CStatus
	     ,R2_EDMValidation = CASE WHEN @EDMStatus = 'Select one' then 'Pending' Else @EDMStatus END
         ,R2_Comments =  @Comments
         ,R2_Org = @Org
         ,R2_RS = @RS
        ,R2_Q1 = @Q1
        ,R2_Q2 = @Q2
        ,R2_updatedby = @Updatedy
		,R2_FY23CorrectManager=@FY23CorrectManager
         ,R2_update =  GETDATE()		
         ,R2_CoversationLevel = 'Individual'	
		-- ,[Status]= 'Request Initiated'
FROM HR.Tbl_HRData_ToolInput A
Where  IC = @IC

			COMMIT TRAN

			SET @Return = 'Response Submitted successfully!'
		END TRY
BEGIN CATCH
			ROLLBACK TRAN

			SET @Return = 'Something went wrong please report this to mct@microsoft.com. Ref:' + ERROR_MESSAGE()
		END CATCH

		SELECT Returnparam = @Return

		RETURN
	END

	

IF @Round =  'R2' and @TeamUpdate = 'false' and @EDMStatus not in ('Pending','Correct')
BEGIN
	BEGIN TRY
			BEGIN TRAN
--Update R2 Individual Record
IF @EDMStatus = 'Incorrect Reporting Manager' 
Begin
	Update A
     SET  R2_ConversationStatus =  @CStatus
	     ,R2_EDMValidation = CASE WHEN @EDMStatus = 'Select one' then 'Pending' Else @EDMStatus END
         ,R2_Comments =  @Comments
         /*,R2_Org = @Org
         ,R2_RS = @RS
        ,R2_Q1 = @Q1
        ,R2_Q2 = @Q2*/
        ,R2_updatedby = @Updatedy
		,R2_FY23CorrectManager=@FY23CorrectManager
         ,R2_update =  GETDATE()		
         ,R2_CoversationLevel = 'Individual'	
		 ,[Status]= 'Request Initiated'
FROM HR.Tbl_HRData_ToolInput A
Where  IC = @IC
END
IF @EDMStatus in ( 'Incorrect EDM' , 'Not Sure')
Begin
	Update A
     SET  R2_ConversationStatus =  @CStatus
	     ,R2_EDMValidation = CASE WHEN @EDMStatus = 'Select one' then 'Pending' Else @EDMStatus END
         ,R2_Comments =  @Comments
         ,R2_Org = @Org
         ,R2_RS = @RS
        ,R2_Q1 = @Q1
        ,R2_Q2 = @Q2
        ,R2_updatedby = @Updatedy
		--,R2_FY23CorrectManager=@FY23CorrectManager
         ,R2_update =  GETDATE()		
         ,R2_CoversationLevel = 'Individual'	
		 ,[Status]= 'Request Initiated'
FROM HR.Tbl_HRData_ToolInput A
Where  IC = @IC
END
			COMMIT TRAN

			SET @Return = 'Response Submitted successfully!'
		END TRY

BEGIN CATCH
			ROLLBACK TRAN

			SET @Return = 'Something went wrong please report this to mct@microsoft.com. Ref:' + ERROR_MESSAGE()
		END CATCH

		SELECT Returnparam = @Return

		RETURN
	END
--GO
--GRANT EXECUTE
 --   ON OBJECT::[HR].[Usp_SubmitFyMgrTalksReponse] TO [MCT_AllUsers]
  --  AS [dbo];


--GO
--GRANT EXECUTE
 --  ON OBJECT::[HR].[Usp_SubmitFyMgrTalksReponse] TO [MCT_EDM_DataKeepers]
  --  AS [dbo];


--GO
--GRANT EXECUTE
--    ON OBJECT::[HR].[Usp_SubmitFyMgrTalksReponse] TO [MCT_Proxyusers]
 --   AS [dbo];

