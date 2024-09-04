CREATE TABLE [DBO].[ScriptOpeningContent](
	[id] [int] IDENTITY(1,1) PRIMARY KEY,
	[fyOrgLeaderAlias] [nvarchar](40) NOT NULL,
	[content] [nvarchar](max) NULL,
	[isActive] [bit] Not NULL DEFAULT ((1)),
    [createdBy] [nvarchar](40) NULL DEFAULT ('system'),
    [createdDate] [datetime] NULL DEFAULT (GETUTCDATE()),
    [modifiedBy] [nvarchar](40) NULL DEFAULT ('system'),
    [modifiedDate] [datetime] NULL DEFAULT (GETUTCDATE()),
	[sectionName] [nvarchar](100) NULL DEFAULT ('OpeningContext') FOREIGN KEY REFERENCES [dbo].[SectionHeaderMapping](sectionName)
	);

GO
	
CREATE INDEX idx_ScriptOpeningContent_FyOrgLeaderAlias
ON [DBO].[ScriptOpeningContent] (
fyOrgLeaderAlias
);