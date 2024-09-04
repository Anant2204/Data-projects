CREATE PROCEDURE [HR].[Insert_Org_CostCenter_Mapping]
AS
	Truncate table [HR].[Org_CostCenter_Mapping_Staging]
	Insert into [HR].[Org_CostCenter_Mapping_Staging] ([Org]
		,[CostCenterCode]
		,[CostCenter]
		,[CompanyCode])
	select DISTINCT og.isp_name as Org,
		cc.isp_name as CostCenterCode,
		cc.isp_costcentername as CostCenter,
		isp_glcompanycode as CompanyCode
	from Isp_costcenter cc
	left join isp_org og on cc.isp_org=og.isp_orgid
	where og.isp_orgid is not null;  --Added this on 30-04-2024 by tanmay to avoid load failures as ISP can have nulls 