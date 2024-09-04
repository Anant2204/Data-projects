CREATE TABLE [HR].[Dim_Managerhierarchy_Staging] (
    [IC]                    NVARCHAR (255) NULL,
    [ManagerAlias]          NVARCHAR (255) NULL,
    [MType]                 VARCHAR (2)    NOT NULL,
    [DirectManagerFullName] NVARCHAR (255) NULL,
    [DirectManagerAlias]    NVARCHAR (255) NULL,
    [ID]                    INT            NULL,
    [ManagerLevel]          INT            NULL
);


GO
CREATE CLUSTERED INDEX IDX_ManagerLevel
ON [HR].[Dim_Managerhierarchy_Staging] (ManagerLevel);
