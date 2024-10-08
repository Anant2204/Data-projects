﻿CREATE TABLE [dbo].[Isp_incentiveplan] (
    [createdby]                  UNIQUEIDENTIFIER NULL,
    [createdbyname]              NVARCHAR (MAX)   NULL,
    [createdbyyominame]          NVARCHAR (MAX)   NULL,
    [createdon]                  DATETIME2 (7)    NULL,
    [createdonbehalfby]          UNIQUEIDENTIFIER NULL,
    [createdonbehalfbyname]      NVARCHAR (MAX)   NULL,
    [createdonbehalfbyyominame]  NVARCHAR (MAX)   NULL,
    [importsequencenumber]       INT              NULL,
    [isp_enddate]                DATETIME2 (7)    NULL,
    [isp_incentivecode]          NVARCHAR (MAX)   NULL,
    [isp_incentiveplanid]        UNIQUEIDENTIFIER NULL,
    [isp_incentiveplantype]      INT              NULL,
    [isp_name]                   NVARCHAR (MAX)   NULL,
    [isp_startdate]              DATETIME2 (7)    NULL,
    [modifiedby]                 UNIQUEIDENTIFIER NULL,
    [modifiedbyname]             NVARCHAR (MAX)   NULL,
    [modifiedbyyominame]         NVARCHAR (MAX)   NULL,
    [modifiedon]                 DATETIME2 (7)    NULL,
    [modifiedonbehalfby]         UNIQUEIDENTIFIER NULL,
    [modifiedonbehalfbyname]     NVARCHAR (MAX)   NULL,
    [modifiedonbehalfbyyominame] NVARCHAR (MAX)   NULL,
    [organizationid]             UNIQUEIDENTIFIER NULL,
    [organizationidname]         NVARCHAR (MAX)   NULL,
    [overriddencreatedon]        DATETIME2 (7)    NULL,
    [statecode]                  INT              NULL,
    [statuscode]                 INT              NULL,
    [timezoneruleversionnumber]  INT              NULL,
    [utcconversiontimezonecode]  INT              NULL,
    [versionnumber]              BIGINT           NULL
);

