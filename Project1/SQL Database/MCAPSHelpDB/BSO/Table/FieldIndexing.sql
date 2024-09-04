DECLARE @SqlStatement NVARCHAR(MAX);

-- Check if the index on IsActive field with Area Table exists
IF NOT EXISTS (
    SELECT 1 
    FROM sys.indexes 
    WHERE object_id = OBJECT_ID(N'BSO.Area') 
    AND name = N'Area_IsActive'
)
BEGIN
    SET @SqlStatement = 'CREATE NONCLUSTERED INDEX Area_IsActive ON BSO.Area (IsActive);';
    EXEC sp_executesql @SqlStatement;
END;

-- Check if the index on IsActive field with Role Table exists
IF NOT EXISTS (
    SELECT 1 
    FROM sys.indexes 
    WHERE object_id = OBJECT_ID(N'BSO.Role') 
    AND name = N'Role_IsActive'
)
BEGIN
    SET @SqlStatement = 'CREATE NONCLUSTERED INDEX Role_IsActive ON BSO.Role (IsActive);';
    EXEC sp_executesql @SqlStatement;
END;

-- Check if the index on IsActive field with Segment Table exists
IF NOT EXISTS (
    SELECT 1 
    FROM sys.indexes 
    WHERE object_id = OBJECT_ID(N'BSO.Segment') 
    AND name = N'Segment_IsActive'
)
BEGIN
    SET @SqlStatement = 'CREATE NONCLUSTERED INDEX Segment_IsActive ON BSO.Segment (IsActive);';
    EXEC sp_executesql @SqlStatement;
END;

-- Check if the index on IsActive field with Services Table exists
IF NOT EXISTS (
    SELECT 1 
    FROM sys.indexes 
    WHERE object_id = OBJECT_ID(N'BSO.Services') 
    AND name = N'Services_IsActive'
)
BEGIN
    SET @SqlStatement = 'CREATE NONCLUSTERED INDEX Services_IsActive ON BSO.Services (IsActive);';
    EXEC sp_executesql @SqlStatement;
END;

-- Check if the index on IsActive field with ServiceMapping Table exists
IF NOT EXISTS (
    SELECT 1 
    FROM sys.indexes 
    WHERE object_id = OBJECT_ID(N'BSO.ServiceMapping') 
    AND name = N'ServiceMapping_IsActive'
)
BEGIN
    SET @SqlStatement = 'CREATE NONCLUSTERED INDEX ServiceMapping_IsActive ON BSO.ServiceMapping (IsActive);';
    EXEC sp_executesql @SqlStatement;
END;

-- Check if the index on UPN field with User Table exists
IF NOT EXISTS (
    SELECT 1 
    FROM sys.indexes 
    WHERE object_id = OBJECT_ID(N'BSO.[User]') 
    AND name = N'User_UPN'
)
BEGIN
    SET @SqlStatement = 'CREATE NONCLUSTERED INDEX User_UPN ON BSO.[User] (UPN);';
    EXEC sp_executesql @SqlStatement;
END;

-- Check if the index on UserID field with UserWorkSpaceServices Table exists
IF NOT EXISTS (
    SELECT 1 
    FROM sys.indexes 
    WHERE object_id = OBJECT_ID(N'BSO.UserWorkSpaceServices') 
    AND name = N'UserWorkSpaceServices_UserID'
)
BEGIN
    SET @SqlStatement = 'CREATE NONCLUSTERED INDEX UserWorkSpaceServices_UserID ON BSO.UserWorkSpaceServices (UserID);';
    EXEC sp_executesql @SqlStatement;
END;