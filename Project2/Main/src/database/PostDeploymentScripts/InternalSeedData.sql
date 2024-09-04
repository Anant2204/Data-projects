---[role] table insert start----
IF NOT EXISTS (SELECT 1 FROM [role] WHERE name = 'Manager')
    INSERT INTO [role] (name) VALUES ('Manager');
 
IF NOT EXISTS (SELECT 1 FROM [role] WHERE name = 'Admin')
    INSERT INTO [role] (name) VALUES ('Admin');
 
IF NOT EXISTS (SELECT 1 FROM [role] WHERE name = 'EDM Lead')
    INSERT INTO [role] (name) VALUES ('EDM Lead');
 
IF NOT EXISTS (SELECT 1 FROM [role] WHERE name = 'Script Contributor')
    INSERT INTO [role] (name) VALUES ('Script Contributor');

IF NOT EXISTS (SELECT 1 FROM [role] WHERE name = 'Delegate')
    INSERT INTO [role] (name) VALUES ('Delegate');

IF NOT EXISTS (SELECT 1 FROM [role] WHERE name = 'Super User')
    INSERT INTO [role] (name) VALUES ('Super User');

---[role] table insert end----

---[permission] table insert start----
	IF NOT EXISTS (SELECT 1 FROM [permission] WHERE name = 'read')
    INSERT INTO [permission] (name) VALUES ('read');
 
IF NOT EXISTS (SELECT 1 FROM [permission] WHERE name = 'write')
    INSERT INTO [permission] (name) VALUES ('write');
 
IF NOT EXISTS (SELECT 1 FROM [permission] WHERE name = 'approve')
    INSERT INTO [permission] (name) VALUES ('approve');
---[permission] table insert end----

---feature table insert start----
IF NOT EXISTS (SELECT 1 FROM feature WHERE name = 'Summary')
INSERT INTO feature (name) VALUES ('Summary');
 
IF NOT EXISTS (SELECT 1 FROM feature WHERE name = 'SendStayConversation')
    INSERT INTO feature (name) VALUES ('SendStayConversation');
 
IF NOT EXISTS (SELECT 1 FROM feature WHERE name = 'ReceiveConversation')
    INSERT INTO feature (name) VALUES ('ReceiveConversation');
 
IF NOT EXISTS (SELECT 1 FROM feature WHERE name = 'ConversationScript')
    INSERT INTO feature (name) VALUES ('ConversationScript');
 
IF NOT EXISTS (SELECT 1 FROM feature WHERE name = 'FutureManagerCorrection')
    INSERT INTO feature (name) VALUES ('FutureManagerCorrection');
 
IF NOT EXISTS (SELECT 1 FROM feature WHERE name = 'Reports')
    INSERT INTO feature (name) VALUES ('Reports');

IF NOT EXISTS (SELECT 1 FROM feature WHERE name = 'AssignProxy')
    INSERT INTO feature (name) VALUES ('AssignProxy');

IF NOT EXISTS (SELECT 1 FROM feature WHERE name = 'AssignEDMLead')
    INSERT INTO feature (name) VALUES ('AssignEDMLead');

IF NOT EXISTS (SELECT 1 FROM feature WHERE name = 'AssignScriptContributor')
    INSERT INTO feature (name) VALUES ('AssignScriptContributor');

IF NOT EXISTS (SELECT 1 FROM feature WHERE name = 'Notifications')
    INSERT INTO feature (name) VALUES ('Notifications');

IF NOT EXISTS (SELECT 1 FROM feature WHERE name = 'TaxonomyCorrection')
    INSERT INTO feature (name) VALUES ('TaxonomyCorrection');

IF NOT EXISTS (SELECT 1 FROM feature WHERE name = 'ImportScript')
    INSERT INTO feature (name) VALUES ('ImportScript');

---feature table insert end----


---featureRolePermissionMapping table insert start----
-- Declare and set feature variables
DECLARE @SummaryId int, @SendStayConversationId int, @ReceiveConversationId int, @ConversationScriptId int, 
        @FutureManagerCorrectionId int, @ReportsId int, @ReportsVnextId int, @AssignProxyId int, 
        @AssignEDMLeadId int, @AssignScriptContributorId int, @NotificationsId int, @TaxonomyCorrectionId int,@ImportScriptId int;

