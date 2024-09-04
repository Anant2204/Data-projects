IF OBJECT_ID('BSO.GetUserByIdFromEmailDetails', 'P') IS NOT NULL

BEGIN
    DROP PROCEDURE BSO.GetUserByIdFromEmailDetails;
END
GO

CREATE PROCEDURE [BSO].[GetUserByIdFromEmailDetails]
    @EmailId NVARCHAR(MAX) ,
    @OID NVARCHAR(MAX)  = NULL
AS
BEGIN 

  IF NOT EXISTS(SELECT 1 FROM  [BSO].[User] U WHERE U.Oid = @OID)
  BEGIN
  UPDATE [BSO].[User] SET Oid = @OID WHERE UPN = @EmailId
  END


  SELECT TOP 1
     U.Id
      ,U.UPN
      ,U.UserArea
      ,U.UserRole     
      ,U.Segment
      ,U.SubSegment
      ,U.DataverseRowID
      ,U.IsActive
	  ,U.IsWelcomeMessage
      ,U.Oid,
    ISNULL(A.Name, 'DefaultArea') as UserAreaName,
    ISNULL(R.Name, 'DefaultRole') as UserRoleName,
    ISNULL(S.Name, 'DefaultSegment') as UserSegmentName,
    ISNULL(SS.Name,'DefaultSubSegment') as UserSubSegmentName
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
GO