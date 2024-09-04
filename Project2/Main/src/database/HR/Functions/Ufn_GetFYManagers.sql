




CREATE FUNCTION [HR].[Ufn_GetFYManagers](@IC varchar(150))


RETURNS @ReturnTbl TABLE 
(
   
    IC varchar(150), 
    FY_ManagerAlias nvarchar(100) NULL,
	 FY_ManagerFullName nvarchar(200) NULL,
	MangerLevel Int

)
AS 
BEGIN


; with  CTE as 
        (
        select   IC
        ,       FY_ManagerAlias
		,       FY_ManagerFullName
		,1 as ManagerLevel
        from     HR.Brdg_AliasMgrMapping
        where   IC = @IC
        union all
        select  child.IC
        ,       child.FY_ManagerAlias
		,		child.FY_ManagerFullName 
        ,       ManagerLevel + 1
        from     HR.Brdg_AliasMgrMapping  child
        join    CTE parent
        on      child.IC = parent.FY_ManagerAlias
	        )
        INSERT @ReturnTbl
        SELECT Distinct @IC, FY_ManagerAlias,FY_ManagerFullName  , ManagerLevel From CTE -- Ufn_GetAllmanager 
		Where FY_ManagerAlias is not null
		OPTION (MAXRECURSION 8);

    RETURN;
END;