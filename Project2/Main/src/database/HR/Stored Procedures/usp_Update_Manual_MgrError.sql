




-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [HR].[usp_Update_Manual_MgrError]

AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
   
--Update HR.Tbl_HRData

--SET FY_ManagerAlias='albritz',FY_ManagerFullName ='Alexander Britz' 
--WHERE  IC = 'PVANOVERLOOP' 

    INSERT INTO [HR].[IncorrectManagerLog] (
		[IC]
		,[IC_FullName]
		,[CY_ManagerAlias]
		,[CY_ManagerFullName]
		,[FY_ManagerAlias]
		,[FY_ManagerFullName]
		,[IsActive]
		,[DateCreated]
		,[CreatedBy]
		,[DateModified]
		,[ModifiedBy]
		)
	SELECT IC
		,IC_FullName
		,CY_ManagerAlias
		,CY_ManagerFullName
		,FY_ManagerAlias
		,FY_ManagerFullName
		,1
		,GETUTCDATE()
		,OBJECT_NAME(@@PROCID)
		,GETUTCDATE()
		,OBJECT_NAME(@@PROCID)
	FROM HR.Tbl_HRData_Staging (NOLOCK)
	WHERE IC = FY_ManagerAlias
	

    UPDATE HR.Tbl_HRData_Staging
    SET FY_ManagerAlias = CY_ManagerAlias, FY_ManagerFullName = CY_ManagerFullName
    WHERE IC = FY_ManagerAlias

	UPDATE HR.Tbl_HRData_Staging
	SET FY_ManagerFullName = 'Rick Wagner'
	WHERE FY_ManagerAlias=FY_ManagerFullName AND FY_ManagerAlias='RIWAGNER'

	UPDATE HR.Tbl_HRData_Staging
	SET FY_ManagerFullName = 'Judson Althoff'
	WHERE FY_ManagerAlias=FY_ManagerFullName AND FY_ManagerAlias='JUDSON'

	UPDATE A 
	SET A.FY_ManagerAlias = A.CY_ManagerAlias, A.FY_ManagerFullName = A.CY_ManagerFullName
	FROM HR.Tbl_HRData_Staging A
	INNER JOIN HR.Tbl_HRData_Staging B ON A.IC=B.FY_ManagerAlias AND A.FY_ManagerAlias=B.IC
	WHERE A.CY_ManagerAlias<>A.FY_ManagerAlias



--Update HR.Tbl_HRData

--SET FY_ManagerAlias='VIRSHR',FY_ManagerFullName ='Vishvanathan Ramachandran' 
--WHERE  IC = 'RAVIVD'

 --UPDATE  [HR].[Tbl_HRData] 
 --    SET CY_ManagerAlias = D.[Sending_Manager]
	-- CY_ManagerFullName= D.[Sedning_Manager_name]
	--,[Reports_To_Level_1_Email]= D.[Reports_To_Email_Level_1]
 --     ,[Reports_To_Level_1_Full_Name]= D.[Reports_To_Full_Name_Level_1]
 --     ,[Reports_To_Level_2_Email]= D.[Reports_To_Email_Level_2]
 --     ,[Reports_To_Level_2_Full_Name]= D.[Reports_To_Full_Name_Level_2]
 --     ,[Reports_To_Level_3_Email]= D.[Reports_To_Email_Level_3]
 --     ,[Reports_To_Level_3_Full_Name]= D.[Reports_To_Full_Name_Level_3]
 --     ,[Reports_To_Level_4_Email]= D.[Reports_To_Email_Level_4]
 --     ,[Reports_To_Level_4_Full_Name]= D.[Reports_To_Full_Name_Level_4]
 --     ,[Reports_To_Level_5_Email]= D.[Reports_To_Email_Level_5]
 --     ,[Reports_To_Level_5_Full_Name]= D.[Reports_To_Full_Name_Level_5]
 --     ,[Reports_To_Level_6_Email]= D.[Reports_To_Email_Level_6]
 --     ,[Reports_To_Level_6_Full_Name]= D.[Reports_To_Full_Name_Level_6]
 --     ,[Reports_To_Level_7_Email]= D.[Reports_To_Email_Level_7]
 --     ,[Reports_To_Level_7_Full_Name]= D.[Reports_To_Full_Name_Level_7]

--     FROM  
--         [HR].[Tbl_HRData] H
--         JOIN [HR].[CY_Manager_DataCorrection] D ON H.IC=D.Email  ;
	 
	 
--	 UPDATE  [HR].[Tbl_HRData] 
--     SET CY_ManagerFullName=D.CY_ManagerFullName,
--	 [Reports_To_Level_1_Email]=D.[Reports_To_Level_1_Email]
--,[Reports_To_Level_1_Full_Name]=D.[Reports_To_Level_1_Full_Name]
--,[Reports_To_Level_2_Email]=D.[Reports_To_Level_2_Email]
--,[Reports_To_Level_2_Full_Name]=D.[Reports_To_Level_2_Full_Name]
--,[Reports_To_Level_3_Email]=D.[Reports_To_Level_3_Email]
--,[Reports_To_Level_3_Full_Name]=D.[Reports_To_Level_3_Full_Name]
--,[Reports_To_Level_4_Email]=D.[Reports_To_Level_4_Email]
--,[Reports_To_Level_4_Full_Name]=D.[Reports_To_Level_4_Full_Name]
--,[Reports_To_Level_5_Email]=D.[Reports_To_Level_5_Email]
--,[Reports_To_Level_5_Full_Name]=D.[Reports_To_Level_5_Full_Name]
--,[Reports_To_Level_6_Email]=D.[Reports_To_Level_6_Email]
--,[Reports_To_Level_6_Full_Name]=D.[Reports_To_Level_6_Full_Name]
--,[Reports_To_Level_7_Email]=D.[Reports_To_Level_7_Email]
--,[Reports_To_Level_7_Full_Name]=D.[Reports_To_Level_7_Full_Name]


--  FROM
--         [HR].[Tbl_HRData] H		
--         JOIN  [HR].[Tbl_Seller_Details] D ON H.CY_ManagerAlias= D.CY_ManagerAlias 





-- UPDATE  [HR].[Tbl_HRData] 
--     SET FY_ManagerAlias = D.FYManagerAlias, FY_ManagerFullName= D.FYManagerName
--     FROM  
--         [HR].[Tbl_HRData] H
--         JOIN [HR].[ISP_FYManager_Data_Correction] D ON H.IC=D.Alias;


--	 UPDATE  [HR].[Tbl_HRData] 
--     SET FY_ManagerFullName=D.FY_ManagerFullName
	
--  FROM
--         [HR].[Tbl_HRData] H		
--         JOIN  [HR].[Tbl_Seller_Details] D ON H.FY_ManagerAlias= D.FY_ManagerAlias 

		  UPDATE  [HR].[Tbl_HRData_Staging]
Set [FYManagerChange] = CASE WHEN CY_ManagerAlias = FY_ManagerAlias THEN 'N' ELSE 'Y' END

END