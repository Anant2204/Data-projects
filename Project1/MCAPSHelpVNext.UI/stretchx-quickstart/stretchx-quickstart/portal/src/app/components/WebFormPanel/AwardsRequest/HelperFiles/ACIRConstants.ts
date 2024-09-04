export const AWARD_CONTEST_SEARCH_API_DROPDOWN = (getOptionsOf,filterKey)=>`api/AwardContests/${getOptionsOf}?searchText=${filterKey}`;
export const AWARD_CONTEST_API_DROPDOWN = (getOptionsOf)=>`api/AwardContests/${getOptionsOf}`;
export const GET_IMPACTED_ORG = "GetImpactedOrg";
export const GET_ROLE_SUMMARY = "GetRoleSummary";
export const GET_IMPACTED_SOLUTION_AREA = "GetImpactedSolutionArea";
export const GET_IMPACTED_SOLUTION_AREA_MAPPING = "GetImpactedSolutionAreaMapping";

export const SERVICE_NAME_REQ_TYPE = (selectedRequestType)=> `Award Request - ${selectedRequestType}`
