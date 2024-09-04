CREATE TABLE [HR].[Scripts_Logic] (
    [FY22_Org]                         NVARCHAR (100)  NULL,
    [FY22_Standard_Title_Role_Summary] NVARCHAR (300)  NULL,
    [FY22_Qualifier_1]                 NVARCHAR (50)   NULL,
    [FY22_Qualifier_2]                 NVARCHAR (50)   NULL,
    [FY22_Reports_To_Level_2_Email]    NVARCHAR (300)  NULL,
    [FY23_Org]                         NVARCHAR (50)   NULL,
    [FY23_Standard_Title_Role_Summary] NVARCHAR (50)   NULL,
    [FY23_Qualifier_1]                 NVARCHAR (50)   NULL,
    [FY23_Qualifier_2]                 NVARCHAR (50)   NULL,
    [FY23_Reports_To_Level_2_Email]    NVARCHAR (1300) NULL,
    [Script_Name]                      NVARCHAR (1000) NOT NULL,
    [Link]                             NVARCHAR (4000) NOT NULL,
    [Priority]                         INT             NOT NULL
);