SELECT @SummaryId = id FROM feature WHERE name ='Summary';
SELECT @SendStayConversationId = id FROM feature WHERE name ='SendStayConversation';
SELECT @ReceiveConversationId = id FROM feature WHERE name ='ReceiveConversation';
SELECT @ConversationScriptId = id FROM feature WHERE name ='ConversationScript';
SELECT @FutureManagerCorrectionId = id FROM feature WHERE name ='FutureManagerCorrection';
SELECT @ReportsId = id FROM feature WHERE name ='Reports';
SELECT @ReportsVnextId = id FROM feature WHERE name ='Reports-vnext';
SELECT @AssignProxyId = id FROM feature WHERE name ='AssignProxy';
SELECT @AssignEDMLeadId = id FROM feature WHERE name ='AssignEDMLead';
SELECT @AssignScriptContributorId = id FROM feature WHERE name ='AssignScriptContributor';
SELECT @NotificationsId = id FROM feature WHERE name ='Notifications';
SELECT @TaxonomyCorrectionId = id FROM feature WHERE name ='TaxonomyCorrection';
SELECT @ImportScriptId = id FROM feature WHERE name ='ImportScript';

-- Declare and set role variables
DECLARE @ManagerId int, @AdminId int, @EDMLeadId int, @ScriptContributorId int, @DelegateId int, @SuperUserId int;

SELECT @ManagerId = id FROM [role] WHERE name = 'Manager';
SELECT @AdminId = id FROM [role] WHERE name = 'Admin';
SELECT @EDMLeadId = id FROM [role] WHERE name = 'EDM Lead';
SELECT @ScriptContributorId = id FROM [role] WHERE name = 'Script Contributor';
SELECT @DelegateId = id FROM [role] WHERE name = 'Delegate';
SELECT @SuperUserId = id FROM [role] WHERE name = 'Super User';

-- Declare and set permission variables
DECLARE @ReadId int, @WriteId int, @ApproveId int;

SELECT @ReadId = id FROM [permission] WHERE name = 'read';
SELECT @WriteId = id FROM [permission] WHERE name = 'write';
SELECT @ApproveId = id FROM [permission] WHERE name = 'approve';
---featureRolePermissionMapping table insert end----

IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @SummaryId AND [roleId] = @ManagerId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@SummaryId, @ManagerId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @SummaryId AND [roleId] = @ManagerId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@SummaryId, @ManagerId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @SendStayConversationId AND [roleId] = @ManagerId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@SendStayConversationId, @ManagerId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @SendStayConversationId AND [roleId] = @ManagerId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@SendStayConversationId, @ManagerId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ReceiveConversationId AND [roleId] = @ManagerId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ReceiveConversationId, @ManagerId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ReceiveConversationId AND [roleId] = @ManagerId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ReceiveConversationId, @ManagerId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @FutureManagerCorrectionId AND [roleId] = @ManagerId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@FutureManagerCorrectionId, @ManagerId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @FutureManagerCorrectionId AND [roleId] = @ManagerId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@FutureManagerCorrectionId, @ManagerId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @FutureManagerCorrectionId AND [roleId] = @ManagerId AND [permissionId] = @ApproveId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@FutureManagerCorrectionId, @ManagerId, @ApproveId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @SummaryId AND [roleId] = @AdminId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@SummaryId, @AdminId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @SendStayConversationId AND [roleId] = @AdminId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@SendStayConversationId, @AdminId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ReceiveConversationId AND [roleId] = @AdminId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ReceiveConversationId, @AdminId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ConversationScriptId AND [roleId] = @AdminId AND [permissionId] = @ApproveId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ConversationScriptId, @AdminId, @ApproveId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ReportsId AND [roleId] = @AdminId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ReportsId, @AdminId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ConversationScriptId AND [roleId] = @AdminId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ConversationScriptId, @AdminId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ConversationScriptId AND [roleId] = @AdminId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ConversationScriptId, @AdminId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @SummaryId AND [roleId] = @EDMLeadId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@SummaryId, @EDMLeadId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @SendStayConversationId AND [roleId] = @EDMLeadId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@SendStayConversationId, @EDMLeadId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ReceiveConversationId AND [roleId] = @EDMLeadId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ReceiveConversationId, @EDMLeadId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @FutureManagerCorrectionId AND [roleId] = @EDMLeadId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@FutureManagerCorrectionId, @EDMLeadId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @FutureManagerCorrectionId AND [roleId] = @EDMLeadId AND [permissionId] = @ApproveId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@FutureManagerCorrectionId, @EDMLeadId, @ApproveId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @FutureManagerCorrectionId AND [roleId] = @ManagerId AND [permissionId] = @ApproveId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@FutureManagerCorrectionId, @ManagerId, @ApproveId);
--INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ConversationScriptId, @ManagerId, @ReadId); -- It is incorrect, manager can't see Create Conversation in readonly view. If it means as view conversation then both view and complete conversation are attached to (write) send receieve conversation functionality
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @NotificationsId AND [roleId] = @ManagerId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@NotificationsId, @ManagerId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @TaxonomyCorrectionId AND [roleId] = @ManagerId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@TaxonomyCorrectionId, @ManagerId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @TaxonomyCorrectionId AND [roleId] = @ManagerId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@TaxonomyCorrectionId, @ManagerId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @TaxonomyCorrectionId AND [roleId] = @DelegateId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@TaxonomyCorrectionId, @DelegateId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @TaxonomyCorrectionId AND [roleId] = @DelegateId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@TaxonomyCorrectionId, @DelegateId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @NotificationsId AND [roleId] = @EDMLeadId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@NotificationsId, @EDMLeadId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @TaxonomyCorrectionId AND [roleId] = @EDMLeadId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@TaxonomyCorrectionId, @EDMLeadId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @TaxonomyCorrectionId AND [roleId] = @EDMLeadId AND [permissionId] = @ApproveId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@TaxonomyCorrectionId, @EDMLeadId, @ApproveId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @FutureManagerCorrectionId AND [roleId] = @AdminId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@FutureManagerCorrectionId, @AdminId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @TaxonomyCorrectionId AND [roleId] = @AdminId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@TaxonomyCorrectionId, @AdminId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @AssignProxyId AND [roleId] = @AdminId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@AssignProxyId, @AdminId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @AssignProxyId AND [roleId] = @AdminId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@AssignProxyId, @AdminId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @AssignEDMLeadId AND [roleId] = @AdminId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@AssignEDMLeadId, @AdminId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @AssignEDMLeadId AND [roleId] = @AdminId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@AssignEDMLeadId, @AdminId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @AssignScriptContributorId AND [roleId] = @AdminId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@AssignScriptContributorId, @AdminId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @AssignScriptContributorId AND [roleId] = @AdminId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@AssignScriptContributorId, @AdminId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ConversationScriptId AND [roleId] = @ScriptContributorId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ConversationScriptId, @ScriptContributorId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ConversationScriptId AND [roleId] = @ScriptContributorId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ConversationScriptId, @ScriptContributorId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @SummaryId AND [roleId] = @DelegateId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@SummaryId, @DelegateId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @SendStayConversationId AND [roleId] = @DelegateId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@SendStayConversationId, @DelegateId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @SendStayConversationId AND [roleId] = @DelegateId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@SendStayConversationId, @DelegateId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ReceiveConversationId AND [roleId] = @DelegateId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ReceiveConversationId, @DelegateId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ReceiveConversationId AND [roleId] = @DelegateId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ReceiveConversationId, @DelegateId, @ReadId);
--INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ConversationScriptId, @DelegateId, @ReadId); -- It is incorrect, manager can't see Create Conversation in readonly view. If it means as view conversation then both view and complete conversation are attached to (write) send receieve conversation functionality
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @FutureManagerCorrectionId AND [roleId] = @DelegateId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@FutureManagerCorrectionId, @DelegateId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @FutureManagerCorrectionId AND [roleId] = @DelegateId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@FutureManagerCorrectionId, @DelegateId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @FutureManagerCorrectionId AND [roleId] = @DelegateId AND [permissionId] = @ApproveId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@FutureManagerCorrectionId, @DelegateId, @ApproveId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @NotificationsId AND [roleId] = @DelegateId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@NotificationsId, @DelegateId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ImportScriptId AND [roleId] = @SuperUserId AND [permissionId] = @ReadId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ImportScriptId, @SuperUserId, @ReadId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ImportScriptId AND [roleId] = @SuperUserId AND [permissionId] = @WriteId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ImportScriptId, @SuperUserId, @WriteId);
IF NOT EXISTS (SELECT 1 FROM [dbo].[featureRolePermissionMapping] WHERE [featureId] = @ImportScriptId AND [roleId] = @SuperUserId AND [permissionId] = @ApproveId)
    INSERT [dbo].[featureRolePermissionMapping] ( [featureId], [roleId], [permissionId]) VALUES (@ImportScriptId, @SuperUserId, @ApproveId);

