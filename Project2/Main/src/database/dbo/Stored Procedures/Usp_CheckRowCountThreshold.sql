 /*Created by tanmay on 5th june 2024 to check threshold Value for all Base tables*/
 
 CREATE  PROCEDURE  dbo.Usp_CheckRowCountThreshold
AS
BEGIN
    -- Declare variables
    DECLARE @TableName NVARCHAR(128), @RowCount INT, @Threshold INT;
    DECLARE @Message NVARCHAR(255), @Error NVARCHAR(255);
    DECLARE @SQL NVARCHAR(MAX);
    DECLARE @i INT = 1, @count INT;

    -- Declare table variable
    DECLARE @TableVar TABLE (
        id INT IDENTITY(1,1),
        TableName NVARCHAR(128),
        RowCount_Threshold INT
    );

    -- Insert data into table variable
    INSERT INTO @TableVar (TableName, RowCount_Threshold)
    SELECT TableName, RowCount_Threshold
    FROM [report].[Validation_RowCountTable]
    WHERE TableName IN (
        '[dbo].[Isp_careerstage]',
        '[dbo].[Isp_costcenter]',
        '[dbo].[Isp_country]',
        '[dbo].[Isp_discipline]',
        '[dbo].[Isp_incentiveplan]',
        '[dbo].[Isp_jobrole]',
        '[dbo].[Isp_Org]',
        '[dbo].[Isp_qualifier1]',
        '[dbo].[Isp_qualifier2]',
        '[dbo].[Isp_rolesummary]',
        '[dbo].[Isp_seller]',
        '[dbo].[Isp_worker]',
        '[dbo].[PlanSeller]'
    );

    -- Get the count of tables
    SELECT @count = COUNT(*) FROM @TableVar;

    -- Iterate through all tables
    WHILE @i <= @count
    BEGIN
        -- Get the current table name and threshold
        SELECT @TableName = TableName, @Threshold = RowCount_Threshold
        FROM @TableVar
        WHERE id = @i;

        -- Prepare the SQL statement
        SET @SQL = N'SELECT @RowCount = COUNT(*) FROM ' + @TableName;

        -- Execute the dynamic SQL
        EXEC sp_executesql @SQL, N'@RowCount INT OUTPUT', @RowCount = @RowCount OUTPUT;

        -- Check if row count is less than threshold
        IF @RowCount < @Threshold
        BEGIN
            -- Prepare message
            SET @Message = 'Count ' + CAST(@RowCount AS NVARCHAR) + ' for ' + @TableName + ' is less than threshold value ' + CAST(@Threshold AS NVARCHAR);
            PRINT @Message;

            -- Log error into dbo.ErrorLogTable
            INSERT INTO dbo.ErrorLogTable (ErrorType, TableName, ErrorMsg)
            VALUES ('Threshold_count_mismatch', @TableName, @Message);

            -- Prepare error message
            SET @Error = 'One or more tables have a row count less than the threshold value.';
        END;

        -- Move to the next table
        SET @i = @i + 1;
    END;

    -- Throw error if necessary
    IF @Error IS NOT NULL
    BEGIN
        THROW 50000, @Error, 1;
    END;
END;