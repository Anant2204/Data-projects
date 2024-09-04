-- ALTER TABLE [BSO].[User]
-- DROP CONSTRAINT FK__User__UserADGrou__31EC6D26;
-- GO
/*Start here*/
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameUser NVARCHAR(50) = 'User'
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameUser AND COLUMN_NAME = 'UserADGroupID')
BEGIN
    ALTER TABLE [BSO].[User]
    DROP COLUMN [UserADGroupID];
END
GO


DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSubSegment NVARCHAR(50) = 'SubSegment'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameSubSegment AND COLUMN_NAME = 'Segment')
BEGIN
    ALTER TABLE BSO.SubSegment
    ADD Segment INT NULL;
END
GO


-- Add foreign key constraint
IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS
    WHERE CONSTRAINT_NAME = 'FK_SubSegment_Segment'
)
BEGIN
    ALTER TABLE [BSO].[SubSegment]
    WITH CHECK ADD FOREIGN KEY([Segment])
    REFERENCES [BSO].[Segment] ([ID]);
END;
GO


DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServiceMapping NVARCHAR(50) = 'ServiceMapping'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameServiceMapping AND COLUMN_NAME = 'IsSecuredByAzureADGroup')
BEGIN
    ALTER TABLE [BSO].[ServiceMapping]
    ADD IsSecuredByAzureADGroup BIT DEFAULT 0;
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameUserADGroup NVARCHAR(50) = 'UserADGroup'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameUserADGroup AND COLUMN_NAME = 'GroupID')
BEGIN
    ALTER TABLE [BSO].[UserADGroup]
    ADD GroupID NVARCHAR(100); -- Change the data type as needed
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'Services'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameServices AND COLUMN_NAME = 'WelcomeMessage')
BEGIN
    ALTER TABLE [BSO].[Services]
   ADD WelcomeMessage NVARCHAR(2000) NULL;
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameUser NVARCHAR(50) = 'User'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameUser AND COLUMN_NAME = 'Oid')
BEGIN
    ALTER TABLE [BSO].[User]
   ADD Oid NVARCHAR(300);
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameUserADGroupMapping NVARCHAR(50) = 'UserADGroupMapping'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @tableNameUserADGroupMapping AND COLUMN_NAME = 'IsActive')
            BEGIN
                ALTER TABLE [BSO].[UserADGroupMapping]
                ADD IsActive BIT DEFAULT 1;
END
GO


DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServiceOwner NVARCHAR(50) = 'ServiceOwner'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND  TABLE_NAME = @tableNameServiceOwner AND COLUMN_NAME = 'DisplayName')
BEGIN
    ALTER TABLE [BSO].ServiceOwner
    ADD DisplayName NVARCHAR(200) NULL;


END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServiceOwner NVARCHAR(50) = 'STG_ServiceOwner'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND  TABLE_NAME = @tableNameServiceOwner AND COLUMN_NAME = 'DisplayName')
BEGIN
    ALTER TABLE [BSO].STG_ServiceOwner
    ADD DisplayName NVARCHAR(200) NULL;


END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServiceOwner NVARCHAR(50) = 'ServiceOwner'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND  TABLE_NAME = @tableNameServiceOwner AND COLUMN_NAME = 'DataverseRowID')
BEGIN
    ALTER TABLE [BSO].ServiceOwner
    ADD DataverseRowID UNIQUEIDENTIFIER NULL;
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'Services'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameServices  AND COLUMN_NAME = 'ServiceAzureADGroup')
BEGIN

    ALTER TABLE [BSO].Services
    ADD ServiceAzureADGroup INT;
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'Services'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameServices AND COLUMN_NAME = 'IsSecuredByAzureADGroup')
BEGIN
    ALTER TABLE [BSO].Services
    ADD IsSecuredByAzureADGroup BIT;
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'Services'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameServices AND COLUMN_NAME = 'FAQLink')
BEGIN
    ALTER TABLE [BSO].Services
    ADD FAQLink NVARCHAR(MAX) NULL;
END
GO

-- Add columns to ServiceMapping only if they don't exist
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServiceMapping NVARCHAR(50) = 'ServiceMapping'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name  AND TABLE_NAME = @tableNameServiceMapping AND COLUMN_NAME = 'RequestTypeID')
BEGIN
    ALTER TABLE [BSO].ServiceMapping
    ADD RequestTypeID INT;
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServiceMapping NVARCHAR(50) = 'ServiceMapping'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name  AND TABLE_NAME = @tableNameServiceMapping AND COLUMN_NAME = 'ServiceGroupID')
BEGIN
    ALTER TABLE [BSO].ServiceMapping
    ADD ServiceGroupID INT;
