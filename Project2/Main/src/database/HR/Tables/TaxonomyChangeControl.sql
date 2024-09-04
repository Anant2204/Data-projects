CREATE TABLE [HR].[TaxonomyChangeControl] (
    [Id]                INT            NOT NULL,
    [ChangeDescription] NVARCHAR (MAX) NOT NULL,
    [BeforeChangeTag]   NVARCHAR (10)  NULL,
    [AfterChangeTag]    NVARCHAR (10)  NULL,
    [IsActive]          BIT            CONSTRAINT [DF__TaxonomyC__IsAct__3EDC53F0] DEFAULT ((1)) NOT NULL,
    [CreatedBy]         NVARCHAR (255) NOT NULL,
    [CreatedOn]         DATETIME2 (7)  NOT NULL,
    [ModifiedBy]        NVARCHAR (255) NOT NULL,
    [ModifiedOn]        DATETIME2 (7)  NOT NULL,
    CONSTRAINT [PK__Taxonomy__3214EC07F15DFA76] PRIMARY KEY CLUSTERED ([Id] ASC)
);

