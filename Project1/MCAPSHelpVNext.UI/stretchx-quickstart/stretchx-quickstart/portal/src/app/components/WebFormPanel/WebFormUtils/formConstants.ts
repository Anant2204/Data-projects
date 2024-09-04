export const GRAPH_API_ENDPOINT = (filterText) => `/api/Graph/GraphUserName/${filterText}`;
export const SALES_UNIT_SEARCH_API_ENDPOINT = (filterText) => `api/SalesUnit/GetSalesUnit?topN=50&searchkey=${filterText}&dataSource=db`;
export const SALES_UNIT_API_ENDPOINT = "api/SalesUnit/GetSalesUnit?topN=50&dataSource=db"
export const FORM_DATA_OPTIONS_ENDPOINT = (key) => `api/FormData/GetFormDataOptions?key=${key}`;
export const FORM_DATA_ENDPOINT = (key) => `api/FormData/GetFormData/${key}`;
export const TPID_API_ENDPOINT = (searchkey) => `api/Accounts/GetSPMAccountsUsingNameORId/${searchkey}?topN=50`;
export const SURFACE_DEVICE_ENDPOINT = (searchkey) => `api/FormData/GetSurfaceDevice?searchText=${searchkey}`;