--- insert scripts for [SectionHeaderMapping] table start---
IF NOT EXISTS (SELECT 1 FROM [dbo].[SectionHeaderMapping] WHERE [sectionName] = N'OpeningContext')
    INSERT [dbo].[SectionHeaderMapping] ( [sectionName], [displayName]) VALUES ( N'OpeningContext', N'Opening');
IF NOT EXISTS (SELECT 1 FROM [dbo].[SectionHeaderMapping] WHERE [sectionName] = N'ClosingContext')
    INSERT [dbo].[SectionHeaderMapping] ( [sectionName], [displayName]) VALUES ( N'ClosingContext', N'Close');
IF NOT EXISTS (SELECT 1 FROM [dbo].[SectionHeaderMapping] WHERE [sectionName] = N'TaxonomyContext')
    INSERT [dbo].[SectionHeaderMapping] ( [sectionName], [displayName]) VALUES ( N'TaxonomyContext', N'Taxonomy Change Context');
IF NOT EXISTS (SELECT 1 FROM [dbo].[SectionHeaderMapping] WHERE [sectionName] = N'UsefulResource')
    INSERT [dbo].[SectionHeaderMapping] ( [sectionName], [displayName]) VALUES ( N'UsefulResource', N'Useful Resources');
IF NOT EXISTS (SELECT 1 FROM [dbo].[SectionHeaderMapping] WHERE [sectionName] = N'SegmentContext')
    INSERT [dbo].[SectionHeaderMapping] ( [sectionName], [displayName]) VALUES ( N'SegmentContext', N'Segment Change Context');
IF NOT EXISTS (SELECT 1 FROM [dbo].[SectionHeaderMapping] WHERE [sectionName] = N'KeyMessageToLand')
    INSERT [dbo].[SectionHeaderMapping] ( [sectionName], [displayName]) VALUES ( N'KeyMessageToLand', N'Key Messages to Land');
IF NOT EXISTS (SELECT 1 FROM [dbo].[SectionHeaderMapping] WHERE [sectionName] = N'Title')
    INSERT [dbo].[SectionHeaderMapping] ( [sectionName], [displayName]) VALUES ( N'Title', N'Title');
IF NOT EXISTS (SELECT 1 FROM [dbo].[SectionHeaderMapping] WHERE [sectionName] = N'SpecificChangeContext')
    INSERT [dbo].[SectionHeaderMapping] ( [sectionName], [displayName]) VALUES ( N'SpecificChangeContext', N'Taxonomy Change for Employee');
IF NOT EXISTS (SELECT 1 FROM [dbo].[SectionHeaderMapping] WHERE [sectionName] = N'SpecificChangeContextDate')
    INSERT [dbo].[SectionHeaderMapping] ( [sectionName], [displayName]) VALUES ( N'SpecificChangeContextDate', N'SpecificChangeContext_date');
IF NOT EXISTS (SELECT 1 FROM [dbo].[SectionHeaderMapping] WHERE [sectionName] = N'OpeningHeaderContext')
    INSERT INTO [dbo].[SectionHeaderMapping] ([sectionName], [displayName]) VALUES (N'OpeningHeaderContext', N'OpeningHeaderContext');
IF NOT EXISTS (SELECT 1 FROM [dbo].[SectionHeaderMapping] WHERE [sectionName] = N'SpecificChangeContextExtended')
    INSERT INTO [dbo].[SectionHeaderMapping] ([sectionName], [displayName]) VALUES (N'SpecificChangeContextExtended', N'SpecificChangeContextExtended');
IF NOT EXISTS (SELECT 1 FROM [dbo].[SectionHeaderMapping] WHERE [sectionName] = N'TaxonomyContextExtended')
    INSERT INTO [dbo].[SectionHeaderMapping] ([sectionName], [displayName]) VALUES (N'TaxonomyContextExtended', N'TaxonomyContextExtended');

--- insert scripts for [SectionHeaderMapping] table end---

