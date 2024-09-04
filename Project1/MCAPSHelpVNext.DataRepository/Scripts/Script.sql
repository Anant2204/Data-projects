
use MCAPSHelpVnextDB
GO
--CREATE SCHEMA BSO;

--DROP Table [User]; 
--DROP Table [ServiceMapping]
--DROP Table [Services]
--DROP Table [UserADGroup]
--DROP Table [Area]
--DROP Table [Role]
--DROP Table [Segment]
--DROP Table [SubSegment]
--DROP Table [config]



CREATE TABLE BSO.config (
     ID INT IDENTITY(1,1) PRIMARY KEY,
    [key] VARCHAR(255) NOT NULL,
    [value] VARCHAR(500) NOT NULL
);

CREATE TABLE BSO.Area (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255),
	DataverseRowID NVARCHAR(255),
    IsActive BIT
);


CREATE TABLE BSO.[Role] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255),
	DataverseRowID NVARCHAR(255),
    IsActive BIT
);

CREATE TABLE BSO.[Segment] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255),
	DataverseRowID NVARCHAR(255),
    IsActive BIT
);

CREATE TABLE BSO.[SubSegment] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255),
	DataverseRowID NVARCHAR(255),
    IsActive BIT
);

CREATE TABLE BSO.[UserADGroup] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(500),
	DataverseRowID NVARCHAR(255),
    IsActive BIT
);



CREATE TABLE BSO.[User] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    UPN NVARCHAR(255),
    UserArea INT,
    UserRole INT,
    UserADGroupID INT,
    Segment INT,
    SubSegment INT,
	DataverseRowID NVARCHAR(255),
    IsActive BIT,
    --PRIMARY KEY (UPN, UserADGroupID),
    FOREIGN KEY (UserADGroupID) REFERENCES BSO.UserADGroup(ID),
	FOREIGN KEY (Segment) REFERENCES BSO.Segment(ID),
	FOREIGN KEY (SubSegment) REFERENCES BSO.SubSegment(ID),
	FOREIGN KEY (UserArea) REFERENCES BSO.Area(ID),
	FOREIGN KEY (UserRole) REFERENCES BSO.Role(ID)
);

CREATE TABLE BSO.[Services] (
    ID UNIQUEIDENTIFIER  PRIMARY KEY,
    Name NVARCHAR(500),
    IRIS_Utterance NVARCHAR(500),
    AboutService NVARCHAR(MAX),
	relatedinformation  NVARCHAR(MAX),
    IsNonIRISService BIT,
    ServiceRequestFormLink NVARCHAR(MAX),
    IsDropdownUI BIT,
	ServiceDropDownLinks NVARCHAR(MAX),
    ServiceCategories NVARCHAR(MAX),
    ServiceOwner Nvarchar(2000), -- Consider Lookup as multiple values
    IsPrivate BIT,
	DataverseRowID NVARCHAR(255),
	isActive BIT
);
--select * from Services
CREATE TABLE BSO.ServiceMapping (
    ServiceID UNIQUEIDENTIFIER,
    ServiceArea INT,
    ServiceRole INT,
    ServiceAzureADGroup INT,
    ServiceSegment INT,
    ServiceSubsegment INT,
	DataverseRowID NVARCHAR(255),
    IsActive BIT,
    PRIMARY KEY (ServiceID, ServiceArea, ServiceRole, ServiceAzureADGroup, ServiceSegment, ServiceSubsegment),
    FOREIGN KEY (ServiceID) REFERENCES BSO.Services(ID),
    FOREIGN KEY (ServiceArea) REFERENCES BSO.Area(ID),
    FOREIGN KEY (ServiceRole) REFERENCES BSO.Role(ID),
    FOREIGN KEY (ServiceAzureADGroup) REFERENCES BSO.UserADGroup(ID),
    FOREIGN KEY (ServiceSegment) REFERENCES BSO.Segment(ID),
    FOREIGN KEY (ServiceSubsegment) REFERENCES BSO.SubSegment(ID)
);




--select DATALENGTH('redmond\crg-spaprodazure-bytf-reader-u4sq')
