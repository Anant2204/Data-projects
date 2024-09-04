
CREATE TABLE [dbo].[Userrole](
	[alias] [nvarchar](40) NOT NULL,
    [roleId] [int] NOT NULL,
    [source] [nvarchar](40) NOT NULL DEFAULT ('MCT'),
	[isActive] [bit] NULL,
	[createdBy] [nvarchar](40) NULL,
	[createdDate] [datetime] NULL,
	[modifiedBy] [nvarchar](40) NULL,
	[modifiedDate] [datetime] NULL,	
 CONSTRAINT [PK_userrole] PRIMARY KEY CLUSTERED 
(
	[alias] ASC,
	[roleId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Userrole] ADD  DEFAULT ((1)) FOR [isActive]
GO

ALTER TABLE [dbo].[Userrole] ADD  DEFAULT ('system') FOR [createdBy]
GO

ALTER TABLE [dbo].[Userrole] ADD  DEFAULT (getutcdate()) FOR [createdDate]
GO

ALTER TABLE [dbo].[Userrole] ADD  DEFAULT ('system') FOR [modifiedBy]
GO

ALTER TABLE [dbo].[Userrole] ADD  DEFAULT (getutcdate()) FOR [modifiedDate]
GO

ALTER TABLE [dbo].[Userrole]  
ADD CONSTRAINT FK_Userrole_user FOREIGN KEY (alias) REFERENCES [dbo].[User](alias);

GO
-- Add named foreign key
ALTER TABLE [dbo].[Userrole]
ADD CONSTRAINT FK_Userrole_role FOREIGN KEY (roleid) REFERENCES [dbo].[role](id);
GO

CREATE NONCLUSTERED INDEX IX_userrole_alias_roleId
ON userrole (alias, roleId);
GO

