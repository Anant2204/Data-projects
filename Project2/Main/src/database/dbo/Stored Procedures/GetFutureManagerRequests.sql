CREATE PROCEDURE [dbo].[GetFutureManagerRequests]              
 @loggedInUserAlias NVARCHAR(100),              
 @completeView BIT,              
 @rolesList NVARCHAR(200)              
AS              
BEGIN
    BEGIN TRY       
        DECLARE @managers TABLE (ManagerAlias NVARCHAR(50), FullName NVARCHAR(300), IsDefaultSelection BIT DEFAULT 0)              
        INSERT INTO @managers (ManagerAlias, FullName, IsDefaultSelection)          
        EXEC [dbo].[getManagersList] @loggedInUserAlias, @completeView, @rolesList          

        SELECT             
        FYCR.[icAlias],       
        FYCR.ID,    
        HRD.IC_FullName as [EmployeeName],            
        FYCR.[cyManagerAlias],            
        HRD.CY_ManagerFullName as [CurrentYearManager],            
        FYCR.[fyManagerAlias],            
        HRD.FY_ManagerFullName as [CurrentFutureYearManager],            
        FYCR.[fyCorrectManagerAlias],            
        HRDP.IC_FullName as [ProposedFutureYearManager],            
        FYCR.[status],            
        FYCR.[comment],            
        FYCR.[ispUpdateStatus],            
        FYCR.[ispErrorDetails],            
        FYCR.[isActive],            
        FYCR.[createdBy],            
        FYCR.[createdDate],            
        FYCR.[modifiedBy],            
        FYCR.[modifiedDate],            
        CASE When FYCR.approvedRejectedByLevel2 is null Then FYCR.[approvedRejectedBy] else FYCR.approvedRejectedByLevel2 END  as  approvedRejectedBy,   
		CASE When FYCR.approvedRejectedDateByLevel2 is null Then FYCR.[approvedRejectedDate] else FYCR.approvedRejectedDateByLevel2 END  as  approvedRejectedDate,  
		CASE When FYCR.approverRejecterCommentsByLevel2 is null Then FYCR.[approverComments] else FYCR.approverRejecterCommentsByLevel2 END  as  approverComments,   
        CAST(0 AS BIT)as canApprove           
        into #tempTable          
        FROM [HR].Tbl_HRData_FYManagerCorrection FYCR            
        LEFT JOIN [HR].TBL_HrData HRD ON HRD.IC = FYCR.icAlias            
        LEFT JOIN [HR].TBL_HrData HRDP ON HRDP.IC = FYCR.[fyCorrectManagerAlias]            
        LEFT JOIN @managers CYMGR ON FYCR.cyManagerAlias = CYMGR.ManagerAlias             
        LEFT JOIN @managers FYMGR ON fycr.fyManagerAlias = FYMGR.ManagerAlias            
        LEFT JOIN @managers PROPMGR ON fycr.fyCorrectManagerAlias = PROPMGR.ManagerAlias            
        WHERE FYCR.isActive = 1 AND (CYMGR.ManagerAlias IS NOT NULL             
        OR FYMGR.ManagerAlias IS NOT NULL             
        OR PROPMGR.ManagerAlias IS NOT NULL)            

        DECLARE @idList VARCHAR(MAX);   

        DECLARE @fyManagerApprovalAccess TABLE (id int, hasAccess bit DEFAULT 0)                                  

        SELECT @idList = STRING_AGG(ID, ', ')        
        FROM #tempTable;     

        Insert into @fyManagerApprovalAccess         
        exec [dbo].[UpdateFYManagerCorrectionsApprovalAccess] @loggedInUserAlias,@idList ,@rolesList           

        UPDATE a                  
        SET a.canApprove = r.hasAccess                 
        FROM #tempTable a                  
        INNER JOIN @fyManagerApprovalAccess r ON a.ID = r.Id

        select * from #tempTable
    END TRY
  BEGIN CATCH
    THROW;
  END CATCH 
END  