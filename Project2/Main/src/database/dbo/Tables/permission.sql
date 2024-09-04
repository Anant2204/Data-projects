CREATE TABLE permission (

    id INT IDENTITY(1,1) PRIMARY KEY,

    name NVARCHAR(40) NOT NULL,

    isActive BIT DEFAULT 1,

    createdBy NVARCHAR(40) DEFAULT 'system',

    createdDate DATETIME DEFAULT GETUTCDATE(),

    modifiedBy NVARCHAR(40) DEFAULT 'system',

    modifiedDate DATETIME DEFAULT GETUTCDATE()

);