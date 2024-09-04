CREATE TABLE featureRolePermissionMapping (

    id INT IDENTITY(1,1) PRIMARY KEY,
    featureId INT FOREIGN KEY REFERENCES feature(id),

    roleId INT FOREIGN KEY REFERENCES role(id),

    permissionId INT FOREIGN KEY REFERENCES permission(id),

    isActive BIT DEFAULT 1,

    createdBy NVARCHAR(40) DEFAULT 'system',

    createdDate DATETIME DEFAULT GETUTCDATE(),

    modifiedBy NVARCHAR(40) DEFAULT 'system',

    modifiedDate DATETIME DEFAULT GETUTCDATE()

);