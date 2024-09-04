IF OBJECT_ID('BSO.GetAllUsers', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BSO.GetAllUsers;
END
GO
-- ================================================
-- Description: Retrieves all users with additional information
-- ================================================
CREATE PROCEDURE BSO.GetAllUsers
AS
BEGIN
    SELECT DISTINCT
        U.*,
        ISNULL(A.Name, 'DefaultArea') AS UserAreaName,
        ISNULL(R.Name, 'DefaultRole') AS UserRoleName,
        ISNULL(S.Name, 'DefaultSegment') AS UserSegmentName,
        ISNULL(SS.Name, 'DefaultSubSegment') AS UserSubSegmentName
    FROM
        [BSO].[User] U
    LEFT JOIN
        [BSO].[Area] A ON U.UserArea = A.ID
    LEFT JOIN
        [BSO].[Role] R ON U.UserRole = R.ID
    LEFT JOIN
        [BSO].[Segment] S ON U.Segment = S.ID
    LEFT JOIN
        [BSO].[SubSegment] SS ON U.SubSegment = SS.ID
    LEFT JOIN
        BSO.[UserADGroupMapping] M ON U.Id = M.UserId
    WHERE
        U.Oid IS NOT NULL AND U.Oid <> '';
END;
