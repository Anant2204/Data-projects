CREATE TABLE [DBO].[SectionHeaderMapping]
(
    [id] [int] IDENTITY(1,1),
    [sectionName] NVARCHAR(100) NOT NULL Primary Key,
    [displayName] NVARCHAR(100) NOT NULL,
    [isActive] [bit] Not NULL DEFAULT ((1)),
    [createdBy] [nvarchar](40) NULL DEFAULT ('system'),
    [createdDate] [datetime] NULL DEFAULT (GETUTCDATE()),
    [modifiedBy] [nvarchar](40) NULL DEFAULT ('system'),
    [modifiedDate] [datetime] NULL DEFAULT (GETUTCDATE())
);

GO
 
CREATE INDEX idx_SectionHeaderMapping_SectionName
ON [DBO].[SectionHeaderMapping] (
sectionName
);