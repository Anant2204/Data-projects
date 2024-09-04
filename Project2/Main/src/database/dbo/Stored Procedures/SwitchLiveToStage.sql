

CREATE PROC [dbo].[SwitchLiveToStage] @LiveTable nvarchar(MAX),@StagingTable nvarchar(MAX)

AS
BEGIN

DECLARE @LiveTable_Old NVARCHAR(MAX)

SET @LiveTable_Old=@LiveTable+'_Old'

BEGIN TRAN
EXEC sp_rename @LiveTable, @LiveTable_Old;
EXEC sp_rename @StagingTable, @LiveTable;
EXEC sp_rename @LiveTable_Old, @StagingTable;
COMMIT

END