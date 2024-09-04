CREATE TABLE [DBO].[ScriptExclusion]
(
    [id] [int] IDENTITY(1,1) PRIMARY KEY,
    [scriptId] INT FOREIGN KEY REFERENCES [hr].[ScriptTaxonomyContent](ID) NOT NULL,
    [alias] NVARCHAR(40) NOT NULL,
    [isActive] [bit] Not NULL DEFAULT ((1)),
    [createdBy] [nvarchar](40) NULL DEFAULT ('system'),
    [createdDate] [datetime] NULL DEFAULT (GETUTCDATE()),
    [modifiedBy] [nvarchar](40) NULL DEFAULT ('system'),
    [modifiedDate] [datetime] NULL DEFAULT (GETUTCDATE())
);