END


-- Add foreign key for RequestType
--IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_ServiceMapping_RequestType')
--BEGIN
--    ALTER TABLE [BSO].ServiceMapping
--    ADD CONSTRAINT FK_ServiceMapping_RequestType
--    FOREIGN KEY (RequestTypeID) REFERENCES [BSO].RequestType(RequestTypeID);
--END
--GO

-- Add foreign key for ServiceGroup
--IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_ServiceMapping_ServiceGroup')
--BEGIN
--    ALTER TABLE [BSO].ServiceMapping
--    ADD CONSTRAINT FK_ServiceMapping_ServiceGroup
--    FOREIGN KEY (ServiceGroupID) REFERENCES [BSO].ServiceGroup(ServiceGroupID);
--END
--GO


------------------Staging------------
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceMapping]') AND type in (N'U'))
BEGIN
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
	[RequestType_DataverseRowID] [uniqueidentifier] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_ServiceMapping NVARCHAR(50) = 'STG_ServiceMapping'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameSTG_ServiceMapping AND COLUMN_NAME = 'RequestTypeID')
BEGIN
    ALTER TABLE BSO.STG_ServiceMapping
    ADD RequestTypeID INT;
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_ServiceMapping NVARCHAR(50) = 'STG_ServiceMapping'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameSTG_ServiceMapping AND COLUMN_NAME = 'ServiceGroupID')
BEGIN
    ALTER TABLE BSO.STG_ServiceMapping
    ADD ServiceGroupID INT;
END
GO



-- Add foreign key for RequestType
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_STG_ServiceMapping_STG_RequestType')
BEGIN
    ALTER TABLE [BSO].STG_ServiceMapping
    ADD CONSTRAINT FK_STG_ServiceMapping_STG_RequestType
    FOREIGN KEY (RequestTypeID) REFERENCES [BSO].STG_RequestType(RequestTypeID);
END
GO

-- Add foreign key for ServiceGroup
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_STG_ServiceMapping_STG_ServiceGroup')
BEGIN
    ALTER TABLE [BSO].STG_ServiceMapping
    ADD CONSTRAINT FK_STG_ServiceMapping_STG_ServiceGroup
    FOREIGN KEY (ServiceGroupID) REFERENCES [BSO].STG_ServiceGroup(ServiceGroupID);
END
GO



DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameRole NVARCHAR(50) = 'Role'

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @tableSchema AND TABLE_NAME = @tableNameRole AND COLUMN_NAME = 'CreatedDate')
BEGIN
    ALTER TABLE [BSO].Role
    ADD CreatedDate DATETIME DEFAULT GETDATE()
END
GO

DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameRole NVARCHAR(50) = 'Role'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @tableSchema AND TABLE_NAME = @tableNameRole AND COLUMN_NAME = 'ModifiedDate')
BEGIN
    ALTER TABLE [BSO].Role
    ADD ModifiedDate DATETIME DEFAULT GETDATE()
END
GO

DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameRole NVARCHAR(50) = 'Role'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @tableSchema AND TABLE_NAME = @tableNameRole AND COLUMN_NAME = 'CreatedBy')
BEGIN
    ALTER TABLE [BSO].Role
    ADD CreatedBy NVARCHAR(50)
END
GO

DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameRole NVARCHAR(50) = 'Role'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @tableSchema AND TABLE_NAME = @tableNameRole AND COLUMN_NAME = 'ModifiedBy')
BEGIN
    ALTER TABLE [BSO].Role
    ADD ModifiedBy NVARCHAR(50)
END
GO


DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'Services'

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @tableSchema  AND TABLE_NAME = @tableNameServices AND COLUMN_NAME = 'CreatedDate')
BEGIN
    ALTER TABLE [BSO].Services
    ADD CreatedDate DATETIME DEFAULT GETDATE()
END
GO

DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'Services'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @tableSchema  AND TABLE_NAME = @tableNameServices AND COLUMN_NAME = 'ModifiedDate')
BEGIN
    ALTER TABLE [BSO].Services
    ADD ModifiedDate DATETIME DEFAULT GETDATE()
END
GO

DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'Services'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @tableSchema  AND TABLE_NAME = @tableNameServices AND COLUMN_NAME = 'CreatedBy')
BEGIN
    ALTER TABLE [BSO].Services
    ADD CreatedBy NVARCHAR(50)
