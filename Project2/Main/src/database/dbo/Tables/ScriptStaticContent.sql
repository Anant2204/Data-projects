CREATE TABLE [DBO].[ScriptStaticContent](
	[id] [int] IDENTITY(1,1) PRIMARY KEY,
	[sectionName] [nvarchar](100) NOT NULL,
	[content] [nvarchar](max) NULL,
	[conversationType] [nvarchar](10)  NOT NULL DEFAULT ('send'),
    [isActive] [bit] NOT NULL DEFAULT ((1)),
    [createdBy] [nvarchar](40) NULL DEFAULT ('system'),
    [createdDate] [datetime] NULL DEFAULT (GETUTCDATE()),
    [modifiedBy] [nvarchar](40) NULL DEFAULT ('system'),
    [modifiedDate] [datetime] NULL DEFAULT (GETUTCDATE())
);

GO

CREATE INDEX idx_ScriptStaticContent_SectionName_ConversationType
ON [DBO].[ScriptStaticContent] (
sectionName, conversationType
);