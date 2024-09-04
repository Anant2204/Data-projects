import { getExternalConsumptionAPI } from "../../../../utils/httpUtilsExternalAPI";
import * as constants from './ACIRConstants';

export const getAwardContestsSearchDropdowns = async (getOptionsOf,searchKey,context) => {
    try {
      const response = await getExternalConsumptionAPI(
        constants.AWARD_CONTEST_SEARCH_API_DROPDOWN(getOptionsOf,searchKey),
        context.authClient
      );
      const responseData = response?.data;
      return responseData;
    } catch (error) {
      console.error("Error fetching config:", error);
      return null;
    }
  };
export const getAwardContestsDropdowns = async (getOptionsOf,context) => {
    try {
      const response = await getExternalConsumptionAPI(
        constants.AWARD_CONTEST_API_DROPDOWN(getOptionsOf),
        context.authClient
      );
      const responseData = response?.data;
      return responseData;
    } catch (error) {
      console.error("Error fetching config:", error);
      return null;
    }
  };