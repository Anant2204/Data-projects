CREATE TABLE [report].[Validation_userAccessRecordCount](
	[Record_source] [nvarchar](500) NULL,
	[Record_count] [nvarchar](40) NULL,
	[description] [nvarchar](1000) NULL,
	[Load_datetime] [datetime] NULL,
	[createdBy] [nvarchar](40) NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [nvarchar](40) NULL,
	[modifiedDate] [nvarchar](40) NULL
) ON [PRIMARY]
GO

ALTER TABLE [report].[Validation_userAccessRecordCount] ADD  DEFAULT ('system') FOR [createdby]
GO

ALTER TABLE [report].[Validation_userAccessRecordCount] ADD  DEFAULT (getutcdate()) FOR [createddate]
GO

ALTER TABLE [report].[Validation_userAccessRecordCount] ADD  DEFAULT ('system') FOR [modifiedby]
GO

ALTER TABLE [report].[Validation_userAccessRecordCount] ADD  DEFAULT (getutcdate()) FOR [modifieddate]
GO
