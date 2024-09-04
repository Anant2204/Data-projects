CREATE TABLE [dbo].[RoleDefaultFeatureMapping](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[featureId] [int] NULL,
	[roleId] [int] NULL,
	[isActive] [bit] NULL,
	[createdBy] [nvarchar](40) NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [nvarchar](40) NULL,
	[modifiedDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[RoleDefaultFeatureMapping] ADD  DEFAULT ((1)) FOR [isActive]
GO

ALTER TABLE [dbo].[RoleDefaultFeatureMapping] ADD  DEFAULT ('system') FOR [createdBy]
GO

ALTER TABLE [dbo].[RoleDefaultFeatureMapping] ADD  DEFAULT (getutcdate()) FOR [createdDate]
GO

ALTER TABLE [dbo].[RoleDefaultFeatureMapping] ADD  DEFAULT ('system') FOR [modifiedBy]
GO

ALTER TABLE [dbo].[RoleDefaultFeatureMapping] ADD  DEFAULT (getutcdate()) FOR [modifiedDate]
GO

ALTER TABLE [dbo].[RoleDefaultFeatureMapping]  WITH CHECK ADD FOREIGN KEY([featureId])
REFERENCES [dbo].[feature] ([id])
GO

ALTER TABLE [dbo].[RoleDefaultFeatureMapping]  WITH CHECK ADD FOREIGN KEY([roleId])
REFERENCES [dbo].[role] ([id])
