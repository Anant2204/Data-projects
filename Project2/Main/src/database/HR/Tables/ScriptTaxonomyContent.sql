
CREATE TABLE [HR].[ScriptTaxonomyContent](
	[ID] [int] IDENTITY(1,1) PRIMARY KEY,
	[cyOrg] [nvarchar](40) NOT NULL,
	[cyRoleSummary] [nvarchar](50) NOT NULL,
	[cyQ1] [nvarchar](50) NOT NULL,
	[cyQ2] [nvarchar](50) NOT NULL,
	[fyOrg] [nvarchar](40) NOT NULL,
	[fyRoleSummary] [nvarchar](50) NOT NULL,
	[fyQ1] [nvarchar](50) NOT NULL,
	[fyQ2] [nvarchar](50) NOT NULL,
	[cyIncentivePlan] [nvarchar](50) NOT NULL DEFAULT ('All'),
    [fyIncentivePlan] [nvarchar](50) NOT NULL DEFAULT ('All'),
	[content] [nvarchar](max) NULL,
	[status] [nvarchar](50) NULL,
	[title] [nvarchar](500) NULL,
	[isActive] [bit] NULL DEFAULT ((1)),
    [createdBy] [nvarchar](40) NOT NULL ,
    [createdDate] [datetime] NULL DEFAULT (GETUTCDATE()),
    [modifiedBy] [nvarchar](40) NOT NULL ,
	[modifiedDate] [datetime] NULL DEFAULT (GETUTCDATE()),
	validFrom datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
    validTo datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
    PERIOD FOR SYSTEM_TIME (validFrom, validTo)
	)
WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = [HR].[ScriptTaxonomyContentHistory]));

GO
ALTER TABLE [HR].[ScriptTaxonomyContent]
ADD CONSTRAINT UC_TaxonomyContent UNIQUE (cyOrg, cyRoleSummary,cyQ1,cyQ2,fyOrg,cyIncentivePlan,fyIncentivePlan ,fyRoleSummary,fyQ1,fyQ2);