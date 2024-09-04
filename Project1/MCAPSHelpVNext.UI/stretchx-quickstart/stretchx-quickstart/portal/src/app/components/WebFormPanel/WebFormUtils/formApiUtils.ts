
import { getConsumptionAPI } from "../../../utils/httpUtils";
import { getExternalConsumptionAPI } from "../../../utils/httpUtilsExternalAPI";
import {
  GRAPH_API_ENDPOINT,
  SALES_UNIT_API_ENDPOINT,
  FORM_DATA_OPTIONS_ENDPOINT,
  FORM_DATA_ENDPOINT,
  SALES_UNIT_SEARCH_API_ENDPOINT,
  TPID_API_ENDPOINT,
  SURFACE_DEVICE_ENDPOINT,
} from "./formConstants";
import _ from "lodash";

export const debouncedApiCall = _.debounce(async (filterText, context) => {
  if (filterText.length < 3) {
    return [];
  }
  try {
    const response = await getConsumptionAPI(
      GRAPH_API_ENDPOINT(filterText),
      context.authClient
    );

    const data = await response.data;
    const filteredSuggestions = data?.value?.map((option) => ({
      key: option.userPrincipalName,
      text: option.displayName,
      upn: option.userPrincipalName,
      email: option.mail,
      mailNickName: option.mailNickName,
      secondaryText: option.jobTitle ? option.jobTitle : option.mail,
    }));
    if (response.status !== 200) {
      console.error("Error:", response.status, response.statusText);
      return [];
    }
    return filteredSuggestions;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return [];
  }
});

export const debouncedSalesUnitApiCall = _.debounce(
  async (filterText, context) => {
    try {
      const response = await getExternalConsumptionAPI(
        SALES_UNIT_SEARCH_API_ENDPOINT(filterText),
        context.authClient
      );

      const data = await response.data;
      const filteredSuggestions = data?.map((option) => ({
        key: option.key,
        text: option.text,
      }));
      if (response.status !== 200) {
        console.error("Error:", response.status, response.statusText);
        return [];
      }
      return filteredSuggestions;
    } catch (error) {
      console.error("Error fetching data from API:", error);
      return [];
    }
  }
);

export const getSalesUnitOptions = async (context) => {
  try {
    const response = await getExternalConsumptionAPI(
      SALES_UNIT_API_ENDPOINT,
      context.authClient
    );
    if (response?.data) {
      const salesUnits = response.data;
      const salesUnitOptions = salesUnits.map((unit) => ({
        key: unit.key,
        name: unit.text,
      }));
      return salesUnitOptions;
    } else {
      console.error(
        "Empty response received while fetching sales unit options."
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching sales unit options:", error);
    return [];
  }
};
export const GetSPMAccountsUsingNameORId = _.debounce(async (filterText,context) => {
  try {
    const response = await getExternalConsumptionAPI(
      TPID_API_ENDPOINT(filterText),context.authClient
    );
    const data = await response?.data;
    const filteredSuggestions = data?.map((option) => ({
      key: option.msSalesAccountId,
      msSalesAccountId: option.msSalesAccountId,
      msSalesAccountName: option.msSalesAccountName,
      name: option.msSalesAccount,
    }));
    if (response.status !== 200) {
      console.error("Error:", response.status, response.statusText);
      return [];
    }
    console.log("filteredSuggestions",filteredSuggestions)
    return filteredSuggestions;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return [];
  }
});

export const getFormDataOptions = async (key, context) => {
  try {
    const response = await getExternalConsumptionAPI(
      FORM_DATA_OPTIONS_ENDPOINT(key),
      context.authClient
    );
    const responseData = response?.data[0]?.value;
    return responseData;
  } catch (error) {
    console.error("Error fetching request type options:", error);
    return [];
  }
};

export const getFormData = async (key, context) => {
  try {
    const response = await getExternalConsumptionAPI(
      FORM_DATA_ENDPOINT(key),
      context.authClient
    );
    const responseData = response?.data[0]?.serviceObject;
    return responseData;
  } catch (error) {
    console.error("Error fetching form data:", error);
    return null;
  }
};
export const getSurfaceDevice = _.debounce(async (filterText,context) => {
  try {
    const response = await getExternalConsumptionAPI(
      SURFACE_DEVICE_ENDPOINT(filterText),
      context.authClient
    );
    console.log(response)
    const responseData = response?.data;
    return responseData;
  } catch (error) {
    console.error("Error fetching form data:", error);
    return null;
  }
});
export const getSuggestionsFromAPI = async (apiEndPoint, filterText, dependentKey, context) => {
  let finalApi;
  if (dependentKey !== undefined) {
    finalApi = `${apiEndPoint}${dependentKey}`;
  } else if (filterText !== undefined){
    finalApi = apiEndPoint(filterText);
  }
  else{
    finalApi = apiEndPoint
  }
  
  try {
    const response = await getExternalConsumptionAPI(
      finalApi,
      context.authClient
    );
    console.log(response);
    const responseData = response?.data;
    return responseData;
  } catch (error) {
    console.error("Error fetching form data:", error);
    return null;
  }
};

