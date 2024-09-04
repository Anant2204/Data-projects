

CREATE FUNCTION [HR].[Ufn_GetCYManagers](@IC varchar(150))


RETURNS @ReturnTbl TABLE 
(
   
    IC varchar(150), 
    CY_ManagerAlias nvarchar(100) NULL,
	 CY_ManagerFullName nvarchar(200) NULL,
	MangerLevel Int

)
AS 
BEGIN


; with  CTE as 
        (
        select   IC
        ,       CY_ManagerAlias
		,       CY_ManagerFullName
		,1 as ManagerLevel
        from     HR.Brdg_AliasMgrMapping
        where   IC = @IC
        union all
        select  child.IC
        ,       child.CY_ManagerAlias
		,		child.CY_ManagerFullName 
        ,       ManagerLevel + 1
        from     HR.Brdg_AliasMgrMapping  child
        join    CTE parent
        on      child.IC = parent.CY_ManagerAlias
	        )
        INSERT @ReturnTbl
        SELECT Distinct @IC, CY_ManagerAlias,CY_ManagerFullName  , ManagerLevel From CTE -- Ufn_GetAllmanager 
		Where CY_ManagerAlias is not null
		OPTION (MAXRECURSION 8);

    RETURN;
END;