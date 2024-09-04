CREATE PROCEDURE [report].[Usp_Validation_UpdateRowCount]  
AS  
BEGIN  
    BEGIN TRY  
        BEGIN TRANSACTION;  
  
        -- Declare variables  
        DECLARE @RowCountTable TABLE (  
            TableName NVARCHAR(128),  
   [RowCount_Expected] INT,  
            [Rowcount_latest] INT,  
            [Pass_Fail] NVARCHAR(10),  
            [Count_difference] INT,  
            [latest_load_datetime] datetime default getutcdate()  
        )  
  
        -- Insert data into @RowCountTable  
        INSERT INTO @RowCountTable (TableName, [Rowcount_Expected], [Rowcount_latest], [Pass_Fail], [Count_difference])  
        SELECT   
            QUOTENAME(SCHEMA_NAME(sOBJ.schema_id)) + '.' + QUOTENAME(sOBJ.name) AS TableName,  
            SUM(sPTN.Rows) AS [RowCount_Expected],  
            0 AS [Rowcount_latest],  
            '' AS [Pass_Fail],  
            0 AS [Count_difference]  
        FROM  
            sys.objects AS sOBJ  
            INNER JOIN sys.partitions AS sPTN ON sOBJ.object_id = sPTN.object_id  
        WHERE  
            sOBJ.type = 'U'  
            AND sOBJ.is_ms_shipped = 0x0  
            AND index_id < 2 -- 0:Heap, 1:Clustered  
        GROUP BY  
            sOBJ.schema_id,  
            sOBJ.name  
  
        -- Insert new tables into [dbo].[RowCountTable]  
        INSERT INTO [report].[Validation_RowCountTable] (TableName)  
        SELECT TableName FROM @RowCountTable t  
        WHERE NOT EXISTS (SELECT 1 FROM [report].[Validation_RowCountTable] rt WHERE rt.TableName = t.TableName)  
  
        -- Update [Rowcount_latest] column  
        UPDATE @RowCountTable  
        SET [Rowcount_latest] = [Rowcount_Expected]  
  
        -- Update data in [report].[Validation_RowCountTable]  
        UPDATE [report].[Validation_RowCountTable]  
        SET [Rowcount_latest] = t.[Rowcount_latest],  
            [Pass_Fail] = t.[Pass_Fail],  
            [Count_difference] = t.[Count_difference],  
            [latest_load_datetime] = GETUTCDATE() -- Update LoadDateTime with current UTC timestamp  
        FROM @RowCountTable t  
        WHERE [report].[Validation_RowCountTable].[TableName] = t.[TableName]  
  
        -- Update [Pass_Fail] column  
        UPDATE [report].[Validation_RowCountTable]  
        SET [Pass_Fail] = CASE  
            WHEN [Rowcount_Expected] = [Rowcount_latest] THEN 'Pass'  
            WHEN [Rowcount_Expected] < [Rowcount_latest] THEN 'Fail'  
            WHEN [Rowcount_Expected] > [Rowcount_latest] THEN 'Verify'  
            ELSE ''  
        END  
  
        -- Update [Count_difference] column  
        UPDATE [report].[Validation_RowCountTable]  
        SET [Count_difference] = [Rowcount_Expected] - [Rowcount_latest]  
  
        COMMIT TRANSACTION;  
    END TRY  
    BEGIN CATCH  
        IF @@TRANCOUNT > 0  
            ROLLBACK TRANSACTION;  
  
        THROW;  
    END CATCH;  
END