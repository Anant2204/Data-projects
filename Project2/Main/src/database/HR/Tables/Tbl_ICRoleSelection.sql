CREATE TABLE [HR].[Tbl_ICRoleSelection] (
    [ID]                     INT            IDENTITY (101, 1) NOT NULL,
    [IC]                     NVARCHAR (255) NOT NULL,
    [IC_FullName]            NVARCHAR (255) NULL,
    [CurrentManager]         NVARCHAR (255) NULL,
    [CurrentManagerFullName] NVARCHAR (255) NULL,
    [CurrentOrg]             NVARCHAR (255) NULL,
    [CurrentST]              NVARCHAR (255) NULL,
    [CurrentQ1]              NVARCHAR (255) NULL,
    [CurrentQ2]              NVARCHAR (255) NULL,
    [AvialableFutureRoles]   NVARCHAR (255) NULL,
    [HasSelectedFutureRole]  INT            NULL,
    [PreferredRole]          NVARCHAR (255) NULL,
    [UpdatedBy]              NVARCHAR (255) NULL,
    [UpdateOn]               DATETIME       NULL,
    [CurrentOU]              VARCHAR (100)  NULL,
    PRIMARY KEY CLUSTERED ([IC] ASC)
);

