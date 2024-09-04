CREATE TABLE [HR].[TBL_RoleChange] (
    [FY_Role_Change] VARCHAR (200) NOT NULL,
    [ScriptLink]     VARCHAR (MAX) NOT NULL,
    [Rank]           VARCHAR (200) NOT NULL,
    [CY_Org]         VARCHAR (200) NOT NULL,
    [CY_OU]          VARCHAR (200) NOT NULL,
    [CY_M3]          VARCHAR (200) NOT NULL,
    [CY_RoleSummary] VARCHAR (200) NOT NULL,
    [CY_Q1]          VARCHAR (200) NOT NULL,
    [CY_Q2]          VARCHAR (200) NOT NULL,
    [MgrofMgrsInd]   VARCHAR (200) NOT NULL,
    [FY_Org]         VARCHAR (200) NOT NULL,
    [FY_OU]          VARCHAR (200) NOT NULL,
    [FY_RoleSummary] VARCHAR (200) NOT NULL,
    [FY_Q1]          VARCHAR (200) NOT NULL,
    [FY_Q2]          VARCHAR (200) NOT NULL,
    [ROLESCenarioID] INT           NOT NULL
);

