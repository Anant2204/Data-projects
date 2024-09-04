export const SERVICE_NAME_REQ_TYPE = (selectedRequestType)=> `Quota and Incentive Compensation - ${selectedRequestType}`
export const FIELD_AREA_ENDPOINT =(searchKey) =>`api/FormData/GetFieldArea`;
export const SOLUTION_GROUPS_ENDPOINT = (searchKey) => `api/QuotaRequest/GetAllSolutionAreaGroups`;
export const SOLUTION_AREA_ENDPOINT=   `api/QuotaRequest/GetSolutionAreasByGroupId?solutionAreaGroupId=`;
export const SALES_UNIT_BY_FIELD_AREA =  `api/FormData/GetSalesUnitByFieldArea/`
export const PRODUCT_BY_SOLUTION_AREA =  `api/QuotaRequest/GetProductsBySolutionAreaId/?solutionAreaId=`
export const ALL_PRODUCT = (searchKey) =>  `api/QuotaRequest/GetProductsBySolutionAreaId/`
export const REVENUE_BY_GROUP_ID =  `api/QuotaRequest/GetRevenueTypesByGroupId?solutionAreaGroupId=`

export const mraScenarioTriggersFromToTPID = [
    "Cross-segment Shift (Net Zero)",
    "Parenting Issue",
    "Revenue Sharing Across Accounts"
  ];

  export const mraScenarioTriggersImpactedTPID = [
    "Errors Made up Upstream System",
    "International Shift (Net Zero)",
    "Sales Returns and Credits"
  ];
  export const mraScenarioTriggersImpactedAlias = [
    "Sales Returns and Credits"
  ];

 export const mqaScenarioTriggersImpactedTPID = [
    "Quota - Cross Fiscal Pull Forward",
    "Quota - Cross Fiscal Pull Forward (Same FY)",
    "Quota = International Shift (Net Zero)"
  ];
 export const mqaScenarioTriggersImpactedAlias = [
    "Quota to Go"
  ];
  