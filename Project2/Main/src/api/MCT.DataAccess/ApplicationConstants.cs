// <copyright file="ApplicationConstants.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess
{
    /// <summary>
    ///   ApplicationConstants
    /// </summary>
    public static class ApplicationConstants
    {
        /// <summary>The yes</summary>
        public static readonly string Y = "Y";

        /// <summary>The no</summary>
        public static readonly string N = "N";

        /// <summary>The CY</summary>
        public static readonly string CY = "CY";

        /// <summary>The FY</summary>
        public static readonly string FY = "FY";

        /// <summary>
        /// Indicating drop down value as All.
        /// </summary>
        public static readonly string All = "All";

        /// <summary>The required</summary>
        public static readonly string Required = "Required";

        /// <summary>The pending</summary>
        public static readonly string Pending = "Pending";

        /// <summary>The attempted</summary>
        public static readonly string Attempted = "Attempted";

        /// <summary>The completed</summary>
        public static readonly string Completed = "Completed";

        /// <summary>The key message</summary>
        public static readonly string KeyMessage = "KeyMessages to Land";

        /// <summary>The useful resource</summary>
        public static readonly string UsefulResource = "Useful Resources";

        /// <summary>The close</summary>
        public static readonly string Close = "Close";

        /// <summary>The specific change for emp</summary>
        public static readonly string SpecificChangeForEmp = "SpecificChangeForEmployee";

        /// <summary>The specific change optional</summary>
        public static readonly string SpecificContextOptional = "SpecificContextOptional";

        /// <summary>The cy org</summary>
        public static readonly string CY_ORG = "CY_ORG";

        /// <summary>The org</summary>
        public static readonly string ORG = "ORG";

        /// <summary>The to</summary>
        public static readonly string To = "to";

        /// <summary>The OrgChange</summary>
        public static readonly string OrgChange = "Your Org will change from";

        /// <summary>The Discipline</summary>
        public static readonly string Discipline = "Your Discipline will change from";

        /// <summary>The Role Summary</summary>
        public static readonly string RoleSummary = "Your Role Summary will change from";

        /// <summary>The Qualifier1</summary>
        public static readonly string Qualifier1 = "Your Qualifier1 will change from";

        /// <summary>The Qualifier2</summary>
        public static readonly string Qualifier2 = "Your Qualifier2 will change from";

        /// <summary>The  Incentive Plan</summary>
        public static readonly string IncentivePlan = "Your  Incentive Plan will change from";

        /// <summary>The  Career Stage </summary>
        public static readonly string CareerStage = "Your  Career Stage will change from";

        /// <summary>The discipline context</summary>
        public static readonly string DisciplineContext = "<ul><li>You will be able to find all your specific  compensation info RAIN... </li><li>For any questions, please reach out to your manager or HRBP</li></ul>";

        /// <summary>The is System</summary>
        public static readonly string System = "System";

        /// <summary>The send stay.</summary>
        public static readonly string SendStay = "sendstay";

        /// <summary>The receive.</summary>
        public static readonly string Receive = "receive";

        /// <summary>
        /// The fy manager request intiated status
        /// </summary>
        public static readonly string FYManagerCorrectionRequestInitiatedStatus = "Request Initiated";


        /// <summary>
        /// The fy manager Pending Approval status
        /// </summary>
        public static readonly string FYManagerCorrectionPendingApprovalStatus = "Pending Approval";

        /// <summary>
        /// The fy manager update level 1 status
        /// </summary>
        public static readonly string FYManagerCorrectionApprovedLevelOneStatus = "Interim Approved";

        /// <summary>
        /// The fy manager update level 2  status
        /// </summary>
        public static readonly string FYManagerCorrectionApprovedLevelTwoStatus = "Approved";

        /// <summary>
        /// The fy manager update status
        /// </summary>
        public static readonly string FYManagerUpdateRejectedStatus = "Rejected";

        /// <summary>
        /// The ManagerRole
        /// </summary>
        public static readonly string ManagerRole = "Manager";

        /// <summary>
        /// The Admin Role
        /// </summary>
        public static readonly string AdminRole = "Admin";

        /// <summary>
        /// The ScriptContributor role.
        /// </summary>
        public static readonly string ScriptContributorRole = "Script Contributor";

        /// <summary>
        /// The DelegateRole
        /// </summary>
        public static readonly string DelegateRole = "Delegate";

        /// <summary>
        /// The EdmLeadRole
        /// </summary>
        public static readonly string EdmLeadRole = "EDM Lead";

        /// <summary>
        /// The SuperUsers
        /// </summary>
        public static readonly string SuperUsers = "Super User";

        /// <summary>
        /// Exception as review status.
        /// </summary>
        public static readonly string ExceptionReviewStatus = "Exception";

        /// <summary>
        /// The Script contributor Role
        /// </summary>
        public static readonly string ScriptContributor = "Script Contributor";

        /// <summary>
        /// The ReadyForReview status
        /// </summary>
        public static readonly string ReadyForReview = "Ready For Review";

        /// <summary>
        /// The Approved status
        /// </summary>
        public static readonly string Approved = "Approved";

        /// <summary>The Submitted</summary>
        public static readonly string Submitted = "Submitted";

        /// <summary>The UniqueConstraintErrorCode</summary>
        public static readonly int UniqueConstraintErrorCode = 2627;

        /// <summary>
        /// AG grid license key.
        /// </summary>
        public static readonly string AgGridLicenseKey = "MCTAPI--AGGrid--LicenseKey";
    }

    /// <summary>
    ///  Message Constants
    /// </summary>
    public static class MessageConstants
    {

        /// <summary>
        /// The fy manager update error message
        /// </summary>
        public static readonly string FYManagerUpdateActiveRequestErrorMessage = "Your request cannot be submitted. There is already an active request for manager update. You will receive email notification when the existing request is approved or rejected.";

        /// <summary>
        /// The fy manager update error message
        /// </summary>
        public static readonly string EmployeeReviewStatusErrorMessage = "This employee's data is under review and cannot be edited. Please check back soon";
        /// <summary>
        /// The taxonomy correction error message
        /// </summary>
        public static readonly string TaxonomyUpdateActiveRequestErrorMessage = "Your request cannot be submitted. There is already an active request for taxonomy update created by {0}.Would you like to proceed to submit another request";

        /// <summary>
        /// The fy manager update status
        /// </summary>
        public static readonly string FYManagerCorrectionRequestInitiatedStatus = "Request Initiated";

        /// <summary>
        /// The fy manager update level 1 status
        /// </summary>
        public static readonly string FYManagerCorrectionApprovedLevelOneStatus = "Intermin Approved";

        /// <summary>
        /// The fy manager update level 2  status
        /// </summary>
        public static readonly string FYManagerCorrectionApprovedLevelTwoStatus = "Approved";

        /// <summary>
        /// The fy manager update status
        /// </summary>
        public static readonly string FYManagerUpdateRejectedStatus = "Rejected";

        /// <summary>
        /// The taxonomy correction request submitted status.
        /// </summary>
        public static readonly string TaxonomyCorrectionRequestSubmittedStatus = "Submitted";

        /// <summary>
        /// The fy manager update error message
        /// </summary>
        public static readonly string FYManagerNotUpdateMessage = "Failed to create the Future Year Manager Update request. Please try again after some time.";

        /// <summary>
        /// The taxonomy correction error message
        /// </summary>
        public static readonly string TaxonomyCorrectionFailureMessage = "Failed to create the Taxonomy Correction request. Please try again after some time.";

        /// <summary>
        /// The taxonomy correction invalid request.
        /// </summary>
        public static readonly string TaxonomyCorrectionInvalidRequest = "Failed to create the taxonomy correction reqquest. No record found with this data.";

        /// <summary>
        /// The update successful message.
        /// </summary>
        public static readonly string CorrectionRequestSuccessMessage = "Your request has been submitted successfully.";

        /// <summary>
        /// The fy manager update successful message
        /// </summary>
        public static readonly string FYManagerCircularReferenceErrorMessage = "We cannot proceed with this update as system has detected a circular reference. Please reach out to support for assistance";

        /// <summary>
        /// The fy manager update failure message when tagged as exception
        /// </summary>
        public static readonly string FYManagerUpdateExceptionFailureMessage = "We cannot proceed with this update. Please reach out to support for assistance";

        /// <summary>
        /// The Taxonomy Change Context Already Exists
        /// </summary>
        public static readonly string TaxonomyChangeContextAlreadyExistsMessage = "Taxonomy Change Context Script already exists for given taxonomy combinations, please try with other values";

        /// <summary>
        ///  Invalid manager. Please contact support
        /// </summary>
        public static readonly string InvalidManagerErrorMessage = "Invalid manager. Please contact support.";

    }
}
