CREATE TABLE [dbo].[LOV_Data] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Code]        NVARCHAR (50)  NULL,
    [DisplayName] NVARCHAR (255) NULL,
    [Category]    NVARCHAR (50)  NULL,
    [IsActive]    BIT            NULL,
    [CreatedBy]   NVARCHAR (50)  NULL,
    [CreatedOn]   DATETIME2 (7)  NULL,
    [ModifiedBy]  NVARCHAR (50)  NULL,
    [ModifiedOn]  DATETIME2 (7)  NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

