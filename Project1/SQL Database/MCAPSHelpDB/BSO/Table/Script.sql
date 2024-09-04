

--Updated Code

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameConfig VARCHAR(50) = 'config'

IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = 'BSO')
BEGIN
    EXEC('CREATE SCHEMA BSO');
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameConfig VARCHAR(50) = 'config'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameConfig)
BEGIN
    CREATE TABLE BSO.config (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        [key] VARCHAR(255) NOT NULL,
        [value] VARCHAR(500) NOT NULL
       
    );
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameArea VARCHAR(50) = 'Area'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameArea)
BEGIN
CREATE TABLE BSO.Area (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) ,
	DataverseRowID UNIQUEIDENTIFIER ,
    IsActive BIT
);
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameRole VARCHAR(50) = 'Role'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameRole)
BEGIN
CREATE TABLE BSO.[Role] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255),
	DataverseRowID UNIQUEIDENTIFIER,
    IsActive BIT
);
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameSegment VARCHAR(50) = 'Segment'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameSegment)
BEGIN
CREATE TABLE BSO.[Segment] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255),
	DataverseRowID UNIQUEIDENTIFIER,
    IsActive BIT
);

END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameSubSegment VARCHAR(50) = 'SubSegment'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameSubSegment)
BEGIN
CREATE TABLE BSO.[SubSegment] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255),
	DataverseRowID UNIQUEIDENTIFIER,
    IsActive BIT
);
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameUserADGroup VARCHAR(50) = 'UserADGroup'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameUserADGroup)
BEGIN
CREATE TABLE [BSO].[UserADGroup] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(500),
	DataverseRowID UNIQUEIDENTIFIER,
    IsActive BIT
);
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameServiceOwner VARCHAR(50) = 'ServiceOwner'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameServiceOwner)
BEGIN
CREATE TABLE BSO.[ServiceOwner] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    UPN NVARCHAR(500),	
    IsActive BIT
);
END;
GO



DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameServices VARCHAR(50) = 'Services'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameServices)
BEGIN
CREATE TABLE BSO.[Services] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    [Name] NVARCHAR(500),
    IRIS_Utterance NVARCHAR(500),
    AboutService NVARCHAR(MAX),
	relatedinformation  NVARCHAR(MAX),
    IsNonIRISService BIT,
    ServiceRequestFormLink NVARCHAR(MAX),
    IsDropdownUI BIT,
	ServiceDropDownLinks NVARCHAR(MAX),
    ServiceCategories NVARCHAR(MAX),
--	ServiceOwner int, -- removed as [ServiceOwnerServices] has list of owners for service
    --ServiceOwner Nvarchar(2000), -- Consider Lookup as multiple values
    IsPrivate BIT,
	DataverseRowID UNIQUEIDENTIFIER,
	isActive BIT
);
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameServiceOwnerServices VARCHAR(50) = 'ServiceOwnerServices'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameServiceOwnerServices)
BEGIN
CREATE TABLE BSO.[ServiceOwnerServices] (
    ServiceID INT,
    ServiceOwnerID INT,
    FOREIGN KEY (ServiceID) REFERENCES BSO.Services(ID),
    FOREIGN KEY (ServiceOwnerID) REFERENCES BSO.ServiceOwner(ID)
);
END;
GO


--select * from Services
-- This table send to business for reviewe and approval
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameServiceMapping VARCHAR(50) = 'ServiceMapping'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameServiceMapping)
BEGIN
CREATE TABLE BSO.ServiceMapping (
    ServiceID INT,
    ServiceArea INT,
    ServiceRole INT,
    ServiceAzureADGroup INT null,
    ServiceSegment INT,
    ServiceSubsegment INT null,
	DataverseRowID UNIQUEIDENTIFIER,
    IsActive BIT,   
    PRIMARY KEY (ServiceID, ServiceArea, ServiceRole, ServiceSegment),
    FOREIGN KEY (ServiceID) REFERENCES BSO.Services(ID),
    FOREIGN KEY (ServiceArea) REFERENCES BSO.Area(ID),
    FOREIGN KEY (ServiceRole) REFERENCES BSO.Role(ID),
   -- FOREIGN KEY (ServiceAzureADGroup) REFERENCES BSO.UserADGroup(ID),
    FOREIGN KEY (ServiceSegment) REFERENCES BSO.Segment(ID),
-- FOREIGN KEY (ServiceSubsegment) REFERENCES BSO.SubSegment(ID)
);
END;
GO


DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameUser VARCHAR(50) = 'User'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameUser)
BEGIN
CREATE TABLE BSO.[User] (
	Id INT IDENTITY(1,1) PRIMARY KEY,
    UPN NVARCHAR(255),
    UserArea INT,
    UserRole INT,
    Segment INT,
    SubSegment INT,
	DataverseRowID UNIQUEIDENTIFIER,
    IsActive BIT,
    ---PRIMARY KEY (ID),
   
	FOREIGN KEY (Segment) REFERENCES BSO.Segment(ID),
	FOREIGN KEY (SubSegment) REFERENCES BSO.SubSegment(ID),
	FOREIGN KEY (UserArea) REFERENCES BSO.Area(ID),
	FOREIGN KEY (UserRole) REFERENCES BSO.Role(ID),
	
);
END;
GO


DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameUserWorkSpaceServices VARCHAR(50) = 'UserWorkSpaceServices'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameUserWorkSpaceServices)
BEGIN
CREATE TABLE [BSO].[UserWorkSpaceServices](
    Id INT IDENTITY(1,1) PRIMARY KEY,
	UserID INT, 
	ServiceID INT, 
    FOREIGN KEY (ServiceID) REFERENCES BSO.Services(ID),
	FOREIGN KEY (UserID) REFERENCES BSO.[User](ID),
)
END;
GO

