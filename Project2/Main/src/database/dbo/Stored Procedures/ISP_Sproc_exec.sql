

CREATE  procedure [dbo].[ISP_Sproc_exec]
@isProd bit = 0
AS
begin
	BEGIN TRY
-- exec [HR].[SetupSeedData]  --TODO Tanmay to check and come back
exec [dbo].[Usp_CheckRowCountThreshold] --Added on 5th june 2024 to check threshold Value for all Base tables
exec [HR].[Insert_Org_CostCenter_Mapping]
exec [HR].[Insert_MCT_EDM_Mapping]
exec [HR].[Insert_MCT_EDM_Mapping_CY]
exec [dbo].[Load_Employee_CYData]
exec [dbo].[Load_HRDataLake_CYData_from_ISP]

IF DATEFROMPARTS(YEAR(GETUTCDATE()), MONTH(GETUTCDATE()), DAY(GETUTCDATE())) <= DATEFROMPARTS(YEAR(GETUTCDATE()), 6, 30)
BEGIN
	exec [dbo].[ISP_Seller_Load]
END
ELSE
BEGIN
	IF NOT EXISTS (SELECT TOP 1 1 FROM [HR].[Tbl_Seller_Details_30thJune](NOLOCK))
	BEGIN
		INSERT INTO [HR].[Tbl_Seller_Details_30thJune] 
			SELECT * FROM [HR].[Tbl_Seller_Details](NOLOCK)
	END
	exec [dbo].[ISP_Seller_Load_After30thJune]
END
--exec [dbo].[ISP_MissingPersonLoad]
EXEC [HR].[Usp_Load_HR_BaseData]
EXEC [HR].[usp_Update_Manual_MgrError]
exec [HR].[Usp_Generate_ManagerHierarchy]
exec [dbo].[Usp_UpdateUserEmailId] @isProd
-- exec [HR].[Usp_RoleChangeProcessing] -- This not required anymore
exec [dbo].[EDMApproversmappingwithManagers] --TODO we need to comment this out as we have separate SP 
exec [HR].[Usp_UpdateDiscipline_Profession_HRdata] -- Added as part of story 940262 , task -941917
exec [DBO].[Usp_PopulateManagerAccessDetails] -- Added as part of Story 935013 , task -941415
exec [HR].[SwtichStagingToMainTable]
exec [dbo].Usp_CleanupProxyUsers -- Added to  clean proxy users at last
END TRY
BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(MAX)
        DECLARE @ErrorProcedure NVARCHAR(128)

        SET @ErrorMessage = ERROR_MESSAGE()
        SET @ErrorProcedure = ERROR_PROCEDURE()
	   
		--- Log or handle the error here to throw inner SP name 
        PRINT 'Error in SP  ' + @ErrorProcedure + ': ' + @ErrorMessage;
		THROW;
END CATCH
end