--- insert scripts for [[ScriptOpeningContent]] table start---
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptOpeningContent] WHERE [fyOrgLeaderAlias] = N'JUDSON')
	INSERT [dbo].[ScriptOpeningContent] ( [fyOrgLeaderAlias], content, [sectionName]) VALUES ( N'JUDSON', N'<p>In MCAPS, FY25 will be a continuation of our strategy, to drive focus where we can win and take share. We will make changes that facilitate a&nbsp;&ldquo;Share Mindset&rdquo; in our solution areas and industry. MCEM continues to establish itself as the spine of our operating model with&nbsp;increased clarity of what, where, and when roles play their part along the sales journey as we engage with all the &ldquo;Rooms in the&nbsp;House.&rdquo;</p>', N'OpeningContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptOpeningContent] WHERE [fyOrgLeaderAlias] = N'JASONZ')
	INSERT [dbo].[ScriptOpeningContent] ( [fyOrgLeaderAlias],content, [sectionName]) VALUES ( N'JASONZ', N'<p>In PubSec, FY25 will be a continuation of our strategy, to drive focus where we can win and take share. We will make changes that facilitate a&nbsp;&ldquo;Share Mindset&rdquo; in our solution areas and industry. MCEM continues to establish itself as the spine of our operating model with&nbsp;increased clarity of what, where, and when roles play their part along the sales journey as we engage with all the &ldquo;Rooms in the&nbsp;House.&rdquo;</p>', N'OpeningContext')
--- insert scripts for [[ScriptOpeningContent]] table end---

--- insert scripts for [[[ScriptSegmentContent]]] table start---
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'CCSM Field')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES (N'CCSM Field', N'<p>In FY25, CCSM Field will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>',  N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'Commercial Solution Areas')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES (N'Commercial Solution Areas', N'<p>In FY25,&nbsp;Commercial Solution Areas&nbsp;will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'Display Advertising')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES (N'Display Advertising', N'<p>In FY25, Display Advertising will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'Public Sector')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES (N'Public Sector', N'<p>In FY25, Public Sector will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'Strategy & Operations')
	INSERT [dbo].[ScriptSegmentContent] ([fyOrg], content,[sectionName]) VALUES (N'Strategy & Operations', N'<p>In FY25, Strategy &amp; Operations will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'Non-Channel')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES (N'Non-Channel', N'<p>In FY25, Non-Channel will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'Microsoft Stores Channel')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES (N'Microsoft Stores Channel', N'<p>In FY25, Microsoft Stores Channel will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'Industry Solutions Delivery')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content,[sectionName]) VALUES (N'Industry Solutions Delivery', N'<p>In FY25, Industry Solutions Delivery will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'MSA-Microsoft Search Advertising')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES (N'MSA-Microsoft Search Advertising', N'<p>In FY25, MSA-Microsoft Search Advertising will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'M&O')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content,[sectionName]) VALUES ( N'M&O', N'<p>In FY25, M&amp;O will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'SMC & Digital Sales')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES ( N'SMC & Digital Sales', N'<p>In FY25, SMC &amp; Digital Sales will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>',  N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'Enterprise Commercial')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES ( N'Enterprise Commercial', N'<p>In FY25, Enterprise Commercial will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>',  N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'Management & Support')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES ( N'Management & Support', N'<p>In FY25, Management &amp; Support will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'Core - Worldwide Learning')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES ( N'Core - Worldwide Learning', N'<p>In FY25, Core - Worldwide Learning will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'Customer Success')
	INSERT [dbo].[ScriptSegmentContent] ([fyOrg], content, [sectionName]) VALUES ( N'Customer Success', N'<p>In FY25, Customer Success will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'Global Partner Solutions')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES ( N'Global Partner Solutions', N'<p>In FY25, Global Partner Solutions will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'Core - CE&S')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES ( N'Core - CE&S', N'<p>In FY25, Core - CE&amp;S will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'WW - OEM non-Field')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES ( N'WW - OEM non-Field', N'<p>In FY25, WW - OEM non-Field will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptSegmentContent] WHERE [fyOrg] = N'Core - Industry Solutions')
	INSERT [dbo].[ScriptSegmentContent] ( [fyOrg], content, [sectionName]) VALUES ( N'Core - Industry Solutions', N'<p>In FY25, Core - Industry Solutions will focus on a few core pillars to inform our strategy: Commercial Cloud Driver, Partner Acceleration and Trusted Partner. Becoming a commercial Cloud Driver will mean that we need to start Priming Could Migrations at scale. To help our partners accelerate, we will be scaling through PDOC and diving ECIF yields. Becoming a trusted partner means world class co-engineering and innovation while we focus on solving for customers and putting them in control.</p>', N'SegmentContext')
--- insert scripts for [[[ScriptSegmentContent]]] table end---

