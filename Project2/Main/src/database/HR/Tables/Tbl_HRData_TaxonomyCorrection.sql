CREATE TABLE [HR].[Tbl_HRData_TaxonomyCorrection](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[icAlias] [nvarchar](40) NULL,
	[icName] [nvarchar](100) NULL,
	[cyManagerAlias] [nvarchar](40) NULL,
	[fyManagerAlias] [nvarchar](40) NULL,
	[CyOrg] [nvarchar](40) NULL,
	[FyOrg] [nvarchar](40) NULL,
	[ProposedOrg] [nvarchar](40) NULL,
	[CyRoleSummary] [nvarchar](40) NULL,
	[FyRoleSummary] [nvarchar](40) NULL,
	[ProposedRoleSummary] [nvarchar](40) NULL,
	[CyQ1] [nvarchar](40) NULL,
	[FyQ1] [nvarchar](40) NULL,
	[ProposedQ1] [nvarchar](40) NULL,
	[CyQ2] [nvarchar](40) NULL,
	[FyQ2] [nvarchar](40) NULL,
	[ProposedQ2] [nvarchar](40) NULL,
	[CyCareerStage] [nvarchar](40) NULL,
	[FyCareerStage] [nvarchar](40) NULL,
	[ProposedCareerStage] [nvarchar](40) NULL,
	[CyCostCenter] [nvarchar](40) NULL,
	[FyCostCenter] [nvarchar](40) NULL,
	[ProposedCostCenter] [nvarchar](40) NULL,
	[MarkedInReviewByAlias] [nvarchar](40) NULL,
	[MarkedInReviewByName] [nvarchar](100) NULL,
	[MarkedInReviewDate] [datetime] NULL,
	[status] [nvarchar](40) NULL,
	[comments] [nvarchar](500) NULL,
	[approverComments] [nvarchar](500) NULL,
	[approvedRejectedBy] [nvarchar](40) NULL,
	[approvedRejectedDate] [nvarchar](40) NULL,
	[InReviewEmailSent] [bit] NULL,
	[SubmittedMailSent] [bit] NULL,
	[ApprovedOrRejectedEmailSent] [bit] NULL,
	[CyIncentivePlan] [NVARCHAR](50) NULL,
	[FyIncentivePlan] [NVARCHAR](50) NULL,
	[ProposedIncentivePlan] [NVARCHAR](50) NULL,
	[isActive] [bit] Not NULL,
	[createdBy] [nvarchar](40) NULL,
	[createdDate] [datetime] Not NULL,
	[modifiedBy] [nvarchar](40) NULL,
	[modifiedDate] [datetime]  Not NULL,
    [createdByUserFullName] [nvarchar](100) NULL, 
    PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [HR].[Tbl_HRData_TaxonomyCorrection] ADD  DEFAULT ((0)) FOR [InReviewEmailSent]
GO

ALTER TABLE [HR].[Tbl_HRData_TaxonomyCorrection] ADD  DEFAULT ((0)) FOR [SubmittedMailSent]
GO

ALTER TABLE [HR].[Tbl_HRData_TaxonomyCorrection] ADD  DEFAULT ((0)) FOR [ApprovedOrRejectedEmailSent]
GO

ALTER TABLE [HR].[Tbl_HRData_TaxonomyCorrection] ADD  DEFAULT ((1)) FOR [isActive]
GO

ALTER TABLE [HR].[Tbl_HRData_TaxonomyCorrection] ADD  DEFAULT (getutcdate()) FOR [createdDate]
GO

ALTER TABLE [HR].[Tbl_HRData_TaxonomyCorrection] ADD  DEFAULT (getutcdate()) FOR [modifiedDate]
GO


