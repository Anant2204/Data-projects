export const createFormData = (
  formData,
  selectedRequestType,
  webFormIrisContext,
  requestTypeOptions
) => {
  let formDataStructure;
  switch (selectedRequestType) {
    case "Contest":
    case "Incentive Program":
    case "Morale Event":
      formDataStructure = {
        "Program Title": formData.programtitle,
        "Request type": requestTypeOptions.find(
          (option) => option.key === selectedRequestType
        ).type,
        "Is this program for the US only?": formData.isUSOnly,
        "Impacted Orgs": formData.impactedOrg.map((item) => item).join(";"),
        "Tentative Eligible Roles (Role Summary)":
          formData.tentativeEligibleRoles.map((item) => item).join(";"),
        "Impacted Solution Areas": formData.impactedSolutionAreas
          .map((item) => item)
          .join(";"),
        "Applicable Scorecard Metric (If any)":
          formData.applicableScorecardMetric.map((item) => item).join(";"),
        "Applicable Solution Play (If any)": formData.applicableEligibleRoles
          .map((item) => item)
          .join(";"),
        "Requested Incentive/Prize": formData.requestedIncentivePrize,
        "Target Budget (If known)": formData.targetBudget,
        "Start Date": formData.startDate,
        "End Date": formData.endDate,
        "Executive Sponsor approved?": formData.executiveSponsorApproved,
        "Who is your Executive Sponsor/Approver?": formData.executiveSponsor
          .map((item) => item.mailNickName)
          .join(";"),
        "Program Description": formData.programDescription,
        "How would a seller execute against this goal? Specify the behavior you would like to drive":
          formData.question,
        "What tools and resources would a seller leverage while executing against this goal?":
          formData.toolsAndResources,
        "What is the IO (If available)": formData.io,
        "HR Approved?": formData.hrApproved,
        "Who is your HR Partner Contact?": formData.hrPartnerContact
          .map((item) => item.mailNickName)
          .join(";"),
        "Finance Approved?": formData.financeApproved,
        "Please list the Finance Approver (alias)": formData.financeApprover
          .map((item) => item.mailNickName)
          .join(";"),
        "CELA approved?": formData.celaApproved,
        "Who is your CELA Partner Contact?": formData.celaPartnerContact
          .map((item) => item.mailNickName)
          .join(";"),
        "Additional visibility (CC)": formData.additionalVisibility
          .map((item) => item.upn)
          .join(";"),
      };
      break;
    default:
      formDataStructure = {};
  }
  const commonFormData = {
    "Service Name": webFormIrisContext.name,
    "Service Group": requestTypeOptions.find(
      (option) => option.key === selectedRequestType
    ).group,
  };
  return ({ ...commonFormData, ...formDataStructure });
};

interface ScorecardMetricOption {
  key: string;
  text: string;
}

interface SolutionPlayOption {
  key: string;
  text: string;
}
interface ImpactedSolutionArea {
  ImpactedSolutionArea: string;
  hasScorecardMetric: boolean;
  hasSolutionPlay: boolean;
  scorecardMetricOptions?: ScorecardMetricOption[];
  solutionPlayOptions?: SolutionPlayOption[];
}

export const transformMapping = (
  mapping: ImpactedSolutionArea[]
): { [key: string]: any } => {
  const transformedMapping: { [key: string]: any } = {};

  const solutionArea: { [key: string]: any }[] = [];
  for (let i = 0; i < mapping.length; i++) {
    const area = mapping;
    const ImpactedSolutionArea = area[i].ImpactedSolutionArea;
    solutionArea.push({
      key: ImpactedSolutionArea,
      text: ImpactedSolutionArea,
    });
    const hasScorecardMetric = area[i].hasScorecardMetric;
    const hasSolutionPlay = area[i].hasSolutionPlay;
    const scorecardMetricOptions = area[i]?.scorecardMetricOptions;
    const solutionPlayOptions = area[i]?.solutionPlayOptions;

    transformedMapping[ImpactedSolutionArea] = {
      hasScorecardMetric,
      hasSolutionPlay,
      scorecardMetricOptions: hasScorecardMetric
        ? scorecardMetricOptions?.map((option) => ({
            key: option.key,
            text: option.text,
          }))
        : [],
      solutionPlayOptions: hasSolutionPlay
        ? solutionPlayOptions?.map((option) => ({
            key: option.key,
            text: option.text,
          }))
        : [],
    };
  }
  return { transformedMapping, solutionArea };
};
