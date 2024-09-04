DECLARE @addColumn NVARCHAR(50)  = ' ADD ';
DECLARE @addConstraint NVARCHAR(50)  = ' ADD CONSTRAINT ';
DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'AboutMCAPSHELPHtmlContentTable';
DECLARE @ColumnName NVARCHAR(255) = N'IsActive';
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID(N'[BSO].[AboutMCAPSHELPHtmlContentTable]'));


IF NOT EXISTS (
    SELECT 1
    FROM sys.default_constraints AS dc
    INNER JOIN sys.columns AS col ON dc.parent_column_id = col.column_id
    INNER JOIN sys.tables AS tbl ON dc.parent_object_id = tbl.object_id
    INNER JOIN sys.schemas AS sch ON tbl.schema_id = sch.schema_id
    WHERE col.name = @ColumnName
      AND tbl.name = @TableName
      AND sch.name = @SchemaName
      AND dc.name = @DefaultConstraintName
)
BEGIN
    DECLARE @SqlStatement NVARCHAR(MAX);

    -- Check if the column exists before adding it
    IF NOT EXISTS (
        SELECT 1
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = @SchemaName
          AND TABLE_NAME = @TableName
          AND COLUMN_NAME = @ColumnName
    )
    BEGIN
        -- Add the column
        SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + 
                            @addColumn + @ColumnName + ' BIT (1) NULL;';  -- Adjust the data type and size as needed
        EXEC sp_executesql @SqlStatement;
    END

    -- Add the default constraint to the original column
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + 
                        @addConstraint + @DefaultConstraintName + ' DEFAULT ((1)) FOR ' + QUOTENAME(@ColumnName) + ';';
    EXEC sp_executesql @SqlStatement;
END
GO


DECLARE @addColumn NVARCHAR(50)  = ' ADD ';
DECLARE @addConstraint NVARCHAR(50)  = ' ADD CONSTRAINT ';
DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'AboutMCAPSHELPHtmlContentTable';
DECLARE @ColumnName NVARCHAR(255) = N'IsActive';
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID(N'[BSO].[AboutMCAPSHELPHtmlContentTable]'));

-- Check if the column exists
IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = @SchemaName
      AND TABLE_NAME = @TableName
      AND COLUMN_NAME = @ColumnName
)
BEGIN
    -- Add the column
    DECLARE @SqlStatement NVARCHAR(MAX);
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + 
                        @addColumn + QUOTENAME(@ColumnName) + ' BIT NULL;';  -- Adjust the data type as needed
    EXEC sp_executesql @SqlStatement;

    -- Add the default constraint to the original column
    IF NOT EXISTS (
        SELECT 1
        FROM sys.default_constraints AS dc
        INNER JOIN sys.columns AS col ON dc.parent_column_id = col.column_id
        INNER JOIN sys.tables AS tbl ON dc.parent_object_id = tbl.object_id
        INNER JOIN sys.schemas AS sch ON tbl.schema_id = sch.schema_id
        WHERE col.name = @ColumnName
          AND tbl.name = @TableName
          AND sch.name = @SchemaName
          AND dc.name = @DefaultConstraintName
    )
    BEGIN
        SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + 
                            @addConstraint + @DefaultConstraintName + ' DEFAULT ((1)) FOR ' + QUOTENAME(@ColumnName) + ';';
        EXEC sp_executesql @SqlStatement;
    END
END
GO


DECLARE @addColumn NVARCHAR(50)  = ' ADD ';
DECLARE @addConstraint NVARCHAR(50)  = ' ADD CONSTRAINT ';
DECLARE @TableRequestType NVARCHAR(255) = N'[BSO].[RequestType]';
DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'RequestType';
DECLARE @ColumnName NVARCHAR(255) = N'CreatedDate';
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID(@TableRequestType) AND Name LIKE '%Creat%');

-- Check if the column already exists
IF NOT EXISTS (
    SELECT 1
    FROM sys.columns AS col
    INNER JOIN sys.tables AS tbl ON col.object_id = tbl.object_id
    INNER JOIN sys.schemas AS sch ON tbl.schema_id = sch.schema_id
    WHERE col.name = @ColumnName
      AND tbl.name = @TableName
      AND sch.name = @SchemaName
)
BEGIN
    DECLARE @SqlStatement NVARCHAR(MAX);

    -- Add the column
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + 
                        @addColumn + @ColumnName + ' DATETIME NULL;';  -- Adjust the data type as needed
    EXEC sp_executesql @SqlStatement;

    -- Add the default constraint to the original column
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + 
                        @addConstraint + @DefaultConstraintName + ' DEFAULT (getdate()) FOR ' + QUOTENAME(@ColumnName) + ';';
    EXEC sp_executesql @SqlStatement;
END
GO


DECLARE @addColumn NVARCHAR(50)  = ' ADD ';
DECLARE @addConstraint NVARCHAR(50)  = ' ADD CONSTRAINT ';
DECLARE @TableRequestType NVARCHAR(255) = N'[BSO].[RequestType]';
DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'RequestType';
DECLARE @ColumnName NVARCHAR(255) = N'ModifiedDate';
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID(@TableRequestType) AND Name like '%Modifi%');

-- Check if the column already exists
IF NOT EXISTS (
    SELECT 1
    FROM sys.columns AS col
    INNER JOIN sys.tables AS tbl ON col.object_id = tbl.object_id
    INNER JOIN sys.schemas AS sch ON tbl.schema_id = sch.schema_id
    WHERE col.name = @ColumnName
      AND tbl.name = @TableName
      AND sch.name = @SchemaName
)
BEGIN
    DECLARE @SqlStatement NVARCHAR(MAX);

    -- Add the column
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + 
                        @addColumn + @ColumnName + ' DATETIME NULL;';  -- Adjust the data type as needed
    EXEC sp_executesql @SqlStatement;

    -- Add the default constraint to the original column
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + @addConstraint + @DefaultConstraintName + ' DEFAULT (getdate()) FOR ' + QUOTENAME(@ColumnName) + ';';
    EXEC sp_executesql @SqlStatement;
END
GO

DECLARE @addColumn NVARCHAR(50)  = ' ADD ';
DECLARE @addConstraint NVARCHAR(50)  = ' ADD CONSTRAINT ';
DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'Role';
DECLARE @ColumnName NVARCHAR(255) = N'IsActive';
DECLARE @TableRole NVARCHAR(255) = N'[BSO].[Role]';

DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID(@TableRole) AND Name LIKE '%IsActive%');

-- Check if the column already exists
IF NOT EXISTS (
    SELECT 1
    FROM sys.columns AS col
    INNER JOIN sys.tables AS tbl ON col.object_id = tbl.object_id
    INNER JOIN sys.schemas AS sch ON tbl.schema_id = sch.schema_id
    WHERE col.name = @ColumnName
      AND tbl.name = @TableName
      AND sch.name = @SchemaName
)
BEGIN
    DECLARE @SqlStatement NVARCHAR(MAX);

    -- Add the column
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + 
                        @addColumn + @ColumnName + ' BIT (1) NULL;';  -- Adjust the data type and size as needed
    EXEC sp_executesql @SqlStatement;

    -- Add the default constraint to the original column
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + @addConstraint + @DefaultConstraintName + ' DEFAULT ((1)) FOR ' + QUOTENAME(@ColumnName) + ';';
    EXEC sp_executesql @SqlStatement;
END
GO


DECLARE @addColumn NVARCHAR(50)  = ' ADD ';
DECLARE @addConstraint NVARCHAR(50)  = ' ADD CONSTRAINT ';
DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'Role';
DECLARE @ColumnName NVARCHAR(255) = N'ModifiedDate';
DECLARE @TableRole NVARCHAR(255) = N'[BSO].[Role]';
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID(@TableRole) AND name like
'%Modifi%');

IF NOT EXISTS (
    SELECT 1
    FROM sys.default_constraints AS dc
    INNER JOIN sys.columns AS col ON dc.parent_column_id = col.column_id
    INNER JOIN sys.tables AS tbl ON dc.parent_object_id = tbl.object_id
    INNER JOIN sys.schemas AS sch ON tbl.schema_id = sch.schema_id
    WHERE col.name = @ColumnName
      AND tbl.name = @TableName
      AND sch.name = @SchemaName
      AND dc.name = @DefaultConstraintName
)
BEGIN
    DECLARE @SqlStatement NVARCHAR(MAX);
   
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + 
                        @addColumn + @ColumnName + ' DATETIME NULL;';  -- Adjust the data type as needed
    EXEC sp_executesql @SqlStatement;
   
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + @addConstraint + @DefaultConstraintName + ' DEFAULT (getdate()) FOR ' + QUOTENAME(@ColumnName) + ';';
    EXEC sp_executesql @SqlStatement;
END
GO

DECLARE @addColumn NVARCHAR(50)  = ' ADD ';
DECLARE @addConstraint NVARCHAR(50)  = ' ADD CONSTRAINT ';
DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'Role';
DECLARE @ColumnName NVARCHAR(255) = N'CreatedDate';
DECLARE @TableRole NVARCHAR(255) = N'[BSO].[Role]';
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID(@TableRole) and name like '%Creat%');

IF NOT EXISTS (
    SELECT 1
    FROM sys.default_constraints AS dc
    INNER JOIN sys.columns AS col ON dc.parent_column_id = col.column_id
    INNER JOIN sys.tables AS tbl ON dc.parent_object_id = tbl.object_id
    INNER JOIN sys.schemas AS sch ON tbl.schema_id = sch.schema_id
    WHERE col.name = @ColumnName
      AND tbl.name = @TableName
      AND sch.name = @SchemaName
      AND dc.name = @DefaultConstraintName
)
BEGIN
    DECLARE @SqlStatement NVARCHAR(MAX);


    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + 
                        @addColumn + @ColumnName + ' DATETIME NULL;';  -- Adjust the data type as needed
    EXEC sp_executesql @SqlStatement;

    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + @addConstraint + @DefaultConstraintName + ' DEFAULT (getdate()) FOR ' + QUOTENAME(@ColumnName) + ';';
    EXEC sp_executesql @SqlStatement;
END
GO


DECLARE @addColumn NVARCHAR(50)  = ' ADD ';
DECLARE @addConstraint NVARCHAR(50)  = ' ADD CONSTRAINT ';
DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'ServiceGroup';
DECLARE @ColumnName NVARCHAR(255) = N'CreatedDate';
DECLARE @TableServiceGroup NVARCHAR(255) = N'[BSO].[ServiceGroup]';
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID(@TableServiceGroup) and
name like '%Creat%');

IF NOT EXISTS (
    SELECT 1
    FROM sys.default_constraints AS dc
    INNER JOIN sys.columns AS col ON dc.parent_column_id = col.column_id
    INNER JOIN sys.tables AS tbl ON dc.parent_object_id = tbl.object_id
    INNER JOIN sys.schemas AS sch ON tbl.schema_id = sch.schema_id
    WHERE col.name = @ColumnName
      AND tbl.name = @TableName
      AND sch.name = @SchemaName
      AND dc.name = @DefaultConstraintName
)
BEGIN
    DECLARE @SqlStatement NVARCHAR(MAX);
   
   
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + 
                        @addColumn + @ColumnName + ' DATETIME NULL;';  -- Adjust the data type as needed
    EXEC sp_executesql @SqlStatement;
   
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + @addConstraint + @DefaultConstraintName + ' DEFAULT (getdate()) FOR ' + QUOTENAME(@ColumnName) + ';';
    EXEC sp_executesql @SqlStatement;
END
GO


DECLARE @addColumn NVARCHAR(50)  = ' ADD ';
DECLARE @addConstraint NVARCHAR(50)  = ' ADD CONSTRAINT ';
DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'ServiceGroup';
DECLARE @ColumnName NVARCHAR(255) = N'ModifiedDate';
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID(N'[BSO].[ServiceGroup]')
and name like '%Modif%');

IF NOT EXISTS (
    SELECT 1
    FROM sys.default_constraints AS dc
    INNER JOIN sys.columns AS col ON dc.parent_column_id = col.column_id
    INNER JOIN sys.tables AS tbl ON dc.parent_object_id = tbl.object_id
    INNER JOIN sys.schemas AS sch ON tbl.schema_id = sch.schema_id
    WHERE col.name = @ColumnName
      AND tbl.name = @TableName
      AND sch.name = @SchemaName
      AND dc.name = @DefaultConstraintName
)
BEGIN
    DECLARE @SqlStatement NVARCHAR(MAX);
   
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + 
                        @addColumn + @ColumnName + ' DATETIME NULL;';  -- Adjust the data type as needed
    EXEC sp_executesql @SqlStatement;
   
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + @addConstraint + @DefaultConstraintName + ' DEFAULT (getdate()) FOR ' + QUOTENAME(@ColumnName) + ';';
    EXEC sp_executesql @SqlStatement;
END
GO


--select * from [BSO].[ServiceOwner]
DECLARE @TableServiceOwner NVARCHAR(255) = N'[BSO].[ServiceOwner]';
DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'ServiceOwner';
DECLARE @ColumnName NVARCHAR(255) = N'CreatedDate';
DECLARE @DefaultConstraintName NVARCHAR(255) =  
    (SELECT name
    FROM sys.default_constraints
    WHERE parent_object_id = OBJECT_ID(@TableServiceOwner)
	AND Name like '%Creat%');

-- Check if column exists
IF NOT EXISTS (
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = @SchemaName
      AND TABLE_NAME = @TableName
      AND COLUMN_NAME = @ColumnName
)
BEGIN
    -- Add the column
    ALTER TABLE [BSO].[ServiceOwner]
    ADD CreatedDate DATETIME NULL;  -- Change the data type as needed

    -- Add the default constraint
    DECLARE @SqlStatement NVARCHAR(MAX);
    SET @SqlStatement = 'ALTER TABLE ' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName) + ' ADD CONSTRAINT ' + @DefaultConstraintName + ' DEFAULT (getdate()) FOR ' + QUOTENAME(@ColumnName) + ';';
    EXEC sp_executesql @SqlStatement;
END
GO
DECLARE @TableServiceOwner NVARCHAR(255) = N'[BSO].[ServiceOwner]';
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(@TableServiceOwner) AND name = 'ModifiedDate')
BEGIN
    ALTER TABLE [BSO].[ServiceOwner]
    ADD [ModifiedDate] DATETIME NULL; 
END
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
                                                FROM sys.default_constraints
                                                WHERE parent_object_id = OBJECT_ID(@TableServiceOwner) AND Name LIKE '%Modif%');

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DF__ServiceOw__Modif__4D9F7493]') AND type = 'D')
BEGIN
    IF @DefaultConstraintName IS NULL
    BEGIN
        ALTER TABLE [BSO].[ServiceOwner] 
        ADD CONSTRAINT [DF__ServiceOw__Modif__4D9F7493] DEFAULT (getdate()) FOR [ModifiedDate];
    END
END
GO



DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'Services';
DECLARE @ColumnName NVARCHAR(255) = N'CreatedDate';
DECLARE @TableServices NVARCHAR(255) = N'[BSO].[Services]';
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
                                                FROM sys.default_constraints
                                                WHERE parent_object_id = OBJECT_ID(@TableServices) AND Name LIKE '%Create%');

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(@TableServices) AND name = @ColumnName)
BEGIN
    -- Add the column
    ALTER TABLE [BSO].[Services]
    ADD [CreatedDate] DATETIME NULL; 
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DF__Services__Create__3D690CCA]') AND type = 'D')
BEGIN
    -- Add the default constraint
    IF @DefaultConstraintName IS NULL
    BEGIN
        ALTER TABLE [BSO].[Services]
        ADD CONSTRAINT [DF__Services__Create__3D690CCA] DEFAULT (getdate()) FOR [CreatedDate];
    END
END
GO


DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'Services';
DECLARE @ColumnName NVARCHAR(255) = N'ModifiedDate';
DECLARE @TableServices NVARCHAR(255) = N'[BSO].[Services]';
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
                                                FROM sys.default_constraints
                                                WHERE parent_object_id = OBJECT_ID(@TableServices) AND Name LIKE '%Modifi%');

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(@TableServices) AND name = @ColumnName)
BEGIN
    -- Add the column
    ALTER TABLE [BSO].[Services]
    ADD [ModifiedDate] DATETIME NULL; 
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DF__Services__Modifi__3E5D3103]') AND type = 'D')
BEGIN
    -- Add the default constraint
    IF @DefaultConstraintName IS NULL
    BEGIN
        ALTER TABLE [BSO].[Services]
        ADD CONSTRAINT [DF__Services__Modifi__3E5D3103] DEFAULT (getdate()) FOR [ModifiedDate];
    END
END
GO



DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'STG_RequestType';
DECLARE @ColumnName NVARCHAR(255) = N'CreatedDate';
DECLARE @TableSTG_RequestType NVARCHAR(255) = N'[BSO].[STG_RequestType]'
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
                                                FROM sys.default_constraints
                                                WHERE parent_object_id = OBJECT_ID(@TableSTG_RequestType) AND Name LIKE '%Creat%');

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(@TableSTG_RequestType) AND name = @ColumnName)
BEGIN
    -- Add the column
    ALTER TABLE [BSO].[STG_RequestType]
    ADD [CreatedDate] DATETIME NULL; 
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DF__STG_Reque__Creat__2685A772]') AND type = 'D')
BEGIN
    -- Add the default constraint
    IF @DefaultConstraintName IS NULL
    BEGIN
        ALTER TABLE [BSO].[STG_RequestType]
        ADD CONSTRAINT [DF__STG_Reque__Creat__2685A772] DEFAULT (getdate()) FOR [CreatedDate];
    END
END
GO



DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'STG_RequestType';
DECLARE @ColumnName NVARCHAR(255) = N'ModifiedDate';
DECLARE @TableSTG_RequestType NVARCHAR(255) = N'[BSO].[STG_RequestType]'
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
                                                 FROM sys.default_constraints
                                                 WHERE parent_object_id = OBJECT_ID(@TableSTG_RequestType) AND Name LIKE '%Modif%');

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(@TableSTG_RequestType) AND name = @ColumnName)
BEGIN
    -- Add the column
    ALTER TABLE [BSO].[STG_RequestType]
    ADD [ModifiedDate] DATETIME NULL; 
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DF__STG_Reque__Modif__2779CBAB]') AND type = 'D')
BEGIN
    -- Add the default constraint
    IF @DefaultConstraintName IS NULL
    BEGIN
        ALTER TABLE [BSO].[STG_RequestType]
        ADD CONSTRAINT [DF__STG_Reque__Modif__2779CBAB] DEFAULT (getdate()) FOR [ModifiedDate];
    END