--- insert scripts for [ScriptStaticContent] table start---
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptStaticContent] WHERE [sectionName] = N'KeyMessageToLand' and [conversationType] = N'Send')
begin
	INSERT [dbo].[ScriptStaticContent] ( [sectionName], [content], [conversationType]) VALUES ( N'KeyMessageToLand', N'<ul>
    <li>FY25 strategies are driving&nbsp;<strong>changes&nbsp;to our business</strong></li>
    <li><strong>Verify if Role remains the same</strong></li>
    <li><strong>Clarify reporting</strong>&nbsp;structure</li>
    <li>Explain transition and&nbsp;<strong>next steps</strong></li>
    <li><strong>Cover&nbsp;Job Architecture, if&nbsp;applicable</strong></li>
    <li>Check if taxonomy corrections&nbsp;are needed</li>
    <li><strong>Empathize with changes</strong>&nbsp;&nbsp;communicated and&nbsp;<strong>convey&nbsp;excitement</strong>&nbsp;about the&nbsp;opportunities ahead, where&nbsp;appropriate.</li>
</ul>', N'Send')
end
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptStaticContent] WHERE [sectionName] = N'KeyMessageToLand' and [conversationType] = N'Receive')
begin
INSERT [dbo].[ScriptStaticContent] ( [sectionName], [content], [conversationType]) VALUES ( N'KeyMessageToLand', N'<ul>
    <li><strong>Welcome&nbsp;to the team</strong></li>
    <li><strong>Get to&nbsp;know the employee</strong></li>
    <li><strong>Share information about&nbsp;role/team</strong></li>
    <li><strong>Empathize with the change</strong></li>
    <li>Offer to&nbsp;<strong>answer questions</strong>&nbsp;and&nbsp;<strong>provide support</strong>&nbsp;during&nbsp;transition</li>
    <li>Look forward to seeing&nbsp;contributions to the team</li>
</ul>', N'Receive')
end
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptStaticContent] WHERE [sectionName] = N'UsefulResource' and [conversationType] = N'Send')
begin
	INSERT [dbo].[ScriptStaticContent] ( [sectionName], [content], [conversationType], [isActive], [createdBy], [createdDate], [modifiedBy], [modifiedDate]) 
    VALUES ( N'UsefulResource', N'<ul>   <li><a aria-label="Manager Portal open in new window" 
    href="https://aka.ms/FY24CSEPManagerPortal"   rel="noreferrer" target="_blank">Manager Portal&nbsp;&nbsp;</a></li><li><a aria-label="People Manager FAQ open in new window" 
    href="https://aka.ms/FY24PeopleManagerFAQ"   rel="noreferrer" target="_blank">People Manager FAQ</a></li></ul>', N'Send', 1, N'system', CAST(N'2024-02-20T04:03:48.093' AS DateTime), N'system', CAST(N'2024-02-20T04:03:48.093' AS DateTime))
end
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptStaticContent] WHERE [sectionName] = N'UsefulResource' and [conversationType] = N'Receive')
begin
	INSERT [dbo].[ScriptStaticContent] ([sectionName], [content], [conversationType], [isActive], [createdBy], [createdDate], [modifiedBy], [modifiedDate]) VALUES (N'UsefulResource', N'<ul>   <li><a aria-label="Manager Portal open in new window"
    href="https://aka.ms/FY24CSEPManagerPortal"rel="noreferrer" target="_blank">Manager Portal&nbsp;&nbsp;</a></li><li><a aria-label="People Manager FAQ open in new window" 
    href="https://aka.ms/FY24PeopleManagerFAQ"rel="noreferrer" target="_blank">People Manager FAQ</a></li></ul>', N'Receive', 1, N'system', CAST(N'2024-02-20T04:03:48.100' AS DateTime), N'system', CAST(N'2024-02-20T04:03:48.100' AS DateTime))
end
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptStaticContent] WHERE [sectionName] = N'ClosingContext' and [conversationType] = N'Receive')
begin
	INSERT [dbo].[ScriptStaticContent] ( [sectionName], [content], [conversationType]) VALUES ( N'ClosingContext', N'<ul>
	<li>Check for understanding, ask if employee has any questions, and respond using the People Manager FAQs or specifics from your HR lead</li>
	<li>
	<p>Empathize with the change, i.e. I recognize this is new information for you and may be a lot to process.</p>
	</li>
	<li>
	<p>Offer to be a resource as the employee has questions in the coming days and weeks to support the transition</p>
	</li>
	</ul>', N'Receive')
end

IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptStaticContent] WHERE [sectionName] = N'ClosingContext' and [conversationType] = N'Send')
	INSERT [dbo].[ScriptStaticContent] ( [sectionName], [content], [conversationType]) VALUES ( N'ClosingContext', N'<ul> <li>Check for understanding, ask if employee has any questions, and respond using the People Manager FAQs or specifics from your HR lead</li> <li> <p>Empathize with the change, i.e. I recognize this is new information for you and may be a lot to process.</p> </li> <li> <p>Offer to be a resource as the employee has questions in the coming days and weeks to support the transition</p> </li> </ul>', N'Send')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptStaticContent] WHERE [sectionName] = N'SpecificChangeContext' and [conversationType] = N'Send')
	INSERT [dbo].[ScriptStaticContent] ( [sectionName], [content], [conversationType]) VALUES ( N'SpecificChangeContext', N'Over the next few weeks, please regularly check in on RAIN to ensure you understand what your new incentive plan entails.', N'Send')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptStaticContent] WHERE [sectionName] = N'SpecificChangeContextDate' and [conversationType] = N'Send')
	INSERT [dbo].[ScriptStaticContent] ( [sectionName], [content], [conversationType]) VALUES ( N'SpecificChangeContextDate', N'1 July', N'send')
IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptStaticContent] WHERE [sectionName] = N'OpeningHeaderContext'  and [conversationType] = N'Receive')
    INSERT INTO [dbo].[ScriptStaticContent] ([sectionName], [content], [conversationType]) 
    VALUES (N'OpeningHeaderContext', N'<i>The goal of this conversation is to welcome your new team member. Use the script below to set context for the change. Use the rest of the meeting to get to know the employee and answer any questions they may have about their new team.</i>', N'Receive');

IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptStaticContent] WHERE [sectionName] = N'SpecificChangeContext' and [conversationType] = N'Receive')
    INSERT INTO [dbo].[ScriptStaticContent] ([sectionName], [content], [conversationType]) 
    VALUES (N'SpecificChangeContext', N'Over the next few weeks, please regularly check in on RAIN to ensure you understand what your new incentive plan entails.', N'Receive');

IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptStaticContent] WHERE [sectionName] = N'SpecificChangeContextDate' and [conversationType] = N'Receive')
    INSERT INTO [dbo].[ScriptStaticContent] ([sectionName], [content], [conversationType]) 
    VALUES (N'SpecificChangeContextDate', N'1 July', N'Receive');

IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptStaticContent] WHERE [sectionName] = N'SpecificChangeContextExtended' and [conversationType] = N'Receive')
    INSERT INTO [dbo].[ScriptStaticContent] ([sectionName], [content], [conversationType]) 
    VALUES (N'SpecificChangeContextExtended', N'Check with the employee if the previous manager has already briefed them about the taxonomy change and context. If yes, then skip this section', N'Receive');

IF NOT EXISTS (SELECT 1 FROM [dbo].[ScriptStaticContent] WHERE [sectionName] = N'TaxonomyContextExtended' and [conversationType] = N'Receive')
    INSERT INTO [dbo].[ScriptStaticContent] ([sectionName], [content], [conversationType]) 
    VALUES (N'TaxonomyContextExtended', N'Check with the employee if the previous manager has already briefed them about the taxonomy change and context. If yes, then skip this section', N'Receive');
--- insert scripts for [ScriptStaticContent] table end---

--insert scripts for [RoleDefaultFeatureMapping] table start

IF NOT EXISTS (SELECT 1 FROM dbo.RoleDefaultFeatureMapping WHERE featureId = @SummaryId AND roleId = @ManagerId)
    INSERT INTO dbo.RoleDefaultFeatureMapping(featureId, roleId) VALUES (@SummaryId, @ManagerId)

IF NOT EXISTS (SELECT 1 FROM dbo.RoleDefaultFeatureMapping WHERE featureId = @SummaryId AND roleId = @AdminId)
    INSERT INTO dbo.RoleDefaultFeatureMapping(featureId, roleId) VALUES (@SummaryId, @AdminId)

IF NOT EXISTS (SELECT 1 FROM dbo.RoleDefaultFeatureMapping WHERE featureId = @SummaryId AND roleId = @EDMLeadId)
    INSERT INTO dbo.RoleDefaultFeatureMapping(featureId, roleId) VALUES (@SummaryId, @EDMLeadId)

