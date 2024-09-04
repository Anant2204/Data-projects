import { defineMessages } from "react-intl";

export const messages = defineMessages({
  commonError: {
    id: "editScenarioPanel.commonError",
    defaultMessage: "Something went wrong. Please try again later.",
  },
  viewEditScenarioTitle: {
    id: "editScenarioPanel.viewEditScenarioTitle",
    defaultMessage: "Add/Edit Script Details",
  },
  scenarioNameLabel: {
    id: "editScenarioPanel.scenarioNameLabel",
    defaultMessage: "Scenario Name",
  },
  startMonthLabel: {
    id: "editScenarioPanel.startMonthLabel",
    defaultMessage: "Start Month",
  },
  saveBtnLabel: {
    id: "editScenarioPanel.saveBtnLabel",
    defaultMessage: "Update",
  },
  nameRequiredError: {
    id: "editScenarioPanel.nameRequiredError",
    defaultMessage: "Scenario Name is required",
  },
  emptyErrorMessage: {
    id: "editScenarioPanel.emptyErrorMessage",
    defaultMessage: "This Name cannot be empty",
  },
  nameLessChar: {
    id: "editScenarioPanel.nameLessChar",
    defaultMessage: "Name must be less than 40 characters.",
  },
  loading: {
    id: "editScenarioPanel.loading",
    defaultMessage: "Loading..",
  },
  createFlyoutTitle: {
    id: "createFlyout.title",
    defaultMessage: "Script Title",
  },
  //specificContextOptional
  specificContextOptional: {
    id: "createFlyout.specificContextOptional",
    defaultMessage: "Segment Change Context",
  },
  //disciplineContextOptional
  disciplineContextOptional: {
    id: "createFlyout.disciplineContextOptional",
    defaultMessage: "Taxonomy Change Context",
  },
  updateConversationScriptMessage: {
    id: 'createConversation.updateConversationScriptMessage',
    defaultMessage: 'Conversation script has been successfully saved!',
  },
  saveAndCloseErrorMessage : {
    id: 'header.saveAndCloseErrorMessage',
    defaultMessage: 'Something went worng',
  },
});
