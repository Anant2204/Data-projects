IF OBJECT_ID('BSO.MigrationService_DVtoSegmentRoleMapping', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.MigrationService_DVtoSegmentRoleMapping;
END
GO
CREATE PROCEDURE [BSO].[MigrationService_DVtoSegmentRoleMapping]

@OutputMsg nvarchar(2000) OUTPUT
AS
BEGIN

DECLARE  @merge_output TABLE( action NVARCHAR(10), ID NVARCHAR(50) );

DECLARE @TableRowAction nvarchar(100);


MERGE BSO.SegmentRoleMapping AS tgt
		USING ( 
		Select 
		S.ID Segment_MasterID,
		R.ID ROLE_MasterID,
		DMAP.segment_role_mapping_id,
		S.IsActive

		FROM BSO.Segment AS S
		JOIN BSO.DV_Segment_Role AS DMap
		ON UPPER(S.DataverseRowID) = UPPER(DMAP.segmentsid)
		JOIN BSO.Role AS R
		ON UPPER(R.DataverseRowID) = UPPER(DMap.role_id)

		)AS src
		ON src.Segment_MasterID = tgt.ServiceSegment
		AND src.ROLE_MasterID = tgt.ServiceRole
		-- Update existing rows in the target table
		WHEN MATCHED 
		--AND src.modifiedon > tgt.ModifiedDate 
		THEN
			UPDATE SET tgt.isactive = src.IsActive, 
			tgt.DataverseRowID = src.segment_role_mapping_id

		-- Insert new rows into the target table
		WHEN NOT MATCHED BY TARGET THEN
			INSERT (ServiceSegment, ServiceRole,DataverseRowID,IsActive) 
			VALUES (src.Segment_MasterID,src.ROLE_MasterID, src.segment_role_mapping_id,src.IsActive)

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
END
GO