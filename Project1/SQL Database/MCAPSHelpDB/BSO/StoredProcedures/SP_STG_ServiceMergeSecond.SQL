IF OBJECT_ID('BSO.STG_ServiceMergeSecond', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.STG_ServiceMergeSecond;
END
GO

CREATE PROCEDURE [BSO].[STG_ServiceMergeSecond]
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
