CREATE TABLE disableOrgFeatureMapping (

    id INT IDENTITY(1,1) PRIMARY KEY,

    orgId INT NOT NULL,

    featureId INT FOREIGN KEY REFERENCES feature(id),

    isActive BIT DEFAULT 1,

    createdBy NVARCHAR(40) DEFAULT 'system',

    createdDate DATETIME DEFAULT GETUTCDATE(),

    modifiedBy NVARCHAR(40) DEFAULT 'system',

    modifiedDate DATETIME DEFAULT GETUTCDATE()

);