CREATE TABLE [HR].[Dim_Managerhierarchy] (
    [IC]                    NVARCHAR (255) NULL,
    [ManagerAlias]          NVARCHAR (255) NULL,
    [MType]                 VARCHAR (2)    NOT NULL,
    [DirectManagerFullName] NVARCHAR (255) NULL,
    [DirectManagerAlias]    NVARCHAR (255) NULL,
    [ID]                    INT            NULL,
    [ManagerLevel]          INT            NULL,
);


GO
CREATE CLUSTERED INDEX IDX_ManagerLevel
ON [HR].[Dim_Managerhierarchy] (ManagerLevel);
GO
CREATE NONCLUSTERED INDEX [NONInX_Dim_Mgr_Alias_MType_DirectMgrFullName_DManager]
ON [HR].[Dim_Managerhierarchy] ([ManagerAlias],[MType])
INCLUDE ([DirectManagerFullName],[DirectManagerAlias])