END
GO



DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'STG_ServiceGroup';
DECLARE @ColumnName NVARCHAR(255) = N'CreatedDate';
DECLARE @TableSTG_ServiceGroup NVARCHAR(255) = N'[BSO].[STG_ServiceGroup]'
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
                                                 FROM sys.default_constraints
                                                 WHERE parent_object_id = OBJECT_ID(@TableSTG_ServiceGroup) AND Name LIKE '%Creat%');

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(@TableSTG_ServiceGroup) AND name = @ColumnName)
BEGIN
    -- Add the column
    ALTER TABLE [BSO].[STG_ServiceGroup]
    ADD [CreatedDate] DATETIME NULL; 
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DF__STG_Servi__Creat__21C0F255]') AND type = 'D')
BEGIN
    -- Add the default constraint
    IF @DefaultConstraintName IS NULL
    BEGIN
        ALTER TABLE [BSO].[STG_ServiceGroup]
        ADD CONSTRAINT [DF__STG_Servi__Creat__21C0F255] DEFAULT (getdate()) FOR [CreatedDate];
    END
END
GO





DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'STG_ServiceGroup';
DECLARE @ColumnName NVARCHAR(255) = N'ModifiedDate';
DECLARE @TableSTG_ServiceGroup NVARCHAR(255) = N'[BSO].[STG_ServiceGroup]';
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
                                                 FROM sys.default_constraints
                                                 WHERE parent_object_id = OBJECT_ID(@TableSTG_ServiceGroup) AND Name LIKE '%Modif%');

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(@TableSTG_ServiceGroup) AND name = @ColumnName)
BEGIN
    -- Add the column
    ALTER TABLE [BSO].[STG_ServiceGroup]
    ADD [ModifiedDate] DATETIME NULL; 
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DF__STG_Servi__Modif__22B5168E]') AND type = 'D')
BEGIN
    -- Add the default constraint
    IF @DefaultConstraintName IS NULL
    BEGIN
        ALTER TABLE [BSO].[STG_ServiceGroup]
        ADD CONSTRAINT [DF__STG_Servi__Modif__22B5168E] DEFAULT (getdate()) FOR [ModifiedDate];
    END
END
GO

DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'STG_ServiceOwner';
DECLARE @ColumnName NVARCHAR(255) = N'CreatedDate';
DECLARE @TableSTG_ServiceOwner NVARCHAR(255) = N'[BSO].[STG_ServiceOwner]'
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
                                                 FROM sys.default_constraints
                                                 WHERE parent_object_id = OBJECT_ID(@TableSTG_ServiceOwner) AND Name LIKE '%Creat%');

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(@TableSTG_ServiceOwner) AND name = @ColumnName)
BEGIN
    -- Add the column
    ALTER TABLE [BSO].[STG_ServiceOwner]
    ADD [CreatedDate] DATETIME NULL; 
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DF__STG_Servi__Creat__4AC307E8]') AND type = 'D')
BEGIN
    -- Add the default constraint
    IF @DefaultConstraintName IS NULL
    BEGIN
        ALTER TABLE [BSO].[STG_ServiceOwner]
        ADD CONSTRAINT [DF__STG_Servi__Creat__4AC307E8] DEFAULT (getdate()) FOR [CreatedDate];
    END
END
GO



DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'STG_ServiceOwner';
DECLARE @ColumnName NVARCHAR(255) = N'ModifiedDate';
DECLARE @TableSTG_ServiceOwner NVARCHAR(255) = N'[BSO].[STG_ServiceOwner]'

DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
                                                 FROM sys.default_constraints
                                                 WHERE parent_object_id = OBJECT_ID(@TableSTG_ServiceOwner) AND Name LIKE '%Modif%');

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(@TableSTG_ServiceOwner) AND name = @ColumnName)
BEGIN
    -- Add the column
    ALTER TABLE [BSO].[STG_ServiceOwner]
    ADD [ModifiedDate] DATETIME NULL; 
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DF__STG_Servi__Modif__4BB72C21]') AND type = 'D')
BEGIN
    -- Add the default constraint
    IF @DefaultConstraintName IS NULL
    BEGIN
        ALTER TABLE [BSO].[STG_ServiceOwner]
        ADD CONSTRAINT [DF__STG_Servi__Modif__4BB72C21] DEFAULT (getdate()) FOR [ModifiedDate];
    END
END
GO


DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'STG_Services';
DECLARE @ColumnName NVARCHAR(255) = N'CreatedDate';
DECLARE @TableSTG_Services NVARCHAR(255) = N'[BSO].[STG_Services]'
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
                                                 FROM sys.default_constraints
                                                 WHERE parent_object_id = OBJECT_ID(@TableSTG_Services) AND Name LIKE '%Creat%');

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(@TableSTG_Services) AND name = @ColumnName)
BEGIN
    -- Add the column
    ALTER TABLE [BSO].[STG_Services]
    ADD [CreatedDate] DATETIME NULL; 
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DF__STG_Servi__Creat__3F51553C]') AND type = 'D')
BEGIN
    -- Add the default constraint
    IF @DefaultConstraintName IS NULL
    BEGIN
        ALTER TABLE [BSO].[STG_Services]
        ADD CONSTRAINT [DF__STG_Servi__Creat__3F51553C] DEFAULT (getdate()) FOR [CreatedDate];
    END
END
GO


DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'STG_Services';
DECLARE @ColumnName NVARCHAR(255) = N'ModifiedDate';
DECLARE @TableSTG_Services NVARCHAR(255) = N'[BSO].[STG_Services]'
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
                                                 FROM sys.default_constraints
                                                 WHERE parent_object_id = OBJECT_ID(@TableSTG_Services) AND Name LIKE '%Modif%');

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(@TableSTG_Services) AND name = @ColumnName)
BEGIN
    -- Add the column
    ALTER TABLE [BSO].[STG_Services]
    ADD [ModifiedDate] DATETIME NULL; 
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DF__STG_Servi__Modif__40457975]') AND type = 'D')
BEGIN
    -- Add the default constraint
    IF @DefaultConstraintName IS NULL
    BEGIN
        ALTER TABLE [BSO].[STG_Services]
        ADD CONSTRAINT [DF__STG_Servi__Modif__40457975] DEFAULT (getdate()) FOR [ModifiedDate];
    END
END
GO

DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @TableName NVARCHAR(255) = N'UserADGroupMapping';
DECLARE @ColumnName NVARCHAR(255) = N'IsActive';
DECLARE @TableUserADGroupMapping NVARCHAR(255) = N'[BSO].[UserADGroupMapping]'
DECLARE @DefaultConstraintName NVARCHAR(255) = (SELECT name
                                                 FROM sys.default_constraints
                                                 WHERE parent_object_id = OBJECT_ID(@TableUserADGroupMapping) AND Name LIKE '%IsAct%');

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(@TableUserADGroupMapping) AND name = @ColumnName)
BEGIN
    -- Add the column
    ALTER TABLE [BSO].[UserADGroupMapping]
    ADD [IsActive] BIT NULL; 
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DF__UserADGro__IsAct__13DCE752]') AND type = 'D')
BEGIN
    -- Add the default constraint
    IF @DefaultConstraintName IS NULL
    BEGIN
        ALTER TABLE [BSO].[UserADGroupMapping]
        ADD CONSTRAINT [DF__UserADGro__IsAct__13DCE752] DEFAULT ((1)) FOR [IsActive];
    END
END
GO


DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @table_nameUserWorkSpaceServices VARCHAR(50) = '[BSO].[UserWorkSpaceServices]'
DECLARE @ColumnNameIsActive NVARCHAR(255) = N'IsActive';
DECLARE @DefaultConstraintNameIsActive NVARCHAR(255) = (SELECT name
                                                        FROM sys.default_constraints
                                                        WHERE parent_object_id = OBJECT_ID(@table_nameUserWorkSpaceServices) AND Name LIKE '%IsAct%');

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE
object_id = OBJECT_ID(@table_nameUserWorkSpaceServices) AND name = @ColumnNameIsActive)
BEGIN
    ALTER TABLE [BSO].[UserWorkSpaceServices]
    ADD [IsActive] BIT (1) NULL;
END

IF NOT EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DF__UserWorkS__IsAct__255C790F]') AND type = 'D')
BEGIN
    -- Add the default constraint
    IF @DefaultConstraintNameIsActive IS NULL
    BEGIN
        ALTER TABLE [BSO].[UserWorkSpaceServices]
        ADD CONSTRAINT [DF__UserWorkS__IsAct__255C790F] DEFAULT ((1)) FOR [IsActive];
    END
END
GO

DECLARE @SchemaName NVARCHAR(255) = N'BSO';
DECLARE @table_nameUserWorkSpaceServices VARCHAR(50) = '[BSO].[UserWorkSpaceServices]'
DECLARE @ColumnNameVersion NVARCHAR(255) = N'Version';
DECLARE @DefaultConstraintNameVersion NVARCHAR(255) = (SELECT name
                                                       FROM sys.default_constraints
                                                       WHERE parent_object_id = OBJECT_ID(@table_nameUserWorkSpaceServices) AND Name LIKE '%Versi%');


IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(@table_nameUserWorkSpaceServices) AND name = @ColumnNameVersion)
BEGIN
    -- Add the column
    ALTER TABLE [BSO].[UserWorkSpaceServices]
    ADD [Version] INT NULL;
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DF__UserWorkS__Versi__32B6742D]') AND type = 'D')
BEGIN
    -- Add the default constraint
    IF @DefaultConstraintNameVersion IS NULL
    BEGIN
        ALTER TABLE [BSO].[UserWorkSpaceServices]
        ADD CONSTRAINT [DF__UserWorkS__Versi__32B6742D] DEFAULT ((1)) FOR [Version];
    END
END
GO




IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__AboutNavi__Paren__092A4EB5]') AND parent_object_id = OBJECT_ID(N'[BSO].[AboutNavigationLinks]'))
ALTER TABLE [BSO].[AboutNavigationLinks]  WITH CHECK ADD FOREIGN KEY([ParentLinkId])
REFERENCES [BSO].[AboutNavigationLinks] ([Id])
GO
DECLARE @table_nameGiveUsFeedback VARCHAR(50) = '[BSO].[GiveUsFeedback]'
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK_SatisfactionID]') AND parent_object_id = OBJECT_ID(@table_nameGiveUsFeedback))
ALTER TABLE [BSO].[GiveUsFeedback]  WITH CHECK ADD  CONSTRAINT [FK_SatisfactionID] FOREIGN KEY([SatisfactionID])
REFERENCES [BSO].[FeedbackSatisfaction] ([SatisfactionID])
GO
DECLARE @table_nameGiveUsFeedback VARCHAR(50) = '[BSO].[GiveUsFeedback]'
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK_SatisfactionID]') AND parent_object_id = OBJECT_ID(@table_nameGiveUsFeedback))
ALTER TABLE [BSO].[GiveUsFeedback] CHECK CONSTRAINT [FK_SatisfactionID]
GO
DECLARE @table_nameGiveUsFeedback VARCHAR(50) = '[BSO].[GiveUsFeedback]'
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK_UserID]') AND parent_object_id = OBJECT_ID(@table_nameGiveUsFeedback))
ALTER TABLE [BSO].[GiveUsFeedback]  WITH CHECK ADD  CONSTRAINT [FK_UserID] FOREIGN KEY([UserID])
REFERENCES [BSO].[User] ([Id])
GO
DECLARE @table_nameGiveUsFeedback VARCHAR(50) = '[BSO].[GiveUsFeedback]'
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK_UserID]') AND parent_object_id = OBJECT_ID(@table_nameGiveUsFeedback))
ALTER TABLE [BSO].[GiveUsFeedback] CHECK CONSTRAINT [FK_UserID]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__MyHelpDas__UserI__69279377]') AND parent_object_id = OBJECT_ID(N'[BSO].[MyHelpDasboard]'))
ALTER TABLE [BSO].[MyHelpDasboard]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [BSO].[User] ([Id])
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__RequestTy__Servi__1A1FD08D]') 
AND parent_object_id = OBJECT_ID(N'[BSO].[RequestType]'))
ALTER TABLE [BSO].[RequestType]  WITH CHECK ADD FOREIGN KEY([ServiceGroupID])
REFERENCES [BSO].[ServiceGroup] ([ServiceGroupID])
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceGr__Servi__155B1B70]') AND
 parent_object_id = OBJECT_ID(N'[BSO].[ServiceGroup]'))
ALTER TABLE [BSO].[ServiceGroup]  WITH CHECK ADD FOREIGN KEY([ServiceID])
REFERENCES [BSO].[Services] ([ID])
GO



DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF NOT EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceMa__Servi__5CC1BC92]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)  -- Corrected this line
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] WITH CHECK ADD CONSTRAINT [FK__ServiceMa__Servi__5CC1BC92] 
    FOREIGN KEY([ServiceID]) REFERENCES [BSO].[Services] ([ID]);
END
GO




DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceMa__Servi__5CC1BC92]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] CHECK CONSTRAINT [FK__ServiceMa__Servi__5CC1BC92];
END
GO




DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF NOT EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceMa__Servi__5DB5E0CB]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] WITH CHECK ADD CONSTRAINT [FK__ServiceMa__Servi__5DB5E0CB] 
    FOREIGN KEY([ServiceArea]) REFERENCES [BSO].[Area] ([ID]);
END
GO



DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceMa__Servi__5DB5E0CB]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] CHECK CONSTRAINT [FK__ServiceMa__Servi__5DB5E0CB];
END
GO


DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF NOT EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceMa__Servi__5EAA0504]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] WITH CHECK ADD CONSTRAINT [FK__ServiceMa__Servi__5EAA0504] 
    FOREIGN KEY([ServiceRole]) REFERENCES [BSO].[Role] ([ID]);
END
GO


DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceMa__Servi__5EAA0504]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] CHECK CONSTRAINT [FK__ServiceMa__Servi__5EAA0504];
END
GO


DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF NOT EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceMa__Servi__5F9E293D]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] WITH CHECK ADD CONSTRAINT [FK__ServiceMa__Servi__5F9E293D] 
    FOREIGN KEY([ServiceAzureADGroup]) REFERENCES [BSO].[UserADGroup] ([ID]);
END
GO


DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceMa__Servi__5F9E293D]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] CHECK CONSTRAINT [FK__ServiceMa__Servi__5F9E293D];
END
GO


DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF NOT EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceMa__Servi__60924D76]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] WITH CHECK ADD CONSTRAINT [FK__ServiceMa__Servi__60924D76] 
    FOREIGN KEY([ServiceSegment]) REFERENCES [BSO].[Segment] ([ID]);
END
GO


DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceMa__Servi__60924D76]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] CHECK CONSTRAINT [FK__ServiceMa__Servi__60924D76];
END
GO


DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF NOT EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceMa__Servi__618671AF]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] WITH CHECK ADD CONSTRAINT [FK__ServiceMa__Servi__618671AF] 
    FOREIGN KEY([ServiceSubsegment]) REFERENCES [BSO].[SubSegment] ([ID]);
END
GO


DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceMa__Servi__618671AF]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] CHECK CONSTRAINT [FK__ServiceMa__Servi__618671AF];
END
GO



DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF NOT EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK_ServiceMapping_RequestType]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] WITH CHECK ADD CONSTRAINT [FK_ServiceMapping_RequestType] 
    FOREIGN KEY([RequestTypeID]) REFERENCES [BSO].[RequestType] ([RequestTypeID]);
END
GO



DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK_ServiceMapping_RequestType]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] CHECK CONSTRAINT [FK_ServiceMapping_RequestType];
END
GO


DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF NOT EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK_ServiceMapping_ServiceGroup]') 
    AND parent_object_id = OBJECT_ID(@tableServiceMapping)
)
BEGIN
    ALTER TABLE [BSO].[ServiceMapping] WITH CHECK ADD CONSTRAINT [FK_ServiceMapping_ServiceGroup] 
    FOREIGN KEY([ServiceGroupID]) REFERENCES [BSO].[ServiceGroup] ([ServiceGroupID]);
END
GO



DECLARE @tableServiceMapping NVARCHAR(128) = '[BSO].[ServiceMapping]';
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK_ServiceMapping_ServiceGroup]') AND parent_object_id = OBJECT_ID(N'+ QUOTENAME(@tableServiceMapping)+'))
ALTER TABLE [BSO].[ServiceMapping] CHECK CONSTRAINT [FK_ServiceMapping_ServiceGroup]
GO


DECLARE @TableServiceOwnerServices NVARCHAR(255) = N'[BSO].[ServiceOwnerServices]';
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceOw__Servi__58F12BAE]') AND parent_object_id = OBJECT_ID(@TableServiceOwnerServices))
ALTER TABLE [BSO].[ServiceOwnerServices]  WITH CHECK ADD FOREIGN KEY([ServiceID])
REFERENCES [BSO].[Services] ([ID])
GO
DECLARE @TableServiceOwnerServices NVARCHAR(255) = N'[BSO].[ServiceOwnerServices]';
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__ServiceOw__Servi__59E54FE7]') AND parent_object_id = OBJECT_ID(@TableServiceOwnerServices))
ALTER TABLE [BSO].[ServiceOwnerServices]  WITH CHECK ADD FOREIGN KEY([ServiceOwnerID])
REFERENCES [BSO].[ServiceOwner] ([ID])
GO
DECLARE @TableSTG_RequestType NVARCHAR(255) = N'[BSO].[STG_ServiceGroup]';
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__STG_Reque__Servi__25918339]') AND parent_object_id = OBJECT_ID(@TableSTG_RequestType))
ALTER TABLE [BSO].[STG_RequestType]  WITH CHECK ADD FOREIGN KEY([ServiceGroupID])
REFERENCES [BSO].[STG_ServiceGroup] ([ServiceGroupID])
GO
DECLARE @TableSTG_ServiceGroup NVARCHAR(255) = N'[BSO].[STG_ServiceGroup]';
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK_STG_ServiceGroup_Services]') AND parent_object_id = OBJECT_ID(@TableSTG_ServiceGroup))
ALTER TABLE [BSO].[STG_ServiceGroup]  WITH CHECK ADD  CONSTRAINT [FK_STG_ServiceGroup_Services] FOREIGN KEY([ServiceID])
REFERENCES [BSO].[STG_Services] ([ID])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK_STG_ServiceGroup_Services]') AND 
parent_object_id = OBJECT_ID(N'[BSO].[STG_ServiceGroup]'))
ALTER TABLE [BSO].[STG_ServiceGroup] CHECK CONSTRAINT [FK_STG_ServiceGroup_Services]
GO