END
GO

DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'Services'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @tableSchema  AND TABLE_NAME = @tableNameServices AND COLUMN_NAME = 'ModifiedBy')
BEGIN
    ALTER TABLE [BSO].Services
    ADD ModifiedBy NVARCHAR(50)
END
GO



DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_Services NVARCHAR(50) = 'STG_Services'

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @tableSchema  AND TABLE_NAME = @tableNameSTG_Services AND COLUMN_NAME = 'CreatedDate')
BEGIN
    ALTER TABLE [BSO].STG_Services
    ADD CreatedDate DATETIME DEFAULT GETDATE()
END
GO

DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_Services NVARCHAR(50) = 'STG_Services'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @tableSchema  AND TABLE_NAME = @tableNameSTG_Services AND COLUMN_NAME = 'ModifiedDate')
BEGIN
    ALTER TABLE [BSO].STG_Services
    ADD ModifiedDate DATETIME DEFAULT GETDATE()
END
GO

DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_Services NVARCHAR(50) = 'STG_Services'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @tableSchema  AND TABLE_NAME = @tableNameSTG_Services AND COLUMN_NAME = 'CreatedBy')
BEGIN
    ALTER TABLE [BSO].STG_Services
    ADD CreatedBy NVARCHAR(50)
END
GO

DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_Services NVARCHAR(50) = 'STG_Services'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = @tableSchema  AND TABLE_NAME = @tableNameSTG_Services
AND COLUMN_NAME = 'ModifiedBy')
BEGIN
    ALTER TABLE [BSO].STG_Services
    ADD ModifiedBy NVARCHAR(50)
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
	[IrisAppName] [nvarchar](200) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameDV_ServiceNames NVARCHAR(50) = 'DV_ServiceNames'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = @tableSchema AND TABLE_NAME = @tableNameDV_ServiceNames)
BEGIN
ALTER TABLE [BSO].[DV_ServiceNames]
ADD [IrisAppName] [nvarchar](200) NULL;
 
END;
GO


DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_Services NVARCHAR(50) = 'DV_ServiceNames'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = @tableSchema AND TABLE_NAME = @tableNameSTG_Services)
BEGIN
ALTER TABLE [BSO].[DV_ServiceNames]
ADD [IrisAppName] [nvarchar](200) NULL;
 
END;
GO


DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'Services'

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE
TABLE_SCHEMA = @tableSchema AND TABLE_NAME = @tableNameServices AND COLUMN_NAME = 'IrisAppName')
BEGIN
ALTER TABLE [BSO].[Services]
ADD [IrisAppName] [nvarchar](200) NULL; 
END;
GO

DECLARE @tableSchema NVARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_Services NVARCHAR(50) = 'STG_Services'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE
TABLE_SCHEMA = @tableSchema AND TABLE_NAME = @tableNameSTG_Services AND COLUMN_NAME = 'IrisAppName')
BEGIN
ALTER TABLE [BSO].[STG_Services]
ADD [IrisAppName] [nvarchar](200) NULL; 
END;
GO

--DECLARE @schema_name NVARCHAR(50) = 'BSO'
--DECLARE @tableNameServiceMapping NVARCHAR(50) = 'ServiceMapping'
--IF EXISTS (
--    SELECT 1
--    FROM INFORMATION_SCHEMA.COLUMNS
--    WHERE TABLE_SCHEMA = @schema_name
--    AND TABLE_NAME = @tableNameServiceMapping
--    AND COLUMN_NAME = 'IsSecuredByAzureADGroup'
--)
--BEGIN
--    ALTER TABLE [BSO].[ServiceMapping]
--    DROP COLUMN IsSecuredByAzureADGroup;
--END
--GO


-- Add IsActive column with default value and check constraint if it doesn't exist

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameUserWorkSpaceServices NVARCHAR(50) = 'UserWorkSpaceServices'

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameUserWorkSpaceServices AND COLUMN_NAME = 'IsActive')
BEGIN
    ALTER TABLE [BSO].[UserWorkSpaceServices]
    ADD IsActive BIT DEFAULT 1 ;
END;
GO

