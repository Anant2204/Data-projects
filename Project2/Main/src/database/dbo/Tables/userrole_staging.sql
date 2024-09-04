
CREATE TABLE [dbo].[userrole_staging](
	[alias] [nvarchar](40) NOT NULL,
    [roleId] [int] NOT NULL,
    [source] [nvarchar](40) NOT NULL DEFAULT ('MCT'),
	[isActive] [bit] NULL,
	[createdBy] [nvarchar](40) NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [nvarchar](40) NULL,
	[modifiedDate] [datetime] NULL,	
 CONSTRAINT [PK_userrole_staging] PRIMARY KEY CLUSTERED 
(
	[alias] ASC,
	[roleId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[userrole_staging] ADD  DEFAULT ((1)) FOR [isActive]
GO

ALTER TABLE [dbo].[userrole_staging] ADD  DEFAULT ('system') FOR [createdBy]
GO

ALTER TABLE [dbo].[userrole_staging] ADD  DEFAULT (getutcdate()) FOR [createdDate]
GO

ALTER TABLE [dbo].[userrole_staging] ADD  DEFAULT ('system') FOR [modifiedBy]
GO

ALTER TABLE [dbo].[userrole_staging] ADD  DEFAULT (getutcdate()) FOR [modifiedDate]
GO

ALTER TABLE [dbo].[userrole_staging]  
ADD CONSTRAINT FK_UserRoleStaging_user FOREIGN KEY (alias) REFERENCES [dbo].[User_Staging](alias);

GO
-- Add named foreign key
ALTER TABLE [dbo].[userrole_staging]
ADD CONSTRAINT FK_UserRoleStaging_role FOREIGN KEY (roleid) REFERENCES [dbo].[role](id);
GO
