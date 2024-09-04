import { defineMessages } from "react-intl";

export const messages = defineMessages({
  requiredFieldText: {
    id: "awardrequest.requiredFieldText",
    defaultMessage: "Please fill all the required fields to proceed.",
  },
  submitText: {
    id: "awardrequest.submitText",
    defaultMessage:
      "After clicking 'Submit', you can locate the ticket details in 'Iris Copilot', featuring a summary of the information you provided. Please attach any relevant additional documentation through Iris Copilot and refer to My Help Dashboard for further information about the ticket.",
  },
  typeofRequestText: {
    id: "awardrequest.typeofRequestText",
    defaultMessage: "Type of Request Information",
  },
  assignmentQUestionText: {
    id: "awardrequest.assignmentQUestionText",
    defaultMessage:
      "If you need to create a new assignment for yourself or your team or edit existing assignments, use the MSUS Employee Assignment tool. Use this form if you have an assignment question that you cannot address through the tool. This form cannot be used to initiate assignment requests that can be handled via the Employee Assignment tool.",
  },
  toolErrorQuestionText: {
    id: "awardrequest.toolErrorQuestionText",
    defaultMessage:
      "Use this form if you have questions or access issues with a report that is related to Employee Assignment, a new report and the report is not in MSXI. For MSXI reports, leverage the support functionality within MSXI. If the report you have questions on is not listed, please return to the Help Category dropdown and select an alternate category.",
  },
  hrDataQuestionText: {
    id: "awardrequest.hrDataQuestionText",
    defaultMessage:
      "Field managers can update HR data in Employee Central or by reaching out to AskHR. Questions on comp plans or comp design should be routed to your Field Advisor. Use this form if you are unsure of whether a change is required.",
  },
  reportingQuestionText: {
    id: "awardrequest.reportingQuestionText",
    defaultMessage:
      "Use this form if you have questions or access issues with a report that is related to Employee Assignment, a new report and the report is not in MSXI. For MSXI reports, leverage the support functionality within MSXI. If the report you have questions on is not listed, please return to the Help Category dropdown and select an alternate category.",
  },
  formSubmittedText: {
    id: "awardrequest.formSubmittedText",
    defaultMessage:
      "Your ticket has been submitted. Please review the details in IRIS Copilot for more information and attaching files.",
  },
  maxPeoplePickerPlaceholderText: {
    id: "awardrequest.maxPeoplePickerLimitReachedText",
    defaultMessage: "Maximum selection limit of 5 has been reached",
  },
});

export default messages;
