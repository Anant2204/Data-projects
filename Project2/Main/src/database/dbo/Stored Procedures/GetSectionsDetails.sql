 CREATE PROCEDURE [dbo].[GetSectionsDetails]                                              
 @empAlias NVARCHAR(200),                                        
 @isSendOrReceive NVARCHAR(50)                                            
AS                                              
BEGIN                     
    DECLARE @sectionDetails TABLE (SectionName NVARCHAR(50),DisplayName NVARCHAR(50), SectionValue NVARCHAR(max))                                              
    DECLARE @CYOrg Nvarchar(200),@FYOrg Nvarchar(200),@CYRoleSummary Nvarchar(200),@FYRoleSummary Nvarchar(200),@CyQ1 Nvarchar(200), @CyIncentivePlan Nvarchar(200), @FyIncentivePlan Nvarchar(200) ,
    @CYQ2 Nvarchar(200),@FYQ1 Nvarchar(200),@FYQ2 Nvarchar(200)                                        
    DECLARE @Title Nvarchar(200),@Content Nvarchar(500) ,@IsGenerateTitle bit =0                             
                                        
    
    


 --ScriptStaticContent                                        
 INSERT INTO @sectionDetails (SectionName, DisplayName,SectionValue)                                        
                                         
 Select h.sectionName, h.DisplayName,s.content     
 from [DBO].[ScriptStaticContent]  as s     
 Join [DBO].[SectionHeaderMapping] as h                                        
 on s.sectionName = h.sectionName                                        
 where h.IsActive = 1 and s.isActive=1 and s.conversationType=@isSendOrReceive                                        
                                        
 --OpeningSection                                        
 INSERT INTO @sectionDetails (SectionName, DisplayName,SectionValue)                                        
                                         
 Select h.sectionName, h.DisplayName,s.content from [DBO].[ScriptOpeningContent]                                         
 as s Join [DBO].[SectionHeaderMapping] as h                                        
 on s.sectionName = h.sectionName                                        
 where s.sectionName = 'OpeningContext'  and h.IsActive = 1  and                                          
 s.fyOrgLeaderAlias = (select Reports_To_Level_1_Email from [HR].Tbl_HRData where Ic= @empAlias)                                        
                                        
 ----Segment Change Context                                         
 INSERT INTO @sectionDetails (SectionName, DisplayName,SectionValue)                                        
                                         
 Select h.sectionName, h.DisplayName,s.content from [DBO].[ScriptSegmentContent]                                         
 as s Join [DBO].[SectionHeaderMapping] as h                                        
 on s.sectionName = h.sectionName                                        
 where s.sectionName = 'SegmentContext'  and h.IsActive = 1  and                                          
 s.fyOrg = (select FY_Org from [HR].Tbl_HRData where Ic= @empAlias)     
                                            
                       
                             
    --Title and Taxonomy                                            
                                         
 DECLARE @TempTable TABLE (                                        
 [ID] [int] IDENTITY(1,1) NOT NULL,                                        
 [cyOrg] [nvarchar](40) NULL,                                        
 [cyRoleSummary] [nvarchar](50) NULL,                                        
 [cyQ1] [nvarchar](50) NULL,                                        
 [cyQ2] [nvarchar](50) NULL,                                        
 [fyOrg] [nvarchar](40) NULL, 
 [cyIncentivePlan] [nvarchar](50) NULL,                                        
 [FyIncentivePlan] [nvarchar](50) NULL,                                        
 [fyRoleSummary] [nvarchar](50) NULL,                                        
 [fyQ1] [nvarchar](50) NULL,                                        
 [fyQ2] [nvarchar](50) NULL,                                        
 [content] [nvarchar](max) NULL,                                    
 [status] [nvarchar](50) NULL,                                        
 [title] [nvarchar](500) NULL,                                        
 [isActive] [bit] NULL,                                        
 [modifiedBy] [nvarchar](40) NULL,                                        
 [modifiedDate] [datetime] NULL)                                        
                                        
 Insert Into @TempTable                                         
