-- Check if the stored procedure exists and drop it if it does
IF OBJECT_ID('BSO.TruncateSTGServiceTable', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.TruncateSTGServiceTable;
END
GO

-- Create a stored procedure to truncate various tables in the BSO schema
CREATE PROCEDURE [BSO].[TruncateSTGServiceTable]
AS
BEGIN
    -- Truncate STG_ServiceMapping table
    DELETE FROM BSO.STG_ServiceMapping;

    -- Truncate STG_ServiceNameMapping table
    DELETE FROM BSO.STG_ServiceNameMapping;

    -- Truncate STG_RequestType table
    DELETE FROM BSO.STG_RequestType;

    -- Truncate STG_ServiceGroup table
    DELETE FROM BSO.STG_ServiceGroup;

    -- Truncate STG_ServiceOwnerServices table
    DELETE FROM BSO.STG_ServiceOwnerServices;

    -- Truncate STG_ServiceOwner table
    DELETE FROM BSO.STG_ServiceOwner;

    -- Truncate STG_Services table
    DELETE FROM BSO.STG_Services;

    -- Reset identity columns for the truncated tables
    DBCC CHECKIDENT ('BSO.STG_Services', RESEED, 0); 
    DBCC CHECKIDENT ('BSO.STG_RequestType', RESEED, 0); 
    DBCC CHECKIDENT ('BSO.STG_ServiceGroup', RESEED, 0); 
    DBCC CHECKIDENT ('BSO.STG_ServiceOwner', RESEED, 0);

END
GO