DECLARE @tableSTG_ServiceOwnerServices NVARCHAR(128) = '[BSO].[STG_ServiceOwnerServices]';
IF NOT EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK_Service]') 
    AND parent_object_id = OBJECT_ID(@tableSTG_ServiceOwnerServices)
)
BEGIN
    ALTER TABLE [BSO].[STG_ServiceOwnerServices] WITH CHECK ADD CONSTRAINT [FK_Service] 
    FOREIGN KEY([ServiceID]) REFERENCES [BSO].[STG_Services] ([ID]);
END
GO


DECLARE @tableSTG_ServiceOwnerServices NVARCHAR(128) = '[BSO].[STG_ServiceOwnerServices]';
IF EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(N'[BSO].[FK_Service]') 
    AND parent_object_id = OBJECT_ID(@tableSTG_ServiceOwnerServices)
)
BEGIN
    ALTER TABLE [BSO].[STG_ServiceOwnerServices] CHECK CONSTRAINT [FK_Service];
END
GO
DECLARE @FK_ServiceOwner NVARCHAR(50) = N'[BSO].[FK_ServiceOwner]';
DECLARE @tableSTG_ServiceOwnerServices NVARCHAR(128) = '[BSO].[STG_ServiceOwnerServices]';
IF NOT EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(@FK_ServiceOwner) 
    AND parent_object_id = OBJECT_ID(@tableSTG_ServiceOwnerServices)
)
BEGIN
    ALTER TABLE [BSO].[STG_ServiceOwnerServices] WITH CHECK ADD CONSTRAINT [FK_ServiceOwner] 
    FOREIGN KEY([ServiceOwnerID]) REFERENCES [BSO].[STG_ServiceOwner] ([ID]);
END
GO
DECLARE @FK_ServiceOwner NVARCHAR(50) = N'[BSO].[FK_ServiceOwner]';
DECLARE @tableSTG_ServiceOwnerServices NVARCHAR(128) = '[BSO].[STG_ServiceOwnerServices]';
IF NOT EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(@FK_ServiceOwner) 
    AND parent_object_id = OBJECT_ID(@tableSTG_ServiceOwnerServices)
)
BEGIN
    ALTER TABLE [BSO].[STG_ServiceOwnerServices] WITH CHECK ADD CONSTRAINT [FK_ServiceOwner] 
    FOREIGN KEY([ServiceOwnerID]) REFERENCES [BSO].[STG_ServiceOwner] ([ID]);
END
GO

DECLARE @FK_ServiceOwner NVARCHAR(50) = N'[BSO].[FK_ServiceOwner]';
DECLARE @tableSTG_ServiceOwnerServices NVARCHAR(128) = '[BSO].[STG_ServiceOwnerServices]';
IF EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE object_id = OBJECT_ID(@FK_ServiceOwner) 
    AND parent_object_id = OBJECT_ID(@tableSTG_ServiceOwnerServices)
)
BEGIN
    ALTER TABLE [BSO].[STG_ServiceOwnerServices] CHECK CONSTRAINT [FK_ServiceOwner];
END
GO




DECLARE @table_nameSubSegment VARCHAR(50) = '[BSO].[SubSegment]'
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__SubSegmen__Segme__2FBA0BF1]') AND parent_object_id = @table_nameSubSegment)
ALTER TABLE [BSO].[SubSegment]  WITH CHECK ADD FOREIGN KEY([Segment])
REFERENCES [BSO].[Segment] ([ID])
GO
DECLARE @table_nameSubSegment VARCHAR(50) = '[BSO].[SubSegment]'
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__SubSegmen__Segme__61DB776A]') AND parent_object_id = @table_nameSubSegment)
ALTER TABLE [BSO].[SubSegment]  WITH CHECK ADD FOREIGN KEY([Segment])
REFERENCES [BSO].[Segment] ([ID])
GO
DECLARE @table_nameSubSegment VARCHAR(50) = '[BSO].[SubSegment]'
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__SubSegmen__Segme__6F357288]') AND parent_object_id = @table_nameSubSegment)
ALTER TABLE [BSO].[SubSegment]  WITH CHECK ADD FOREIGN KEY([Segment])
REFERENCES [BSO].[Segment] ([ID])
GO
DECLARE @table_nameSubSegment VARCHAR(50) = '[BSO].[SubSegment]'
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__SubSegmen__Segme__7C8F6DA6]') AND parent_object_id = @table_nameSubSegment)
ALTER TABLE [BSO].[SubSegment]  WITH CHECK ADD FOREIGN KEY([Segment])
REFERENCES [BSO].[Segment] ([ID])
GO
DECLARE @TableUser NVARCHAR(50) = N'[BSO].[User]';
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__User__Segment__52442E1F]') AND parent_object_id = OBJECT_ID(@TableUser))
ALTER TABLE [BSO].[User]  WITH CHECK ADD FOREIGN KEY([Segment])
REFERENCES [BSO].[Segment] ([ID])
GO
DECLARE @TableUser NVARCHAR(50) = N'[BSO].[User]';
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__User__SubSegment__53385258]') AND parent_object_id = OBJECT_ID(@TableUser))
ALTER TABLE [BSO].[User]  WITH CHECK ADD FOREIGN KEY([SubSegment])
REFERENCES [BSO].[SubSegment] ([ID])
GO
DECLARE @TableUser NVARCHAR(50) = N'[BSO].[User]';
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__User__UserArea__542C7691]') AND parent_object_id = OBJECT_ID(@TableUser))
ALTER TABLE [BSO].[User]  WITH CHECK ADD FOREIGN KEY([UserArea])
REFERENCES [BSO].[Area] ([ID])
GO
DECLARE @TableUser NVARCHAR(50) = N'[BSO].[User]';
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__User__UserRole__55209ACA]') AND parent_object_id = OBJECT_ID(@TableUser))
ALTER TABLE [BSO].[User]  WITH CHECK ADD FOREIGN KEY([UserRole])
REFERENCES [BSO].[Role] ([ID])
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__UserADGro__UserA__45A94D10]') AND parent_object_id = OBJECT_ID(N'[BSO].[UserADGroupMapping]'))
ALTER TABLE [BSO].[UserADGroupMapping]  WITH CHECK ADD FOREIGN KEY([UserADGroupID])
REFERENCES [BSO].[UserADGroup] ([ID])
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__UserADGro__UserI__44B528D7]') AND parent_object_id = OBJECT_ID(N'[BSO].[UserADGroupMapping]'))
ALTER TABLE [BSO].[UserADGroupMapping]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [BSO].[User] ([Id])
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__UserWorkS__Servi__6462DE5A]') AND parent_object_id = OBJECT_ID(N'[BSO].[UserWorkSpaceServices]'))
ALTER TABLE [BSO].[UserWorkSpaceServices]  WITH CHECK ADD FOREIGN KEY([ServiceID])
REFERENCES [BSO].[Services] ([ID])
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[BSO].[FK__UserWorkS__UserI__65570293]') AND parent_object_id = OBJECT_ID(N'[BSO].[UserWorkSpaceServices]'))
ALTER TABLE [BSO].[UserWorkSpaceServices]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [BSO].[User] ([Id])
GO
IF NOT EXISTS (SELECT * FROM sys.check_constraints WHERE object_id = OBJECT_ID(N'[BSO].[CK__DatabaseS__JObSt__6C040022]') AND parent_object_id = OBJECT_ID(N'[BSO].[DatabaseSyncJob]'))
ALTER TABLE [BSO].[DatabaseSyncJob]  WITH CHECK ADD CHECK  (([JObStatus]='Failed' OR [JObStatus]='Completed' OR [JObStatus]='In-Progress' OR [JObStatus]='Started'))
GO
IF NOT EXISTS (SELECT * FROM sys.check_constraints WHERE object_id = OBJECT_ID(N'[BSO].[CK__MyHelpDas__Ticke__68336F3E]') AND parent_object_id = OBJECT_ID(N'[BSO].[MyHelpDasboard]'))
ALTER TABLE [BSO].[MyHelpDasboard]  WITH CHECK ADD CHECK  (([TicketStatus]='Closed' OR [TicketStatus]='ActionRequired' OR [TicketStatus]='Open'))
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[AddFeedback]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[AddFeedback] AS' 
END
GO
ALTER PROCEDURE [BSO].[AddFeedback]
    @UserID INT,
    @SatisfactionLevel VARCHAR(20),
    @PleaseTellUs NVARCHAR(MAX),
    @ScreenshotURL NVARCHAR(MAX),
    @Email NVARCHAR(MAX),
    @Id INT OUTPUT
AS
BEGIN
    DECLARE @SatisfactionID INT;

    BEGIN TRY
        -- Get SatisfactionID based on SatisfactionLevel
        SELECT @SatisfactionID = SatisfactionID
        FROM [BSO].FeedbackSatisfaction
        WHERE SatisfactionLevel = @SatisfactionLevel;

        -- Open the symmetric key with which to decrypt the data
        OPEN SYMMETRIC KEY CreditCards_Key11
            DECRYPTION BY CERTIFICATE Sales09;

        -- Encrypt the Email value using the symmetric key
        DECLARE @EncryptedEmail VARBINARY(MAX);
        SET @EncryptedEmail = ENCRYPTBYKEY(KEY_GUID('CreditCards_Key11'), @Email);

        -- Insert data into GiveUsFeedback table
        INSERT INTO [BSO].GiveUsFeedback (UserID, SatisfactionID, PleaseTellUs, ScreenshotURL, EncryptedEmail)
        VALUES (@UserID, @SatisfactionID, @PleaseTellUs, @ScreenshotURL, @EncryptedEmail);

        -- Set the output parameter with the number of rows affected
        SET @Id = @@ROWCOUNT;

        -- Close the symmetric key
        CLOSE SYMMETRIC KEY CreditCards_Key11;

        -- Return -1 if no rows were affected (indicating an error)
        IF @Id = 0
        BEGIN
            SET @Id = -1;
        END
    END TRY
    BEGIN CATCH
        -- Handle errors here, e.g., log the error message
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
		DECLARE @error NVARCHAR(50) = 'Error: ';
        PRINT @error + @ErrorMessage;
        -- You may want to re-throw the error or perform other actions as needed
    END CATCH
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[AddUser]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[AddUser] AS' 
END
GO

ALTER PROCEDURE [BSO].[AddUser]
    @UPN NVARCHAR(255),
	@Oid NVARCHAR(300),
    @UserArea INT,
    @UserRole INT,
    @UserADGroupIDs [BSO].UserADGroupIDList READONLY,
    @Segment INT,
    @SubSegment INT null,
    @DataverseRowID UNIQUEIDENTIFIER,
    @IsActive BIT,
    @GeneratedId INT OUTPUT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM [BSO].[User] WHERE UPN = @UPN)
    BEGIN
        -- Insert into User table
        INSERT INTO [BSO].[User] (UPN,  UserArea, UserRole, Segment, SubSegment, DataverseRowID, IsActive, Oid)
        OUTPUT INSERTED.Id 
        VALUES (@UPN, @UserArea, @UserRole, @Segment, @SubSegment, @DataverseRowID, @IsActive, @Oid);

        SET @GeneratedId = SCOPE_IDENTITY();

        -- Insert into UserADGroupMapping for each UserADGroupID in the list
       -- INSERT INTO [BSO].[UserADGroupMapping] (UserId, UserADGroupID)
       -- SELECT @GeneratedId, UserADGroupID
       -- FROM @UserADGroupIDs;
    END
    ELSE
    BEGIN
        SET @GeneratedId = -1;
    END
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[DeleteUserAndRelatedData]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[DeleteUserAndRelatedData] AS' 
END
GO

ALTER PROCEDURE [BSO].[DeleteUserAndRelatedData]
    @UPN NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY  
        BEGIN TRAN;
        DECLARE @UserID INT;
        SELECT @UserID = Id FROM [BSO].[User] WHERE UPN = @UPN;
        IF @UserID IS NOT NULL
        BEGIN 
            DELETE FROM [BSO].[UserWorkSpaceServices] WHERE UserID = @UserID;
            DELETE FROM [BSO].[UserADGroupMapping] WHERE UserID = @UserID;
            DELETE FROM [BSO].[User] WHERE Id = @UserID;
            DELETE FROM [BSO].[GiveUsFeedback] WHERE UserID = @UserID;
            COMMIT;

            -- Print a message indicating that the user has been deleted
            PRINT 'User has been deleted.';
        END
        ELSE
        BEGIN
            -- Rollback the transaction and print a message indicating that the user was not found
            ROLLBACK;
            PRINT 'User not found. Transaction rolled back.';
        END
    END TRY
    BEGIN CATCH      
        IF @@TRANCOUNT > 0		         
            ROLLBACK;       
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
        DECLARE @error NVARCHAR(50) = 'Error: ';
        PRINT @error + @ErrorMessage;
    END CATCH;
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[FindUser]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[FindUser] AS' 
END
GO

ALTER PROCEDURE [BSO].[FindUser]
    @UPN NVARCHAR(255) 
AS
BEGIN
    SELECT U.*, M.UserADGroupID
    FROM BSO.[User] U WITH (NOLOCK)
    JOIN BSO.[UserADGroupMapping] M ON U.Id = M.UserId
    WHERE U.UPN = @UPN
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetAboutMCAPSHtmlContent]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetAboutMCAPSHtmlContent] AS' 
END
GO
ALTER PROCEDURE [BSO].[GetAboutMCAPSHtmlContent]   
AS
BEGIN
    SELECT ContentType, HtmlContent
    FROM [BSO].AboutMCAPSHELPHtmlContentTable WIth (NOLOCK)
    WHERE IsActive = 1
END;

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetAboutMCAPSNavigationHierarchy]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetAboutMCAPSNavigationHierarchy] AS' 
END
GO
ALTER PROCEDURE [BSO].[GetAboutMCAPSNavigationHierarchy]
AS
BEGIN
    WITH NavigationCTE AS
    (
        -- Anchor member: Select top-level nodes (where ParentKey is NULL)
        SELECT
            NavigationKey,
            NavigationValue,
            ParentKey,
            IsActive
        FROM
            [BSO].AboutMCAPSHELPNavigationTable
        WHERE
            ParentKey IS NULL

        UNION ALL

        -- Recursive member: Join with the CTE to get child nodes
        SELECT
            t.NavigationKey,
            t.NavigationValue,
            t.ParentKey,
            t.IsActive
        FROM
            [BSO].AboutMCAPSHELPNavigationTable t
        INNER JOIN
            NavigationCTE cte ON t.ParentKey = cte.NavigationKey
    )

    -- Select from the CTE
    SELECT
        NavigationKey,
        NavigationValue,
        ParentKey,
        IsActive
    FROM
        NavigationCTE;

END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetAboutNavigationLinks]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetAboutNavigationLinks] AS' 
END
GO
ALTER PROCEDURE [BSO].[GetAboutNavigationLinks]
AS
BEGIN
    WITH NavigationCTE AS
    (
        SELECT
            Id,
            Name,
            Content,
            Url,
            [Key],
            ParentLinkId
        FROM
            [BSO].AboutNavigationLinks
        WHERE
            ParentLinkId IS NULL
        UNION ALL
        SELECT
            t.Id,
            t.Name,
            t.Content,
            t.Url,
            t.[Key],
            t.ParentLinkId
        FROM
            [BSO].AboutNavigationLinks t
        INNER JOIN
            NavigationCTE cte ON t.ParentLinkId = cte.Id
    )
    SELECT
        Id,
        Name,
        Content,
        Url,
        [Key],
        ParentLinkId
    FROM
        NavigationCTE order BY Id
   -- FOR JSON PATH, ROOT('NavigationLinks');
END;
GO




IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetAllAnnouncement]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetAllAnnouncement] AS' 
END
GO
ALTER PROCEDURE [BSO].[GetAllAnnouncement]
AS
BEGIN
	SET NOCOUNT ON;
   	SELECT [ID],[Title],[Description],[StartDate],[EndDate],[IsAnnouncement],
	[Type]
	FROM [BSO].[Announcement]  WITH (NOLOCK) 
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetAllArea]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetAllArea] AS' 
END
GO
ALTER PROCEDURE [BSO].[GetAllArea]
AS
BEGIN
    SET NOCOUNT ON;
	SELECT [Id],[Name] FROM [BSO].[Area] WITH (NOLOCK) WHERE IsActive = 1 ORDER BY [Name]   
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetAllRole]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetAllRole] AS' 
END
GO
ALTER PROCEDURE [BSO].[GetAllRole]
AS
BEGIN
    SET NOCOUNT ON;
	SELECT [Id],[Name] FROM [BSO].[Role] WITH (NOLOCK) WHERE IsActive = 1 ORDER BY [Name] 
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetAllSegment]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetAllSegment] AS' 
END
GO
ALTER PROCEDURE [BSO].[GetAllSegment]
AS
BEGIN
    SET NOCOUNT ON;
	SELECT [Id],[Name] FROM [BSO].[Segment]  WITH (NOLOCK) WHERE IsActive = 1 ORDER BY [Name]  
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetAllSubSegment]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetAllSubSegment] AS' 
END
GO
ALTER PROCEDURE [BSO].[GetAllSubSegment]
    @SegmentId INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT [Id], [Name]
    FROM [BSO].[SubSegment] WITH (NOLOCK)
    WHERE Segment = @SegmentId AND
    IsActive = 1 Order By [Name]
     -- Replace [YourOrderByColumn] with the actual column you want to order by
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetAllUsers]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetAllUsers] AS' 
END
GO

ALTER PROCEDURE [BSO].[GetAllUsers]
 @DefaultArea NVARCHAR(50) = 'DefaultArea',
 @DefaultRole NVARCHAR(50) = 'DefaultRole',
 @DefaultSegment NVARCHAR(50) = 'DefaultSegment',
 @DefaultSubSegment NVARCHAR(50) = 'DefaultSubSegment'
AS
BEGIN

 SELECT DISTINCT
    U.*,
    ISNULL(A.Name,  @DefaultArea) as UserAreaName,
    ISNULL(R.Name,  @DefaultRole) as UserRoleName,
    ISNULL(S.Name,  @DefaultSegment) as UserSegmentName,
    ISNULL(SS.Name, @DefaultSubSegment) as UserSubSegmentName
