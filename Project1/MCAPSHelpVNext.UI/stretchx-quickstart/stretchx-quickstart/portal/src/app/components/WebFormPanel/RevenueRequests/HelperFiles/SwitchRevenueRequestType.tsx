import InternationalRevenueSupport from "../ServiceType/InternationalRevenueSupport";
import MergerAcquisiitonAndDivestitures from "../ServiceType/MergerAcquisiitonAndDivestitures";
import MissingRevenue from "../ServiceType/MissingRevenue";
import RevenueMisalignedToMyManagedAccount from "../ServiceType/RevenueMisalignedToMyManagedAccount";
export const SwitchRevenueRequestType = ({
  selectedRequestType,
  selectedSubcategory,
  config,
  isFormInitialLoad,
  formData,
  setFormData,
}) => {
  return (
    <>
      {(() => {
        switch (selectedRequestType) {
          case "Request Missing Revenue":
            return (
              <MissingRevenue
                config={config}
                selectedRequestType={selectedRequestType}
                selectedSubcategory={selectedSubcategory}
                formData={formData}
                setFormData={setFormData}
                isFormInitialLoad={isFormInitialLoad}
              />
            );
          case "Request Revenue Misaligned to Managed Account":
            return (
              <RevenueMisalignedToMyManagedAccount
                config={config}
                selectedRequestType={selectedRequestType}
                formData={formData}
                setFormData={setFormData}
                isFormInitialLoad={isFormInitialLoad}
              />
            );
          case "Submit Request for Merger, Acquisition and Divestitures":
            return (
              <MergerAcquisiitonAndDivestitures
                config={config}
                selectedRequestType={selectedRequestType}
                formData={formData}
                setFormData={setFormData}
                isFormInitialLoad={isFormInitialLoad}
              />
            );
          case "Raise International Disputes":
            return (
              <InternationalRevenueSupport
                config={config}
                selectedRequestType={selectedRequestType}
                selectedSubcategory={selectedSubcategory}
                formData={formData}
                setFormData={setFormData}
                isFormInitialLoad={isFormInitialLoad}
              />
            );
          default:
            return null;
        }
      })()}
    </>
  );
};
