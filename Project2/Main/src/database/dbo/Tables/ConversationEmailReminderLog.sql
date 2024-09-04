CREATE TABLE [dbo].[ConversationEmailReminderLog](
[Id] [int] IDENTITY(1,1) NOT NULL,
[HasEmailSent] [bit] NOT NULL,
[ExceptionMessage] nvarchar(max) NULL,
[OrgName] nvarchar(100) NULL,
[OrgLeaderAlias] nvarchar(100) NULL,
[ManagerAlias] nvarchar(100) NOT NULL,
[EmailSubject] nvarchar(250) NULL,
[EmailBody] nvarchar(max) NULL,
[CreatedBy] nvarchar(40) NULL DEFAULT ('system'),
[CreatedDate] [datetime] NULL DEFAULT (getutcdate()),
[ModifiedBy] nvarchar(40) NULL DEFAULT ('system'),
[ModifiedDate] [datetime] NULL DEFAULT (getutcdate()),
CONSTRAINT [PK_ConversationEmailReminderLog] PRIMARY KEY CLUSTERED
(
[Id] ASC
))