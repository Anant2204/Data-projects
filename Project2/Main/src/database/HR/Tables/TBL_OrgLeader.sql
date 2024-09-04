CREATE TABLE [HR].[TBL_OrgLeader] (
    [Manager]              NVARCHAR (50) NOT NULL,
    [ConversationRequired] VARCHAR (50)  NULL,
    TwoLevelApprovalRequired BIT DEFAULT 0,
    PRIMARY KEY CLUSTERED ([Manager] ASC)
);