SELECT s.cyOrg,      
s.cyRoleSummary,              
s.cyQ1,                 
s.cyQ2,                
s.[fyOrg],              
s.[fyRoleSummary],          
s.[fyQ1],              
s.[fyQ2],
s.[cyIncentivePlan],
s.[fyIncentivePlan],
s.[content], 
s.[status], 
s.[title],  
s.[isActive], 
s.[modifiedBy],
s.[modifiedDate] 
FROM [HR].[ScriptTaxonomyContent] s 
JOIN [HR].[Tbl_HRData] h ON (s.cyOrg = 'All' OR s.cyOrg = h.Cy_Org)        
AND (s.cyQ1 = 'All' OR s.cyQ1 = h.CY_Q1)  
AND (s.cyQ2 = 'All' OR s.cyQ2 = h.CY_Q2)  
AND (s.cyRoleSummary = 'All' OR s.cyRoleSummary = h.CY_RoleSummary)
And (s.cyIncentivePlan = 'All' or s.cyIncentivePlan = h.CY_IncentivePlan) 
And(s.fyIncentivePlan = 'All' or s.fyIncentivePlan = h.FY_IncentivePlan) 
AND (s.FyQ1 = 'All' OR s.FyQ1 = h.FY_Q1)         
AND (s.FyQ2 = 'All' OR s.FyQ2 = h.FY_Q2)  
AND (s.fyRoleSummary = 'All' OR s.fyRoleSummary = h.FY_RoleSummary)
AND (s.fyOrg = 'All' OR s.fyOrg = h.FY_Org) 
LEFT JOIN [DBO].[ScriptExclusion] AS e ON s.Id = e.scriptId AND ((e.IsActive = 1 OR e.isActive IS NULL)     
AND ((e.alias IS NULL) OR (e.alias != '' AND 
(NOT EXISTS (SELECT 1 FROM Hr.Dim_Managerhierarchy WHERE ic = h.IC AND MType = 'FY' AND ManagerAlias = e.alias)))))
WHERE h.IC= @empAlias
AND s.IsActive = 1 
AND s.[status] = 'Approved' 
AND NOT EXISTS (SELECT 1 FROM dbo.scriptExclusion AS e WHERE e.scriptId = s.Id AND e.isActive = 1 AND alias IN (SELECT ManagerAlias FROM Hr.Dim_Managerhierarchy WHERE ic = @empAlias AND MType = 'FY'))               
                                                           
 IF Exists (select 1 from @TempTable)                                        
 Begin                                         
                                   
 WITH AllCountCTE AS (                        
  SELECT                        
    *,                        
    RANK() OVER (ORDER BY                         
      (CASE WHEN cyOrg = 'All' THEN 1 ELSE 0 END +                        
       CASE WHEN cyQ1 = 'All' THEN 1 ELSE 0 END +                        
       CASE WHEN cyQ2 = 'All' THEN 1 ELSE 0 END +                        
    CASE WHEN cyRoleSummary = 'All' THEN 1 ELSE 0 END +        
	CASE WHEN cyIncentivePlan = 'All' THEN 1 ELSE 0 END +                        
    CASE WHEN FyQ1 = 'All' THEN 1 ELSE 0 END +                        
    CASE WHEN FyQ2 = 'All' THEN 1 ELSE 0 END +                        
    CASE WHEN fyOrg = 'All' THEN 1 ELSE 0 END +                        
    CASE WHEN fyRoleSummary = 'All' THEN 1 ELSE 0 END  + 
	CASE WHEN fyIncentivePlan = 'All' THEN 1 ELSE 0 END                     

      ) ASC                        
    ) AS rnk                        
  FROM @TempTable                        
)                        
                             
 --if got more than pick first updated                            
 SELECT TOP 1  @Title = Title,@Content= Content FROM  AllCountCTE                                          
 WHERE rnk = 1                                         
 ORDER By [modifiedDate] DESC                              
                             
  --Taxonomy                             
 If(@Content is not null)                            
 begin                            
  INSERT INTO @sectionDetails (SectionName, DisplayName,SectionValue)                                        
 select (select sectionName from  [DBO].[SectionHeaderMapping] where sectionName = 'TaxonomyContext' and isActive=1)  as SectionName,                                        
 (select displayName from  [DBO].[SectionHeaderMapping] where sectionName = 'TaxonomyContext' and isActive=1) as DisplayName,                                        
  @Content                               
 end                            
                                     
 --Title                                        
 If(@Title is not null and @Title !='')                                        
 Begin                                        
      INSERT INTO @sectionDetails (SectionName, DisplayName,SectionValue)                                        
   select (select sectionName from  [DBO].[SectionHeaderMapping] where sectionName = 'Title') as SectionName,                                        
   (select displayName from  [DBO].[SectionHeaderMapping] where sectionName = 'Title') as DisplayName,                                        
   @Title                                        
 End                                        
 else                                        
 Begin                      
  set @IsGenerateTitle = 1                    
 end                                       
                                 