-- Add TransactionTime column with check constraint if it doesn't exist
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameUserWorkSpaceServices NVARCHAR(50) = 'UserWorkSpaceServices'
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameUserWorkSpaceServices AND COLUMN_NAME = 'TransactionTime')
BEGIN
    ALTER TABLE [BSO].[UserWorkSpaceServices]
    ADD TransactionTime DATE
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameUserWorkSpaceServices NVARCHAR(50) = 'UserWorkSpaceServices'
IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = @schema_name
      AND TABLE_NAME = @tableNameUserWorkSpaceServices
      AND COLUMN_NAME = 'Version'
)
BEGIN
    ALTER TABLE [BSO].[UserWorkSpaceServices]
    ADD Version INT DEFAULT 1;
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameUser NVARCHAR(50) = 'User'
IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = @tableNameUser
        AND COLUMN_NAME = 'IsWelcomeMessage'
)
BEGIN
    ALTER TABLE [BSO].[User] ADD IsWelcomeMessage BIT NOT NULL DEFAULT 0
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_ServiceMapping NVARCHAR(50) = 'STG_ServiceMapping'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameSTG_ServiceMapping AND COLUMN_NAME = 'ServiceRequestFormLink')
BEGIN
    ALTER TABLE BSO.STG_ServiceMapping
    ADD ServiceRequestFormLink NVARCHAR(MAX);
END
GO

-- Add ServiceRequestFormLink column to ServiceMapping if it doesn't exist
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServiceMapping NVARCHAR(50) = 'ServiceMapping'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameServiceMapping AND COLUMN_NAME = 'ServiceRequestFormLink')
BEGIN
    ALTER TABLE BSO.ServiceMapping
    ADD ServiceRequestFormLink NVARCHAR(MAX);
END
GO
-- Repeat the same pattern for the other alterations

-- Add IDWEBGroup_DataverseRowID column to STG_Services if it doesn't exist
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_Services NVARCHAR(50) = 'STG_Services'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameSTG_Services AND COLUMN_NAME = 'IDWEBGroup_DataverseRowID')
BEGIN
    ALTER TABLE BSO.STG_Services
    ADD IDWEBGroup_DataverseRowID UNIQUEIDENTIFIER NULL;
END
GO

-- Add IDWEBGroup_DataverseRowID column to Services if it doesn't exist
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'Services'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameServices AND COLUMN_NAME = 'IDWEBGroup_DataverseRowID')
BEGIN
    ALTER TABLE BSO.Services
    ADD IDWEBGroup_DataverseRowID UNIQUEIDENTIFIER NULL;
END
GO

-- Repeat the same pattern for the other alterations

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
-- Add Service_DataverseRowID and ServiceOwner_DataverseRowID columns to STG_ServiceOwnerServices if they don't exist
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_ServiceOwnerServices NVARCHAR(50) = 'STG_ServiceOwnerServices'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameSTG_ServiceOwnerServices AND COLUMN_NAME = 'Service_DataverseRowID')
BEGIN
    ALTER TABLE BSO.STG_ServiceOwnerServices
    ADD Service_DataverseRowID UNIQUEIDENTIFIER NULL,
    ServiceOwner_DataverseRowID UNIQUEIDENTIFIER NULL;
END
GO

-- Add Service_DataverseRowID and ServiceOwner_DataverseRowID columns to ServiceOwnerServices if they don't exist
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServiceOwnerServices NVARCHAR(50) = 'ServiceOwnerServices'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameServiceOwnerServices AND COLUMN_NAME = 'Service_DataverseRowID')
BEGIN
    ALTER TABLE BSO.ServiceOwnerServices
    ADD Service_DataverseRowID UNIQUEIDENTIFIER NULL,
    ServiceOwner_DataverseRowID UNIQUEIDENTIFIER NULL;
END
GO

-- Repeat the same pattern for the other alterations

-- Add Service_DataverseRowID column to STG_ServiceGroup if it doesn't exist
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_ServiceGroup NVARCHAR(50) = 'STG_ServiceGroup'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameSTG_ServiceGroup AND COLUMN_NAME = 'Service_DataverseRowID')
BEGIN
    ALTER TABLE BSO.STG_ServiceGroup
    ADD Service_DataverseRowID UNIQUEIDENTIFIER NULL;
END
GO

-- Add ServiceGroup_DataverseRowID column to STG_RequestType if it doesn't exist
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_RequestType NVARCHAR(50) = 'STG_RequestType'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameSTG_RequestType AND COLUMN_NAME = 'ServiceGroup_DataverseRowID')
BEGIN
    ALTER TABLE BSO.STG_RequestType
    ADD ServiceGroup_DataverseRowID UNIQUEIDENTIFIER NULL;
END
GO

-- Repeat the same pattern for the other alterations

