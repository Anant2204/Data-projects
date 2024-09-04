CREATE PROCEDURE HR.Usp_UpdateDiscipline_Profession_HRdata
AS
BEGIN
    --**update FY profession 
    UPDATE hr.tbl_hrdata_staging
    SET fy_Profession = Isp_rolesummary.isp_profession
    FROM hr.tbl_hrdata_staging h
    INNER JOIN Isp_rolesummary
    ON h.fy_RoleSummary = Isp_rolesummary.isp_name; 

    --**update CY profession 
    UPDATE hr.tbl_hrdata_staging
    SET CY_Profession = Isp_rolesummary.isp_profession
    FROM hr.tbl_hrdata_staging h
    INNER JOIN Isp_rolesummary
    ON h.CY_RoleSummary = Isp_rolesummary.isp_name; 

    --**update FY Discipline 
    UPDATE hrdata
    SET hrdata.Fy_discipline = idis.isp_name
    FROM hr.tbl_hrdata_staging hrdata
    INNER JOIN Isp_rolesummary irole
    ON hrdata.FY_rolesummary = irole.isp_name
    INNER JOIN Isp_discipline idis
    ON irole.isp_discipline = idis.Isp_disciplineid;

    --**update CY Discipline  
    UPDATE hrdata
    SET hrdata.CY_Discipline = idis.isp_name
    FROM hr.tbl_hrdata_staging hrdata
    INNER JOIN Isp_rolesummary irole
    ON hrdata.CY_RoleSummary = irole.isp_name
    INNER JOIN Isp_discipline idis
    ON irole.isp_discipline = idis.Isp_disciplineid;

    
    --**update CY Discipline and Qualifiers from mspeople for rename scenario
    update hrdata
    set hrdata.CY_Discipline = msp1.discipline
	, hrdata.cy_profession = msp1.profession
	, hrdata.cy_rolesummary = msp1.rolesummary
    , hrdata.cy_q1 = msp1.qualifier1
    , hrdata.cy_q2 = msp1.qualifier2
    from hr.tbl_hrdata_staging hrdata
    INNER JOIN [HR].[mspeople] msp1 on msp1.email = hrdata.IC



END

