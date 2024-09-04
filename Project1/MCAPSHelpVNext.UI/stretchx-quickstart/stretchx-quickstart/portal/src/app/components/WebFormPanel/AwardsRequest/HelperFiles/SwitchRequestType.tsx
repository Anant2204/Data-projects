import MoraleEvent from "../ServiceType/MoraleEvent";
import IncentiveProgram from "../ServiceType/IncentiveProgram";
import Contest from "../ServiceType/Contest";

const SwitchRequestType = ({
  selectedRequestType,
  config,
  impactedSolutionAreas,
  isFormInitialLoad,
  formData,
  setFormData,
}) => {
  switch (selectedRequestType) {
    case "Contest":
      return (
        <Contest
          formData={formData}
          setFormData={setFormData}
          impactedSolutionAreas={impactedSolutionAreas}
          config={config}
          isFormInitialLoad={isFormInitialLoad}
          selectedRequestType={selectedRequestType}
        />
      );
    case "Incentive Program":
      return (
        <IncentiveProgram
          formData={formData}
          setFormData={setFormData}
          impactedSolutionAreas={impactedSolutionAreas}
          config={config}
          isFormInitialLoad={isFormInitialLoad}
          selectedRequestType={selectedRequestType}
        />
      );
    case "Morale Event":
      return (
        <MoraleEvent
          formData={formData}
          setFormData={setFormData}
          impactedSolutionAreas={impactedSolutionAreas}
          config={config}
          isFormInitialLoad={isFormInitialLoad}
          selectedRequestType={selectedRequestType}
        />
      );
    default:
      return null;
  }
};

export default SwitchRequestType;