-- Add Service_DataverseRowID, ServiceGroup_DataverseRowID, and RequestType_DataverseRowID columns to STG_ServiceMapping if they don't exist
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_ServiceMapping NVARCHAR(50) = 'STG_ServiceMapping'

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameSTG_ServiceMapping AND COLUMN_NAME = 'Service_DataverseRowID')
BEGIN
    ALTER TABLE BSO.STG_ServiceMapping
    ADD Service_DataverseRowID UNIQUEIDENTIFIER NULL,
    ServiceGroup_DataverseRowID UNIQUEIDENTIFIER NULL,
    RequestType_DataverseRowID UNIQUEIDENTIFIER NULL;
END
GO

-- Modify columns in STG_ServiceMapping if they exist
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_ServiceMapping NVARCHAR(50) = 'STG_ServiceMapping'
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameSTG_ServiceMapping AND COLUMN_NAME = 'ServiceSubsegment')
BEGIN
    ALTER TABLE BSO.STG_ServiceMapping
    ALTER COLUMN ServiceSubsegment INT NOT NULL;
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_ServiceMapping NVARCHAR(50) = 'STG_ServiceMapping'
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameSTG_ServiceMapping AND COLUMN_NAME = 'RequestTypeID')
BEGIN
    ALTER TABLE BSO.STG_ServiceMapping
    ALTER COLUMN RequestTypeID INT NOT NULL;
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_ServiceMapping NVARCHAR(50) = 'STG_ServiceMapping'
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameSTG_ServiceMapping AND COLUMN_NAME = 'ServiceGroupID')
BEGIN
    ALTER TABLE BSO.STG_ServiceMapping
    ALTER COLUMN ServiceGroupID INT NOT NULL;
END
GO

-- Add foreign key constraint and primary key constraint to STG_ServiceMapping if they don't exist
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_ServiceMapping NVARCHAR(50) = 'STG_ServiceMapping'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameSTG_ServiceMapping AND CONSTRAINT_NAME = 'FK_ServiceSubsegment')
BEGIN
    ALTER TABLE BSO.STG_ServiceMapping
    ADD CONSTRAINT FK_ServiceSubsegment FOREIGN KEY (ServiceSubsegment) REFERENCES BSO.SubSegment (ID);
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_ServiceMapping NVARCHAR(50) = 'STG_ServiceMapping'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameSTG_ServiceMapping AND CONSTRAINT_NAME = 'PK_STG_ServiceMapping')
BEGIN
    ALTER TABLE BSO.STG_ServiceMapping
    ADD CONSTRAINT PK_STG_ServiceMapping PRIMARY KEY (ServiceID, ServiceArea, ServiceRole, ServiceSegment, ServiceSubsegment, RequestTypeID, ServiceGroupID);
END
GO

-- Add DataverseRowID and modify Description column in Announcement table if they don't exist
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameAnnouncement NVARCHAR(50) = 'Announcement'

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameAnnouncement AND COLUMN_NAME = 'DataverseRowID')
BEGIN
    ALTER TABLE BSO.Announcement
    ADD DataverseRowID UNIQUEIDENTIFIER NULL;
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameAnnouncement NVARCHAR(50) = 'Announcement'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameAnnouncement AND COLUMN_NAME = 'ModifiedOn')
BEGIN
    ALTER TABLE BSO.Announcement
    ADD ModifiedOn DATETIME NULL;
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameAnnouncement NVARCHAR(50) = 'Announcement'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameAnnouncement AND COLUMN_NAME = 'ModifiedOn')
BEGIN
    ALTER TABLE BSO.Announcement
    ADD ModifiedOn DATETIME NULL;
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameAnnouncement NVARCHAR(50) = 'Announcement'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameAnnouncement AND COLUMN_NAME = 'CreatedBy')
BEGIN
    ALTER TABLE BSO.Announcement
    ADD CreatedBy NVARCHAR(200) NULL;
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameAnnouncement NVARCHAR(50) = 'Announcement'
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameAnnouncement AND COLUMN_NAME = 'Description')
BEGIN
    ALTER TABLE BSO.Announcement
    ALTER COLUMN Description NVARCHAR(MAX) NULL;
END
GO


DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServiceOwner NVARCHAR(50) = 'ServiceOwner'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameServiceOwner
AND COLUMN_NAME = 'ModifiedBy')
BEGIN
    ALTER TABLE BSO.ServiceOwner
    ADD ModifiedBy NVARCHAR(200) NULL;
