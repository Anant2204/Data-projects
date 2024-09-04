


CREATE PROCEDURE [HR].[Usp_SubmitICRolePreferenceResponse] (
	@Alias VARCHAR(255)
	,@PreferredRole VARCHAR(255)
	)
AS
BEGIN
	DECLARE @Return VARCHAR(200)

	--Update Record
	BEGIN
		BEGIN TRY
			BEGIN TRAN

			UPDATE HR.Tbl_ICRoleSelection
			SET PreferredRole = @PreferredRole
				,HasSelectedFutureRole = 1
				,UpdatedBy = @Alias
				,UpdateOn = GETDATE()
			WHERE IC = @Alias

			COMMIT TRAN

			SET @Return = 'Preference Recorded successfully!'
		END TRY

		BEGIN CATCH
			ROLLBACK TRAN

			SET @Return = 'Something went wrong please report this to AskUSBI@microsoft.com. Ref:' + ERROR_MESSAGE()
		END CATCH

		SELECT Returnparam = @Return

		RETURN
	END
END