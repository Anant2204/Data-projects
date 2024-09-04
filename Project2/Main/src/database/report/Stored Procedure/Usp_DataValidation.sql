/*Created on 16th may as part of Data Validation .This is a wrapper SP and used to execute the related SPs that will be used as part of reporting and data validation**/ 

CREATE PROCEDURE [report].[Usp_DataValidation]
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        
       exec [report].[Usp_Validation_UpdateRowCount];--- To update the row count for existing tables in the DB and also add any new tables if created in the 
        
        exec [report].[Usp_Validation_InsertUserAccessRecordCount];-- To Insert the record count of users present in user role table and the reason for their access 
        
       -- exec [report].[Usp_Validation_InsertUserAccessSourceType];--To insert the users who got access in the userrole table and the reason for their access

        exec [report].[Usp_Validation_InsertEDMReviewstatus] -- To insert the count of different status in the PlanSeller table and the count of the same in the SellerDetails table
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(MAX)
        DECLARE @ErrorProcedure NVARCHAR(128)

        SET @ErrorMessage = ERROR_MESSAGE()
        SET @ErrorProcedure = ERROR_PROCEDURE()
	   
		--- Log or handle the error here to throw inner SP name 
        PRINT 'Error in SP  ' + @ErrorProcedure + ': ' + @ErrorMessage;
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        THROW;
    END CATCH
END