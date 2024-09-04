CREATE TABLE [user] (

	--id INT IDENTITY(1,1) PRIMARY KEY,
	--id INT IDENTITY(1,1) PRIMARY KEY,

    alias NVARCHAR(40)  not null PRIMARY KEY,

    isActive BIT DEFAULT 1,

    createdBy NVARCHAR(40) DEFAULT 'system',

    createdDate DATETIME DEFAULT GETUTCDATE(),

    modifiedBy NVARCHAR(40) DEFAULT 'system',

    modifiedDate DATETIME DEFAULT GETUTCDATE()

);