END
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServiceOwner NVARCHAR(50) = 'ServiceOwner'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameServiceOwner
AND COLUMN_NAME = 'CreatedBy')
BEGIN
    ALTER TABLE BSO.ServiceOwner
    ADD CreatedBy NVARCHAR(200) NULL;
END
GO



DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameDV_Announcement NVARCHAR(50) = 'DV_Announcement'
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = @schema_name AND TABLE_NAME = @tableNameDV_Announcement)
BEGIN
    CREATE TABLE BSO.DV_Announcement
    (
        Announcement_id NVARCHAR(50) NULL,
        Announcement_title NVARCHAR(500) NULL,
        Announcement_description NVARCHAR(MAX) NULL,       
		Announcement_type NVARCHAR(50) NULL,
		startdate DATETIME NULL,
		enddate DATETIME NULL,
		modifiedon DATETIME NULL,
		statecode BIT NULL
	);
	END
	GO



/*End here*/

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[MigrationService_DVtoMasterTable]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[MigrationService_DVtoMasterTable] AS' 
END
GO
ALTER PROCEDURE [BSO].[MigrationService_DVtoMasterTable]

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN

-- Create a table to store the OUTPUT results
DECLARE  @merge_output TABLE( action NVARCHAR(10), ID NVARCHAR(50) );

DECLARE @TableRowAction nvarchar(100);
DECLARE @ADFPipeline NVARCHAR(50) = 'ADF Pipeline'

