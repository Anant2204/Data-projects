




CREATE View [HR].[Vw_MCTSendingConversationComplete]
AS
SELECT  T.[IC]
      ,[R1_ConversationStatus]
      ,[R1_EDMValidation]
      ,[R1_Comments]
     
      ,[R1_updatedby]
      ,[R1_update]
	   ,[FY_ManagerAlias]
      ,[FY_ManagerFullName]
	  ,IC_FullName
	  ,SendingEmailsent
	  ,H.[FYManagerChange]
     
      ,[RequestID]
  FROM [HR].[Tbl_HRData_ToolInput] T 
  JOIN [HR].[Tbl_HRData] H ON T.IC = H.IC
  Where R1_ConversationStatus ='Completed'
 and SendingEmailsent IS NULL
 and H.[FYManagerChange]='Y'