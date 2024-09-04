CREATE TABLE [BSO].DV_Area (
    areaname NVARCHAR(200),
    areaid NVARCHAR(50),
    modifiedon DATETIME,
    statecode BIT
);

CREATE TABLE [BSO].DV_RequestTypes (
    servicegroup_mapping_id NVARCHAR(50),
    service_request_typeid NVARCHAR(50),
    service_request_type_name NVARCHAR(200),
    modifiedon DATETIME,
    statecode BIT
);

CREATE TABLE [BSO].DV_Role (
    irisappname NVARCHAR(100),
    role_id NVARCHAR(50),
    role_name NVARCHAR(200),
    sortname NVARCHAR(100),
    modifiedon DATETIME,
    statecode BIT
);


CREATE TABLE [BSO].DV_Segment (
    segmentsid NVARCHAR(50),
    segment_name NVARCHAR(200),
    modifiedon DATETIME,
    statecode BIT
);

CREATE TABLE [BSO].DV_Segment_Role (
    role_id NVARCHAR(50),
    segment_role_mapping_id NVARCHAR(50),
    segmentsid NVARCHAR(50)
);

CREATE TABLE [BSO].DV_ServiceAreaRoleSegmentMapping (
    service_mapping_id NVARCHAR(50),
    servicerequestformlink NVARCHAR(2000),
    modifiedon DATETIME,
    statecode BIT
);

CREATE TABLE [BSO].DV_ServiceGroups (
    service_groupid NVARCHAR(50),
    service_group_name NVARCHAR(200),
    service_groupdescription NVARCHAR(MAX),
    modifiedon DATETIME,
    statecode BIT
);

CREATE TABLE [BSO].DV_ServiceMapping_Area (
    areaid NVARCHAR(50),
    gsmo_bsoserviceareaofinterestareamapid NVARCHAR(50),
    gsmo_bsoserviceareaofinterestareamappingid NVARCHAR(50)
);






