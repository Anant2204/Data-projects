import { defineMessages } from "react-intl";

export const messages = defineMessages({
  requiredFieldText: {
    id: "webformpanel.requiredFieldText",
    defaultMessage: "Please fill all the required fields to proceed.",
  },
  submitText: {
    id: "webformpanel.submitText",
    defaultMessage:
      "After clicking 'Submit', you can locate the ticket details in 'Iris Copilot', featuring a summary of the information you provided. Please attach any relevant additional documentation through Iris Copilot and refer to My Help Dashboard for further information about the ticket.",
  },
  formSubmittedText:{
    id:"webformpanel.formSubmittedText",
    defaultMessage:
    "Your ticket has been submitted. Please review the details in IRIS Copilot for more information and attaching files."
  },
  maxPeoplePickerPlaceholderText:{
    id:"webformpanel.maxPeoplePickerLimitReachedText",
    defaultMessage:
    "Maximum selection limit of 5 has been reached"
  },
});

export default messages;
