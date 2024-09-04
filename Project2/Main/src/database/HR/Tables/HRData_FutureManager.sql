CREATE TABLE [HR].[HRData_FutureManager] (
    [Id]               INT            NOT NULL,
    [Employee]         NVARCHAR (255) NULL,
    [CurrentManager]   NVARCHAR (255) NULL,
    [NewFutureManager] NVARCHAR (255) NULL,
    [OldFutureManager] NVARCHAR (255) NULL,
    [Comments]         NVARCHAR (MAX) NULL,
    [IsActive]         BIT            NOT NULL,
    [CreatedBy]        NVARCHAR (255) NOT NULL,
    [CreatedOn]        DATETIME2 (7)  NOT NULL,
    [ModifiedBy]       NVARCHAR (255) NOT NULL,
    [ModifiedOn]       DATETIME2 (7)  NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