-- Schema not complete as requirement not clear how to fetch  (as current V1 simply has live call from IRIS)
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameMyHelpDasboard VARCHAR(50) = 'MyHelpDasboard'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameMyHelpDasboard)
BEGIN
CREATE TABLE [BSO].[MyHelpDasboard](
    Id INT IDENTITY(1,1) PRIMARY KEY,
	UserID INT, 
	TicketID Nvarchar(500), 
	TicketStatus Nvarchar(20), CHECK (TicketStatus IN ('Open', 'ActionRequired', 'Closed'))	,
	FOREIGN KEY (UserID) REFERENCES BSO.[User](ID)
)
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameDatabaseSyncJob VARCHAR(50) = 'DatabaseSyncJob'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameDatabaseSyncJob)
BEGIN
CREATE TABLE [BSO].[DatabaseSyncJob](
    JObId INT IDENTITY(1,1) PRIMARY KEY,
	JObStatus nvarchar(20) CHECK (JObStatus IN ('Started', 'In-Progress', 'Completed', 'Failed')),
	JobStartTime DateTime, 
	JobEndTime DateTime,
	JobName NVARCHAR(50),
	RecordsProcessed INT,
    ErrorDetails NVARCHAR(MAX),
    CreatedBy NVARCHAR(255),
    ModifiedBy NVARCHAR(255),
    JobDuration AS DATEDIFF(MINUTE, JobStartTime, JobEndTime)
)
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameUserADGroupMapping VARCHAR(50) = 'UserADGroupMapping'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameUserADGroupMapping)
BEGIN
CREATE TABLE [BSO].[UserADGroupMapping] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [UserId] INT FOREIGN KEY REFERENCES [BSO].[User]([Id]),
    [UserADGroupID] INT FOREIGN KEY REFERENCES [BSO].[UserADGroup]([ID])
);
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameFeedbackSatisfaction VARCHAR(50) = 'FeedbackSatisfaction'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameFeedbackSatisfaction)
BEGIN
CREATE TABLE [BSO].FeedbackSatisfaction (
    SatisfactionID INT PRIMARY KEY,
    SatisfactionLevel VARCHAR(20) UNIQUE
)



INSERT INTO [BSO].FeedbackSatisfaction (SatisfactionID, SatisfactionLevel)
VALUES (1, 'Very Satisfied'),
       (2, 'Satisfied'),
       (3, 'Dissatisfied'),
       (4, 'Very Dissatisfied');
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameGiveUsFeedback VARCHAR(50) = 'GiveUsFeedback'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameGiveUsFeedback)
BEGIN
    CREATE TABLE [BSO].GiveUsFeedback (
        FeedbackID INT PRIMARY KEY IDENTITY(1,1),
        UserID INT,
        SatisfactionID INT,
        PleaseTellUs NVARCHAR(MAX),
        ScreenshotURL NVARCHAR(MAX),
        EncryptedEmail NVARCHAR(MAX),
        CONSTRAINT FK_UserID FOREIGN KEY (UserID) REFERENCES [BSO].[User](Id),
        CONSTRAINT FK_SatisfactionID FOREIGN KEY (SatisfactionID) REFERENCES [BSO].[FeedbackSatisfaction](SatisfactionID)
    );
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameAnnouncement VARCHAR(50) = 'Announcement'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameAnnouncement)
BEGIN
    CREATE TABLE BSO.Announcement (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    [Title] [nvarchar](100) NULL,
	[Description] [nvarchar](255) NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[IsAnnouncement] [bit] NULL,
	[Type] [nvarchar](50) NULL       
    );
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameServiceGroup VARCHAR(50) = 'ServiceGroup'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameServiceGroup)
BEGIN
CREATE TABLE [BSO].ServiceGroup (
    ServiceGroupID INT PRIMARY KEY IDENTITY(1,1),
    ServiceGroupName NVARCHAR(100) NOT NULL,
    ServiceGroupDescription NVARCHAR(MAX),
    ServiceID INT REFERENCES [BSO].[Services](ID),
    IsActive BIT,
    CreatedDate DATETIME DEFAULT GETDATE(),
    ModifiedDate DATETIME DEFAULT GETDATE(),
    CreatedBy NVARCHAR(50),
    ModifiedBy NVARCHAR(50),
	DataverseRowID UniqueIdentifier null
);
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameRequestType VARCHAR(50) = 'RequestType'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameRequestType)
BEGIN

CREATE TABLE [BSO].RequestType (
    RequestTypeID INT PRIMARY KEY IDENTITY(1,1),
    RequestTypeName NVARCHAR(100) NOT NULL,
    ServiceGroupID INT REFERENCES [BSO].ServiceGroup(ServiceGroupID),
    IsActive BIT,
    CreatedDate DATETIME DEFAULT GETDATE(),
    ModifiedDate DATETIME DEFAULT GETDATE(),
    CreatedBy NVARCHAR(50),
    ModifiedBy NVARCHAR(50),
	DataverseRowID UniqueIdentifier null
);
END;
GO

--ALTER TABLE [BSO].RequestType
--ADD DataverseRowID UniqueIdentifier null

--ALTER TABLE [BSO].STG_ServiceGroup
----ADD  ServiceID INT  
--ADD CONSTRAINT FK_STG_ServiceGroup_Services
--FOREIGN KEY (ServiceID) REFERENCES [BSO].[STG_Services](ID);

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_Services]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[STG_Services](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[IRIS_Utterance] [nvarchar](500) NULL,
	[AboutService] [nvarchar](max) NULL,
	[relatedinformation] [nvarchar](max) NULL,
	[IsNonIRISService] [bit] NULL,
	[ServiceRequestFormLink] [nvarchar](max) NULL,
	[IsDropdownUI] [bit] NULL,
	[ServiceDropDownLinks] [nvarchar](max) NULL,
	[ServiceCategories] [nvarchar](max) NULL,
	[IsPrivate] [bit] NULL,
	[DataverseRowID] [uniqueidentifier] NULL,
	[ServiceAzureADGroup] [int] NULL,
	[IsSecuredByAzureADGroup] [bit] NULL,
	[FAQLink] [nvarchar](max) NULL,
	[isActive] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[IDWEBGroup_DataverseRowID] [uniqueidentifier] NULL,
	[IrisAppName] [nvarchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceGroup]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[STG_ServiceGroup](
	[ServiceGroupID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceGroupName] [nvarchar](100) NOT NULL,
	[ServiceGroupDescription] [nvarchar](max) NULL,
	[IsActive] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[DataverseRowID] [uniqueidentifier] NULL,
	[ServiceID] [int] NULL,
	[Service_DataverseRowID] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[ServiceGroupID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_User]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_User](
	[azureactivedirectoryobjectid] [nvarchar](50) NULL,
	[fullname] [nvarchar](200) NULL,
	[internalemailaddress] [nvarchar](200) NULL,
	[systemuserid] [nvarchar](50) NULL
) ON [PRIMARY]
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameSTG_ServiceGroup VARCHAR(50) = 'STG_ServiceGroup'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameSTG_ServiceGroup)
BEGIN
CREATE TABLE [BSO].STG_ServiceGroup (
    ServiceGroupID INT PRIMARY KEY IDENTITY(1,1),
    ServiceGroupName NVARCHAR(100) NOT NULL,
    ServiceGroupDescription NVARCHAR(MAX),
    ServiceID INT REFERENCES [BSO].[STG_Services](ID),
    IsActive BIT,
    CreatedDate DATETIME DEFAULT GETDATE(),
    ModifiedDate DATETIME DEFAULT GETDATE(),
    CreatedBy NVARCHAR(50),
    ModifiedBy NVARCHAR(50),
		DataverseRowID UniqueIdentifier null
);
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameSTG_RequestType VARCHAR(50) = 'STG_RequestType'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameSTG_RequestType)
BEGIN
CREATE TABLE [BSO].STG_RequestType (
    RequestTypeID INT PRIMARY KEY IDENTITY(1,1),
    RequestTypeName NVARCHAR(100) NOT NULL,
    ServiceGroupID INT REFERENCES [BSO].STG_ServiceGroup(ServiceGroupID),
    IsActive BIT,
    CreatedDate DATETIME DEFAULT GETDATE(),
    ModifiedDate DATETIME DEFAULT GETDATE(),
    CreatedBy NVARCHAR(50),
    ModifiedBy NVARCHAR(50), 
		DataverseRowID UniqueIdentifier null
);
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameSTG_ServiceOwner VARCHAR(50) = 'STG_ServiceOwner'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameSTG_ServiceOwner)
BEGIN
CREATE TABLE BSO.[STG_ServiceOwner] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    UPN NVARCHAR(500),	
    IsActive BIT,
	DataverseRowID UNIQUEIDENTIFIER,
	CreatedDate DATETIME DEFAULT GETDATE(),
    ModifiedDate DATETIME DEFAULT GETDATE(),
    CreatedBy NVARCHAR(50),
    ModifiedBy NVARCHAR(50)
);
END;
GO