--Master Table merge
BEGIN 
	--Merge Area Table

		MERGE BSO.Area AS tgt
		USING  BSO.DV_Area AS src
		ON UPPER(src.areaid) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET tgt.name = src.areaname, tgt.IsActive = src.statecode

		
		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, DataverseRowID,IsActive) VALUES (src.areaname, src.areaid, src.statecode)
		
		OUTPUT $action, inserted.DataverseRowID
		INTO @merge_output;


		 SELECT  @TableRowAction =STRING_AGG(CONCAT(CAST(ActionCount AS NVARCHAR), ' row(s) ', action), ', ') WITHIN GROUP (ORDER BY action DESC) 
			FROM (
				SELECT action, COUNT(*) as ActionCount
				FROM @merge_output
				GROUP BY action
			) as ActionCounts;

		SET @OutputMsg = @OutputMsg + 'Area : '+ @TableRowAction + + CHAR(13)+CHAR(10);
		
		DELETE from @merge_output;

		--Merge Role Table

		MERGE BSO.Role AS tgt
		USING  BSO.DV_Role AS src
		ON UPPER(src.role_id) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED AND src.modifiedon > tgt.ModifiedDate THEN
			UPDATE SET tgt.name = src.role_name, 
			tgt.ModifiedDate=src.modifiedon,
			tgt.ModifiedBy=''' + @ADFPipeline + ''',
			tgt.CreatedBy=''' + @ADFPipeline + ''',
			tgt.CreatedDate=src.modifiedon,
			tgt.IsActive = src.statecode

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, DataverseRowID,IsActive,ModifiedDate,ModifiedBy,CreatedDate,CreatedBy) 
			VALUES (src.role_name,src.role_id, src.statecode,src.modifiedon, 'ADF Pipeline',src.modifiedon, 'ADF Pipeline')

			OUTPUT $action, inserted.DataverseRowID
			INTO @merge_output;


		 SELECT  @TableRowAction =STRING_AGG(CONCAT(CAST(ActionCount AS NVARCHAR), ' row(s) ', action), ', ') WITHIN GROUP (ORDER BY action DESC) 
			FROM (
				SELECT action, COUNT(*) as ActionCount
				FROM @merge_output
				GROUP BY action
			) as ActionCounts;

		SET @OutputMsg = @OutputMsg + 'Role : '+ @TableRowAction + + CHAR(13)+CHAR(10);
		
		DELETE from @merge_output;


		--Merge Announcement Table
		--select * from BSO.Announcement
		MERGE BSO.Announcement AS tgt
		USING BSO.DV_Announcement AS src
		ON UPPER(src.Announcement_id) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED AND src.modifiedon > tgt.ModifiedOn THEN
			UPDATE SET tgt.Title = src.Announcement_title, 
			tgt.Description = src.Announcement_description,
			tgt.StartDate = src.startdate,
			tgt.EndDate = src.enddate,
			tgt.Type = src.Announcement_type,
			tgt.DataverseRowID = src.Announcement_id,
			tgt.IsAnnouncement = src.statecode,
			tgt.ModifiedOn = src.modifiedon

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (Title,Description,StartDate,EndDate,Type, DataverseRowID,IsAnnouncement,ModifiedOn) 
			VALUES (
			src.Announcement_title
			,src.Announcement_description
			,src.startdate
			,src.enddate
			,src.Announcement_type
			,src.Announcement_id
			, src.statecode
			,src.modifiedon
			)

			OUTPUT $action, inserted.DataverseRowID
			INTO @merge_output;


		 SELECT  @TableRowAction =STRING_AGG(CONCAT(CAST(ActionCount AS NVARCHAR), ' row(s) ', action), ', ') WITHIN GROUP (ORDER BY action DESC) 
			FROM (
				SELECT action, COUNT(*) as ActionCount
				FROM @merge_output
				GROUP BY action
			) as ActionCounts;

		SET @OutputMsg = @OutputMsg + 'Segment : '+ @TableRowAction + + CHAR(13)+CHAR(10);
		
		DELETE from @merge_output;


	--Merge Segment Table

		MERGE BSO.Segment AS tgt
		USING  BSO.DV_Segment AS src
		ON UPPER(src.segmentsid) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET tgt.name = src.segment_name, 
			--tgt.ModifiedDate=src.modifiedon,
			--tgt.ModifiedBy='ADF Pipeline',
			--tgt.CreatedBy='ADF Pipeline',
			--tgt.CreatedDate=src.modifiedon,
			tgt.IsActive = src.statecode

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, DataverseRowID,IsActive) 
			VALUES (src.segment_name,src.segmentsid, src.statecode)

			OUTPUT $action, inserted.DataverseRowID
			INTO @merge_output;


		 SELECT  @TableRowAction =STRING_AGG(CONCAT(CAST(ActionCount AS NVARCHAR), ' row(s) ', action), ', ') WITHIN GROUP (ORDER BY action DESC) 
			FROM (
				SELECT action, COUNT(*) as ActionCount
				FROM @merge_output
				GROUP BY action
			) as ActionCounts;

		SET @OutputMsg = @OutputMsg + 'Segment : '+ @TableRowAction + + CHAR(13)+CHAR(10);
		
		DELETE from @merge_output;

		--Merge SubSegment Table

		MERGE BSO.SubSegment AS tgt
		USING ( 
		Select 
		DS.subsegments_id,
		DS.subsegments_name,
		DS.modifiedon,
		DS.statecode,
		DMAP.segments_id,
		SEGM.ID Segment_MasterID

		FROM BSO.DV_SubSegment AS DS
		JOIN BSO.DV_SubSegment_Segment AS DMap
		ON DS.subsegments_id = DMAP.subsegments_id
		JOIN BSO.Segment AS SEGM
		ON UPPER(DMAP.segments_id) = UPPER(SEGM.DataverseRowID)

		)AS src
		ON UPPER(src.subsegments_id) = UPPER(tgt.DataverseRowID)
		AND UPPER(src.Segment_MasterID) = UPPER(tgt.segment)
		-- Update existing rows in the target table
		WHEN MATCHED 
		--AND src.modifiedon > tgt.ModifiedDate 
		THEN
			UPDATE SET tgt.name = src.subsegments_name, 
			--tgt.ModifiedDate=src.modifiedon,
			--tgt.ModifiedBy='ADF Pipeline',
			--tgt.CreatedBy='ADF Pipeline',
			--tgt.CreatedDate=src.modifiedon,
			tgt.IsActive = src.statecode,
			tgt.Segment = src.Segment_MasterID

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, DataverseRowID,IsActive,Segment) 
			VALUES (src.subsegments_name,src.subsegments_id, src.statecode,src.Segment_MasterID)

			OUTPUT $action, inserted.DataverseRowID
			INTO @merge_output;


		 SELECT  @TableRowAction =STRING_AGG(CONCAT(CAST(ActionCount AS NVARCHAR), ' row(s) ', action), ', ') WITHIN GROUP (ORDER BY action DESC) 
			FROM (
				SELECT action, COUNT(*) as ActionCount
				FROM @merge_output
				GROUP BY action
			) as ActionCounts;

		SET @OutputMsg = @OutputMsg + 'SubSegment : '+ @TableRowAction + + CHAR(13)+CHAR(10);
		
		DELETE from @merge_output;

END

END
GO


DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameSTG_RequestType NVARCHAR(50) = 'STG_RequestType'
DECLARE @COLUMN_NAME NVARCHAR(50)  = 'RequestTypeName'
IF EXISTS (
    SELECT *
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = @tableNameSTG_RequestType
    AND COLUMN_NAME = @COLUMN_NAME
)
BEGIN
    ALTER TABLE BSO.STG_RequestType
    ALTER COLUMN RequestTypeName NVARCHAR(500);
