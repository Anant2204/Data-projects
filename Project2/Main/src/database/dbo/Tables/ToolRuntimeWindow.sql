CREATE TABLE [dbo].[ToolRuntimeWindow]
(
	id INT IDENTITY(1,1) PRIMARY KEY,

    startDate DATETIME NOT NULL,

    endDate DATETIME NOT NULL,

    isActive BIT NOT NULL DEFAULT 1,

    createdBy NVARCHAR(40) DEFAULT 'system',

    createdDate DATETIME DEFAULT GETUTCDATE(),

    modifiedBy NVARCHAR(40) DEFAULT 'system',

    modifiedDate DATETIME DEFAULT GETUTCDATE()
)