IF EXISTS (SELECT name FROM sys.indexes  
            WHERE name = N'IX_DV_User_SystemUserID')   
    DROP INDEX IX_DV_User_SystemUserID ON BSO.DV_User;   
GO  
   
CREATE NONCLUSTERED INDEX IX_DV_User_SystemUserID   
    ON BSO.DV_User (systemuserid);   
GO  

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameSTG_ServiceIDWebGroup VARCHAR(50) = 'STG_ServiceIDWebGroup'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameSTG_ServiceIDWebGroup)
BEGIN

	CREATE TABLE BSO.STG_ServiceIDWebGroup
		(ID INT IDENTITY(1,1) PRIMARY KEY,
		Name NVARCHAR(500) null,
		IDWebGroup_ID NVARCHAR(50) null,
		Group_ID NVARCHAR(50) null,
		statecode bit null
		)
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @table_nameDV_ServiceMapping VARCHAR(50) = 'DV_ServiceMapping'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @table_nameDV_ServiceMapping)
BEGIN

	CREATE TABLE BSO.DV_ServiceMapping
		(ServiceMapping_ID NVARCHAR(50) null,
		ServiceFormLink NVARCHAR(max) null,
		ServiceRequest_ID NVARCHAR(50) null
		)
END;
GO

IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'STG_InsertRequestTypeTempTable' AND ss.name = N'BSO')
BEGIN
CREATE TYPE [BSO].[STG_InsertRequestTypeTempTable] AS TABLE(
	[RequestTypeName] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[DataverseRowID] [nvarchar](max) NULL
)
END
GO

IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'STG_InsertServiceGroTemPTable' AND ss.name = N'BSO')
BEGIN
CREATE TYPE [BSO].[STG_InsertServiceGroTemPTable] AS TABLE(
	[ServiceGroupDescription] [nvarchar](max) NULL
)
END
GO

IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'UserADGroupIDList' AND ss.name = N'BSO')
BEGIN
CREATE TYPE [BSO].[UserADGroupIDList] AS TABLE(
	[UserADGroupID] [int] NULL
)
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'UserADGroupListForJob' AND ss.name = N'BSO')
BEGIN
CREATE TYPE [BSO].[UserADGroupListForJob] AS TABLE(
	[UserADGroupID] [nvarchar](300) NULL
)
END
GO

IF NOT EXISTS (SELECT 1  FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'STG_InsertServiceGroTemPTable' AND ss.name = N'dbo')
BEGIN
CREATE TYPE [dbo].[STG_InsertServiceGroTemPTable] AS TABLE(
	[ServiceTableDataVerseID] [nvarchar](200) NULL,
	[ServiceGroupID] [int] NULL
)
END
GO



