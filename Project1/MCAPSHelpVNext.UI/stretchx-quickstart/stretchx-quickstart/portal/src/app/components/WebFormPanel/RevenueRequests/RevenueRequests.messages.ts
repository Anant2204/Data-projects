import { defineMessages } from "react-intl";

export const messages = defineMessages({
  requiredFieldText: {
    id: "employeeAssignmentSupport.requiredFieldText",
    defaultMessage: "Please fill all the required fields to proceed.",
  },
  submitText: {
    id: "employeeAssignmentSupport.submitText",
    defaultMessage:
      "After clicking 'Submit', you can locate the ticket details in 'Iris Copilot', featuring a summary of the information you provided. Please attach any relevant additional documentation through Iris Copilot and refer to My Help Dashboard for further information about the ticket.",
  },
  typeofRequestText: {
    id: "employeeAssignmentSupport.typeofRequestText",
    defaultMessage: "Type of Request Information",
  },
  assignmentQuestionText: {
    id: "employeeAssignmentSupport.assignmentQuestionText",
    defaultMessage: "If you need to create a new assignment for yourself or your team or edit existing assignments, use the {link}. Use this form if you have an assignment question that you cannot address through the tool. This form cannot be used to initiate assignment requests that can be handled via the Employee Assignment tool.",
  },
  assignmentQuestionTextLink: {
    id: "employeeAssignmentSupport.assignmentQuestionTextLink",
    defaultMessage: "<a href='https://usbso.microsoft.com/EmployeeAssignment' target='_blank'>MSUS Employee Assignment tool</a>",
  },
  toolErrorQuestionText: {
    id: "employeeAssignmentSupport.toolErrorQuestionText",
    defaultMessage:
      "Use this form to request assistance on Employee Assignment related tools. If you need assistance with Employee Central, please reach out to AskHR as we do not have visibility to that tool. If you do not see the tool listed that you are looking for help on, use a different Help Category.",
  },
  hrDataQuestionText: {
    id: "employeeAssignmentSupport.hrDataQuestionText",
    defaultMessage:
      "Field managers can update HR data in {Employee Central} or by reaching out to AskHR. Questions on comp plans or comp design should be routed to your {Field Advisor} . Use this form if you are unsure of whether a change is required.",
  },
  hrDataQuestionTextEmployeeCentralLink: {
    id: "employeeAssignmentSupport.hrDataQuestionTextEmployeeCentralLink",
    defaultMessage: "<a href='https://hcm41.sapsf.com/sf/start?_s.crb=Ln62cdIUtGFSrs92TBavGUHu0npplahqUW%252fNXRfBx%252bY%253d' target='_blank'>Employee Central</a>",
  },
  hrDataQuestionTextFieldAdvisorLink: {
    id: "employeeAssignmentSupport.hrDataQuestionTextFieldAdvisorLink",
    defaultMessage: "<a href='https://microsoft.sharepoint.com/teams/IncentiveCompensationGuide/SitePages/For%20Managers/FCARole.aspx?OR=Teams-HL&CT=1625868142786' target='_blank'>Field Advisor</a>",
  },
  reportingQuestionText: {
    id: "employeeAssignmentSupport.reportingQuestionText",
    defaultMessage:
      "Use this form if you have questions or access issues with a report that is related to Employee Assignment, a new report and the report is not in MSXi. For MSXi reports, leverage the support functionality within MSXi. If the report you have questions on is not listed, please return to the Help Category dropdown and select an alternate category.",
  },
  formSubmittedText:{
    id:"employeeAssignmentSupport.formSubmittedText",
    defaultMessage:
    "Your ticket has been submitted. Please review the details in IRIS Copilot for more information and attaching files."
  },
  maxPeoplePickerPlaceholderText:{
    id:"employeeAssignmentSupport.maxPeoplePickerLimitReachedText",
    defaultMessage:
    "Maximum selection limit of 5 has been reached"
  },
  issueDetails:{
    id:"revenueRequest.issueDetailsSectionII",
    defaultMessage:
    "Section 2 - Issue Details"
  },
  intlClrngPrgmSubmInfo:{
    id:"revenueRequest.intlClrngPrgmSubmInfo",
    defaultMessage:
    "Please fill out the form below to submit an International Clearing Program ticket. This form will be used to research your international revenue dispute and submit a ticket to the WW team on your behalf if applicable. To learn more about the International Clearing Program please reference this {link}."
  },
  intlClrngPrgmSubmInfoLink:{
    id:"revenueRequest.intlClrngPrgmSubmInfoLink",
    defaultMessage:
    "<a href='https://microsoft.sharepoint.com/teams/wwmofieldguide/SitePages/International-Clearing-(ICP).aspx' target='_blank'>link</a>"
  },
  genIntlQnInfo:{
    id:"revenueRequest.genIntlQnInfo",
    defaultMessage:
    "Please fill out the form below to submit a general international question. This form will be used to research your international revenue issue."
  },
  genIntlQnInfoLink:{
    id:"revenueRequest.genIntlQnInfo",
    defaultMessage:""
  }
});

export default messages;
