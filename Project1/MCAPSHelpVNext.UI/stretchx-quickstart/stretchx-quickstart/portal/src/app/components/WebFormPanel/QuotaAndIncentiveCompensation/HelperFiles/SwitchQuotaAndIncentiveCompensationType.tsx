import React from "react";
import AccountScrubs from "../ServiceTypes/AccountScrubs";
import IncentiveCompensationFeedback from "../ServiceTypes/IncentiveCompensationFeedback";
import MraMqaRequest from "../ServiceTypes/MraMqaRequest";
import QuotaBypass from "../ServiceTypes/QuotaBypass";
import QuotaEscalation from "../ServiceTypes/QuotaEscalation";
import QuotaReduction from "../ServiceTypes/QuotaReduction";


const SwitchRequestType = ({
  selectedRequestType,
  config,
  isFormInitialLoad,
  formData,
  setFormData,
  getRequiredClassNameForField
}) => {
  switch (selectedRequestType) {
    case "Account Scrubs":
      return (
        <AccountScrubs
          config={config}
          selectedRequestType={selectedRequestType}
          formData={formData}
          setFormData={setFormData}
          getRequiredClassNameForField={getRequiredClassNameForField}
        />
      );
    case "Incentive Compensation Feedback":
      return (
        <IncentiveCompensationFeedback
        config={config}
        selectedRequestType={selectedRequestType}
        formData={formData}
        setFormData={setFormData}
        getRequiredClassNameForField={getRequiredClassNameForField}
        />
      );
    case "MRA_MQA Request":
      return (
        <MraMqaRequest
          config={config}
          selectedRequestType={selectedRequestType}
          formData={formData}
          setFormData={setFormData}
          getRequiredClassNameForField={getRequiredClassNameForField}
        />
      );
    case "Quota Bypass":
      return (
        <QuotaBypass
        config={config}
        selectedRequestType={selectedRequestType}
        formData={formData}
        setFormData={setFormData}
        getRequiredClassNameForField={getRequiredClassNameForField}
        />
      );
    case "Quota Escalation":
      return (
        <QuotaEscalation
        config={config}
        selectedRequestType={selectedRequestType}
        formData={formData}
        setFormData={setFormData}
        getRequiredClassNameForField={getRequiredClassNameForField}
        />
      );
    case "Quota Reduction":
      return (
        <QuotaReduction
        config={config}
        selectedRequestType={selectedRequestType}
        formData={formData}
        setFormData={setFormData}
        getRequiredClassNameForField={getRequiredClassNameForField}
        />
      );
    default:
      return null;
  }
};

export default SwitchRequestType;
