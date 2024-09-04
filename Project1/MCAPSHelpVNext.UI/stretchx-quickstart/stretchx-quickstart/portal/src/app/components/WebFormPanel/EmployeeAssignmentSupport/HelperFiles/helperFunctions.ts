import * as constants from "./easFormConstants";
export const createFormData = (
  formData,
  selectedRequestType,
  requestTypeOptions,
  props
) => {
  let formDataStructure;
  switch (selectedRequestType) {
    case "Raise Assignment Query":
      formDataStructure = {
        "Request type": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Impacted Alias": formData.impactedAlias
          .map((item) => item.mailNickName)
          .join(";"),
        "Request ID from Employee Assignment Tool": formData.requestId,
        "What is your question?": formData.question,
      };
      break;
    case "Raise Tool Error or Query":
      formDataStructure = {
        "Request type": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Impacted Tool": formData.impactedTool,
        "What kind of issue are you facing?": formData.issueType,
        "Please provide additional detail on the issue you are facing":
          formData.description,
      };
      break;
    case "Raise HR Data Query":
      formDataStructure = {
        "Request type": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Impacted Alias": formData.impactedAlias
          .map((item) => item.mailNickName)
          .join(";"),
        "What type of question do you have?": formData.hrDataQuestionType,
        "What is your specific question or issue?": formData.question,
      };
      break;
    case "Raise Reporting Query":
      formDataStructure = {
        "Request type": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Impacted Report": formData.impactedReport,
        "What is your specific question or issue?": formData.question,
      };
      break;
    default:
      formDataStructure = {};
  }

  // Merge common form data fields
  const commonFormData = {
    "Service Name": props.webFormIrisContext.name,
    "Service Group":
    requestTypeOptions.find(
      (option) => option.key === selectedRequestType
    ).group,
    "Ticket Subject": formData.ticketSubject,
    "Priority": formData.priority,
    "Sales Unit": formData.salesUnit,
    "Additional visibility (CC)": formData.additionalVisibility
      .map((item) => item.upn)
      .join(";"),
  };

  return { ...commonFormData, ...formDataStructure };
};

export const getRequiredClassNameForField = (
  fieldName,
  formValue,
  selectedRequestType,
  isFormInitialLoad,
  config,
  classes
) => {
  if (!isFormInitialLoad) {
    const required =
      config?.[constants.SERVICE_NAME_REQ_TYPE(selectedRequestType)]
        ?.typeOfRequest[selectedRequestType]?.[fieldName]?.required;
    if (
      required && (formValue?.length === 0 ||
      formValue === undefined ||
      formValue === "")
    ) {
      return classes.requiredfield;
    }
  }

  return "";
};
