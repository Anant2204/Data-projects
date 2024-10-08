﻿CREATE TABLE [dbo].[Employee_CYData] (
    [Email]                        NVARCHAR (50)    NULL,
    [Full_Name]                    NVARCHAR (MAX)   NULL,
    [ManagerEmail]                 NVARCHAR (50)    NULL,
    [Reports_To_Full_Name]         NVARCHAR (MAX)   NULL,
    [Reports_To_Level_1_Email]     NVARCHAR (50)    NULL,
    [Reports_To_Level_2_Email]     NVARCHAR (50)    NULL,
    [Reports_To_Level_3_Email]     NVARCHAR (50)    NULL,
    [Reports_To_Level_4_Email]     NVARCHAR (50)    NULL,
    [Reports_To_Level_5_Email]     NVARCHAR (50)    NULL,
    [Reports_To_Level_6_Email]     NVARCHAR (50)    NULL,
    [Reports_To_Level_7_Email]     NVARCHAR (50)    NULL,
    [Reports_To_Level_1_Full_Name] NVARCHAR (MAX)   NULL,
    [Reports_To_Level_2_Full_Name] NVARCHAR (MAX)   NULL,
    [Reports_To_Level_3_Full_Name] NVARCHAR (MAX)   NULL,
    [Reports_To_Level_4_Full_Name] NVARCHAR (MAX)   NULL,
    [Reports_To_Level_5_Full_Name] NVARCHAR (MAX)   NULL,
    [Reports_To_Level_6_Full_Name] NVARCHAR (MAX)   NULL,
    [Reports_To_Level_7_Full_Name] NVARCHAR (MAX)   NULL,
    [isp_worker]                   UNIQUEIDENTIFIER NULL,
    [isp_org]                      UNIQUEIDENTIFIER NULL,
    [isp_qualifier1]               UNIQUEIDENTIFIER NULL,
    [isp_costcenter]               UNIQUEIDENTIFIER NULL,
    [isp_incentiveplan]            UNIQUEIDENTIFIER NULL,
    [isp_careerstage]              UNIQUEIDENTIFIER NULL,
    [isp_qualifier2]               UNIQUEIDENTIFIER NULL,
    [isp_rolesummary]              UNIQUEIDENTIFIER NULL
);

