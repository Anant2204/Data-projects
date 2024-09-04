
export const initialFormData = (selectedRequestType,selectedSubcategory,config) => ({
  // Common fields
  typeOfRequest: selectedRequestType  ,
  ticketSubject: "",
  priority: config?.["Priority"]?.[3]?.key,
  salesUnit: "",
  additionalVisibility: [],

  subcategory: selectedSubcategory,
  estimatedRevenueImpact: "",
  impactedRevenueAmount: "",
  impactedTPID: "",
  relatedIDType: "",
  relatedIDValue: "",
  provideDescription: "",
  resellerOfShipment: "",
  surfaceDevicesAccessory: [],
  numberOfUnitsMissing: "",
  expectedRevenueDate: "",
  warranty: "",
  destinationAccount: [],
  accountWhereShipmentLands: [],
  issueDescription: "",
  operatingUnit: "",
  ICPScenarios: "",
  subsidiaryRevenueGoTo: "",
  internationalTPID: "",
  azureOnly: "",
  contractType: "",
  enrollmentNumber: "",
  totalRevenueUnderEnrollment: "",
  revenueOwedToOU: "",
});


export const createFormData = (
  formData,
  selectedRequestType,
  selectedSubcategory,
  requestTypeOptions,
  props
) => {
  let formDataStructure;

  switch (selectedRequestType) {
    case "Request Missing Revenue":
      formDataStructure = {
        "Request type": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Subcategory": formData?.subcategory,
        "Ticket Subject": formData?.ticketSubject,
        "Priority": formData?.priority,
        "Sales Unit": formData?.salesUnit,
        "Provide Description of issue": formData?.issueDescription,
      };

      // Additional fields based on selected subcategory
      if (
        [
          "Billed",
          "Azure Consumed Revenue (ACR)",
          "Support",
          "Consulting & Delivery",
          "Usage",
        ].includes(selectedSubcategory)
      ) {
        formDataStructure = {
          ...formDataStructure,
          "What is the impacted Revenue amount in $?":
            formData?.impactedRevenueAmount,
          "Related ID Type": formData?.relatedIDType,
        };
      }
      // Include "Related ID Value" only if "Related ID Type" has a value
      if (formData?.relatedIDType) {
        formDataStructure["Related ID Value"] = formData?.relatedIDValue;
      }
      if (formData?.salesUnit) {
        formDataStructure["Impacted TPID"] = formData?.impactedTPID;
      }

      if (
        [
          "Surface - Missing Shipment",
          "Surface - Reparenting",
          "Surface - Restatement",
        ].includes(selectedSubcategory)
      ) {
        formDataStructure = {
          ...formDataStructure,
          "Est. Revenue Impact": formData?.estimatedRevenueImpact,
        };
      }
      if (
        ["Surface - Missing Shipment", "Surface - Restatement"].includes(
          selectedSubcategory
        )
      ) {
        formDataStructure = {
          ...formDataStructure,
          "Reseller of the shipment": formData?.resellerOfShipment,
          "What type of Surface Devices / accessory": formData?.surfaceDevicesAccessory?.join(";"),
          "Number of Units Missing": formData?.numberOfUnitsMissing,
          "Warranty": formData?.warranty,
          "What Date do you expect the Revenue": formData?.expectedRevenueDate,
        };
      }
      if (selectedSubcategory === "Surface - Restatement") {
        formDataStructure = {
          ...formDataStructure,
          "Account where the shipment is currently landing": formData?.accountWhereShipmentLands,
        };
      }
      if (selectedSubcategory === "Surface - Reparenting") {
        formDataStructure = {
          ...formDataStructure,
          "Destination Account": formData?.destinationAccount,
        };
      }
      break;
    case "Request Revenue Misaligned to Managed Account":
      formDataStructure = {
        "Request Type": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        )?.type,
        "What is the impacted Revenue amount in $?":
          formData.impactedRevenueAmount,
        Priority: formData?.priority,
        "Related ID Type": formData.relatedIDType,
        "Impacted TPID": formData.impactedTPID,
        "Sales Unit": formData.salesUnit,
        "Provide Description of issue": formData.issueDescription,
      };
      if (formData?.relatedIDType) {
        formDataStructure["Related ID Value"] = formData?.relatedIDValue;
      }
      if (formData?.salesUnit) {
        formDataStructure["Impacted TPID"] = formData?.impactedTPID;
      }
      break;
    case "Submit Request for Merger, Acquisition and Divestitures":
      formDataStructure = {
        "Request Type": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        )?.type,
        "What is the impacted Revenue amount in $?":
          formData.impactedRevenueAmount,
        "Priority": formData?.priority,
        "Related ID Type": formData.relatedIDType,
        "Sales Unit": formData.salesUnit,
        "Provide Description of issue": formData.issueDescription,
      };
      if (formData?.relatedIDType) {
        formDataStructure["Related ID Value"] = formData?.relatedIDValue;
      }
      if (formData?.salesUnit) {
        formDataStructure["Impacted TPID"] = formData?.impactedTPID;
      }
      break;
    case "Raise International Disputes":
      formDataStructure = {
        "Request Type": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        )?.type,
        "Subcategory": formData.subcategory,
        "What is your Operating Unit (OU)?": formData.operatingUnit,
        "Impacted TPID": formData.impactedTPID,

        "Provide Description of issue": formData.issueDescription,
      };
      if (selectedSubcategory === "International Clearing Program Submission") {
        formDataStructure = {
          ...formDataStructure,
          "ICP Scenarios": formData.ICPScenarios,
          "What subsidiary(s) did the revenue go to?": formData.subsidiaryRevenueGoTo,
          "Which international TPID did revenue land?":
            formData.internationalTPID,
          "Azure Only?": formData.azureOnly,
          "Contract Type": formData.contractType,
          "Enter any relevant Enrollment Number": formData.enrollmentNumber,
          "Total Revenue under Enrollment (in US Dollars)": formData.totalRevenueUnderEnrollment,
          "Revenue owed to the OU (in US Dollars)": formData.revenueOwedToOU,
        };
      }
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
    )?.group,
    "Ticket Subject": formData?.ticketSubject,
    "Additional visibility (CC)": formData?.additionalVisibility
      .map((item) => item.upn)
      .join(";"),
  };

  return { ...commonFormData, ...formDataStructure };
};
