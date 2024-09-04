CREATE PROCEDURE [HR].[SwtichStagingToMainTable]
AS
BEGIN

BEGIN TRAN

--Org_CostCenter_Mapping
EXEC sp_rename 'HR.Org_CostCenter_Mapping', 'Org_CostCenter_Mapping_Old';
EXEC sp_rename 'HR.Org_CostCenter_Mapping_Staging', 'Org_CostCenter_Mapping';
EXEC sp_rename 'HR.Org_CostCenter_Mapping_Old', 'Org_CostCenter_Mapping_Staging';

--MCT_EDM_Mapping
EXEC sp_rename 'HR.MCT_EDM_Mapping', 'MCT_EDM_Mapping_Old';
EXEC sp_rename 'HR.MCT_EDM_Mapping_Staging', 'MCT_EDM_Mapping';
EXEC sp_rename 'HR.MCT_EDM_Mapping_Old', 'MCT_EDM_Mapping_Staging';


--MCT_EDM_Mapping_CY
EXEC sp_rename 'HR.MCT_EDM_Mapping_CY', 'MCT_EDM_Mapping_CY_Old';
EXEC sp_rename 'HR.MCT_EDM_Mapping_CY_Staging', 'MCT_EDM_Mapping_CY';
EXEC sp_rename 'HR.MCT_EDM_Mapping_CY_Old', 'MCT_EDM_Mapping_CY_Staging';


--Employee_CYData
EXEC sp_rename 'dbo.Employee_CYData', 'Employee_CYData_Old';
EXEC sp_rename 'dbo.Employee_CYData_Staging', 'Employee_CYData';
EXEC sp_rename 'dbo.Employee_CYData_Old', 'Employee_CYData_Staging';

--HRDataLake_CYData
EXEC sp_rename 'dbo.HRDataLake_CYData', 'HRDataLake_CYData_Old';
EXEC sp_rename 'dbo.HRDataLake_CYData_Staging', 'HRDataLake_CYData';
EXEC sp_rename 'dbo.HRDataLake_CYData_Old', 'HRDataLake_CYData_Staging';

--Tbl_Seller_Details
EXEC sp_rename 'HR.Tbl_Seller_Details', 'Tbl_Seller_Details_Old';
EXEC sp_rename 'HR.Tbl_Seller_Details_Staging', 'Tbl_Seller_Details';
EXEC sp_rename 'HR.Tbl_Seller_Details_Old', 'Tbl_Seller_Details_Staging';

--Tbl_HRData
EXEC sp_rename 'HR.Tbl_HRData', 'Tbl_HRData_Old';
EXEC sp_rename 'HR.Tbl_HRData_Staging', 'Tbl_HRData';
EXEC sp_rename 'HR.Tbl_HRData_Old', 'Tbl_HRData_Staging';

--Dim_Managerhierarchy
EXEC sp_rename 'HR.Dim_Managerhierarchy', 'Dim_Managerhierarchy_Old';
EXEC sp_rename 'HR.Dim_Managerhierarchy_Staging', 'Dim_Managerhierarchy';
EXEC sp_rename 'HR.Dim_Managerhierarchy_Old', 'Dim_Managerhierarchy_Staging';

--MCT_EDMAppoversmapping
EXEC sp_rename 'dbo.MCT_EDMAppoversmapping', 'MCT_EDMAppoversmapping_Old';
EXEC sp_rename 'dbo.MCT_EDMAppoversmapping_Staging', 'MCT_EDMAppoversmapping';
EXEC sp_rename 'dbo.MCT_EDMAppoversmapping_Old', 'MCT_EDMAppoversmapping_Staging';

--User Table  
EXEC sp_rename 'dbo.[User]', 'User_Old';
EXEC sp_rename 'dbo.user_staging', 'User';
EXEC sp_rename 'dbo.User_Old', 'user_staging';

--UserRole Table 
EXEC sp_rename 'dbo.[Userrole]', 'Userrole_Old';
EXEC sp_rename 'dbo.userrole_staging', 'Userrole';
EXEC sp_rename 'dbo.Userrole_Old', 'userrole_staging';


--truncate table [HR].[Tbl_HRData_ToolInput]  
INSERT INTO [HR].[Tbl_HRData_ToolInput]  
           ([IC]   
           ,[R1_ConversationStatus]  
           ,[R1_EDMValidation]          
           ,[R2_ConversationStatus]  
           ,[R2_EDMValidation]
		   , FY_IncentivePlan
		   , FY_CostCenter
)  
SELECT [IC]   
    ,[R1_ConversationStatus] = 'Pending'  
    ,[R1_EDMValidation]     = 'Pending'      
    ,[R2_ConversationStatus] = 'Pending'  
    ,[R2_EDMValidation] = 'Pending' 
	,FY_IncentivePlan
	,FY_CostCenter
FROM [HR].[Tbl_HRData] WHERE IC NOT IN (SELECT DISTINCT IC FROM  [HR].[Tbl_HRData_ToolInput])

COMMIT

END