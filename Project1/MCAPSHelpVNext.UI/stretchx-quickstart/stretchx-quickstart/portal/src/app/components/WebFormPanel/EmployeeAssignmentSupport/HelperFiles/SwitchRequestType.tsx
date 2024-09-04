import React from "react";
import AssignmentQuestion from "../ServiceType/AssignmentQuestion";
import { ToolErrorOrQuestion } from "../ServiceType/ToolErrorOrQuestion";
import HRDataQuestion from "../ServiceType/HRDataQuestion";
import ReportingQuestion from "../ServiceType/ReportingQuestion";

const SwitchRequestType = ({
  selectedRequestType,
  config,
  priorityOptions,
  isFormInitialLoad,
  formData,
  setFormData
}) => {
  switch (selectedRequestType) {
    case "Raise Assignment Query":
      return (
        <AssignmentQuestion
          config={config}
          priorityOptions={priorityOptions || ""}
          isFormInitialLoad={isFormInitialLoad}
          selectedRequestType={selectedRequestType}
          formData={formData}
          setFormData={setFormData}
        />
      );
    case "Raise Tool Error or Query":
      return (
        <ToolErrorOrQuestion
        config={config}
        priorityOptions={priorityOptions || ""}
        isFormInitialLoad={isFormInitialLoad}
        selectedRequestType={selectedRequestType}
        formData={formData}
        setFormData={setFormData}
        />
      );
    case "Raise HR Data Query":
      return (
        <HRDataQuestion
          config={config}
          priorityOptions={priorityOptions || ""}
          isFormInitialLoad={isFormInitialLoad}
          selectedRequestType={selectedRequestType}
          formData={formData}
          setFormData={setFormData}
        />
      );
    case "Raise Reporting Query":
      return (
        <ReportingQuestion
        config={config}
        priorityOptions={priorityOptions || ""}
        isFormInitialLoad={isFormInitialLoad}
        selectedRequestType={selectedRequestType}
        formData={formData}
        setFormData={setFormData}
        />
      );
    default:
      return null;
  }
};

export default SwitchRequestType;