FROM
    [BSO].[User] U
LEFT JOIN
    [BSO].[Area] A ON U.UserArea = A.ID
LEFT JOIN
    [BSO].[Role] R ON U.UserRole = R.ID
LEFT JOIN
    [BSO].[Segment] S ON U.Segment = S.ID
LEFT JOIN
    [BSO].[SubSegment] SS ON U.SubSegment = SS.ID
LEFT JOIN
    BSO.[UserADGroupMapping] M ON U.Id = M.UserId

 
WHERE U.Oid IS NOT NULL AND U.Oid <> ''



END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetAnnouncements]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetAnnouncements] AS' 
END
GO
ALTER PROCEDURE [BSO].[GetAnnouncements]
AS
BEGIN
    SELECT
        a.AnnouncementID,
        a.Title,
        at.AnnouncementTypeName AS AnnouncementType,
        a.StartDate,
        a.EndDate,
        a.Description,
        a.IsActive
    FROM
        Announcements a
    INNER JOIN
        AnnouncementTypes at ON a.AnnouncementTypeID = at.AnnouncementTypeID;
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetDecryptedEmailByUserID]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetDecryptedEmailByUserID] AS' 
END
GO
ALTER PROCEDURE [BSO].[GetDecryptedEmailByUserID]
    @UserID INT
AS
BEGIN
    DECLARE @EncryptedEmail VARBINARY(MAX);

    -- Get the encrypted email based on UserID
    SELECT @EncryptedEmail = CONVERT(VARBINARY(MAX), gf.EncryptedEmail)
    FROM [BSO].GiveUsFeedback gf
    WHERE gf.UserID = @UserID;

    -- Open the symmetric key with which to decrypt the data
    OPEN SYMMETRIC KEY CreditCards_Key11
        DECRYPTION BY CERTIFICATE Sales09;

    -- Decrypt the email using the symmetric key
    SELECT
        gf.FeedbackID,
        gf.UserID,
        CONVERT(NVARCHAR(MAX), DECRYPTBYKEY(@EncryptedEmail)) AS DecryptedEmail
    FROM [BSO].GiveUsFeedback gf
    WHERE gf.UserID = @UserID;

    -- Close the symmetric key
    CLOSE SYMMETRIC KEY CreditCards_Key11;
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetFeedback]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetFeedback] AS' 
END
GO
ALTER PROCEDURE [BSO].[GetFeedback]
 
AS
BEGIN

        OPEN SYMMETRIC KEY [MySymmetricKey] DECRYPTION BY CERTIFICATE [MySelfSignedCert];
        SELECT FeedBackID, UserID, SatisfactionID, PleaseTellUs, ScreenShotURL, CONVERT(NVARCHAR(MAX), DECRYPTBYKEY(EncryptedEmail)) FROM [BSO].[GiveUsFeedback]
        CLOSE SYMMETRIC KEY [MySymmetricKey];

END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetFeedbackByUserID]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetFeedbackByUserID] AS' 
END
GO
ALTER PROCEDURE [BSO].[GetFeedbackByUserID]
    @UserID INT
AS
BEGIN
    SELECT
        gf.FeedbackID,
        CONVERT(NVARCHAR(MAX), DECRYPTBYKEY(gf.EncryptedEmail)) AS DecryptedEmail
    FROM
        [BSO].GiveUsFeedback gf
    WHERE
        gf.UserID = @UserID;
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetLoggedInServices]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetLoggedInServices] AS' 
END
GO

-- Create the stored procedure
ALTER PROCEDURE [BSO].[GetLoggedInServices]
AS
BEGIN
		SELECT 

    [ID],
    [Name],

    CASE 
        WHEN [IsNonIRISService] = 0 THEN [IRIS_Utterance]
        WHEN [IsNonIRISService] = 1 AND [IsDropdownUI] = 1 THEN [ServiceDropDownLinks]
        ELSE [ServiceRequestFormLink]
    END AS [FinalData],
	[IsNonIRISService],
	[IsDropdownUI],
	

    [AboutService],
    [relatedinformation],
   
    [ServiceCategories],
    [IsPrivate],
    [DataverseRowID],
    [isActive]
FROM [BSO].[Services] WITH (NOLOCK) WHERE isActive = 1
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetLoggedInServicesByID]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetLoggedInServicesByID] AS' 
END
GO

-- Create the stored procedure

ALTER PROCEDURE [BSO].[GetLoggedInServicesByID]
    @ServiceID INT
AS
BEGIN
	SELECT 
    [ID],
    [Name],
    CASE 
        WHEN [IsNonIRISService] = 0 THEN [IRIS_Utterance]
        WHEN [IsNonIRISService] = 1 AND [IsDropdownUI] = 1 THEN [ServiceDropDownLinks]
        ELSE [ServiceRequestFormLink]
    END AS [FinalData],
	[IsNonIRISService],
	[IsDropdownUI],
    [AboutService],
    [relatedinformation],   
    [ServiceCategories],
    [IsPrivate],
    [DataverseRowID],
    [isActive]
FROM [BSO].[Services] WITH (NOLOCK) WHERE [ID] = @ServiceID
END;

--EXEC BSO.GetLoggedInServicesByID @ServiceID = 1;

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetServiceGroupNRequestTypeDetails]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetServiceGroupNRequestTypeDetails] AS' 
END
GO

ALTER PROCEDURE [BSO].[GetServiceGroupNRequestTypeDetails]
    @ServiceID INT,
	@UserId INT
AS
BEGIN
    DECLARE @UserSubSegment NVARCHAR(MAX);
    SELECT @UserSubSegment = SubSegment
    FROM BSO.[User]
    WHERE Id = @UserId;

    SELECT S.ID,
           SG.ServiceGroupName,
           SG.ServiceGroupDescription,
           SG.ServiceGroupID,
           RT.RequestTypeName,
           RT.RequestTypeID
    FROM BSO.[Services] S
    INNER JOIN BSO.ServiceMapping SM ON S.ID = SM.ServiceID
    INNER JOIN BSO.ServiceGroup SG ON SG.ServiceGroupID = SM.ServiceGroupID
    INNER JOIN BSO.RequestType RT ON RT.RequestTypeID = SM.RequestTypeID
	AND SM.ServiceArea = (SELECT UserArea FROM BSO.[User] WHERE Id = @UserId)
    AND SM.ServiceRole = (SELECT UserRole FROM BSO.[User] WHERE Id = @UserId)
    AND SM.ServiceSegment = (SELECT Segment FROM BSO.[User] WHERE Id = @UserId)
    AND
	(
        SM.ServiceSubsegment = @UserSubSegment
        OR @UserSubSegment IS NULL
    )
	AND  S.IsActive = 1
    AND RT.IsActive = 1
    AND SG.IsActive = 1
    WHERE S.ID = @ServiceID;
END;

--EXEC BSO.GetServiceGroupNRequestTypeDetails 1,47
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetUserById]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetUserById] AS' 
END
GO

ALTER PROCEDURE [BSO].[GetUserById]
    @UserId INT
AS
BEGIN

    SELECT U.*, M.UserADGroupID
    FROM BSO.[User] U WITH (NOLOCK)
    JOIN BSO.[UserADGroupMapping] M ON U.Id = M.UserId
    WHERE U.Id = @UserId;

END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetUserByIdFromEmail]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetUserByIdFromEmail] AS' 
END
GO

ALTER PROCEDURE [BSO].[GetUserByIdFromEmail]
    @EmailId NVARCHAR(MAX),  
 @DefaultArea NVARCHAR(50) = 'DefaultArea',
 @DefaultRole NVARCHAR(50) = 'DefaultRole',
 @DefaultSegment NVARCHAR(50) = 'DefaultSegment',
 @DefaultSubSegment NVARCHAR(50) = 'DefaultSubSegment'
AS
BEGIN 
   SELECT TOP 1
    U.*,
	ISNULL(A.Name,  @DefaultArea) as UserArea,
    ISNULL(R.Name,  @DefaultRole) as UserRole,
    ISNULL(S.Name,  @DefaultSegment) as UserSegment,
    ISNULL(SS.Name, @DefaultSubSegment) as UserSubSegment
FROM
    [BSO].[User] U
LEFT JOIN
    [BSO].[Area] A ON U.UserArea = A.ID
LEFT JOIN
    [BSO].[Role] R ON U.UserRole = R.ID
LEFT JOIN
    [BSO].[Segment] S ON U.Segment = S.ID
LEFT JOIN
    [BSO].[SubSegment] SS ON U.SubSegment = SS.ID	
    WHERE
       U.UPN = @EmailId;
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetUserByIdFromEmailDetails]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetUserByIdFromEmailDetails] AS' 
END
GO

ALTER PROCEDURE [BSO].[GetUserByIdFromEmailDetails]
 @EmailId NVARCHAR(MAX),  
 @DefaultArea NVARCHAR(50) = 'DefaultArea',
 @DefaultRole NVARCHAR(50) = 'DefaultRole',
 @DefaultSegment NVARCHAR(50) = 'DefaultSegment',
 @DefaultSubSegment NVARCHAR(50) = 'DefaultSubSegment'
AS
BEGIN 
  SELECT TOP 1
     U.Id
      ,U.UPN
      ,U.UserArea
      ,U.UserRole
     -- ,U.UserADGroupID
      ,U.Segment
      ,U.SubSegment
      ,U.DataverseRowID
      ,U.IsActive
      ,U.Oid,
	ISNULL(A.Name,  @DefaultArea) as UserAreaName,
    ISNULL(R.Name,  @DefaultRole) as UserRoleName,
    ISNULL(S.Name,  @DefaultSegment) as UserSegmentName,
    ISNULL(SS.Name, @DefaultSubSegment) as UserSubSegmentName
FROM
    [BSO].[User] U
LEFT JOIN
    [BSO].[Area] A ON U.UserArea = A.ID
LEFT JOIN
    [BSO].[Role] R ON U.UserRole = R.ID
LEFT JOIN
    [BSO].[Segment] S ON U.Segment = S.ID
LEFT JOIN
    [BSO].[SubSegment] SS ON U.SubSegment = SS.ID	
    WHERE
       U.UPN = @EmailId;
END;
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetUserByIdFromEmailDetailsTest]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetUserByIdFromEmailDetailsTest] AS' 
END
GO
ALTER PROCEDURE [BSO].[GetUserByIdFromEmailDetailsTest]
 @EmailId NVARCHAR(MAX),  
 @DefaultArea NVARCHAR(50) = 'DefaultArea',
 @DefaultRole NVARCHAR(50) = 'DefaultRole',
 @DefaultSegment NVARCHAR(50) = 'DefaultSegment',
 @DefaultSubSegment NVARCHAR(50) = 'DefaultSubSegment'
AS
BEGIN 
   SELECT TOP 1
     U.Id
      ,U.UPN
      ,U.UserArea
      ,U.UserRole
     -- ,U.UserADGroupID
      ,U.Segment
      ,U.SubSegment
      ,U.DataverseRowID
      ,U.IsActive
      ,U.Oid,
   ISNULL(A.Name,  @DefaultArea) as UserAreaName,
    ISNULL(R.Name,  @DefaultRole) as UserRoleName,
    ISNULL(S.Name,  @DefaultSegment) as UserSegmentName,
    ISNULL(SS.Name, @DefaultSubSegment) as UserSubSegmentName
FROM
    [BSO].[User] U
LEFT JOIN
    [BSO].[Area] A ON U.UserArea = A.ID
LEFT JOIN
    [BSO].[Role] R ON U.UserRole = R.ID
LEFT JOIN
    [BSO].[Segment] S ON U.Segment = S.ID
LEFT JOIN
    [BSO].[SubSegment] SS ON U.SubSegment = SS.ID	
    WHERE
       U.UPN = @EmailId;
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetUserWorkSpacesByUserId]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetUserWorkSpacesByUserId] AS' 
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[GetUserWorkSpacesByUserIdTest]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[GetUserWorkSpacesByUserIdTest] AS' 
END
GO
ALTER PROCEDURE [BSO].[GetUserWorkSpacesByUserIdTest]
    @UserId INT
AS
BEGIN
    SELECT
        uws.Id,
        uws.UserID,
        uws.ServiceID,
     
        s.IRIS_Utterance,
        s.Name,
        s.AboutService,
        s.DataverseRowID,
        s.IsActive AS Service_IsActive,
        s.IsDropdownUI AS Service_IsDropdownUI,
        s.IsNonIRISService AS Service_IsNonIRISService,
        s.IsPrivate AS Service_IsPrivate,
        s.ServiceDropDownLinks,
        s.ServiceRequestFormLink,
        s.RelatedInformation,
        s.ServiceCategories,
        CASE WHEN LOWER(s.ServiceCategories) LIKE '%width%' THEN 1 ELSE 0 END AS Service_IsLarge
        --u.Id AS User_Id
        -- Include other user-related properties as needed
    FROM
        [BSO].[UserWorkSpaceServices] uws
    --INNER JOIN
    --    [BSO].[User] u ON u.Id = uws.UserID
    INNER JOIN
        [BSO].[Services] s ON s.Id = uws.ServiceID
    WHERE
        uws.UserID = @UserId
        ORDER BY s.[Name]
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[InActiveUserWorkSpaceByPreference]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[InActiveUserWorkSpaceByPreference] AS' 
END
GO

ALTER PROCEDURE [BSO].[InActiveUserWorkSpaceByPreference]
@UserID INT
AS
BEGIN

UPDATE  [BSO].[UserWorkSpaceServices] SET IsActive = 0,
TransactionTime = GETDATE()
WHERE UserID = @UserID
END
GO






IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[MigrationService_DVtoMasterTable]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[MigrationService_DVtoMasterTable] AS' 
END
GO
ALTER PROCEDURE [BSO].[MigrationService_DVtoMasterTable]
@ADFPipeline NVARCHAR(50) = 'ADF Pipeline',
@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN

-- Create a table to store the OUTPUT results
DECLARE  @merge_output TABLE( action NVARCHAR(10), ID NVARCHAR(50) );

DECLARE @TableRowAction nvarchar(100);

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
			tgt.ModifiedBy=@ADFPipeline,
			tgt.CreatedBy=@ADFPipeline,
			tgt.CreatedDate=src.modifiedon,
			tgt.IsActive = src.statecode

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, DataverseRowID,IsActive,ModifiedDate,ModifiedBy,CreatedDate,CreatedBy) 
			VALUES (src.role_name,src.role_id, src.statecode,src.modifiedon, @ADFPipeline,src.modifiedon, @ADFPipeline)

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

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[MigrationService_DVtoSTGServiceNameTable]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[MigrationService_DVtoSTGServiceNameTable] AS' 
END
GO
ALTER PROCEDURE [BSO].[MigrationService_DVtoSTGServiceNameTable]

@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,
@ADFPipeline NVARCHAR(50) = 'ADF Pipeline',

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN

BEGIN TRY

IF @SCAN_Type = 'FULL_SCAN'
BEGIN

--Update STG_Services 
BEGIN
	MERGE BSO.STG_Services AS tgt
		USING BSO.DV_ServiceNames AS src
		ON UPPER(src.servicename_id) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.Name = src.servicename,
				tgt.IRIS_Utterance = src.irisutterance, 	
				tgt.AboutService = src.servicedescription ,
				tgt.relatedinformation= src.relatedinformation ,
				tgt.IsNonIRISService= src.isnonirisservice ,
				tgt.IsDropdownUI= src.needdropdown ,
				tgt.ServiceDropDownLinks= src.dropdownvalues ,
				--tgt.ServiceCategories= src. ,
				--tgt.ServiceAzureADGroup= src. ,
				tgt.IsSecuredByAzureADGroup= COALESCE(src.isidwebservicegroup ,0),
				tgt.ModifiedDate= src.modifiedon ,
				tgt.CreatedDate= src.modifiedon ,
				tgt.CreatedBy= @ADFPipeline,
				tgt.ModifiedBy= @ADFPipeline,
				tgt.IsActive = src.statecode,
				tgt.IDWEBGroup_DataverseRowID= src.idwebgroup

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, 
			IRIS_Utterance,
			AboutService,
			relatedinformation,
			IsNonIRISService,
			IsDropdownUI,
			ServiceDropDownLinks,
			DataverseRowID,
			IsSecuredByAzureADGroup,
			ModifiedDate,
			ModifiedBy,
			CreatedDate,
			CreatedBy,
			IsActive,
			IDWEBGroup_DataverseRowID) 
			VALUES (src.servicename, 
			src.irisutterance, 
			src.servicedescription,
			src.relatedinformation, 
			src.isnonirisservice,
			src.needdropdown, 
			src.dropdownvalues,
			src.servicename_id, 
			COALESCE(src.isidwebservicegroup ,0),
			 src.modifiedon, 
			 @ADFPipeline,
			 src.modifiedon,
			 @ADFPipeline,
			src.statecode,
			 src.idwebgroup
			);
END
--Update STG_ServiceID WEBGroup 
BEGIN
MERGE BSO.STG_ServiceIDWebGroup AS tgt
		USING BSO.DV_ServiceIDWebGroup  AS src
		ON UPPER(src.groupID) = UPPER(tgt.Group_ID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.Name = src.name,
				tgt.IDWebGroup_ID = src.idwebGroup_id, 	
				tgt.Group_ID = src.groupID 

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, 
			IDWebGroup_ID,
			Group_ID,
			statecode
			) 
			VALUES (src.name, 
			src.idwebGroup_id, 
			src.groupID,
			1
			);
