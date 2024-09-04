CREATE TABLE orgToolAccess (

    orgId INT PRIMARY KEY,

    startDateTimeUtc DATETIME,

    endDateTimeUtc DATETIME,

    isActive BIT DEFAULT 1,

    createdBy NVARCHAR(40) DEFAULT 'system',

    createdDate DATETIME DEFAULT GETUTCDATE(),

    modifiedBy NVARCHAR(40) DEFAULT 'system',

    modifiedDate DATETIME DEFAULT GETUTCDATE()

);