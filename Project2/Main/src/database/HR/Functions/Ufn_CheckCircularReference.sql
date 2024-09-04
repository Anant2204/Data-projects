CREATE   FUNCTION HR.Ufn_CheckCircularReference(
@ICalias NVARCHAR(50),  --this is the alias of the IC  
@Mgralias  NVARCHAR(50)) --this is the alias of the mananger 
RETURNS BIT AS
BEGIN
    DECLARE @result BIT;

	IF EXISTS(SELECT IC
  FROM hr.Dim_Managerhierarchy (NOLOCK)
WHERE    IC=@Mgralias and  ManagerAlias=@ICalias
    ) 
  set @result=1
ELSE
 set @result=0

	  RETURN @result;
END;