END
--Update STG_Service IDWEBGroup ID
BEGIN
MERGE BSO.STG_Services AS tgt
		USING  (Select STGIDWEB.ID ServiceWEBGroup_ID , 
		STGS.ID STG_Service_ID
		from BSO.STG_ServiceIDWebGroup  STGIDWEB
		INNER JOIN BSO.STG_Services STGS
		ON UPPER(STGS.IDWEBGroup_DataverseRowID) = UPPER(STGIDWEB.IDWebGroup_ID)
		) AS src
		ON UPPER(src.STG_Service_ID) = UPPER(tgt.ID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.ServiceAzureADGroup = src.ServiceWEBGroup_ID;

END		


BEGIN
	select * from [BSO].STG_ServiceOwner
		--Update STG_ServiceOwner  
	MERGE BSO.STG_ServiceOwner AS tgt
		USING  (Select DISTINCT DSW.* , 
		DS.statecode Service_statecode
		from BSO.DV_ServiceOwners  DSW
		INNER JOIN BSO.DV_ServiceNames DS
		ON UPPER(DS.servicename_id) = UPPER(DSW.servicename_id)
		) AS src
		ON UPPER(src.serviceowner_id) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.UPN = src.primayemail,
				tgt.DisplayName = src.displayname, 	
				tgt.DataverseRowID = src.serviceowner_id ,
				tgt.IsActive=src.Service_statecode,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFPipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFPipeline

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (UPN, 
			DisplayName,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy
			) 
			VALUES (src.primayemail, 
			src.displayname, 
			src.Service_statecode,
			src.serviceowner_id,
			GETDATE(),
			GETDATE(),
			@ADFPipeline,
			@ADFPipeline
			);
END

BEGIN
--Update STG_ServiceOwnerServices
MERGE BSO.STG_ServiceOwnerServices AS tgt
		USING  DV_ServiceOwners AS src
		ON UPPER(src.serviceowner_id) = UPPER(tgt.ServiceOwner_DataverseRowID)
		AND UPPER(src.servicename_id) = UPPER(tgt.Service_DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.Service_DataverseRowID = src.servicename_id,
				tgt.ServiceOwner_DataverseRowID = src.serviceowner_id

		WHEN NOT MATCHED BY TARGET THEN
			INSERT (Service_DataverseRowID, 
			ServiceOwner_DataverseRowID
			) 
			VALUES (src.servicename_id, 
			src.serviceowner_id
			);

END

BEGIN

	--Update STG_ServiceGroup  
	MERGE BSO.STG_ServiceGroup AS tgt
		USING  (
		SELECT DSG.* ,
		STGS.ID Service_ID
		FROM BSO.DV_ServiceGroups DSG
		LEFT JOIN BSO.STG_Services STGS
		ON STGS.DataverseRowID= DSG.servicename_mapping_id
		
		) AS src
		ON UPPER(src.service_groupid) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.ServiceGroupName = src.service_group_name,
				tgt.ServiceGroupDescription = src.service_groupdescription, 	
				tgt.IsActive=src.statecode,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFPipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFPipeline,
				ServiceID= src.Service_ID,
				tgt.Service_DataverseRowID= src.servicename_mapping_id

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (ServiceGroupName, 
			ServiceGroupDescription,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy,
			ServiceID,
			Service_DataverseRowID
			) 
			VALUES (src.service_group_name, 
			src.service_groupdescription, 
			src.statecode,
			src.service_groupid,
			GETDATE(),
			GETDATE(),
			@ADFPipeline,
			@ADFPipeline,
			src.Service_ID,
			src.servicename_mapping_id
			);

END

BEGIN
--Update STG_RequestType  
	MERGE BSO.STG_RequestType AS tgt
		USING  (
		SELECT DRT.* ,
		STGSG.ServiceGroupID ServiceGroup_ID
		FROM BSO.DV_RequestTypes DRT
		LEFT JOIN BSO.STG_ServiceGroup STGSG
		ON STGSG.DataverseRowID= DRT.servicegroup_mapping_id
		
		) AS src
		ON UPPER(src.service_request_typeid) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.RequestTypeName = src.service_request_type_name,	
				tgt.IsActive=src.statecode,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFPipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFPipeline,
				ServiceGroupID= src.ServiceGroup_ID,
				ServiceGroup_DataverseRowID=src.servicegroup_mapping_id

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (RequestTypeName, 
			ServiceGroupID,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy,
			ServiceGroup_DataverseRowID
			) 
			VALUES (src.service_request_type_name, 
			src.ServiceGroup_ID, 
			src.statecode,
			src.service_request_typeid,
			GETDATE(),
			GETDATE(),
			@ADFPipeline,
			@ADFPipeline,
			servicegroup_mapping_id
			);

END

BEGIN

--Update STG_ServiceMapping  
	MERGE BSO.STG_ServiceMapping AS tgt
		USING  (
		
		SELECT 
		STGSrv.DataverseRowID ServiceName_id,
		SRG.service_groupid,
		SRT.service_request_typeid,
		SR.service_requestid,
		STGSrv.ID Service_ID,
		SR.service_request_name,
		SR.service_request_isdeleted
		,SR.statecode
		,SrvGroup.ServiceGroupID
		,SrvReqType.RequestTypeID
		,Area.ID AreaID
		,Role.ID RoleID
		,Segment.ID SegmentID
		,SubSegment.ID SubSegmentID
		,SR_Map.ServiceFormLink


		FROM BSO.DV_ServiceRequest SR
		INNER JOIN BSO.STG_Services STGSrv
		ON UPPER(STGSrv.DataverseRowID)= UPPER(SR.service_request_servicename)

		INNER JOIN BSO.DV_ServiceGroups SRG
		ON UPPER(SRG.service_groupid)= UPPER(SR.service_request_servicegroup)
		INNER JOIN BSO.STG_ServiceGroup SrvGroup
		ON UPPER(SrvGroup.DataverseRowID)=UPPER(SRG.service_groupid)

		INNER JOIN BSO.DV_RequestTypes SRT
		ON UPPER(SRT.service_request_typeid)= UPPER(SR.service_request_requesttype)
		INNER JOIN BSO.STG_RequestType SrvReqType
		ON UPPER(SrvReqType.DataverseRowID)=UPPER(SRT.service_request_typeid)

		INNER JOIN BSO.DV_ServiceMapping SR_Map
		ON UPPER(SR_Map.ServiceRequest_ID) = UPPER(SR.service_requestid)

		INNER JOIN BSO.DV_ServiceMapping_Area SR_A
		ON UPPER(SR_A.service_request_mapping_id)= UPPER(SR_Map.ServiceMapping_ID)
		INNER JOIN BSO.Area Area
		ON UPPER(Area.DataverseRowID)=UPPER(SR_A.areaid)
		AND Area.isActive =1

		INNER JOIN BSO.DV_ServiceMapping_Role SR_R
		ON UPPER(SR_R.service_request_mapping_id)= UPPER(SR_Map.ServiceMapping_ID)
		INNER JOIN BSO.Role Role
		ON UPPER(Role.DataverseRowID) = UPPER(SR_R.role_id)
		AND Role.isActive =1

		INNER JOIN BSO.DV_ServiceMapping_Segment SR_S
		ON UPPER(SR_S.service_request_mapping_id)= UPPER(SR_Map.ServiceMapping_ID)
		INNER JOIN BSO.Segment Segment
		ON UPPER(Segment.DataverseRowID)=UPPER(SR_S.segmentsid)
		AND Segment.isActive =1

		INNER JOIN BSO.DV_SubSegment_Segment SubSeg_Seg
		ON UPPER(SubSeg_Seg.segments_id) = UPPER(SR_S.segmentsid)
		INNER JOIN BSO.DV_SubSegment SR_SubSeg
		ON UPPER(SR_SubSeg.subsegments_id)= UPPER(SubSeg_Seg.subsegments_id)
		INNER JOIN BSO.SubSegment SubSegment
		ON UPPER(SubSegment.DataverseRowID)=UPPER(SubSeg_Seg.subsegments_id)
		AND Segment.ID= SubSegment.Segment
		AND SubSegment.isActive =1


		
		) AS src

		ON src.Service_ID = tgt.ServiceID
		AND src.AreaID = tgt.ServiceArea
		AND src.RoleID = tgt.ServiceRole
		AND src.SegmentID= tgt.ServiceSegment
		AND src.SubSegmentID= tgt.ServiceSubsegment
		AND src.RequestTypeID= tgt.RequestTypeID
		AND src.ServiceGroupID= tgt.ServiceGroupID

		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.ServiceRequestFormLink = src.ServiceFormLink,	
				tgt.IsActive=src.statecode,
				tgt.Service_DataverseRowID=src.ServiceName_id,
				tgt.ServiceGroup_DataverseRowID=src.service_groupid,
				tgt.RequestType_DataverseRowID=src.service_request_typeid

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (ServiceID, 
			ServiceArea,
			ServiceRole,
			ServiceSegment,
			ServiceSubsegment,
			DataverseRowID,
			RequestTypeID,
			ServiceGroupID,
			IsActive,
			ServiceRequestFormLink,
			Service_DataverseRowID,
			ServiceGroup_DataverseRowID,
			RequestType_DataverseRowID
			) 
			VALUES (src.Service_ID, 
			src.AreaID,
			src.RoleID,
			src.SegmentID,
			src.SubSegmentID,
			src.service_requestid,
			src.RequestTypeID,
			src.ServiceGroupID,
			src.statecode,
			src.ServiceFormLink,
			src.ServiceName_id,
			src.service_groupid,
			src.service_request_typeid
			)
		WHEN NOT MATCHED BY SOURCE THEN
		DELETE;
END

END


END TRY
BEGIN CATCH


 -- Get error information
    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
    DECLARE @ErrorState INT = ERROR_STATE();


END CATCH;

END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[MigrationService_DVtoSTGServiceNameTable_MERGE]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[MigrationService_DVtoSTGServiceNameTable_MERGE] AS' 
END
GO

ALTER PROCEDURE [BSO].[MigrationService_DVtoSTGServiceNameTable_MERGE]

@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
BEGIN TRY

IF @SCAN_Type = 'FULL_SCAN'
BEGIN


--Update STG_Services 
BEGIN
	EXEC [BSO].STG_ServicesMerge
END
--Update STG_ServiceID WEBGroup 
BEGIN
	EXEC [BSO].STG_ServiceIDWebGroupMerge
END
--Update STG_Service IDWEBGroup ID
BEGIN

	EXEC [BSO].STG_ServiceMergeSecond

END		
BEGIN
			--Update STG_ServiceOwner  
	EXEC [BSO].STG_ServiceOwnerMerge
END
BEGIN
--Update STG_ServiceOwnerServices
 	EXEC [BSO].STG_ServiceOwnerServicesMerge

END
BEGIN
	--Update STG_ServiceGroup  
	
	EXEC [BSO].STG_ServiceGroupMerge

END
BEGIN
--Update STG_RequestType  
	
	EXEC [BSO].STG_RequestTypeMerge

END
BEGIN
--Update STG_ServiceMapping  

	EXEC [BSO].STG_ServiceMappingMerge	
END
END

END TRY
BEGIN CATCH
 -- Get error information
    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
    DECLARE @ErrorState INT = ERROR_STATE();
END CATCH;
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[MigrationService_STGtoServiceTable]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[MigrationService_STGtoServiceTable] AS' 
END
GO
ALTER PROCEDURE [BSO].[MigrationService_STGtoServiceTable]

@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@ADFPipeline NVARCHAR(50) = 'ADF Pipeline',
@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN

BEGIN TRY

IF @SCAN_Type = 'FULL_SCAN'
BEGIN

--Update Services 

	MERGE BSO.Services AS tgt
		USING BSO.STG_Services AS src
		ON UPPER(src.DataverseRowID) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.Name = src.Name,
				tgt.IRIS_Utterance = src.IRIS_Utterance, 	
				tgt.AboutService = src.AboutService ,
				tgt.relatedinformation= src.relatedinformation ,
				tgt.IsNonIRISService= src.IsNonIRISService ,
				tgt.IsDropdownUI= src.IsDropdownUI ,
				tgt.ServiceDropDownLinks= src.ServiceDropDownLinks ,
				--tgt.ServiceCategories= src. ,
				--tgt.ServiceAzureADGroup= src. ,
				tgt.IsSecuredByAzureADGroup= COALESCE(src.IsSecuredByAzureADGroup ,0),
				tgt.ModifiedDate= src.ModifiedDate ,
				tgt.CreatedDate= src.CreatedDate ,
				tgt.CreatedBy= src.CreatedBy ,
				tgt.ModifiedBy= src.ModifiedBy ,
				tgt.IsActive = src.IsActive,
				tgt.IDWEBGroup_DataverseRowID=src.IDWEBGroup_DataverseRowID

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, 
			IRIS_Utterance,
			AboutService,
			relatedinformation,
			IsNonIRISService,
			IsDropdownUI,
			ServiceDropDownLinks,
			DataverseRowID,
			IsSecuredByAzureADGroup,
			ModifiedDate,
			ModifiedBy,
			CreatedDate,
			CreatedBy,
			IsActive,
			IDWEBGroup_DataverseRowID) 
			VALUES (src.name, 
			src.IRIS_Utterance, 
			src.AboutService,
			src.relatedinformation, 
			src.IsNonIRISService,
			src.IsDropdownUI, 
			src.ServiceDropDownLinks,
			src.DataverseRowID, 
			COALESCE(src.IsSecuredByAzureADGroup ,0),
			 src.ModifiedDate, 
			 src.ModifiedBy,
			 src.CreatedDate,
			 src.CreatedBy,
			src.IsActive,
			src.IDWEBGroup_DataverseRowID
			);

--Update UserADGroup WEBGroup 
MERGE BSO.UserADGroup AS tgt
		USING  STG_ServiceIDWebGroup AS src
		ON UPPER(src.IDWebGroup_ID) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.Name = src.name,
				tgt.DataverseRowID = src.IDWebGroup_ID, 	
				tgt.GroupID = src.Group_ID 

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, 
			DataverseRowID,
			GroupID,
			IsActive
			) 
			VALUES (src.name, 
			src.idwebGroup_id, 
			src.Group_ID,
			1
			);

--Update Service IDWEBGroup ID
MERGE BSO.Services AS tgt
		USING  (Select SIDWEB.ID ServiceWEBGroup_ID , 
		SERV.ID Service_ID
		from BSO.UserADGroup  SIDWEB
		INNER JOIN BSO.Services SERV
		ON UPPER(SERV.IDWEBGroup_DataverseRowID) = UPPER(SIDWEB.DataverseRowID)
		) AS src
		ON UPPER(src.Service_ID) = UPPER(tgt.ID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.ServiceAzureADGroup = src.ServiceWEBGroup_ID;

--select * from [BSO].ServiceOwner
	--Update STG_ServiceOwner  
	MERGE BSO.ServiceOwner AS tgt
		USING STG_ServiceOwner AS src
		ON UPPER(src.DataverseRowID) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.UPN = src.UPN,
				tgt.DisplayName = src.DisplayName, 	
				tgt.DataverseRowID = src.DataverseRowID ,
				tgt.IsActive=src.IsActive,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFPipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFPipeline

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (UPN, 
			DisplayName,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy
			) 
			VALUES (src.UPN, 
			src.DisplayName, 
			src.IsActive,
			src.DataverseRowID,
			GETDATE(),
			GETDATE(),
			@ADFPipeline,
			@ADFPipeline
			);

--Update STG_ServiceOwnerServices
MERGE BSO.ServiceOwnerServices AS tgt
		USING  ( Select 
		STG_SOS.ServiceOwner_DataverseRowID,
		STG_SOS.Service_DataverseRowID,
		SOW.ID SrvOwnerID,
		S.ID ServiceID
		
		FROM BSO.STG_ServiceOwnerServices STG_SOS
		INNER JOIN BSO.ServiceOwner SOW
		ON UPPER(SOW.DataverseRowID) = UPPER(STG_SOS.ServiceOwner_DataverseRowID)
		INNER JOIN BSO.Services S
		ON UPPER(S.DataverseRowID) = UPPER(STG_SOS.Service_DataverseRowID)
		
		)AS src
		ON UPPER(src.ServiceOwner_DataverseRowID) = UPPER(tgt.ServiceOwner_DataverseRowID)
		AND UPPER(src.Service_DataverseRowID) = UPPER(tgt.Service_DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.Service_DataverseRowID = src.Service_DataverseRowID,
				tgt.ServiceOwner_DataverseRowID = src.ServiceOwner_DataverseRowID,
				tgt.ServiceID = src.ServiceID,
				tgt.ServiceOwnerID = src.SrvOwnerID

		WHEN NOT MATCHED BY TARGET THEN
			INSERT (Service_DataverseRowID, 
			ServiceOwner_DataverseRowID,
			ServiceID,
			ServiceOwnerID
			) 
			VALUES (src.Service_DataverseRowID, 
			src.ServiceOwner_DataverseRowID,
			ServiceID,
			SrvOwnerID
			);



	--Update ServiceGroup  
	MERGE BSO.ServiceGroup AS tgt
		USING  (
		SELECT STG_SrvGrp.* ,
		SRV.ID Service_ID
		FROM BSO.STG_ServiceGroup STG_SrvGrp
		INNER JOIN BSO.Services SRV
		ON SRV.DataverseRowID= STG_SrvGrp.Service_DataverseRowID
		
		) AS src
		ON UPPER(src.DataverseRowID) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.ServiceGroupName = src.ServiceGroupName,
				tgt.ServiceGroupDescription = src.ServiceGroupDescription, 	
				tgt.IsActive=src.IsActive,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFPipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFPipeline,
				ServiceID= src.Service_ID

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (ServiceGroupName, 
			ServiceGroupDescription,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy,
			ServiceID
			) 
			VALUES (src.ServiceGroupName, 
			src.ServiceGroupDescription, 
			src.IsActive,
			src.DataverseRowID,
			GETDATE(),
			GETDATE(),
			@ADFPipeline,
			@ADFPipeline,
			src.Service_ID
			);



--Update RequestType  
	MERGE BSO.RequestType AS tgt
		USING  (
		SELECT STG_RT.* ,
		SG.ServiceGroupID ServiceGroup_ID
		FROM BSO.STG_RequestType STG_RT
		INNER JOIN BSO.ServiceGroup SG
		ON SG.DataverseRowID= STG_RT.ServiceGroup_DataverseRowID
		
		) AS src
		ON UPPER(src.DataverseRowID) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.RequestTypeName = src.RequestTypeName,	
				tgt.IsActive=src.IsActive,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFPipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFPipeline,
				ServiceGroupID= src.ServiceGroup_ID

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (RequestTypeName, 
			ServiceGroupID,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy
			) 
			VALUES (src.RequestTypeName, 
			src.ServiceGroup_ID, 
			src.IsActive,
			src.DataverseRowID,
			GETDATE(),
			GETDATE(),
			@ADFPipeline,
			@ADFPipeline
			);



--Update STG_ServiceMapping  
	MERGE BSO.ServiceMapping AS tgt
		USING  (
		
		SELECT 

		SSrv.ID Service_ID
		,STGSrvMap.IsActive
		,SrvGroup.ServiceGroupID
		,SrvReqType.RequestTypeID
		,STGSrvMap.ServiceArea AreaID
		,STGSrvMap.ServiceRole RoleID
		,STGSrvMap.ServiceSegment SegmentID
		,STGSrvMap.ServiceSubsegment SubSegmentID
		,STGSrvMap.ServiceRequestFormLink ServiceRequestFormLink
		,STGSrvMap.DataverseRowID ServiceMappingID


		FROM BSO.STG_ServiceMapping STGSrvMap
		INNER JOIN BSO.Services SSrv
		ON UPPER(SSrv.DataverseRowID)= UPPER(STGSrvMap.Service_DataverseRowID)


		INNER JOIN BSO.ServiceGroup SrvGroup
		ON UPPER(SrvGroup.DataverseRowID)=UPPER(STGSrvMap.ServiceGroup_DataverseRowID)


		INNER JOIN BSO.RequestType SrvReqType
		ON UPPER(SrvReqType.DataverseRowID)=UPPER(STGSrvMap.RequestType_DataverseRowID)

		
		
		) AS src

		ON src.Service_ID = tgt.ServiceID
		AND src.AreaID = tgt.ServiceArea
		AND src.RoleID = tgt.ServiceRole
		AND src.SegmentID= tgt.ServiceSegment
		AND src.SubSegmentID= tgt.ServiceSubsegment
		AND src.RequestTypeID= tgt.RequestTypeID
		AND src.ServiceGroupID= tgt.ServiceGroupID

		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.ServiceRequestFormLink = src.ServiceRequestFormLink,	
				tgt.IsActive=src.IsActive,
				tgt.DataverseRowID=src.ServiceMappingID

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (ServiceID, 
			ServiceArea,
			ServiceRole,
			ServiceSegment,
			ServiceSubsegment,
			DataverseRowID,
			RequestTypeID,
			ServiceGroupID,
			IsActive,
			ServiceRequestFormLink
			) 
			VALUES (src.Service_ID, 
			src.AreaID,
			src.RoleID,
			src.SegmentID,
			src.SubSegmentID,
			src.ServiceMappingID,
			src.RequestTypeID,
			src.ServiceGroupID,
			src.IsActive,
			src.ServiceRequestFormLink
			)
		WHEN NOT MATCHED BY SOURCE THEN
		DELETE;


END


END TRY
BEGIN CATCH


 -- Get error information
    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
    DECLARE @ErrorState INT = ERROR_STATE();


END CATCH;

END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[MigrationService_STGtoServiceTable_MERGE]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[MigrationService_STGtoServiceTable_MERGE] AS' 
END
GO
ALTER PROCEDURE [BSO].[MigrationService_STGtoServiceTable_MERGE]

@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN

BEGIN TRY

IF @SCAN_Type = 'FULL_SCAN'
BEGIN

--Update Services 

	EXEC [BSO].STG_Services_MService_STGtoService

--Update UserADGroup WEBGroup 
	EXEC [BSO].STG_UserADGroup_MService_STGtoService

--Update Service IDWEBGroup ID
	EXEC [BSO].STG_ServicesSecond_MService_STGtoService


	--Update STG_ServiceOwner  
EXEC [BSO].STG_ServiceOwner_MService_STGtoService

--Update STG_ServiceOwnerServices
EXEC [BSO].STG_ServiceOwnerServices_MService_STGtoService



	--Update ServiceGroup  
EXEC [BSO].STG_ServiceGroup_MService_STGtoService



--Update RequestType  
	EXEC [BSO].STG_RequestType_MService_STGtoService



--Update STG_ServiceMapping  
	EXEC [BSO].STG_ServiceMapping_MService_STGtoService


END


END TRY
BEGIN CATCH


 -- Get error information
    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
    DECLARE @ErrorState INT = ERROR_STATE();


END CATCH;

END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[SPAddFeedback]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[SPAddFeedback] AS' 
END
GO
ALTER PROCEDURE [BSO].[SPAddFeedback]
    @UserID INT,
    @SatisfactionLevel VARCHAR(20),
    @PleaseTellUs NVARCHAR(MAX) = NULL,
    @ScreenshotURL NVARCHAR(MAX) = NULL,
    @Email NVARCHAR(MAX) = NULL,
    @Id INT OUTPUT
AS
BEGIN
    DECLARE @SatisfactionID INT;
    BEGIN TRY
 
        SELECT @SatisfactionID = SatisfactionID
        FROM [BSO].FeedbackSatisfaction
        WHERE SatisfactionLevel = @SatisfactionLevel;
   
        OPEN SYMMETRIC KEY CreditCards_Key11
            DECRYPTION BY CERTIFICATE Sales09;
   
        DECLARE @EncryptedEmail VARBINARY(MAX);
        SET @EncryptedEmail = ENCRYPTBYKEY(KEY_GUID('CreditCards_Key11'), @Email);
        INSERT INTO [BSO].GiveUsFeedback (UserID, SatisfactionID, PleaseTellUs, ScreenshotURL, EncryptedEmail)
        VALUES (@UserID, @SatisfactionID, @PleaseTellUs, @ScreenshotURL, @EncryptedEmail);   
        SET @Id = @@ROWCOUNT;
       
        CLOSE SYMMETRIC KEY CreditCards_Key11;
    
        IF @Id = 0
        BEGIN
            SET @Id = -1;
        END
    END TRY
    BEGIN CATCH
        -- Handle errors here, e.g., log the error message
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
       DECLARE @error NVARCHAR(50) = 'Error: ';
        PRINT @error + @ErrorMessage;
        -- You may want to re-throw the error or perform other actions as needed
    END CATCH
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_GetServiceGroupIDBySeviceGroupName]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_GetServiceGroupIDBySeviceGroupName] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_GetServiceGroupIDBySeviceGroupName]
    @ServiceDataVerseId NVARCHAR(200)
