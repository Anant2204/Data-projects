CREATE TABLE [HR].[ErrorLog] (
    [Id]                 BIGINT         IDENTITY (1, 1) NOT NULL,
    [IC]                 NVARCHAR (50)  NULL,
    [IC_FullName]        NVARCHAR (MAX) NULL,
    [FY_ManagerAlias]    NVARCHAR (MAX) NULL,
    [FY_ManagerFullName] NVARCHAR (MAX) NULL,
    [IsActive]           BIT            NULL,
    [DateCreated]        DATETIME       NULL,
    [CreatedBy]          VARCHAR (500)  NULL,
    [DateModified]       DATETIME       NULL,
    [ModifiedBy]         VARCHAR (500)  NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

