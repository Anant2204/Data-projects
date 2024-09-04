import * as constants from "./easFormConstants";

export const createFormData = (
  formData,
  selectedRequestType,
  requestTypeOptions,
  config,
  props
) => {
  let formDataStructure;
  switch (selectedRequestType) {
    case "CleanMAL (bulk)":
      formDataStructure = {
        "Request type": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Description": formData.description,
        "Ticket Subject":formData.ticketSubject
      };
      break;
    case "RevEx (Internal Only)":
      formDataStructure = {
        "Request type": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Description": formData.description,
        "Ticket Subject":formData.ticketSubject
      };
      break;
    case "Research Account Alignment & Setup":
      formDataStructure = {
        "Request type": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Description": formData.description,
        "Ticket Subject":formData.ticketSubject
      };
      break;
    default:
      formDataStructure = {};
  }

  // Merge common form data fields
  const commonFormData = {
    "Service Name": props.webFormIrisContext.name,
    "Service Group": requestTypeOptions.find(
      (option) => option.key === selectedRequestType
    ).group,
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
  isFormInitialLoad,
  config,
  selectedRequestType,
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
