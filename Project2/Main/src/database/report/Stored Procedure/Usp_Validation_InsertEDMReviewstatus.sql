CREATE  PROCEDURE report.Usp_Validation_InsertEDMReviewstatus
as
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Insert counts from dbo.PlanSeller
        INSERT INTO report.Validation_Reviewstatus (Reviewstatus, EDMReviewstatuscode, CountInplanSellerTable)
        SELECT 'Pending status count', '757580000', COUNT(*) FROM dbo.PlanSeller WHERE edm_reviewstatus='757580000'

        UNION ALL

        SELECT 'Approved status count', '757580002', COUNT(*) FROM dbo.PlanSeller WHERE edm_reviewstatus='757580002'

        UNION ALL

        SELECT 'Exception status count', '757580003', COUNT(*) FROM dbo.PlanSeller WHERE edm_reviewstatus='757580003'

        UNION ALL

        SELECT 'Reviewed status count', '757580001', COUNT(*) FROM dbo.PlanSeller WHERE edm_reviewstatus='757580001'

        UNION ALL

        SELECT 'Null Status', NULL, COUNT(*) FROM dbo.PlanSeller WHERE edm_reviewstatus IS NULL;

        -- Update counts from HR.Tbl_Seller_Details
        UPDATE report.Validation_Reviewstatus
        SET CountInSellerDetailsTable = (
            SELECT COUNT(*) FROM HR.Tbl_Seller_Details WHERE reviewstatus = 
            CASE 
                WHEN EDMReviewstatuscode = '757580000' THEN 'Pending'
                WHEN EDMReviewstatuscode = '757580002' THEN 'Approved'
                WHEN EDMReviewstatuscode = '757580003' THEN 'Exception'
                WHEN EDMReviewstatuscode = '757580001' THEN 'Reviewed'
                ELSE 'Null'
            END
        );

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END

