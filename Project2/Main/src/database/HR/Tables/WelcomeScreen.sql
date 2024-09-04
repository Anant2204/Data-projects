CREATE TABLE [HR].[WelcomeScreen] (
    [Id]          INT            NOT NULL,
    [ChangeId]    INT            NULL,
    [Stage]       INT            NULL,
    [ContentType] NVARCHAR (MAX) NOT NULL,
    [Content]     NVARCHAR (MAX) NOT NULL,
    [IsActive]    BIT            DEFAULT ((1)) NOT NULL,
    [CreatedBy]   NVARCHAR (255) NOT NULL,
    [CreatedOn]   DATETIME2 (7)  NOT NULL,
    [ModifiedBy]  NVARCHAR (255) NOT NULL,
    [ModifiedOn]  DATETIME2 (7)  NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK__WelcomeSc__Chang__43A1090D] FOREIGN KEY ([ChangeId]) REFERENCES [HR].[TaxonomyChangeControl] ([Id])
);

