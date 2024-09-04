/****** Object:  StoredProcedure [BSO].[STG_ServiceIDWebGroupMerge]    Script Date: 30-01-2024 20:41:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [BSO].[STG_ServiceIDWebGroupMerge]
@SCAN_Type NVARCHAR = 'FULL_SCAN', --Possible values 'FULL_SCAN' , 'CHANGE_TRIGGER'
@SCAN_TABLE NVARCHAR(30) = NULL,
@SCAN_TABLE_ID NVARCHAR(50) = NULL,

@OutputMsg nvarchar(2000) OUTPUT
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
