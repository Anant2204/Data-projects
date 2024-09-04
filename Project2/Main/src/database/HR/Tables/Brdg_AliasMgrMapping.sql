CREATE TABLE [HR].[Brdg_AliasMgrMapping] (
    [IC]                 VARCHAR (100) NOT NULL,
    [CY_ManagerAlias]    VARCHAR (200) NULL,
    [CY_ManagerFullName] VARCHAR (200) NULL,
    [FY_ManagerAlias]    VARCHAR (200) NULL,
    [FY_ManagerFullName] VARCHAR (200) NULL,
    [MangerLevel]        INT NULL,
    [emailId] NVARCHAR(80) NULL, 
    [fullName] NVARCHAR(200) NULL, 
    PRIMARY KEY CLUSTERED ([IC] ASC)
);


GO
CREATE NONCLUSTERED INDEX [NCI_HRDATAMAIN]
    ON [HR].[Brdg_AliasMgrMapping]([CY_ManagerAlias] ASC, [CY_ManagerFullName] ASC, [FY_ManagerAlias] ASC, [FY_ManagerFullName] ASC);

GO
CREATE NONCLUSTERED INDEX IDX_MangerLevel
ON [HR].[Brdg_AliasMgrMapping](MangerLevel);
