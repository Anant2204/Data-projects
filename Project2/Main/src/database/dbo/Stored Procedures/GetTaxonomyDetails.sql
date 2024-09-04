Create Procedure dbo.[GetTaxonomyDetails]
@Org nvarchar(200)
,@CareerStage nvarchar(200)

as
Begin

	SELECT Distinct RoleSummary, q1,q2
	FROM hr.MCT_EDM_Mapping
	where Org =@Org and CareerStage=@CareerStage
end	

GO