AS
BEGIN
    SELECT ServiceGroupID
    FROM BSO.STG_ServiceGroup
    WHERE DataverseRowID = @ServiceDataVerseId;
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_GetServiceIDByDataVerseID]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_GetServiceIDByDataVerseID] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_GetServiceIDByDataVerseID]
    @GetServiceIDFromTable nvarchar(500)
AS
BEGIN
    SELECT ID
    FROM BSO.STG_Services WITH(NOLOCK)
    WHERE DataverseRowID = @GetServiceIDFromTable;
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_InsertOwnerInfo]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_InsertOwnerInfo] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_InsertOwnerInfo]
    @UPN NVARCHAR(255),
    @DisplayName NVARCHAR(255),
    @IsActive BIT,
    @DataverseRowID UNIQUEIDENTIFIER,
    @CreatedDate DATETIME,
    @ModifiedDate DATETIME,
    @CreatedBy NVARCHAR(255),
    @ModifiedBy NVARCHAR(255),
    @ServiceID INT,
	@Id INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
	DECLARE @InsertID TABLE (ID INT)
    IF EXISTS (SELECT 1 FROM [BSO].[STG_ServiceOwner] WHERE UPN = @UPN)
    BEGIN
	        UPDATE [BSO].[STG_ServiceOwner]
            SET
            [DisplayName] = @DisplayName,
            [IsActive] = @IsActive,
            [DataverseRowID] = @DataverseRowID,
            [ModifiedDate] = @ModifiedDate,
            [ModifiedBy] = @ModifiedBy
            WHERE
            [UPN] = @UPN;

        SET @Id = (SELECT ID FROM [BSO].[STG_ServiceOwner] WHERE UPN = @UPN);

	END
	ELSE
	BEGIN
        INSERT INTO [BSO].[STG_ServiceOwner]
        (      
            [UPN],
            [DisplayName],
            [IsActive],
            [DataverseRowID],
            [CreatedDate],
            [ModifiedDate],
            [CreatedBy],
            [ModifiedBy]
        )
		OUTPUT INSERTED.ID INTO @InsertID
        VALUES
        (
            @UPN,
            @DisplayName,
            @IsActive,
            @DataverseRowID,
            @CreatedDate,
            @ModifiedDate,
            @CreatedBy,
            @ModifiedBy
        );

		INSERT INTO [BSO].[STG_ServiceOwnerServices] (ServiceID, ServiceOwnerID)
		VALUES(@ServiceID, (SELECT ID FROM @InsertID))

		SET @Id = SCOPE_IDENTITY();

        IF @Id = 0
        BEGIN
            SET @Id = -1;
        END
    END
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_InsertRequestTypeDetails]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_InsertRequestTypeDetails] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_InsertRequestTypeDetails]
    @InsertRequestType BSO.STG_InsertRequestTypeTempTable READONLY,
    @ServiceGroupID INT
AS
BEGIN

    MERGE INTO BSO.STG_RequestType AS Target
    USING @InsertRequestType AS Source
    ON Target.DataverseRowID = Source.DataverseRowID -- Assuming DataverseRowID is the unique identifier

    WHEN MATCHED THEN
        UPDATE SET
            Target.RequestTypeName = Source.RequestTypeName,
            Target.CreatedDate = Source.CreatedDate,
            Target.ModifiedDate = Source.ModifiedDate,
            Target.CreatedBy = Source.CreatedBy,
            Target.ModifiedBy = Source.ModifiedBy,
            Target.ServiceGroupID = @ServiceGroupID,
            Target.IsActive = 1

    WHEN NOT MATCHED THEN
        INSERT (DataverseRowID, RequestTypeName, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, ServiceGroupID, IsActive)
        VALUES (Source.DataverseRowID, Source.RequestTypeName, Source.CreatedDate, Source.ModifiedDate, Source.CreatedBy, Source.ModifiedBy, @ServiceGroupID, 1);

END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_InsertServiceGroup]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_InsertServiceGroup] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_InsertServiceGroup]
    @ServiceGroupName NVARCHAR(255),
    @ServiceGroupDescription NVARCHAR(MAX),  
    @CreatedBy NVARCHAR(255),
    @CreatedDate DATETIME,
	@ModifiedBy NVARCHAR(255),
    @ModifiedDate DATETIME,
	@ServiceIDDataVerse nvarchar(200)
AS
BEGIN
    INSERT INTO [BSO].STG_ServiceGroup (
        ServiceGroupName,
        ServiceGroupDescription,
        ServiceID,
        IsActive,
        CreatedBy,
        CreatedDate,
		ModifiedBy,
		ModifiedDate
    )
    VALUES (
        @ServiceGroupName,
        @ServiceGroupDescription,
        (SELECT ID from BSO.STG_Services WHERE DataverseRowID = @ServiceIDDataVerse),
        1,
        @CreatedBy,
        @CreatedDate,
		@ModifiedBy,
		@ModifiedDate
    );
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_InsertServiceGroupDetails]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_InsertServiceGroupDetails] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_InsertServiceGroupDetails]   
    @ServiceID INT,
    @ServiceGroupID INT,
	@Id INT OUTPUT,
	@statecode int  
AS
BEGIN
IF @statecode = 0
SET @statecode = 1
ELSE
BEGIN
SET @statecode = 0
ENd

UPDATE [BSO].STG_ServiceGroup SET IsActive = @statecode 
, ServiceID= @ServiceID WHERE
ServiceGroupID = @ServiceGroupID   

SET @Id = @ServiceGroupID

        IF @Id = 0
        BEGIN
            SET @Id = -1;
        END
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_InsertServiceGroupOtherDetailes]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_InsertServiceGroupOtherDetailes] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_InsertServiceGroupOtherDetailes]   
	@ServiceTableDataVerseID nvarchar(200),
	@ServiceGroupID INT
AS
BEGIN


  UPDATE [BSO].STG_ServiceGroup SET ServiceID =
  (Select ID from [BSO].STG_Services WHERE
 DataverseRowID = @ServiceTableDataVerseID ),
        IsActive = 1
		WHERE ServiceGroupID = @ServiceGroupID
       
   
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_RequestType_MService_STGtoService]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_RequestType_MService_STGtoService] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_RequestType_MService_STGtoService]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@Table_DV_ID NVARCHAR(50) = NULL,
@ADFPipeline NVARCHAR(50) = 'ADF Pipeline',
@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
	MERGE BSO.RequestType AS tgt
		USING  (
		SELECT STG_RT.* ,
		SG.ServiceGroupID ServiceGroup_ID
		FROM BSO.STG_RequestType STG_RT
		INNER JOIN BSO.ServiceGroup SG
		ON SG.DataverseRowID= STG_RT.ServiceGroup_DataverseRowID
		
		) AS src
		ON UPPER(src.DataverseRowID) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.RequestTypeName = src.RequestTypeName,	
				tgt.IsActive=src.IsActive,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFPipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFPipeline,
				ServiceGroupID= src.ServiceGroup_ID

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (RequestTypeName, 
			ServiceGroupID,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy
			) 
			VALUES (src.RequestTypeName, 
			src.ServiceGroup_ID, 
			src.IsActive,
			src.DataverseRowID,
			GETDATE(),
			GETDATE(),
			@ADFPipeline,
			@ADFPipeline
			)
		WHEN NOT MATCHED BY SOURCE THEN
		UPDATE SET tgt.IsActive=0;

END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_RequestTypeMerge]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_RequestTypeMerge] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_RequestTypeMerge]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,
@ADFPipeline NVARCHAR(50) = 'ADF Pipeline',
@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
MERGE BSO.STG_RequestType AS tgt
		USING  (
		SELECT DRT.* ,
		STGSG.ServiceGroupID ServiceGroup_ID
		FROM BSO.DV_RequestTypes DRT
		LEFT JOIN BSO.STG_ServiceGroup STGSG
		ON STGSG.DataverseRowID= DRT.servicegroup_mapping_id
		
		) AS src
		ON UPPER(src.service_request_typeid) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED  THEN --AND src.modifiedon > tgt.ModifiedDate
			UPDATE SET 
				tgt.RequestTypeName = src.service_request_type_name,	
				tgt.IsActive=src.statecode,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFPipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFPipeline,
				ServiceGroupID= src.ServiceGroup_ID,
				ServiceGroup_DataverseRowID=src.servicegroup_mapping_id

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (RequestTypeName, 
			ServiceGroupID,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy,
			ServiceGroup_DataverseRowID
			) 
			VALUES (src.service_request_type_name, 
			src.ServiceGroup_ID, 
			src.statecode,
			src.service_request_typeid,
			GETDATE(),
			GETDATE(),
			@ADFPipeline,
			@ADFPipeline,
			servicegroup_mapping_id
			);

END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceGroup_MService_STGtoService]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_ServiceGroup_MService_STGtoService] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_ServiceGroup_MService_STGtoService]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@Table_DV_ID NVARCHAR(50) = NULL,
@ADFPipeline NVARCHAR(50) = 'ADF Pipeline',
@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
	MERGE BSO.ServiceGroup AS tgt
		USING  (
		SELECT STG_SrvGrp.* ,
		SRV.ID Service_ID
		FROM BSO.STG_ServiceGroup STG_SrvGrp
		INNER JOIN BSO.Services SRV
		ON SRV.DataverseRowID= STG_SrvGrp.Service_DataverseRowID
		
		) AS src
		ON UPPER(src.DataverseRowID) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.ServiceGroupName = src.ServiceGroupName,
				tgt.ServiceGroupDescription = src.ServiceGroupDescription, 	
				tgt.IsActive=src.IsActive,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFPipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFPipeline,
				ServiceID= src.Service_ID

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (ServiceGroupName, 
			ServiceGroupDescription,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy,
			ServiceID
			) 
			VALUES (src.ServiceGroupName, 
			src.ServiceGroupDescription, 
			src.IsActive,
			src.DataverseRowID,
			GETDATE(),
			GETDATE(),
			@ADFPipeline,
			@ADFPipeline,
			src.Service_ID
			)
		WHEN NOT MATCHED BY SOURCE THEN
		UPDATE SET tgt.IsActive=0;

END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceGroupMerge]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_ServiceGroupMerge] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_ServiceGroupMerge]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,
@ADFPipeline NVARCHAR(50) = 'ADF Pipeline',
@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
MERGE BSO.STG_ServiceGroup AS tgt
		USING  (
		SELECT DSG.* ,
		STGS.ID Service_ID
		FROM BSO.DV_ServiceGroups DSG
		LEFT JOIN BSO.STG_Services STGS
		ON STGS.DataverseRowID= DSG.servicename_mapping_id
		
		) AS src
		ON UPPER(src.service_groupid) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED  THEN --AND src.modifiedon > tgt.ModifiedDate
			UPDATE SET 
				tgt.ServiceGroupName = src.service_group_name,
				tgt.ServiceGroupDescription = src.service_groupdescription, 	
				tgt.IsActive=src.statecode,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFPipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFPipeline ,
				ServiceID= src.Service_ID,
				tgt.Service_DataverseRowID= src.servicename_mapping_id

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (ServiceGroupName, 
			ServiceGroupDescription,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy,
			ServiceID,
			Service_DataverseRowID
			) 
			VALUES (src.service_group_name, 
			src.service_groupdescription, 
			src.statecode,
			src.service_groupid,
			GETDATE(),
			GETDATE(),
			@ADFPipeline,
			@ADFPipeline,
			src.Service_ID,
			src.servicename_mapping_id
			);

END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceIDWebGroupMerge]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_ServiceIDWebGroupMerge] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_ServiceIDWebGroupMerge]
AS
BEGIN
	MERGE BSO.STG_ServiceIDWebGroup AS tgt
		USING BSO.DV_ServiceIDWebGroup  AS src
		ON UPPER(src.groupID) = UPPER(tgt.Group_ID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.Name = src.name,
				tgt.IDWebGroup_ID = src.idwebGroup_id, 	
				tgt.Group_ID = src.groupID 

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, 
			IDWebGroup_ID,
			Group_ID,
			statecode
			) 
			VALUES (src.name, 
			src.idwebGroup_id, 
			src.groupID,
			1
			);
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceMapping_MService_STGtoService]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_ServiceMapping_MService_STGtoService] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_ServiceMapping_MService_STGtoService]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@Table_DV_ID UNIQUEIDENTIFIER = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN

