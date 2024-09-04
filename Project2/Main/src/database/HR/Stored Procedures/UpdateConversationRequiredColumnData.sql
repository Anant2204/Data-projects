CREATE PROCEDURE UpdateConversationRequiredColumnData  
    @ManagerAlias varchar(100),  
    @ConversationRequired BIT  
AS  
BEGIN  
    BEGIN TRY  
        BEGIN TRANSACTION;  
  
        IF NOT EXISTS (SELECT 1 from [HR].[TBL_OrgLeader] WHERE Manager = @ManagerAlias)  
            RETURN  
          
        UPDATE [HR].[TBL_OrgLeader]   
        SET ConversationRequired = CASE   
                WHEN @ConversationRequired = 1 THEN 'Yes'  
                ELSE 'No'  
        END  
        WHERE Manager = @ManagerAlias  
  
        IF @ConversationRequired = 1  
        BEGIN  
            UPDATE [HR].[Tbl_HRData] SET IsConversationRequired = 1  
            WHERE (Reports_To_Level_1_Email = @ManagerAlias  
                OR Reports_To_Level_2_Email = @ManagerAlias  
                OR Reports_To_Level_3_Email = @ManagerAlias  
                OR Reports_To_Level_4_Email = @ManagerAlias  
                OR Reports_To_Level_5_Email = @ManagerAlias  
                OR Reports_To_Level_6_Email = @ManagerAlias  
                OR Reports_To_Level_7_Email = @ManagerAlias)  
        END  
        ELSE  
        BEGIN  
            UPDATE [HR].[Tbl_HRData] SET IsConversationRequired = CASE  
                WHEN (CY_Org!=FY_Org  
                    OR CY_RoleSummary!=FY_RoleSummary   
                    OR CY_Q1!=FY_Q1   
                    OR CY_Q2!=FY_Q2  
                    OR CY_Discipline!=FY_Discipline   
                    OR CY_Profession!=FY_Profession   
                    OR CY_IncentivePlan!=FY_IncentivePlan   
                    OR CY_CareerStage!=FY_CareerStage)  
                    OR [FYManagerChange]='Y'
					OR ((SELECT Distinct DirectManagerAlias FROM hr.Dim_Managerhierarchy WHERE MType='CY' and IC = CY_ManagerAlias)!=(SELECT Distinct DirectManagerAlias FROM hr.Dim_Managerhierarchy WHERE MType='FY' and IC = FY_ManagerAlias))
					THEN 1 ELSE 0 END  
            WHERE (Reports_To_Level_1_Email = @ManagerAlias  
                OR Reports_To_Level_2_Email = @ManagerAlias  
                OR Reports_To_Level_3_Email = @ManagerAlias  
                OR Reports_To_Level_4_Email = @ManagerAlias  
                OR Reports_To_Level_5_Email = @ManagerAlias  
                OR Reports_To_Level_6_Email = @ManagerAlias  
                OR Reports_To_Level_7_Email = @ManagerAlias)       	  
          
        END  
  
        EXEC [dbo].[Usp_PopulateManagerAccessDetails];  
  
        EXEC sp_rename 'dbo.[User]', 'User_Old';  
        EXEC sp_rename 'dbo.user_staging', 'User';  
        EXEC sp_rename 'dbo.User_Old', 'user_staging';  
   
        EXEC sp_rename 'dbo.[Userrole]', 'Userrole_Old';  
        EXEC sp_rename 'dbo.userrole_staging', 'Userrole';  
        EXEC sp_rename 'dbo.Userrole_Old', 'userrole_staging';  
  
        COMMIT;  
    END TRY  
    BEGIN CATCH  
        ROLLBACK;  
            RAISERROR('Error occured while updating conversation required column data', 1,1);  
        THROW;  
    END CATCH  
END;