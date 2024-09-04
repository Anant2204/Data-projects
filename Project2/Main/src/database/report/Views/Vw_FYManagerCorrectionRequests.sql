create view  [report].[Vw_FYManagerCorrectionRequests]
as
select 
id
,icAlias
,cyManagerAlias
,fyManagerAlias
,fyCorrectManagerAlias
,status
,comment
,ispUpdateStatus
,ispErrorDetails
,approvedRejectedBy
,approvedRejectedDate
,approverComments
,TwoLevelApprovalRequired
,approvedRejectedByLevel2
,approvedRejectedDateByLevel2
,approverRejecterCommentsByLevel2
,isActive
,createdBy
,createdDate
,modifiedBy
,modifiedDate from hr.Tbl_HRData_FYManagerCorrection