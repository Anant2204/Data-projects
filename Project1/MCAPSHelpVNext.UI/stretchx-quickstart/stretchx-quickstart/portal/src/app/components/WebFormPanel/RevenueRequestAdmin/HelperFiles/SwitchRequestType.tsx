import React from "react";
import {CleanMalBulk} from "../ServiceType/CleanMalBulk";
import {ResearchAccountAlignment} from "../ServiceType/ResearchAccountAlignment";
import {RevExInternalOnly} from "../ServiceType/RevExInternalOnly";



const SwitchRequestType = ({
  selectedRequestType,
  config,
  priorityOptions,
  isFormInitialLoad,
  formData,
  setFormData
}) => {
  switch (selectedRequestType) {  
    case "CleanMAL (bulk)":
      return (
        <CleanMalBulk
          config={config}
          priorityOptions={priorityOptions || ""}
          isFormInitialLoad={isFormInitialLoad}
          selectedRequestType={selectedRequestType}
          formData={formData}
          setFormData={setFormData}
        />
      );
      case "RevEx (Internal Only)":
      return (
        <ResearchAccountAlignment
          config={config}
          priorityOptions={priorityOptions || ""}
          isFormInitialLoad={isFormInitialLoad}
          selectedRequestType={selectedRequestType}
          formData={formData}
          setFormData={setFormData}
        />
      );
      case "Research Account Alignment & Setup":
      return (
        <RevExInternalOnly
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
