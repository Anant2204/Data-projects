CREATE TABLE [HR].[IncorrectManagerLog] (
    [Id]                 BIGINT         IDENTITY (1, 1) NOT NULL,
    [IC]                 NVARCHAR (50)  NULL,
    [IC_FullName]        NVARCHAR (MAX) NULL,
    [CY_ManagerAlias]    NVARCHAR (50)  NULL,
    [CY_ManagerFullName] NVARCHAR (MAX) NULL,
    [FY_ManagerAlias]    NVARCHAR (MAX) NULL,
    [FY_ManagerFullName] NVARCHAR (MAX) NULL,
    [IsActive]           BIT            NULL,
    [DateCreated]        DATETIME       NULL,
    [CreatedBy]          VARCHAR (500)  NULL,
    [DateModified]       DATETIME       NULL,
    [ModifiedBy]         VARCHAR (500)  NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

