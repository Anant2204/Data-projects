CREATE TABLE [HR].[TBL_Proxy] (
    [Manager]            VARCHAR (100) NOT NULL,
    [Proxy]              VARCHAR (MAX) NULL,
    [RecordModifiedDate] DATETIME      DEFAULT (getutcdate()) NULL,
    PRIMARY KEY CLUSTERED ([Manager] ASC)
);