IF NOT EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[AboutMCAPSHELPHtmlContentTable]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[AboutMCAPSHELPHtmlContentTable](
	[ContentID] [int] IDENTITY(1,1) NOT NULL,
	[ContentType] [nvarchar](50) NOT NULL,
	[HtmlContent] [nvarchar](max) NOT NULL,
	[IsActive] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ContentID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[AboutNavigationLinks]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[AboutNavigationLinks](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Content] [nvarchar](max) NULL,
	[Url] [nvarchar](max) NULL,
	[Key] [nvarchar](50) NOT NULL,
	[ParentLinkId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[ADFTransactionLog]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[ADFTransactionLog](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TransactionLog] [nvarchar](max) NULL,
	[CreatedBy] [nvarchar](200) NULL,
	[CreatedDate] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[Announcement]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[Announcement](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](100) NULL,
	[Description] [nvarchar](max) NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[IsAnnouncement] [bit] NULL,
	[Type] [nvarchar](50) NULL,
	[DataverseRowID] [uniqueidentifier] NULL,
	[ModifiedOn] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[AnnouncementTypes]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[AnnouncementTypes](
	[AnnouncementTypeID] [int] IDENTITY(1,1) NOT NULL,
	[AnnouncementTypeName] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AnnouncementTypeID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[AnnouncementTypeName] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END
GO




IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[config]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[config](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[key] [varchar](255) NOT NULL,
	[value] [varchar](500) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DatabaseSyncJob]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DatabaseSyncJob](
	[JObId] [int] IDENTITY(1,1) NOT NULL,
	[JObStatus] [nvarchar](20) NULL,
	[JobStartTime] [datetime] NULL,
	[JobEndTime] [datetime] NULL,
	[JobName] [nvarchar](50) NULL,
	[RecordsProcessed] [int] NULL,
	[ErrorDetails] [nvarchar](max) NULL,
	[CreatedBy] [nvarchar](255) NULL,
	[ModifiedBy] [nvarchar](255) NULL,
	[JobDuration]  AS (datediff(minute,[JobStartTime],[JobEndTime])),
PRIMARY KEY CLUSTERED 
(
	[JObId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_Announcement]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_Announcement](
	[Announcement_id] [nvarchar](50) NULL,
	[Announcement_title] [nvarchar](500) NULL,
	[Announcement_description] [nvarchar](max) NULL,
	[Announcement_type] [nvarchar](50) NULL,
	[startdate] [datetime] NULL,
	[enddate] [datetime] NULL,
	[statecode] [bit] NULL,
	[modifiedon] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_Area]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_Area](
	[areaname] [nvarchar](200) NULL,
	[areaid] [nvarchar](50) NULL,
	[modifiedon] [datetime] NULL,
	[statecode] [bit] NULL
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_RequestTypes]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_RequestTypes](
	[servicegroup_mapping_id] [nvarchar](50) NULL,
	[service_request_typeid] [nvarchar](50) NULL,
	[service_request_type_name] [nvarchar](200) NULL,
	[modifiedon] [datetime] NULL,
	[statecode] [bit] NULL
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_Role]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_Role](
	[irisappname] [nvarchar](100) NULL,
	[role_id] [nvarchar](50) NULL,
	[role_name] [nvarchar](200) NULL,
	[sortname] [nvarchar](100) NULL,
	[modifiedon] [datetime] NULL,
	[statecode] [bit] NULL
) ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_Segment]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_Segment](
	[segmentsid] [nvarchar](50) NULL,
	[segment_name] [nvarchar](200) NULL,
	[modifiedon] [datetime] NULL,
	[statecode] [bit] NULL
) ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_Segment_Role]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_Segment_Role](
	[role_id] [nvarchar](50) NULL,
	[segment_role_mapping_id] [nvarchar](50) NULL,
	[segmentsid] [nvarchar](50) NULL
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_ServiceAreaRoleSegmentMapping]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_ServiceAreaRoleSegmentMapping](
	[service_mapping_id] [nvarchar](50) NULL,
	[service_request_mapping_id] [nvarchar](50) NULL,
	[servicerequestformlink] [nvarchar](2000) NULL,
	[modifiedon] [datetime] NULL,
	[statecode] [bit] NULL
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_ServiceGroups]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_ServiceGroups](
	[service_groupid] [nvarchar](50) NULL,
	[service_group_name] [nvarchar](200) NULL,
	[service_groupdescription] [nvarchar](max) NULL,
	[modifiedon] [datetime] NULL,
	[statecode] [bit] NULL,
	[servicename_mapping_id] [nvarchar](50) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_ServiceIDWebGroup]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_ServiceIDWebGroup](
	[servicename_id] [nvarchar](50) NULL,
	[name] [nvarchar](500) NULL,
	[groupID] [nvarchar](50) NULL,
	[idwebGroup_id] [nvarchar](50) NULL,
	[statecode] [bit] NULL
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_ServiceMapping]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_ServiceMapping](
	[ServiceMapping_ID] [nvarchar](50) NULL,
	[ServiceFormLink] [nvarchar](max) NULL,
	[ServiceRequest_ID] [nvarchar](50) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_ServiceMapping_Area]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_ServiceMapping_Area](
	[areaid] [nvarchar](50) NULL,
	[ServiceMapping_Area_id
] [nvarchar](50) NULL,
	[service_request_mapping_id] [nvarchar](50) NULL
) ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_ServiceMapping_Role]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_ServiceMapping_Role](
	[role_id] [nvarchar](50) NULL,
	[ServiceMapping_Role_id] [nvarchar](50) NULL,
	[service_request_mapping_id] [nvarchar](50) NULL
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_ServiceMapping_Segment]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_ServiceMapping_Segment](
	[segmentsid] [nvarchar](50) NULL,
	[ServiceMapping_Segment_id] [nvarchar](50) NULL,
	[service_request_mapping_id] [nvarchar](50) NULL
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_ServiceNames]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_ServiceNames](
	[idwebgroup] [nvarchar](50) NULL,
	[idweblink] [nvarchar](2000) NULL,
	[irisutterance] [nvarchar](100) NULL,
	[isidwebservicegroup] [bit] NULL,
	[isnonirisservice] [bit] NULL,
	[mcapslanguage] [nvarchar](50) NULL,
	[relatedinformation] [nvarchar](max) NULL,
	[serviceownergroup] [nvarchar](50) NULL,
	[serviceownertype] [nvarchar](50) NULL,
	[serviceowneruser] [nvarchar](50) NULL,
	[servicetiledescription] [nvarchar](max) NULL,
	[tileblurb] [nvarchar](max) NULL,
	[servicename_id] [nvarchar](50) NULL,
	[dropdownvalues] [nvarchar](2000) NULL,
	[needdropdown] [bit] NULL,
	[servicedescription] [nvarchar](max) NULL,
	[servicename] [nvarchar](200) NULL,
	[modifiedon] [datetime] NULL,
	[statecode] [bit] NULL,
	[IrisAppName] [nvarchar](200) NULL,
	[FAQLink] [NVARCHAR](MAX) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_ServiceOwners]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_ServiceOwners](
	[servicename_id] [nvarchar](50) NULL,
	[displayname] [nvarchar](500) NULL,
	[primayemail] [nvarchar](500) NULL,
	[serviceowner_id] [nvarchar](50) NULL,
	[serviceowner_type] [nvarchar](50) NULL,
	[statecode] [bit] NULL
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_ServiceRequest]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_ServiceRequest](
	[service_requestid] [nvarchar](50) NULL,
	[service_request_name] [nvarchar](200) NULL,
	[service_request_requesttype] [nvarchar](50) NULL,
	[service_request_servicegroup] [nvarchar](50) NULL,
	[service_request_servicename] [nvarchar](50) NULL,
	[modifiedon] [datetime] NULL,
	[service_request_isdeleted] [bit] NULL,
	[statecode] [bit] NULL
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_SubSegment]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_SubSegment](
	[subsegments_id] [nvarchar](50) NULL,
	[subsegments_name] [nvarchar](200) NULL,
	[modifiedon] [datetime] NULL,
	[statecode] [bit] NULL
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_SubSegment_Segment]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_SubSegment_Segment](
	[segments_id] [nvarchar](50) NULL,
	[subsegment_segment_mappingid] [nvarchar](50) NULL,
	[subsegments_id] [nvarchar](50) NULL
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_Team]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_Team](
	[azureactivedirectoryobjectid] [nvarchar](50) NULL,
	[emailaddress] [nvarchar](200) NULL,
	[name] [nvarchar](200) NULL,
	[group_id] [nvarchar](50) NULL
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DV_User]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_User](
	[azureactivedirectoryobjectid] [nvarchar](50) NULL,
	[fullname] [nvarchar](200) NULL,
	[internalemailaddress] [nvarchar](200) NULL,
	[systemuserid] [nvarchar](50) NULL
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[FeedbackSatisfaction]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[FeedbackSatisfaction](
	[SatisfactionID] [int] NOT NULL,
	[SatisfactionLevel] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[SatisfactionID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[SatisfactionLevel] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GiveUsFeedback]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[GiveUsFeedback](
	[FeedbackID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[SatisfactionID] [int] NULL,
	[PleaseTellUs] [nvarchar](max) NULL,
	[ScreenshotURL] [nvarchar](max) NULL,
	[EncryptedEmail] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[FeedbackID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[MCAPS_Language]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[MCAPS_Language](
	[LanguageID] [int] IDENTITY(1,1) NOT NULL,
	[LanguageName] [nvarchar](255) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[LanguageID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[MyHelpDasboard]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[MyHelpDasboard](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[TicketID] [nvarchar](500) NULL,
	[TicketStatus] [nvarchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[RequestType]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[RequestType](
	[RequestTypeID] [int] IDENTITY(1,1) NOT NULL,
	[RequestTypeName] [nvarchar](200) NOT NULL,
	[ServiceGroupID] [int] NULL,
	[IsActive] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[DataverseRowID] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[RequestTypeID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END
GO



IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_RequestType]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[STG_RequestType](
	[RequestTypeID] [int] IDENTITY(1,1) NOT NULL,
	[RequestTypeName] [nvarchar](200) NOT NULL,
	[ServiceGroupID] [int] NULL,
	[IsActive] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[DataverseRowID] [uniqueidentifier] NULL,
	[ServiceGroup_DataverseRowID] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[RequestTypeID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceGroup]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[STG_ServiceGroup](
	[ServiceGroupID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceGroupName] [nvarchar](100) NOT NULL,
	[ServiceGroupDescription] [nvarchar](max) NULL,
	[IsActive] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[DataverseRowID] [uniqueidentifier] NULL,
	[ServiceID] [int] NULL,
	[Service_DataverseRowID] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[ServiceGroupID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceIDWebGroup]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[STG_ServiceIDWebGroup](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[IDWebGroup_ID] [nvarchar](50) NULL,
	[Group_ID] [nvarchar](50) NULL,
	[statecode] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceMapping]') AND type in (N'U'))
BEGIN
    --EXEC('
    CREATE TABLE [BSO].[STG_ServiceMapping](
        [ServiceID] [int] NOT NULL,
        [ServiceArea] [int] NOT NULL,
        [ServiceRole] [int] NOT NULL,
        [ServiceAzureADGroup] [int] NULL,
        [ServiceSegment] [int] NOT NULL,
        [ServiceSubsegment] [int] NOT NULL,
        [DataverseRowID] [uniqueidentifier] NULL,
        [IsActive] [bit] NULL,
        [RequestTypeID] [int] NOT NULL,
        [ServiceGroupID] [int] NOT NULL,
        [ServiceRequestFormLink] [nvarchar](max) NULL,
        [Service_DataverseRowID] [uniqueidentifier] NULL,
        [ServiceGroup_DataverseRowID] [uniqueidentifier] NULL,
        [RequestType_DataverseRowID] [uniqueidentifier] NULL,
     CONSTRAINT [PK_STG_ServiceMapping] PRIMARY KEY CLUSTERED 
    (
        [ServiceID] ASC,
        [ServiceArea] ASC,
        [ServiceRole] ASC,
        [ServiceSegment] ASC,
        [ServiceSubsegment] ASC,
        [RequestTypeID] ASC,
        [ServiceGroupID] ASC
    )WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
	--');
END
GO






--IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceMapping]') AND type in (N'U'))
--BEGIN

--CREATE TABLE [BSO].[STG_ServiceMapping](
--	[ServiceID] [int] NOT NULL,
--	[ServiceArea] [int] NOT NULL,
--	[ServiceRole] [int] NOT NULL,
--	[ServiceAzureADGroup] [int] NULL,
--	[ServiceSegment] [int] NOT NULL,
--	[ServiceSubsegment] [int] NOT NULL,
--	[DataverseRowID] [uniqueidentifier] NULL,
--	[IsActive] [bit] NULL,
--	[RequestTypeID] [int] NOT NULL,
--	[ServiceGroupID] [int] NOT NULL,
--	[ServiceRequestFormLink] [nvarchar](max) NULL,
--	[Service_DataverseRowID] [uniqueidentifier] NULL,
--	[ServiceGroup_DataverseRowID] [uniqueidentifier] NULL,
--	[RequestType_DataverseRowID] [uniqueidentifier] NULL,
-- CONSTRAINT [PK_STG_ServiceMapping] PRIMARY KEY CLUSTERED 
--(
--	[ServiceID] ASC,
--	[ServiceArea] ASC,
--	[ServiceRole] ASC,
--	[ServiceSegment] ASC,
--	[ServiceSubsegment] ASC,
--	[RequestTypeID] ASC,
--	[ServiceGroupID] ASC
--)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
--) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
--GO


-- Foreign key constraint for [ServiceID]

DECLARE @table_nameSTG_ServiceMapping VARCHAR(50) = 'STG_ServiceMapping'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_STG_Service' AND TABLE_NAME = @table_nameSTG_ServiceMapping)
BEGIN
    ALTER TABLE [BSO].[STG_ServiceMapping] WITH CHECK ADD CONSTRAINT [FK_STG_Service] FOREIGN KEY([ServiceID])
    REFERENCES [BSO].[STG_Services] ([ID]);
    ALTER TABLE [BSO].[STG_ServiceMapping] CHECK CONSTRAINT [FK_STG_Service];
END
GO

-- Foreign key constraint for [RequestTypeID]
DECLARE @table_nameSTG_ServiceMapping VARCHAR(50) = 'STG_ServiceMapping'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_STG_ServiceMapping_STG_RequestType' AND TABLE_NAME = @table_nameSTG_ServiceMapping)
BEGIN
    ALTER TABLE [BSO].[STG_ServiceMapping] WITH CHECK ADD CONSTRAINT [FK_STG_ServiceMapping_STG_RequestType] FOREIGN KEY([RequestTypeID])
    REFERENCES [BSO].[STG_RequestType] ([RequestTypeID]);
    ALTER TABLE [BSO].[STG_ServiceMapping] CHECK CONSTRAINT [FK_STG_ServiceMapping_STG_RequestType];
END
GO

-- Foreign key constraint for [ServiceGroupID]
DECLARE @table_nameSTG_ServiceMapping VARCHAR(50) = 'STG_ServiceMapping'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_STG_ServiceMapping_STG_ServiceGroup' AND TABLE_NAME = @table_nameSTG_ServiceMapping)
BEGIN
    ALTER TABLE [BSO].[STG_ServiceMapping] WITH CHECK ADD CONSTRAINT [FK_STG_ServiceMapping_STG_ServiceGroup] FOREIGN KEY([ServiceGroupID])
    REFERENCES [BSO].[STG_ServiceGroup] ([ServiceGroupID]);
    ALTER TABLE [BSO].[STG_ServiceMapping] CHECK CONSTRAINT [FK_STG_ServiceMapping_STG_ServiceGroup];
END
GO


-- ALTER TABLE [BSO].[STG_ServiceMapping]  
--WITH CHECK ADD  CONSTRAINT [FK_STG_Service] FOREIGN KEY([ServiceID])
-- REFERENCES [BSO].[STG_Services] ([ID])
-- GO
-- ALTER TABLE [BSO].[STG_ServiceMapping] CHECK CONSTRAINT [FK_STG_Service]
-- GO

-- ALTER TABLE [BSO].[STG_ServiceMapping]  WITH CHECK ADD  CONSTRAINT [FK_STG_ServiceMapping_STG_RequestType] FOREIGN KEY([RequestTypeID])
-- REFERENCES [BSO].[STG_RequestType] ([RequestTypeID])
-- GO
-- ALTER TABLE [BSO].[STG_ServiceMapping] CHECK CONSTRAINT [FK_STG_ServiceMapping_STG_RequestType]
-- GO

-- ALTER TABLE [BSO].[STG_ServiceMapping]  WITH CHECK ADD  CONSTRAINT [FK_STG_ServiceMapping_STG_ServiceGroup] FOREIGN KEY([ServiceGroupID])
-- REFERENCES [BSO].[STG_ServiceGroup] ([ServiceGroupID])
-- GO
-- ALTER TABLE [BSO].[STG_ServiceMapping] CHECK CONSTRAINT [FK_STG_ServiceMapping_STG_ServiceGroup]
-- GO
-- END
-- GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceOwner]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[STG_ServiceOwner](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UPN] [nvarchar](500) NULL,
	[DisplayName] [nvarchar](200) NULL,
	[IsActive] [bit] NULL,
	[DataverseRowID] [uniqueidentifier] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[ModifiedBy] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceOwnerServices]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[STG_ServiceOwnerServices](
	[ServiceID] [int] NULL,
	[ServiceOwnerID] [int] NULL,
	[Service_DataverseRowID] [uniqueidentifier] NULL,
	[ServiceOwner_DataverseRowID] [uniqueidentifier] NULL
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_Services]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[STG_Services](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[IRIS_Utterance] [nvarchar](500) NULL,
	[AboutService] [nvarchar](max) NULL,
	[relatedinformation] [nvarchar](max) NULL,
	[IsNonIRISService] [bit] NULL,
	[ServiceRequestFormLink] [nvarchar](max) NULL,
	[IsDropdownUI] [bit] NULL,
	[ServiceDropDownLinks] [nvarchar](max) NULL,
	[ServiceCategories] [nvarchar](max) NULL,
	[IsPrivate] [bit] NULL,
	[DataverseRowID] [uniqueidentifier] NULL,
	[ServiceAzureADGroup] [int] NULL,
	[IsSecuredByAzureADGroup] [bit] NULL,
	[FAQLink] [nvarchar](max) NULL,
	[isActive] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[IDWEBGroup_DataverseRowID] [uniqueidentifier] NULL,
	[IrisAppName] [nvarchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServicesTemp]') AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[STG_ServicesTemp](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[IRIS_Utterance] [nvarchar](500) NULL,
	[AboutService] [nvarchar](max) NULL,
	[relatedinformation] [nvarchar](max) NULL,
	[IsNonIRISService] [bit] NULL,
	[ServiceRequestFormLink] [nvarchar](max) NULL,
	[IsDropdownUI] [bit] NULL,
	[ServiceDropDownLinks] [nvarchar](max) NULL,
	[ServiceCategories] [nvarchar](max) NULL,
	[IsPrivate] [bit] NULL,
	[DataverseRowID] [uniqueidentifier] NULL,
	[ServiceAzureADGroup] [int] NULL,
	[IsSecuredByAzureADGroup] [bit] NULL,
	[FAQLink] [nvarchar](max) NULL,
	[isActive] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[IrisAppName] [nvarchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
--select * from [BSO].STG_ServiceNameMapping
IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[ServiceNameMapping]')
AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[ServiceNameMapping](
	[ServiceID] [int] NOT NULL,
	[TileName] [nvarchar](100) NULL,
	[ServiceArea] [int] NOT NULL,
	[ServiceRole] [int] NOT NULL,
	[ServiceSegment] [int] NOT NULL,
	[ServiceSubsegment] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[DataverseRowID] [uniqueidentifier] NULL,
	[IRIS_Utterance] [nvarchar](500) NULL,
	[AboutService] [nvarchar](max) NULL,
	[relatedinformation] [nvarchar](max) NULL,
	[IsNonIRISService] [bit] NULL,
	[ServiceRequestFormLink] [nvarchar](max) NULL,
	[WelcomeMessage] [nvarchar](2000) NULL,
	[ServiceCategories] [nvarchar](max) NULL,
	[TileBlurb] [nvarchar](2000) NULL,
	[TileDescription] [nvarchar](2000) NULL,
	[ServiceAzureADGroup] [int] NULL,
	[IsSecuredByAzureADGroup] [bit] NULL,
	[FAQLink] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[IDWEBGroup_DataverseRowID] [uniqueidentifier] NULL,
	[IrisAppName] [nvarchar](200) NULL,
	[idweblink] [nvarchar](2000) NULL,
 CONSTRAINT [PK_ServiceNameMapping] PRIMARY KEY CLUSTERED 
(
	[ServiceID] ASC,
	[ServiceArea] ASC,
	[ServiceRole] ASC,
	[ServiceSegment] ASC,
	[ServiceSubsegment] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY];

ALTER TABLE [BSO].[ServiceNameMapping]  WITH CHECK ADD  CONSTRAINT [FK_ServiceNameMappingArea] FOREIGN KEY([ServiceArea])
REFERENCES [BSO].[Area] ([ID])

ALTER TABLE [BSO].[ServiceNameMapping] CHECK CONSTRAINT [FK_ServiceNameMappingArea]

ALTER TABLE [BSO].[ServiceNameMapping]  WITH CHECK ADD  CONSTRAINT [FK_ServiceNameMappingRole] FOREIGN KEY([ServiceRole])
REFERENCES [BSO].[Role] ([ID])

ALTER TABLE [BSO].[ServiceNameMapping] CHECK CONSTRAINT [FK_ServiceNameMappingRole]

ALTER TABLE [BSO].[ServiceNameMapping]  WITH CHECK ADD  CONSTRAINT [FK_ServiceNameMappingSegment] FOREIGN KEY([ServiceSegment])
REFERENCES [BSO].[Segment] ([ID])

ALTER TABLE [BSO].[ServiceNameMapping] CHECK CONSTRAINT [FK_ServiceNameMappingSegment]

ALTER TABLE [BSO].[ServiceNameMapping]  WITH CHECK ADD  CONSTRAINT [FK_ServiceNameMappingServices] FOREIGN KEY([ServiceID])
REFERENCES [BSO].[Services] ([ID])

ALTER TABLE [BSO].[ServiceNameMapping] CHECK CONSTRAINT [FK_ServiceNameMappingServices]

ALTER TABLE [BSO].[ServiceNameMapping]  WITH CHECK ADD  CONSTRAINT [FK_ServiceNameMappingSubSegment] FOREIGN KEY([ServiceSubsegment])
REFERENCES [BSO].[SubSegment] ([ID])

ALTER TABLE [BSO].[ServiceNameMapping] CHECK CONSTRAINT [FK_ServiceNameMappingSubSegment]

END
GO


IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'BSO' AND TABLE_NAME = 'News')
BEGIN
    CREATE TABLE [BSO].News (
        Id INT PRIMARY KEY IDENTITY(1,1),
        title NVARCHAR(255),
        description NVARCHAR(1000),
        date DATE,   
		EndDate DATE,
        link VARCHAR(255),
        isActive BIT
    );
END;
GO





IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_name' AND object_id = OBJECT_ID('BSO.Services'))
BEGIN
    CREATE NONCLUSTERED INDEX idx_name ON BSO.Services (Name);
END;
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_service_group_name' AND object_id = OBJECT_ID('BSO.ServiceGroup'))
BEGIN
    CREATE NONCLUSTERED INDEX idx_service_group_name ON BSO.ServiceGroup (ServiceGroupName);
END;
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_request_type_name' AND object_id = OBJECT_ID('BSO.RequestType'))
BEGIN
    CREATE NONCLUSTERED INDEX idx_request_type_name ON BSO.RequestType (RequestTypeName);
END;
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[SegmentRoleMapping]')
AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[SegmentRoleMapping](
	[ServiceSegment] [int] NOT NULL,
	[ServiceRole] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[DataverseRowID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_SegmentRoleMapping] PRIMARY KEY CLUSTERED 
(
	[ServiceSegment] ASC,
	[ServiceRole] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [BSO].[SegmentRoleMapping]  WITH CHECK ADD  CONSTRAINT [FK_SegmentRoleMappingRole] FOREIGN KEY([ServiceRole])
REFERENCES [BSO].[Role] ([ID])

ALTER TABLE [BSO].[SegmentRoleMapping] CHECK CONSTRAINT [FK_SegmentRoleMappingRole]

ALTER TABLE [BSO].[SegmentRoleMapping]  WITH CHECK ADD  CONSTRAINT [FK_SegmentRoleMappingSegment] FOREIGN KEY([ServiceSegment])
REFERENCES [BSO].[Segment] ([ID])

ALTER TABLE [BSO].[SegmentRoleMapping] CHECK CONSTRAINT [FK_SegmentRoleMappingSegment]

END 
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[DV_ServiceNameMapping]')
AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_ServiceNameMapping](
	[ServiceNameMapping_ID] [nvarchar](50) NULL,
	[TileName] [nvarchar](100) NULL,
	[ServiceName_ID] [nvarchar](50) NULL,
	[IRIS_Utterance] [nvarchar](500) NULL,
	[AboutService] [nvarchar](max) NULL,
	[relatedinformation] [nvarchar](max) NULL,
	[IsNonIRISService] [bit] NULL,
	[ServiceRequestFormLink] [nvarchar](max) NULL,
	[WelcomeMessage] [nvarchar](2000) NULL,
	[ServiceCategories] [nvarchar](max) NULL,
	[TileBlurb] [nvarchar](2000) NULL,
	[TileDescription] [nvarchar](2000) NULL,
	[ServiceAzureADGroup] [int] NULL,
	[FAQLink] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[IDWEBGroup_DataverseRowID] [uniqueidentifier] NULL,
	[IrisAppName] [nvarchar](200) NULL,
	[idweblink] [nvarchar](2000) NULL,
	[isidwebservicegroup] [bit] NULL,
	[mcapslanguage] [nvarchar](50) NULL,
	[serviceownergroup] [nvarchar](50) NULL,
	[serviceownertype] [nvarchar](50) NULL,
	[serviceowneruser] [nvarchar](50) NULL,
	[statecode] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END 
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[DV_ServiceNameMapping_Area]')
AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_ServiceNameMapping_Area](
	[areaid] [nvarchar](50) NULL,
	[ServiceNameMapping_Area_id
] [nvarchar](50) NULL,
	[service_name_mapping_id] [nvarchar](50) NULL
) ON [PRIMARY]
END 
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[DV_ServiceNameMapping_Role]')
AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_ServiceNameMapping_Role](
	[role_id] [nvarchar](50) NULL,
	[ServiceNameMapping_Role_id] [nvarchar](50) NULL,
	[service_name_mapping_id] [nvarchar](50) NULL
) ON [PRIMARY]
END 
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[DV_ServiceNameMapping_Segment]')
AND type in (N'U'))
BEGIN
CREATE TABLE [BSO].[DV_ServiceNameMapping_Segment](
	[segmentsid] [nvarchar](50) NULL,
	[ServiceNameMapping_Segment_id] [nvarchar](50) NULL,
	[service_name_mapping_id] [nvarchar](50) NULL
) ON [PRIMARY]
END 
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[STG_ServiceNameMapping]')
AND type in (N'U'))
BEGIN

CREATE TABLE [BSO].[STG_ServiceNameMapping](
	[ServiceID] [int] NOT NULL,
	[ServiceArea] [int] NOT NULL,
	[ServiceRole] [int] NOT NULL,
	[ServiceSegment] [int] NOT NULL,
	[ServiceSubsegment] [int] NOT NULL,
	[DataverseRowID] [uniqueidentifier] NULL,
	[IsActive] [bit] NULL,
	[TileName] [nvarchar](100) NULL,
	[Service_DataverseRowID] [uniqueidentifier] NULL,
	[IRIS_Utterance] [nvarchar](500) NULL,
	[AboutService] [nvarchar](max) NULL,
	[relatedinformation] [nvarchar](max) NULL,
	[IsNonIRISService] [bit] NULL,
	[ServiceRequestFormLink] [nvarchar](max) NULL,
	[WelcomeMessage] [nvarchar](2000) NULL,
	[ServiceCategories] [nvarchar](max) NULL,
	[TileBlurb] [nvarchar](2000) NULL,
	[TileDescription] [nvarchar](2000) NULL,
	[ServiceAzureADGroup] [int] NULL,
	[IsSecuredByAzureADGroup] [bit] NULL,
	[FAQLink] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[IDWEBGroup_DataverseRowID] [uniqueidentifier] NULL,
	[IrisAppName] [nvarchar](200) NULL,
	[idweblink] [nvarchar](2000) NULL,
 CONSTRAINT [PK_STG_ServiceNameMapping] PRIMARY KEY CLUSTERED 
(
	[ServiceID] ASC,
	[ServiceArea] ASC,
	[ServiceRole] ASC,
	[ServiceSegment] ASC,
	[ServiceSubsegment] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]


ALTER TABLE [BSO].[STG_ServiceNameMapping]  WITH CHECK ADD  CONSTRAINT [FK_STGServiceNameMappingArea] FOREIGN KEY([ServiceArea])
REFERENCES [BSO].[Area] ([ID])

ALTER TABLE [BSO].[STG_ServiceNameMapping] CHECK CONSTRAINT [FK_STGServiceNameMappingArea]

ALTER TABLE [BSO].[STG_ServiceNameMapping]  WITH CHECK ADD  CONSTRAINT [FK_STGServiceNameMappingRole] FOREIGN KEY([ServiceRole])
REFERENCES [BSO].[Role] ([ID])

ALTER TABLE [BSO].[STG_ServiceNameMapping] CHECK CONSTRAINT [FK_STGServiceNameMappingRole]

ALTER TABLE [BSO].[STG_ServiceNameMapping]  WITH CHECK ADD  CONSTRAINT [FK_STGServiceNameMappingSegment] FOREIGN KEY([ServiceSegment])
REFERENCES [BSO].[Segment] ([ID])

ALTER TABLE [BSO].[STG_ServiceNameMapping] CHECK CONSTRAINT [FK_STGServiceNameMappingSegment]

ALTER TABLE [BSO].[STG_ServiceNameMapping]  WITH CHECK ADD  CONSTRAINT [FK_STGServiceNameMappingServices] FOREIGN KEY([ServiceID])
REFERENCES [BSO].[STG_Services] ([ID])

ALTER TABLE [BSO].[STG_ServiceNameMapping] CHECK CONSTRAINT [FK_STGServiceNameMappingServices]

ALTER TABLE [BSO].[STG_ServiceNameMapping]  WITH CHECK ADD  CONSTRAINT [FK_STGServiceNameMappingSubSegment] FOREIGN KEY([ServiceSubsegment])
REFERENCES [BSO].[SubSegment] ([ID])

ALTER TABLE [BSO].[STG_ServiceNameMapping] CHECK CONSTRAINT [FK_STGServiceNameMappingSubSegment]

END 
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[ServicesCategory]')
AND type in (N'U'))
BEGIN
CREATE Table BSO.ServicesCategory
(ID INT IDENTITY(1,1),
Name NVarchar(50) not null,
IsActive BIT not null,

CONSTRAINT PK_ServicesCategory PRIMARY KEY (ID)
)
END 
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[MCEMStage]')
AND type in (N'U'))
BEGIN
CREATE Table BSO.MCEMStage
(ID INT IDENTITY(1,1),
Name NVarchar(50) not null,
IsActive BIT not null,

CONSTRAINT PK_MCEMStage PRIMARY KEY (ID)
)
END 
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[ServicesCategoryMapping]')
AND type in (N'U'))
BEGIN
CREATE Table BSO.ServicesCategoryMapping
(ServiceID INT not null,
CategoryID INT not null,
IsActive BIT not null,

CONSTRAINT PK_ServicesCategoryMapping PRIMARY KEY (ServiceID,CategoryID),
CONSTRAINT FK_SrvCategoryMapping_Service FOREIGN KEY (ServiceID) REFERENCES BSO.Services(ID),
CONSTRAINT FK_SrvCategoryMapping_Category FOREIGN KEY (CategoryID) REFERENCES BSO.ServicesCategory(ID)
)
END 
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[ServicesMCEMMapping]')
AND type in (N'U'))
BEGIN
CREATE Table BSO.ServicesMCEMMapping
(ServiceID INT not null,
MCEMStageID INT not null,
IsActive BIT not null,

CONSTRAINT PK_ServicesMCEMMapping PRIMARY KEY (ServiceID,MCEMStageID),
CONSTRAINT FK_ServicesMCEMMapping_Service FOREIGN KEY (ServiceID) REFERENCES BSO.Services(ID),
CONSTRAINT FK_ServicesMCEMMapping_MCEM FOREIGN KEY (MCEMStageID) REFERENCES BSO.MCEMStage(ID)
)
END 
GO


--Last executed 20-02-24 On UAT
--Last Executed 21-02-24 ON PROD


IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[ServicesCategory]')
AND type in (N'U'))
BEGIN
CREATE Table BSO.ServicesCategory
(ID INT IDENTITY(1,1),
Name NVarchar(50) not null,
IsActive BIT not null,
 
CONSTRAINT PK_ServicesCategory PRIMARY KEY (ID)
)
END
GO
 
IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[MCEMStage]')
AND type in (N'U'))
BEGIN
CREATE Table BSO.MCEMStage
(ID INT IDENTITY(1,1),
Name NVarchar(50) not null,
IsActive BIT not null,
 
CONSTRAINT PK_MCEMStage PRIMARY KEY (ID)
)
END
GO
 
IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[ServicesCategoryMapping]')
AND type in (N'U'))
BEGIN
CREATE Table BSO.ServicesCategoryMapping
(ServiceID INT not null,
CategoryID INT not null,
IsActive BIT not null,
 
CONSTRAINT PK_ServicesCategoryMapping PRIMARY KEY (ServiceID,CategoryID),
CONSTRAINT FK_SrvCategoryMapping_Service FOREIGN KEY (ServiceID) REFERENCES BSO.Services(ID),
CONSTRAINT FK_SrvCategoryMapping_Category FOREIGN KEY (CategoryID) REFERENCES BSO.ServicesCategory(ID)
)
END
GO
 
IF NOT EXISTS (SELECT * FROM sys.objects WHERE
object_id = OBJECT_ID(N'[BSO].[ServicesMCEMMapping]')
AND type in (N'U'))
BEGIN
CREATE Table BSO.ServicesMCEMMapping
(ServiceID INT not null,
MCEMStageID INT not null,
IsActive BIT not null,
 
CONSTRAINT PK_ServicesMCEMMapping PRIMARY KEY (ServiceID,MCEMStageID),
CONSTRAINT FK_ServicesMCEMMapping_Service FOREIGN KEY (ServiceID) REFERENCES BSO.Services(ID),
CONSTRAINT FK_ServicesMCEMMapping_MCEM FOREIGN KEY (MCEMStageID) REFERENCES BSO.MCEMStage(ID)
)
END
GO







--Last executed 23-02-24 On UAT