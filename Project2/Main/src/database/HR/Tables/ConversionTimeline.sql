CREATE TABLE [HR].[ConversionTimeline] (
    [Id]                  INT            NOT NULL,
    [Seq]                 INT            NULL,
    [WelcomeScreenId]     INT            NULL,
    [TimeLineDescription] NVARCHAR (MAX) NOT NULL,
    [StartDate]           DATETIME2 (7)  NOT NULL,
    [EndDate]             DATETIME2 (7)  NOT NULL,
    [IsActive]            BIT            DEFAULT ((1)) NOT NULL,
    [CreatedBy]           NVARCHAR (255) NOT NULL,
    [CreatedOn]           DATETIME2 (7)  NOT NULL,
    [ModifiedBy]          NVARCHAR (255) NOT NULL,
    [ModifiedOn]          DATETIME2 (7)  NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([WelcomeScreenId]) REFERENCES [HR].[WelcomeScreen] ([Id])
);