END;

GO
DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameRequestType NVARCHAR(50) = 'RequestType'
DECLARE @COLUMN_NAME NVARCHAR(50)  = 'RequestTypeName'

IF EXISTS (
    SELECT *
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = @tableNameRequestType
    AND COLUMN_NAME = @COLUMN_NAME
)
BEGIN
    ALTER TABLE BSO.RequestType
    ALTER COLUMN RequestTypeName NVARCHAR(500);
END;
GO


DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameRequestType NVARCHAR(50) = 'DV_RequestTypes'
DECLARE @COLUMN_NAME NVARCHAR(50)  = 'service_request_type_name'

IF EXISTS (
    SELECT *
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = @schema_name
    AND TABLE_NAME = @tableNameRequestType
    AND COLUMN_NAME = @COLUMN_NAME
)
BEGIN
    ALTER TABLE BSO.DV_RequestTypes
    ALTER COLUMN service_request_type_name NVARCHAR(500);
END;
GO

DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'Services'
DECLARE @COLUMN_NAME NVARCHAR(50)  = 'TileName'

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE 
TABLE_SCHEMA = @schema_name
AND TABLE_NAME = @tableNameServices
AND COLUMN_NAME = @COLUMN_NAME)
BEGIN
    ALTER TABLE BSO.Services
    ADD TileName nvarchar(500);
END;
GO


DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'DV_serviceNames'
DECLARE @COLUMN_NAME NVARCHAR(50)  = 'TileName'

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE 
TABLE_SCHEMA = @schema_name
AND TABLE_NAME = @tableNameServices
AND COLUMN_NAME = @COLUMN_NAME)
BEGIN
    ALTER TABLE BSO.DV_serviceNames
    ADD TileName nvarchar(500);
END;
GO


DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'DV_serviceNames'
DECLARE @COLUMN_NAME NVARCHAR(50)  = 'FAQLink'

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE 
TABLE_SCHEMA = @schema_name
AND TABLE_NAME = @tableNameServices
AND COLUMN_NAME = @COLUMN_NAME)


BEGIN
    ALTER TABLE BSO.DV_serviceNames
    ADD FAQLink NVARCHAR(MAX) NULL;
END;
GO


DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'STG_Services'
DECLARE @COLUMN_NAME NVARCHAR(50)  = 'TileName'

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE 
TABLE_SCHEMA = @schema_name
AND TABLE_NAME = @tableNameServices
AND COLUMN_NAME = @COLUMN_NAME)
BEGIN
    ALTER TABLE BSO.STG_Services
    ADD TileName nvarchar(500);
END;
GO


DECLARE @schema_name VARCHAR(50) = 'BSO'
DECLARE @tableNameServices NVARCHAR(50) = 'STG_Services'
DECLARE @COLUMN_NAME NVARCHAR(MAX)  = 'FAQLink'

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE 
TABLE_SCHEMA = @schema_name
AND TABLE_NAME = @tableNameServices
AND COLUMN_NAME = @COLUMN_NAME)

BEGIN
    ALTER TABLE BSO.STG_Services
    ADD FAQLink NVARCHAR(MAX) NULL;
END;
GO

--Last executed 20-02-24 On UAT

--Select * from BSO.STG_Services





/*
ALTER TABLE [BSO].[Role]
ADD ModifiedDate DATETIME DEFAULT GETDATE();

ALTER TABLE [BSO].[Role]
ADD CreatedDate DATETIME DEFAULT GETDATE();
*/

--ALTER TABLE [BSO].[ServiceOwner]
--ADD CreatedDate DATETIME DEFAULT GETDATE();

--ALTER TABLE [BSO].[ServiceOwner]
--ADD ModifiedDate DATETIME DEFAULT GETDATE();

--ALTER TABLE [BSO].[Services]
--ADD ModifiedDate DATETIME DEFAULT GETDATE();

--ALTER TABLE [BSO].[Services]
--ADD CreatedDate DATETIME DEFAULT GETDATE();


--ALTER TABLE [BSO].[UserWorkSpaceServices]
--ADD [IsActive] BIT DEFAULT 1;

--ALTER TABLE [BSO].[UserWorkSpaceServices]
--ADD [Version] INT DEFAULT 1;

--ALTER TABLE [BSO].[User] ADD IsWelcomeMessage BIT NOT NULL DEFAULT 0

