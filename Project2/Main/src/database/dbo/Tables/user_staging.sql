
CREATE TABLE [dbo].[user_staging](
	[alias] [nvarchar](40) NOT NULL primary key,
	[isActive] [bit] NULL,
	[createdBy] [nvarchar](40) NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [nvarchar](40) NULL,
	[modifiedDate] [datetime] NULL, 
) 
GO

ALTER TABLE [dbo].[user_staging] ADD  DEFAULT ((1)) FOR [isActive]
GO

ALTER TABLE [dbo].[user_staging] ADD  DEFAULT ('system') FOR [createdBy]
GO

ALTER TABLE [dbo].[user_staging] ADD  DEFAULT (getutcdate()) FOR [createdDate]
GO

ALTER TABLE [dbo].[user_staging] ADD  DEFAULT ('system') FOR [modifiedBy]
GO

ALTER TABLE [dbo].[user_staging] ADD  DEFAULT (getutcdate()) FOR [modifiedDate]
GO