IF  @Table_DV_ID IS NULL 
BEGIN

	MERGE BSO.ServiceMapping AS tgt
		USING  (		
		SELECT
		SSrv.ID Service_ID
		,STGSrvMap.IsActive
		,SrvGroup.ServiceGroupID
		,SrvReqType.RequestTypeID
		,STGSrvMap.ServiceArea AreaID
		,STGSrvMap.ServiceRole RoleID
		,STGSrvMap.ServiceSegment SegmentID
		,STGSrvMap.ServiceSubsegment SubSegmentID
		,STGSrvMap.ServiceRequestFormLink ServiceRequestFormLink
		,STGSrvMap.DataverseRowID ServiceMappingID
		
		FROM BSO.STG_ServiceMapping STGSrvMap
		INNER JOIN BSO.Services SSrv
		ON SSrv.DataverseRowID= STGSrvMap.Service_DataverseRowID
		AND SSrv.IsActive=1
			
		INNER JOIN BSO.ServiceGroup SrvGroup
		ON SrvGroup.DataverseRowID=STGSrvMap.ServiceGroup_DataverseRowID
		AND SrvGroup.IsActive=1
		
		INNER JOIN BSO.RequestType SrvReqType
		ON SrvReqType.DataverseRowID=STGSrvMap.RequestType_DataverseRowID
		AND SrvReqType.IsActive=1
				
		
		) AS src

		ON src.Service_ID = tgt.ServiceID
		AND src.AreaID = tgt.ServiceArea
		AND src.RoleID = tgt.ServiceRole
		AND src.SegmentID= tgt.ServiceSegment
		AND src.SubSegmentID= tgt.ServiceSubsegment
		AND src.RequestTypeID= tgt.RequestTypeID
		AND src.ServiceGroupID= tgt.ServiceGroupID

		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.ServiceRequestFormLink = src.ServiceRequestFormLink,	
				tgt.IsActive=src.IsActive,
				tgt.DataverseRowID=src.ServiceMappingID

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (ServiceID, 
			ServiceArea,
			ServiceRole,
			ServiceSegment,
			ServiceSubsegment,
			DataverseRowID,
			RequestTypeID,
			ServiceGroupID,
			IsActive,
			ServiceRequestFormLink
			) 
			VALUES (src.Service_ID, 
			src.AreaID,
			src.RoleID,
			src.SegmentID,
			src.SubSegmentID,
			src.ServiceMappingID,
			src.RequestTypeID,
			src.ServiceGroupID,
			src.IsActive,
			src.ServiceRequestFormLink
			)
		WHEN NOT MATCHED BY SOURCE THEN
		UPDATE SET tgt.IsActive=0;
 END
 ELSE
 BEGIN
 MERGE BSO.ServiceMapping AS tgt
		USING  (		
		SELECT
		SSrv.ID Service_ID
		,STGSrvMap.IsActive
		,SrvGroup.ServiceGroupID
		,SrvReqType.RequestTypeID
		,STGSrvMap.ServiceArea AreaID
		,STGSrvMap.ServiceRole RoleID
		,STGSrvMap.ServiceSegment SegmentID
		,STGSrvMap.ServiceSubsegment SubSegmentID
		,STGSrvMap.ServiceRequestFormLink ServiceRequestFormLink
		,STGSrvMap.DataverseRowID ServiceMappingID
		
		FROM BSO.STG_ServiceMapping STGSrvMap
		INNER JOIN BSO.Services SSrv
		ON SSrv.DataverseRowID= STGSrvMap.Service_DataverseRowID
		AND STGSrvMap.DataverseRowID =  Convert(uniqueidentifier,@Table_DV_ID)
		AND SSrv.IsActive=1
			
		INNER JOIN BSO.ServiceGroup SrvGroup
		ON SrvGroup.DataverseRowID=STGSrvMap.ServiceGroup_DataverseRowID
		AND SrvGroup.IsActive=1
		
		INNER JOIN BSO.RequestType SrvReqType
		ON SrvReqType.DataverseRowID=STGSrvMap.RequestType_DataverseRowID
		AND SrvReqType.IsActive=1
				
		
		) AS src

		ON src.Service_ID = tgt.ServiceID
		AND src.AreaID = tgt.ServiceArea
		AND src.RoleID = tgt.ServiceRole
		AND src.SegmentID= tgt.ServiceSegment
		AND src.SubSegmentID= tgt.ServiceSubsegment
		AND src.RequestTypeID= tgt.RequestTypeID
		AND src.ServiceGroupID= tgt.ServiceGroupID

		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.ServiceRequestFormLink = src.ServiceRequestFormLink,	
				tgt.IsActive=src.IsActive,
				tgt.DataverseRowID=src.ServiceMappingID

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (ServiceID, 
			ServiceArea,
			ServiceRole,
			ServiceSegment,
			ServiceSubsegment,
			DataverseRowID,
			RequestTypeID,
			ServiceGroupID,
			IsActive,
			ServiceRequestFormLink
			) 
			VALUES (src.Service_ID, 
			src.AreaID,
			src.RoleID,
			src.SegmentID,
			src.SubSegmentID,
			src.ServiceMappingID,
			src.RequestTypeID,
			src.ServiceGroupID,
			src.IsActive,
			src.ServiceRequestFormLink
			)
		WHEN NOT MATCHED BY SOURCE AND tgt.DataverseRowID = @Table_DV_ID THEN
		UPDATE SET tgt.IsActive=0;
 END

 END


GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceMappingMerge]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_ServiceMappingMerge] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_ServiceMappingMerge]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN

IF  @SCAN_TABLE_ID IS NULL 
BEGIN
MERGE BSO.STG_ServiceMapping AS tgt
		USING  (		
		SELECT DISTINCT
		STGSrv.DataverseRowID ServiceName_id,
		SRG.service_groupid,
		SRT.service_request_typeid,
		SR.service_requestid,
		STGSrv.ID Service_ID,
		SR.service_request_name,
		SR.service_request_isdeleted
		,SR.statecode
		,SrvGroup.ServiceGroupID
		,SrvReqType.RequestTypeID
		,Area.ID AreaID
		,Role.ID RoleID
		,Segment.ID SegmentID
		,SubSegment.ID SubSegmentID
		,SR_Map.ServiceFormLink


		FROM BSO.DV_ServiceRequest SR
		INNER JOIN BSO.STG_Services STGSrv
		ON UPPER(STGSrv.DataverseRowID)= UPPER(SR.service_request_servicename)

		INNER JOIN BSO.DV_ServiceGroups SRG
		ON UPPER(SRG.service_groupid)= UPPER(SR.service_request_servicegroup)
		INNER JOIN BSO.STG_ServiceGroup SrvGroup
		ON UPPER(SrvGroup.DataverseRowID)=UPPER(SRG.service_groupid)

		INNER JOIN BSO.DV_RequestTypes SRT
		ON UPPER(SRT.service_request_typeid)= UPPER(SR.service_request_requesttype)
		INNER JOIN BSO.STG_RequestType SrvReqType
		ON UPPER(SrvReqType.DataverseRowID)=UPPER(SRT.service_request_typeid)

		INNER JOIN BSO.DV_ServiceMapping SR_Map
		ON UPPER(SR_Map.ServiceRequest_ID) = UPPER(SR.service_requestid)
		

		INNER JOIN BSO.DV_ServiceMapping_Area SR_A
		ON UPPER(SR_A.service_request_mapping_id)= UPPER(SR_Map.ServiceMapping_ID)
		INNER JOIN BSO.Area Area
		ON UPPER(Area.DataverseRowID)=UPPER(SR_A.areaid)
		AND Area.isActive =1

		INNER JOIN BSO.DV_ServiceMapping_Role SR_R
		ON UPPER(SR_R.service_request_mapping_id)= UPPER(SR_Map.ServiceMapping_ID)
		INNER JOIN BSO.Role Role
		ON UPPER(Role.DataverseRowID) = UPPER(SR_R.role_id)
		AND Role.isActive =1

		INNER JOIN BSO.DV_ServiceMapping_Segment SR_S
		ON UPPER(SR_S.service_request_mapping_id)= UPPER(SR_Map.ServiceMapping_ID)
		INNER JOIN BSO.Segment Segment
		ON UPPER(Segment.DataverseRowID)=UPPER(SR_S.segmentsid)
		AND Segment.isActive =1

		INNER JOIN BSO.DV_SubSegment_Segment SubSeg_Seg
		ON UPPER(SubSeg_Seg.segments_id) = UPPER(SR_S.segmentsid)
		INNER JOIN BSO.DV_SubSegment SR_SubSeg
		ON UPPER(SR_SubSeg.subsegments_id)= UPPER(SubSeg_Seg.subsegments_id)
		INNER JOIN BSO.SubSegment SubSegment
		ON UPPER(SubSegment.DataverseRowID)=UPPER(SubSeg_Seg.subsegments_id)
		AND Segment.ID= SubSegment.Segment
		AND SubSegment.isActive =1		
		) AS src

		ON src.Service_ID = tgt.ServiceID
		AND src.AreaID = tgt.ServiceArea
		AND src.RoleID = tgt.ServiceRole
		AND src.SegmentID= tgt.ServiceSegment
		AND src.SubSegmentID= tgt.ServiceSubsegment
		AND src.RequestTypeID= tgt.RequestTypeID
		AND src.ServiceGroupID= tgt.ServiceGroupID

		
		-- Update existing rows in the target table
		WHEN MATCHED  THEN
			UPDATE SET 
				tgt.ServiceRequestFormLink = src.ServiceFormLink,	
				tgt.IsActive=src.statecode,
				tgt.Service_DataverseRowID=src.ServiceName_id,
				tgt.ServiceGroup_DataverseRowID=src.service_groupid,
				tgt.RequestType_DataverseRowID=src.service_request_typeid

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (ServiceID, 
			ServiceArea,
			ServiceRole,
			ServiceSegment,
			ServiceSubsegment,
			DataverseRowID,
			RequestTypeID,
			ServiceGroupID,
			IsActive,
			ServiceRequestFormLink,
			Service_DataverseRowID,
			ServiceGroup_DataverseRowID,
			RequestType_DataverseRowID
			) 
			VALUES (src.Service_ID, 
			src.AreaID,
			src.RoleID,
			src.SegmentID,
			src.SubSegmentID,
			src.service_requestid,
			src.RequestTypeID,
			src.ServiceGroupID,
			src.statecode,
			src.ServiceFormLink,
			src.ServiceName_id,
			src.service_groupid,
			src.service_request_typeid
			)
			WHEN NOT MATCHED BY SOURCE THEN
	     	UPDATE SET tgt.IsActive=0;

	END
	ELSE
BEGIN
	MERGE BSO.STG_ServiceMapping AS tgt
		USING  (		
		SELECT DISTINCT
		STGSrv.DataverseRowID ServiceName_id,
		SRG.service_groupid,
		SRT.service_request_typeid,
		SR.service_requestid,
		STGSrv.ID Service_ID,
		SR.service_request_name,
		SR.service_request_isdeleted
		,SR.statecode
		,SrvGroup.ServiceGroupID
		,SrvReqType.RequestTypeID
		,Area.ID AreaID
		,Role.ID RoleID
		,Segment.ID SegmentID
		,SubSegment.ID SubSegmentID
		,SR_Map.ServiceFormLink


		FROM BSO.DV_ServiceRequest SR
		INNER JOIN BSO.STG_Services STGSrv
		ON UPPER(STGSrv.DataverseRowID)= UPPER(SR.service_request_servicename)
		AND UPPER(SR.service_requestid) = UPPER(COALESCE(@SCAN_TABLE_ID,SR.service_requestid))

		INNER JOIN BSO.DV_ServiceGroups SRG
		ON UPPER(SRG.service_groupid)= UPPER(SR.service_request_servicegroup)
		INNER JOIN BSO.STG_ServiceGroup SrvGroup
		ON UPPER(SrvGroup.DataverseRowID)=UPPER(SRG.service_groupid)

		INNER JOIN BSO.DV_RequestTypes SRT
		ON UPPER(SRT.service_request_typeid)= UPPER(SR.service_request_requesttype)
		INNER JOIN BSO.STG_RequestType SrvReqType
		ON UPPER(SrvReqType.DataverseRowID)=UPPER(SRT.service_request_typeid)

		INNER JOIN BSO.DV_ServiceMapping SR_Map
		ON UPPER(SR_Map.ServiceRequest_ID) = UPPER(SR.service_requestid)
		

		INNER JOIN BSO.DV_ServiceMapping_Area SR_A
		ON UPPER(SR_A.service_request_mapping_id)= UPPER(SR_Map.ServiceMapping_ID)
		INNER JOIN BSO.Area Area
		ON UPPER(Area.DataverseRowID)=UPPER(SR_A.areaid)
		AND Area.isActive =1

		INNER JOIN BSO.DV_ServiceMapping_Role SR_R
		ON UPPER(SR_R.service_request_mapping_id)= UPPER(SR_Map.ServiceMapping_ID)
		INNER JOIN BSO.Role Role
		ON UPPER(Role.DataverseRowID) = UPPER(SR_R.role_id)
		AND Role.isActive =1

		INNER JOIN BSO.DV_ServiceMapping_Segment SR_S
		ON UPPER(SR_S.service_request_mapping_id)= UPPER(SR_Map.ServiceMapping_ID)
		INNER JOIN BSO.Segment Segment
		ON UPPER(Segment.DataverseRowID)=UPPER(SR_S.segmentsid)
		AND Segment.isActive =1

		INNER JOIN BSO.DV_SubSegment_Segment SubSeg_Seg
		ON UPPER(SubSeg_Seg.segments_id) = UPPER(SR_S.segmentsid)
		INNER JOIN BSO.DV_SubSegment SR_SubSeg
		ON UPPER(SR_SubSeg.subsegments_id)= UPPER(SubSeg_Seg.subsegments_id)
		INNER JOIN BSO.SubSegment SubSegment
		ON UPPER(SubSegment.DataverseRowID)=UPPER(SubSeg_Seg.subsegments_id)
		AND Segment.ID= SubSegment.Segment
		AND SubSegment.isActive =1		
		) AS src

		ON src.Service_ID = tgt.ServiceID
		AND src.AreaID = tgt.ServiceArea
		AND src.RoleID = tgt.ServiceRole
		AND src.SegmentID= tgt.ServiceSegment
		AND src.SubSegmentID= tgt.ServiceSubsegment
		AND src.RequestTypeID= tgt.RequestTypeID
		AND src.ServiceGroupID= tgt.ServiceGroupID

		
		-- Update existing rows in the target table
		WHEN MATCHED  THEN
			UPDATE SET 
				tgt.ServiceRequestFormLink = src.ServiceFormLink,	
				tgt.IsActive=src.statecode,
				tgt.Service_DataverseRowID=src.ServiceName_id,
				tgt.ServiceGroup_DataverseRowID=src.service_groupid,
				tgt.RequestType_DataverseRowID=src.service_request_typeid

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (ServiceID, 
			ServiceArea,
			ServiceRole,
			ServiceSegment,
			ServiceSubsegment,
			DataverseRowID,
			RequestTypeID,
			ServiceGroupID,
			IsActive,
			ServiceRequestFormLink,
			Service_DataverseRowID,
			ServiceGroup_DataverseRowID,
			RequestType_DataverseRowID
			) 
			VALUES (src.Service_ID, 
			src.AreaID,
			src.RoleID,
			src.SegmentID,
			src.SubSegmentID,
			src.service_requestid,
			src.RequestTypeID,
			src.ServiceGroupID,
			src.statecode,
			src.ServiceFormLink,
			src.ServiceName_id,
			src.service_groupid,
			src.service_request_typeid
			)
		WHEN NOT MATCHED BY SOURCE AND tgt.DataverseRowID = CONVERT(uniqueidentifier,@SCAN_TABLE_ID) THEN
		UPDATE SET tgt.IsActive=0;;
	END

END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceMergeSecond]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_ServiceMergeSecond] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_ServiceMergeSecond]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
MERGE BSO.STG_Services AS tgt
		USING  (Select STGIDWEB.ID ServiceWEBGroup_ID , 
		STGS.ID STG_Service_ID
		from BSO.STG_ServiceIDWebGroup  STGIDWEB
		INNER JOIN BSO.STG_Services STGS
		ON UPPER(STGS.IDWEBGroup_DataverseRowID) = UPPER(STGIDWEB.IDWebGroup_ID)
		) AS src
		ON UPPER(src.STG_Service_ID) = UPPER(tgt.ID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.ServiceAzureADGroup = src.ServiceWEBGroup_ID;

END
GO



SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceOwnerMerge]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_ServiceOwnerMerge] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_ServiceOwnerMerge]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,
@ADFPipeline NVARCHAR(50) = 'ADF Pipeline',
@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
MERGE BSO.STG_ServiceOwner AS tgt
		USING  (Select DISTINCT 
		DSW.displayname
		,DSW.primayemail
		,DSW.serviceowner_id
		,DSW.serviceowner_type
		,DS.statecode Service_statecode
		from BSO.DV_ServiceOwners  DSW
		INNER JOIN BSO.DV_ServiceNames DS
		ON UPPER(DS.servicename_id) = UPPER(DSW.servicename_id)
		) AS src
		ON UPPER(src.serviceowner_id) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.UPN = src.primayemail,
				tgt.DisplayName = src.displayname, 	
				tgt.DataverseRowID = src.serviceowner_id ,
				tgt.IsActive=src.Service_statecode,
				ModifiedDate=getdate(),
				ModifiedBy=@ADFPipeline,
				CreatedDate=getdate(),
				CreatedBy=@ADFPipeline

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (UPN, 
			DisplayName,
			IsActive,
			DataverseRowID,
			CreatedDate,
			ModifiedDate,
			CreatedBy,
			ModifiedBy
			) 
			VALUES (src.primayemail, 
			src.displayname, 
			src.Service_statecode,
			src.serviceowner_id,
			GETDATE(),
			GETDATE(),
			@ADFPipeline,
			@ADFPipeline
			);

