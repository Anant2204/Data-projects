CREATE TABLE [HR].[TBL_Proxy_staging] (
    [Manager]            VARCHAR (100) NOT NULL,
    [Proxy]              VARCHAR (MAX) NULL,
    [RecordModifiedDate] DATETIME      DEFAULT (getutcdate()) NULL,
    [createdBy] [nvarchar](40) NULL DEFAULT 'system',
	[createdDate] DATETIME      DEFAULT (getutcdate()) NULL,	
    [modifiedBy] [nvarchar](40) NULL DEFAULT 'system',
    PRIMARY KEY CLUSTERED ([Manager] ASC)
);