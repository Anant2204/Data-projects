
CREATE TABLE [report].[Validation_RowCountTable](
	[TableName] [nvarchar](128) NULL,
	[Rowcount_threshold] [int] NULL,
	[RowCount_expected] [int] NULL,
	[Rowcount_latest] [nvarchar](50) NULL,
	[Pass_Fail] [nvarchar](50) NULL,
	[Count_difference] [nvarchar](50) NULL,
	[latest_load_datetime] [datetime] NULL,
	[createdDatetime] [datetime] default getutcdate(),
	[createdBy] [nvarchar](40) default 'system',
	[modifiedDatetime] [datetime] default getutcdate(),
	[modifiedBy] [nvarchar](40) default 'system'

) ON [PRIMARY]
GO

ALTER TABLE [report].[Validation_RowCountTable] ADD  DEFAULT (getutcdate()) FOR [latest_load_datetime]
GO