END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceOwnerServices_MService_STGtoService]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_ServiceOwnerServices_MService_STGtoService] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_ServiceOwnerServices_MService_STGtoService]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@Table_DV_ID NVARCHAR(50) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN

	MERGE BSO.ServiceOwnerServices AS tgt
		USING  ( Select 
		STG_SOS.ServiceOwner_DataverseRowID,
		STG_SOS.Service_DataverseRowID,
		SOW.ID SrvOwnerID,
		S.ID ServiceID
		
		FROM BSO.STG_ServiceOwnerServices STG_SOS
		INNER JOIN BSO.ServiceOwner SOW
		ON UPPER(SOW.DataverseRowID) = UPPER(STG_SOS.ServiceOwner_DataverseRowID)
		INNER JOIN BSO.Services S
		ON UPPER(S.DataverseRowID) = UPPER(STG_SOS.Service_DataverseRowID)
		
		)AS src
		ON UPPER(src.ServiceOwner_DataverseRowID) = UPPER(tgt.ServiceOwner_DataverseRowID)
		AND UPPER(src.Service_DataverseRowID) = UPPER(tgt.Service_DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.Service_DataverseRowID = src.Service_DataverseRowID,
				tgt.ServiceOwner_DataverseRowID = src.ServiceOwner_DataverseRowID,
				tgt.ServiceID = src.ServiceID,
				tgt.ServiceOwnerID = src.SrvOwnerID

		WHEN NOT MATCHED BY TARGET THEN
			INSERT (Service_DataverseRowID, 
			ServiceOwner_DataverseRowID,
			ServiceID,
			ServiceOwnerID
			) 
			VALUES (src.Service_DataverseRowID, 
			src.ServiceOwner_DataverseRowID,
			ServiceID,
			SrvOwnerID
			);

END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServiceOwnerServicesMerge]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_ServiceOwnerServicesMerge] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_ServiceOwnerServicesMerge]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
MERGE BSO.STG_ServiceOwnerServices AS tgt
		USING  DV_ServiceOwners AS src
		ON UPPER(src.serviceowner_id) = UPPER(tgt.ServiceOwner_DataverseRowID)
		AND UPPER(src.servicename_id) = UPPER(tgt.Service_DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.Service_DataverseRowID = src.servicename_id,
				tgt.ServiceOwner_DataverseRowID = src.serviceowner_id

		WHEN NOT MATCHED BY TARGET THEN
			INSERT (Service_DataverseRowID, 
			ServiceOwner_DataverseRowID
			) 
			VALUES (src.servicename_id, 
			src.serviceowner_id
			);

END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_Services_MService_STGtoService]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_Services_MService_STGtoService] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_Services_MService_STGtoService]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@Table_DV_ID NVARCHAR(50) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
	MERGE BSO.Services AS tgt
		USING BSO.STG_Services AS src
		ON UPPER(src.DataverseRowID) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.Name = src.Name,
				tgt.IRIS_Utterance = src.IRIS_Utterance, 	
				tgt.AboutService = src.AboutService ,
				tgt.relatedinformation= src.relatedinformation ,
				tgt.IsNonIRISService= src.IsNonIRISService ,
				tgt.IsDropdownUI= src.IsDropdownUI ,
				tgt.ServiceDropDownLinks= src.ServiceDropDownLinks ,
				--tgt.ServiceCategories= src. ,
				--tgt.ServiceAzureADGroup= src. ,
				tgt.IsSecuredByAzureADGroup= COALESCE(src.IsSecuredByAzureADGroup ,0),
				tgt.ModifiedDate= src.ModifiedDate ,
				tgt.CreatedDate= src.CreatedDate ,
				tgt.CreatedBy= src.CreatedBy ,
				tgt.ModifiedBy= src.ModifiedBy ,
				tgt.IsActive = src.IsActive,
				tgt.IrisAppName = src.IrisAppName,
				tgt.IDWEBGroup_DataverseRowID=src.IDWEBGroup_DataverseRowID

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, 
			IRIS_Utterance,
			AboutService,
			relatedinformation,
			IsNonIRISService,
			IsDropdownUI,
			ServiceDropDownLinks,
			DataverseRowID,
			IsSecuredByAzureADGroup,
			ModifiedDate,
			ModifiedBy,
			CreatedDate,
			CreatedBy,
			IsActive,
			IrisAppName,
			IDWEBGroup_DataverseRowID) 
			VALUES (src.name, 
			src.IRIS_Utterance, 
			src.AboutService,
			src.relatedinformation, 
			src.IsNonIRISService,
			src.IsDropdownUI, 
			src.ServiceDropDownLinks,
			src.DataverseRowID, 
			COALESCE(src.IsSecuredByAzureADGroup ,0),
			 src.ModifiedDate, 
			 src.ModifiedBy,
			 src.CreatedDate,
			 src.CreatedBy,
			src.IsActive,
			src.IrisAppName,
			src.IDWEBGroup_DataverseRowID
			)
		WHEN NOT MATCHED BY SOURCE THEN
		UPDATE SET tgt.IsActive=0;
	END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServicesIDWEBGroupMerge]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_ServicesIDWEBGroupMerge] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_ServicesIDWEBGroupMerge]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
MERGE BSO.STG_Services AS tgt
		USING  (Select STGIDWEB.ID ServiceWEBGroup_ID , 
		STGS.ID STG_Service_ID
		from BSO.STG_ServiceIDWebGroup  STGIDWEB
		INNER JOIN BSO.STG_Services STGS
		ON UPPER(STGS.IDWEBGroup_DataverseRowID) = UPPER(STGIDWEB.IDWebGroup_ID)
		) AS src
		ON UPPER(src.STG_Service_ID) = UPPER(tgt.ID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.ServiceAzureADGroup = src.ServiceWEBGroup_ID;

END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServicesMerge]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_ServicesMerge] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_ServicesMerge]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,
@ADFPipeline NVARCHAR(50) = 'ADF Pipeline',
@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
	MERGE BSO.STG_Services AS tgt
		USING BSO.DV_ServiceNames AS src
		ON UPPER(src.servicename_id) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED  THEN --AND src.modifiedon > tgt.ModifiedDate
			UPDATE SET 
				tgt.Name = src.servicename,
				tgt.IRIS_Utterance = src.irisutterance, 	
				tgt.AboutService = src.servicedescription ,
				tgt.relatedinformation= src.relatedinformation ,
				tgt.IsNonIRISService= src.isnonirisservice ,
				tgt.IsDropdownUI= src.needdropdown ,
				tgt.ServiceDropDownLinks= src.dropdownvalues ,
				--tgt.ServiceCategories= src. ,
				--tgt.ServiceAzureADGroup= src. ,
				tgt.IsSecuredByAzureADGroup= COALESCE(src.isidwebservicegroup ,0),
				tgt.ModifiedDate= src.modifiedon ,
				tgt.CreatedDate= src.modifiedon ,
				tgt.CreatedBy= @ADFPipeline ,
				tgt.ModifiedBy= @ADFPipeline ,
				tgt.IsActive = src.statecode,
				tgt.IDWEBGroup_DataverseRowID= src.idwebgroup,
				tgt.IrisAppName = src.IrisAppName

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, 
			IRIS_Utterance,
			AboutService,
			relatedinformation,
			IsNonIRISService,
			IsDropdownUI,
			ServiceDropDownLinks,
			DataverseRowID,
			IsSecuredByAzureADGroup,
			ModifiedDate,
			ModifiedBy,
			CreatedDate,
			CreatedBy,
			IsActive,
			IrisAppName,
			IDWEBGroup_DataverseRowID) 
			VALUES (src.servicename, 
			src.irisutterance, 
			src.servicedescription,
			src.relatedinformation, 
			src.isnonirisservice,
			src.needdropdown, 
			src.dropdownvalues,
			src.servicename_id, 
			COALESCE(src.isidwebservicegroup ,0),
			 src.modifiedon, 
			 @ADFPipeline,
			 src.modifiedon,
			 @ADFPipeline,
			src.statecode,
			src.IrisAppName,
			 src.idwebgroup
			);
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_ServicesSecond_MService_STGtoService]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_ServicesSecond_MService_STGtoService] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_ServicesSecond_MService_STGtoService]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@Table_DV_ID NVARCHAR(50) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
	MERGE BSO.Services AS tgt
		USING  (Select SIDWEB.ID ServiceWEBGroup_ID , 
		SERV.ID Service_ID
		from BSO.UserADGroup  SIDWEB
		INNER JOIN BSO.Services SERV
		ON UPPER(SERV.IDWEBGroup_DataverseRowID) = UPPER(SIDWEB.DataverseRowID)
		) AS src
		ON UPPER(src.Service_ID) = UPPER(tgt.ID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.ServiceAzureADGroup = src.ServiceWEBGroup_ID;
	END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[STG_UserADGroup_MService_STGtoService]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[STG_UserADGroup_MService_STGtoService] AS' 
END
GO
ALTER PROCEDURE [BSO].[STG_UserADGroup_MService_STGtoService]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
	MERGE BSO.UserADGroup AS tgt
		USING  STG_ServiceIDWebGroup AS src
		ON UPPER(src.IDWebGroup_ID) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.Name = src.name,
				tgt.DataverseRowID = src.IDWebGroup_ID, 	
				tgt.GroupID = src.Group_ID 

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, 
			DataverseRowID,
			GroupID,
			IsActive
			) 
			VALUES (src.name, 
			src.idwebGroup_id, 
			src.Group_ID,
			1
			);
	END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[Truncate_DVTables]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[Truncate_DVTables] AS' 
END
GO
ALTER PROCEDURE [BSO].[Truncate_DVTables]

AS
BEGIN

TRUNCATE TABLE BSO.DV_Announcement
TRUNCATE TABLE BSO.DV_Area
TRUNCATE TABLE BSO.DV_RequestTypes
TRUNCATE TABLE BSO.DV_Role
TRUNCATE TABLE BSO.DV_Segment
TRUNCATE TABLE BSO.DV_Segment_Role
TRUNCATE TABLE BSO.DV_ServiceAreaRoleSegmentMapping
TRUNCATE TABLE BSO.DV_ServiceGroups
TRUNCATE TABLE BSO.DV_ServiceIDWebGroup
TRUNCATE TABLE BSO.DV_ServiceMapping_Area
TRUNCATE TABLE BSO.DV_ServiceMapping_Role
TRUNCATE TABLE BSO.DV_ServiceMapping_Segment
TRUNCATE TABLE BSO.DV_ServiceNames
TRUNCATE TABLE BSO.DV_ServiceOwners
TRUNCATE TABLE BSO.DV_ServiceRequest
TRUNCATE TABLE BSO.DV_SubSegment
TRUNCATE TABLE BSO.DV_SubSegment_Segment
TRUNCATE TABLE [BSO].[DV_ServiceMapping]


END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[TruncateSTGServiceTable]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[TruncateSTGServiceTable] AS' 
END
GO
ALTER PROCEDURE [BSO].[TruncateSTGServiceTable]

AS
BEGIN
DELETE FROM BSO.STG_ServiceMapping WHERE 1=1;

DELETE FROM BSO.STG_RequestType WHERE 1=1;
DELETE FROM BSO.STG_ServiceGroup WHERE 1=1;

DELETE FROM BSO.STG_ServiceOwnerServices WHERE 1=1;

DELETE FROM BSO.STG_ServiceOwner WHERE 1=1;

DELETE FROM BSO.STG_Services WHERE 1=1;


DBCC CHECKIDENT ('BSO.STG_Services', RESEED, 0); 
DBCC CHECKIDENT ('BSO.STG_RequestType', RESEED, 0); 
DBCC CHECKIDENT ('BSO.STG_ServiceGroup', RESEED, 0); 
DBCC CHECKIDENT ('BSO.STG_ServiceOwner', RESEED, 0);

END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[UpdateUser]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[UpdateUser] AS' 
END
GO

ALTER PROCEDURE [BSO].[UpdateUser]
    @UserId INT,
    @UPN NVARCHAR(255),
    @UserArea INT,
    @UserRole INT,
    @Segment INT,
    @SubSegment INT NULL,
    @DataverseRowID UNIQUEIDENTIFIER,
    @IsActive BIT,
    @UserADGroupIDs [BSO].UserADGroupIDList READONLY
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        IF EXISTS (SELECT 1 FROM [BSO].[User] WHERE Id = @UserId)
        BEGIN 
		IF NOT EXISTS(SELECT 1 FROM [BSO].[User] WHERE UPN = @UPN AND
                UserArea = @UserArea AND
                UserRole = @UserRole AND
                Segment = @Segment AND
                SubSegment = @SubSegment AND
                DataverseRowID = @DataverseRowID AND
                IsActive = @IsActive AND Id = @UserId )
			BEGIN
				EXEC BSO.InActiveUserWorkSpaceByPreference @UserId
			END


            UPDATE [BSO].[User]
                SET UPN = @UPN,
                UserArea = @UserArea,
                UserRole = @UserRole,
                Segment = @Segment,
                SubSegment = @SubSegment,
                DataverseRowID = @DataverseRowID,
                IsActive = @IsActive
                WHERE Id = @UserId;          
           
				

		   --DELETE FROM [BSO].UserADGroupMapping WHERE UserId = @UserId;       
            --INSERT INTO [BSO].UserADGroupMapping (UserId, UserADGroupID)
            --SELECT @UserId, UserADGroupID
            --FROM @UserADGroupIDs;

        END
        ELSE
        BEGIN       
            SELECT -1 AS Result;
        END
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH       
        ROLLBACK TRANSACTION;    
        THROW;
    END CATCH
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[BSO].[UpdateUserByObjectID]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [BSO].[UpdateUserByObjectID] AS' 
END
GO

ALTER PROCEDURE [BSO].[UpdateUserByObjectID]
   @OID NVARCHAR(300),
   @UserADGroupIDs [BSO].UserADGroupListForJob READONLY
AS
BEGIN
    BEGIN TRY
        ---BEGIN TRANSACTION;
        IF EXISTS (SELECT 1 FROM [BSO].[User] WHERE Oid = @OID)
        BEGIN
	IF EXISTS (SELECT 1 FROM [BSO].[User] WHERE Oid = @OID)
BEGIN

MERGE INTO [BSO].[UserADGroupMapping] AS target
USING (
    SELECT
        u.Id AS UserId,
        uag.ID AS UserADGroupID,
        1 AS IsActive
    FROM
        [BSO].[User] u
    JOIN
        [BSO].[UserADGroup] uag ON u.OID = @OID
    JOIN
        @UserADGroupIDs gid ON uag.GroupID = gid.UserADGroupID
    WHERE NOT EXISTS (
        SELECT 1
        FROM [BSO].[UserADGroupMapping] UM
        WHERE UM.UserId = u.Id AND UM.UserADGroupID = uag.ID
    )
	
) AS source ON target.UserId = source.UserId AND target.UserADGroupID = source.UserADGroupID

WHEN NOT MATCHED BY TARGET THEN
    -- Insert new records
    INSERT (UserId, UserADGroupID, IsActive)
    VALUES (source.UserId, source.UserADGroupID, source.IsActive);



UPDATE [BSO].[UserADGroupMapping]
SET IsActive = 1
WHERE UserADGroupID IN (
    SELECT uag.ID
    FROM [BSO].[User] u
    JOIN [BSO].[UserADGroup] uag ON u.OID = @OID
    JOIN @UserADGroupIDs gid ON uag.GroupID = gid.UserADGroupID
    WHERE [BSO].[UserADGroupMapping].UserId = u.Id
      AND [BSO].[UserADGroupMapping].UserADGroupID = uag.ID
)
AND UserId = (Select Id FROM [BSO].[User] WHERE Oid = @OID)


UPDATE [BSO].[UserADGroupMapping]
SET IsActive = 0
WHERE UserADGroupID  NOT IN (
    SELECT uag.ID
    FROM [BSO].[User] u
    JOIN [BSO].[UserADGroup] uag ON u.OID = @OID
    JOIN @UserADGroupIDs gid ON uag.GroupID = gid.UserADGroupID
    WHERE [BSO].[UserADGroupMapping].UserId = u.Id
      AND [BSO].[UserADGroupMapping].UserADGroupID = uag.ID
)
AND UserId = (Select Id FROM [BSO].[User] WHERE Oid = @OID)

END



			

ELSE
    SELECT -1 AS Result;

        END
        ELSE
        BEGIN       
            SELECT -1 AS Result;
        END
        --COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH       
      --  ROLLBACK TRANSACTION;    
        THROW;
    END CATCH
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DeleteUserAndRelatedData]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[DeleteUserAndRelatedData] AS' 
END
GO

ALTER PROCEDURE [dbo].[DeleteUserAndRelatedData]
    @UPN NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY  
        BEGIN TRAN;
        DECLARE @UserID INT;
        SELECT @UserID = Id FROM [BSO].[User] WHERE UPN = @UPN;
        IF @UserID IS NOT NULL
        BEGIN 
            DELETE FROM [BSO].[UserWorkSpaceServices] WHERE UserID = @UserID;
            DELETE FROM [BSO].[UserADGroupMapping] WHERE UserID = @UserID;
            DELETE FROM [BSO].[User] WHERE Id = @UserID;
			DELETE FROM [BSO].[GiveUsFeedback] WHERE UserID = @UserID;
            COMMIT;
        END
    END TRY
    BEGIN CATCH      
        IF @@TRANCOUNT > 0		         
            ROLLBACK;       
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
        DECLARE @error NVARCHAR(50) = 'Error: ';
        PRINT @error + @ErrorMessage;
    END CATCH;
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[STG_Services_MService_STGtoService]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[STG_Services_MService_STGtoService] AS' 
END
GO
ALTER PROCEDURE [dbo].[STG_Services_MService_STGtoService]
AS
BEGIN
	MERGE BSO.Services AS tgt
		USING BSO.STG_Services AS src
		ON UPPER(src.DataverseRowID) = UPPER(tgt.DataverseRowID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.Name = src.Name,
				tgt.IRIS_Utterance = src.IRIS_Utterance, 	
				tgt.AboutService = src.AboutService ,
				tgt.relatedinformation= src.relatedinformation ,
				tgt.IsNonIRISService= src.IsNonIRISService ,
				tgt.IsDropdownUI= src.IsDropdownUI ,
				tgt.ServiceDropDownLinks= src.ServiceDropDownLinks ,
				--tgt.ServiceCategories= src. ,
				--tgt.ServiceAzureADGroup= src. ,
				tgt.IsSecuredByAzureADGroup= COALESCE(src.IsSecuredByAzureADGroup ,0),
				tgt.ModifiedDate= src.ModifiedDate ,
				tgt.CreatedDate= src.CreatedDate ,
				tgt.CreatedBy= src.CreatedBy ,
				tgt.ModifiedBy= src.ModifiedBy ,
				tgt.IsActive = src.IsActive,
				tgt.IDWEBGroup_DataverseRowID=src.IDWEBGroup_DataverseRowID

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, 
			IRIS_Utterance,
			AboutService,
			relatedinformation,
			IsNonIRISService,
			IsDropdownUI,
			ServiceDropDownLinks,
			DataverseRowID,
			IsSecuredByAzureADGroup,
			ModifiedDate,
			ModifiedBy,
			CreatedDate,
			CreatedBy,
			IsActive,
			IDWEBGroup_DataverseRowID) 
			VALUES (src.name, 
			src.IRIS_Utterance, 
			src.AboutService,
			src.relatedinformation, 
			src.IsNonIRISService,
			src.IsDropdownUI, 
			src.ServiceDropDownLinks,
			src.DataverseRowID, 
			COALESCE(src.IsSecuredByAzureADGroup ,0),
			 src.ModifiedDate, 
			 src.ModifiedBy,
			 src.CreatedDate,
			 src.CreatedBy,
			src.IsActive,
			src.IDWEBGroup_DataverseRowID
			);
	END
GO