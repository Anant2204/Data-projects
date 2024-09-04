IF OBJECT_ID('BSO.STG_ServiceNameMappingSecond_MService_STGtoService', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.STG_ServiceNameMappingSecond_MService_STGtoService;
END
GO

CREATE PROCEDURE [BSO].[STG_ServiceNameMappingSecond_MService_STGtoService]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@Table_DV_ID NVARCHAR(50) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
	MERGE BSO.ServiceNameMapping AS tgt
		USING  (Select DISTINCT SIDWEB.ID ServiceWEBGroup_ID , 
		SERV.ServiceID Service_ID
		from BSO.UserADGroup  SIDWEB
		INNER JOIN BSO.ServiceNameMapping SERV
		ON UPPER(SERV.IDWEBGroup_DataverseRowID) = UPPER(SIDWEB.DataverseRowID)
		) AS src
		ON UPPER(src.Service_ID) = UPPER(tgt.ServiceID)
		-- Update existing rows in the target table
		WHEN MATCHED THEN
			UPDATE SET 
				tgt.ServiceAzureADGroup = src.ServiceWEBGroup_ID;
	END
GO