CREATE TABLE [dbo].[MCT_EDMApprovers](
	[Area_Segment] [nvarchar](50) NOT NULL,
	[Org_Leader] [nvarchar](50) NOT NULL,
	[MCT_EDM_Data_Keeper_Alias] [nvarchar](50) NOT NULL,
	[ID] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [pk_AreaSegment_OrgLeader_MCTEDMDataKeeperAlias] PRIMARY KEY CLUSTERED 
(
	[Area_Segment] ASC,
	[Org_Leader] ASC,
	[MCT_EDM_Data_Keeper_Alias] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[MCT_EDMApprovers]  WITH CHECK ADD  CONSTRAINT [fk_OrgLeader] FOREIGN KEY([Org_Leader])
REFERENCES [HR].[TBL_OrgLeader] ([Manager])
GO

ALTER TABLE [dbo].[MCT_EDMApprovers] CHECK CONSTRAINT [fk_OrgLeader]
GO

CREATE NONCLUSTERED INDEX IX_MCT_EDMApprovers_OrgLeader_DataKeeper
ON [dbo].[MCT_EDMApprovers] (Org_Leader, MCT_EDM_Data_Keeper_Alias);
GO