end                                         
else                            
 Begin                      
   set @IsGenerateTitle = 1                    
 End                                    
                                                     
 If(@IsGenerateTitle = 1)                    
 Begin                    
 select  @CYOrg=CY_Org,@FYOrg=FY_Org,@CYRoleSummary=CY_RoleSummary,@FYRoleSummary=FY_RoleSummary ,
 @CyIncentivePlan = Cy_IncentivePlan ,@FyIncentivePlan = Fy_IncentivePlan,               
     @CyQ1 = CY_Q1,@CYQ2= CY_Q2,@FYQ1=FY_Q1,@FYQ2=FY_Q2                                         
    from HR.tbl_Hrdata where Ic= @empAlias                      
    SET @Title =''                            
    If(@CYOrg = @FYOrg)                                      
    set @Title = @Title + @CYOrg   +' | '                                   
    If(@CYOrg != @FYOrg)                                      
    set @Title = @Title + @CYOrg +' To '+@FYOrg   +' | '                                   
    If(@CYRoleSummary = @FYRoleSummary)                                      
    set @Title = @Title + @CYRoleSummary                                       
    If(@CYRoleSummary != @FYRoleSummary)                                      
    set @Title = @Title + @CYRoleSummary +' To '+@FYRoleSummary                                        
    If(@CYRoleSummary = @FYRoleSummary and @CYOrg = @FYOrg)                                      
     Begin                                      
       If(@CyQ1 = @FYQ1 )                                      
       set @Title =  @Title  +' | '+ @CyQ1                
       If(@CYQ1 != @FYQ1)                                      
       set @Title =  @Title +' | ' + @CYQ1 +' To '+@FYQ1                                   
       If(@CYQ2 = @FYQ2 )                                      
       set @Title = @Title + ' | '+ @CYQ2                                   
       If(@CYQ2 != @FYQ2)                                      
       set @Title = @Title + ' | ' + @CYQ2 +' To '+@FYQ2
	   If(@CyIncentivePlan = @FyIncentivePlan)                                      
       set @Title = @Title + ' | ' + @CyIncentivePlan  
	   If(@CyIncentivePlan != @FyIncentivePlan)                                      
       set @Title = @Title + ' | ' + @CyIncentivePlan +' To '+@FyIncentivePlan  
    End                    
     INSERT INTO @sectionDetails (SectionName, DisplayName,SectionValue)                                        
   select (select sectionName from  [DBO].[SectionHeaderMapping] where sectionName = 'Title' and isActive=1) as SectionName,                                        
   (select displayName from  [DBO].[SectionHeaderMapping] where sectionName = 'Title' and isActive=1) as DisplayName,                                        
   @Title                     
 End                    
                                            
                                                        
SELECT SectionName, SectionValue, DisplayName  FROM @sectionDetails      
END