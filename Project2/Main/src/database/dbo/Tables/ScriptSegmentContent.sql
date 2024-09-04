CREATE TABLE [DBO].[ScriptSegmentContent](
    [id] [int] IDENTITY(1,1) PRIMARY KEY,
    [fyOrg] [nvarchar](50) NOT NULL,
    [content] [nvarchar](2000) NULL,
    [isActive] [bit] Not NULL DEFAULT ((1)),
    [createdBy] [nvarchar](40) NULL DEFAULT ('system'),
    [createdDate] [datetime] NULL DEFAULT (GETUTCDATE()),
    [modifiedBy] [nvarchar](40) NULL DEFAULT ('system'),
    [modifiedDate] [datetime] NULL DEFAULT (GETUTCDATE()),
	[sectionName] [nvarchar](100) NULL DEFAULT ('SegmentContext') FOREIGN KEY REFERENCES [dbo].[SectionHeaderMapping](sectionName)
);

GO

 
CREATE INDEX idx_SegmentSpecificContent_fyOrg ON [DBO].[ScriptSegmentContent] (fyOrg);