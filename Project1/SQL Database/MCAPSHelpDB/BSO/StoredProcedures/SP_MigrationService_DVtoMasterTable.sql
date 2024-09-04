
IF OBJECT_ID('BSO.MigrationService_DVtoMasterTable', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.MigrationService_DVtoMasterTable;
END
GO

CREATE PROCEDURE [BSO].[MigrationService_DVtoMasterTable]

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN
DECLARE @ModifiedByName NVARCHAR(200) = 'ADF Pipeline';
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

		WHEN NOT MATCHED BY SOURCE THEN
	     	UPDATE SET tgt.IsActive=0

		
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
			tgt.ModifiedBy=@ModifiedByName,
			tgt.CreatedBy=@ModifiedByName,
			tgt.CreatedDate=src.modifiedon,
			tgt.IsActive = src.statecode

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, DataverseRowID,IsActive,ModifiedDate,ModifiedBy,CreatedDate,CreatedBy) 
			VALUES (src.role_name,src.role_id, src.statecode,src.modifiedon, @ModifiedByName,src.modifiedon, @ModifiedByName)

		WHEN NOT MATCHED BY SOURCE THEN
	     	UPDATE SET tgt.IsActive=0

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
			tgt.IsActive = src.statecode

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, DataverseRowID,IsActive) 
			VALUES (src.segment_name,src.segmentsid, src.statecode)


		WHEN NOT MATCHED BY SOURCE THEN
	     	UPDATE SET tgt.IsActive=0

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
	
		THEN
			UPDATE SET tgt.name = src.subsegments_name,		
			tgt.IsActive = src.statecode,
			tgt.Segment = src.Segment_MasterID

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (name, DataverseRowID,IsActive,Segment) 
			VALUES (src.subsegments_name,src.subsegments_id, src.statecode,src.Segment_MasterID)

		WHEN NOT MATCHED BY SOURCE THEN
	     	UPDATE SET tgt.IsActive=0

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
