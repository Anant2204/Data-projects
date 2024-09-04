/******    Script Date: 18-03-2024 17:54:58 ******/
/******Created by Tanmay as part of  Task # 960176 for Automated manager access on 18th march 2024 
1. This SP takes three inputs and insert them into org leader table if it does not exists and inserts them as managers into the user and userrole table .
2. If no parameter is supplied, it simply scans the org leaders tables and inserts them into user and user role table if it is not present *****/ 



Create   PROCEDURE [dbo].[Usp_Insert_OrgLeader_UserRole]
    @Manager NVARCHAR(50) = NULL,
    @ConversationRequired NVARCHAR(3) = NULL,
    @TwoLevelApprovalRequired BIT = NULL
AS
BEGIN
    DECLARE @ManagerRole INT
    DECLARE @EDMLeadRole  INT

    -- If parameters are supplied, insert into [HR].[TBL_OrgLeader]
    IF @Manager IS NOT NULL
    BEGIN
        BEGIN TRY
            INSERT INTO [HR].[TBL_OrgLeader] ([Manager], [ConversationRequired], [twoLevelApprovalRequired])
            VALUES (@Manager, @ConversationRequired, @TwoLevelApprovalRequired)
        END TRY
        BEGIN CATCH
            IF ERROR_NUMBER() = 2627 -- Primary key violation error number
            BEGIN
                PRINT 'The User '+@Manager+'  you are trying to insert already exists in HR.TBL_Orgleader Table'
            END
            ELSE
            BEGIN
                THROW;
            END
        END CATCH
    END

    -- Get the role ID for 'Manager' and EDM Lead
    SELECT @ManagerRole = id FROM dbo.[role] WHERE name = 'Manager'
    SELECT @EDMLeadRole = id FROM dbo.[role] WHERE name = 'EDM Lead'

    -- Insert all managers from [HR].[TBL_OrgLeader] into dbo.[user] and dbo.[userrole]
    INSERT INTO dbo.[user] (alias, isactive)
    SELECT [Manager], 1
    FROM [HR].[TBL_OrgLeader]
    WHERE [Manager] NOT IN (SELECT alias FROM dbo.[user])

    -- Insert into dbo.[userrole] if not already exists
    INSERT INTO dbo.[userrole] (alias, roleid, isactive, source)
    SELECT [Manager], @ManagerRole, 1, 'MCT'
    FROM [HR].[TBL_OrgLeader]
    WHERE [Manager] NOT IN (SELECT alias FROM dbo.[userrole] where roleId=@ManagerRole)


END;