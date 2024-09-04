IF OBJECT_ID('BSO.GetUserByIdFromEmail', 'P') IS NOT NULL

BEGIN
    DROP PROCEDURE BSO.GetUserByIdFromEmail;
END
GO

CREATE PROCEDURE [BSO].[GetUserByIdFromEmail]
    @EmailId NVARCHAR(MAX)  
AS
BEGIN 
   SELECT TOP 1
    U.*,
    ISNULL(A.Name, 'DefaultArea') as UserArea,
    ISNULL(R.Name, 'DefaultRole') as UserRole,
    ISNULL(S.Name, 'DefaultSegment') as UserSegment,
    ISNULL(SS.Name,'DefaultSubSegment') as UserSubSegment
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
    WHERE
       U.UPN = @EmailId;
END;