IF NOT EXISTS (SELECT 1 FROM dbo.RoleDefaultFeatureMapping WHERE featureId = @ConversationScriptId AND roleId = @ScriptContributorId)
    INSERT INTO dbo.RoleDefaultFeatureMapping(featureId, roleId) VALUES (@ConversationScriptId, @ScriptContributorId)

IF NOT EXISTS (SELECT 1 FROM dbo.RoleDefaultFeatureMapping WHERE featureId = @SummaryId AND roleId = @DelegateId)
    INSERT INTO dbo.RoleDefaultFeatureMapping(featureId, roleId) VALUES (@SummaryId, @DelegateId)

IF NOT EXISTS (SELECT 1 FROM dbo.RoleDefaultFeatureMapping WHERE featureId = @ImportScriptId AND roleId = @SuperUserId)
    INSERT INTO dbo.RoleDefaultFeatureMapping(featureId, roleId) VALUES (@ImportScriptId, @SuperUserId)
-- insert scripts for [RoleDefaultFeatureMapping] table end





----Insert Scripts for dbo.configuration table 
    IF NOT EXISTS (SELECT 1 FROM dbo.Configuration WHERE [key] = 'Reports_To_Level_1_Email_inclusion')
    INSERT INTO dbo.Configuration ([key], [value]) VALUES ('Reports_To_Level_1_Email_inclusion', 'JUDSON');

    IF NOT EXISTS (SELECT 1 FROM dbo.Configuration WHERE [key] = 'Reports_To_Level_2_Email_Inclusion')
    INSERT INTO dbo.Configuration ([key], [value]) VALUES ('Reports_To_Level_2_Email_Inclusion', 'Mitraa');


    IF NOT EXISTS (SELECT 1 FROM dbo.Configuration WHERE [key] = 'Reports_To_Level_2_Email_Exclusion')
    INSERT INTO dbo.Configuration ([key], [value]) VALUES ('Reports_To_Level_2_Email_Exclusion', 'kakers,csande');

    IF NOT EXISTS (SELECT 1 FROM dbo.Configuration WHERE [key] = 'Reports_To_Level_3_Email_Exclusion')
    INSERT INTO dbo.Configuration ([key], [value]) VALUES ('Reports_To_Level_3_Email_Exclusion', 'bbelmont');



    ---Enter the table name from schema and base record count into validation tables 
    IF NOT EXISTS ( select 1 from [report].[Validation_RowCountTable])

 INSERT INTO [report].[Validation_RowCountTable] (TableName, [RowCount_Expected], [Rowcount_latest], [Pass_Fail], [Count_difference])
 SELECT 
     QUOTENAME(SCHEMA_NAME(sOBJ.schema_id)) + '.' + QUOTENAME(sOBJ.name) AS TableName,
     SUM(sPTN.Rows) AS [RowCount_Expected],
     0 AS [Rowcount_latest],
     '' AS [Pass_Fail],
     0 AS [Count_difference]
 FROM
     sys.objects AS sOBJ
     INNER JOIN sys.partitions AS sPTN ON sOBJ.object_id = sPTN.object_id
 WHERE
     sOBJ.type = 'U'
     AND sOBJ.is_ms_shipped = 0x0
     AND index_id < 2 -- 0:Heap, 1:Clustered
 GROUP BY
     sOBJ.schema_id,
     sOBJ.name;


    ----Update the threshold count for the base tables 

    IF EXISTS (SELECT 1 FROM [report].[Validation_RowCountTable] )

 update [report].[Validation_RowCountTable]
set Rowcount_threshold=1
where 
TableName IN (
        '[dbo].[Isp_careerstage]',
		'[dbo].[Isp_costcenter]',
		'[dbo].[Isp_country]',
		'[dbo].[Isp_discipline]',
		'[dbo].[Isp_incentiveplan]',
		'[dbo].[Isp_jobrole]',
		'[dbo].[Isp_Org]',
		'[dbo].[Isp_qualifier1]',
		'[dbo].[Isp_qualifier2]',
		'[dbo].[Isp_rolesummary]',
		'[dbo].[Isp_seller]',
		'[dbo].[Isp_worker]',
		'[dbo].[PlanSeller]'
        
    ) AND  ROWCOUNT_THRESHOLD  IS NULL ;





