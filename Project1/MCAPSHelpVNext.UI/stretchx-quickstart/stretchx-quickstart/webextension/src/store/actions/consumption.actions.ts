import { AxiosError } from "axios";
import { IConsumption, Messagestate } from "../../interfaces";

import {
  FETCH_CONSUMPTION_BEGIN,
  FETCH_CONSUMPTION_SUCCESS,
  FETCH_CONSUMPTION_FAILURE,
  FETCH_REGION_BEGIN,
  FETCH_REGION_SUCCESS,
  FETCH_REGION_FAILURE,
  addMessage,
  clearMessageWithParam,
} from "..";
import { Dispatch } from "redux";
import { IAppContext } from "@msx/platform-services";
import { getConsumptionAPI } from "../../utils/httpUtils";
import { logException, getErrorMessage } from "../../utils";
import {
  consumptionPage,
  level,
} from "../../constants/componentCodes.constant";
import { consumptionFetchError } from "../../constants/messageCodes.constant";
import { MessageBarType } from "@fluentui/react";

export const fetchConsumptionBegin = () => ({
  type: FETCH_CONSUMPTION_BEGIN,
});
export const fetchConsumptionSuccess = (payload: IConsumption) => ({
  type: FETCH_CONSUMPTION_SUCCESS,
  payload: payload,
});
export const fetchConsumptionError = (error: AxiosError) => ({
  type: FETCH_CONSUMPTION_FAILURE,
  payload: error,
});

export const fetchRegionBegin = () => ({
  type: FETCH_REGION_BEGIN,
});
export const fetchRegionSuccess = (payload: IConsumption) => ({
  type: FETCH_REGION_SUCCESS,
  payload: payload,
});
export const fetchRegionError = (error: AxiosError) => ({
  type: FETCH_REGION_FAILURE,
  payload: error,
});

export const fetchConsumptions: any = (parentContext: IAppContext) => {
  return async (dispatch: Dispatch) => {
     dispatch(
      clearMessageWithParam({
            componentCode: consumptionPage,
            messageCode: consumptionFetchError,
      })
    );
    dispatch(fetchConsumptionBegin());
    try {
      const url = `v1/consumption/estimates/page/1`;
      const response = await getConsumptionAPI(url, parentContext);
      if (response && response.status === 200 && response.data) {
        dispatch(fetchConsumptionSuccess(response.data.results));
      } else {
        const errorObj: Messagestate = {
          type: MessageBarType.error,
          level: {
            type: level.Page,
            componentCode: consumptionPage,
            messageCode: consumptionFetchError,
          },

          message: getErrorMessage(response),
        };
        dispatch(addMessage(errorObj));
      }
    } catch (err) {
      logException(parentContext, `v1/consumption/estimates/page/1`, err);
      const errorObj: Messagestate = {
        type: MessageBarType.error,
        level: {
          type: level.Page,
          componentCode: consumptionPage,
          messageCode: consumptionFetchError,
        },
        message: getErrorMessage(err),
      };
      dispatch(addMessage(errorObj));
    }
  };
};

export const fetchRegion: any = (parentContext: IAppContext) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchRegionBegin());
      const response = await getConsumptionAPI(
        "v1/catalog/regions",
        parentContext
      );
      if (response && response.status === 200 && response.data) {
        dispatch(fetchRegionSuccess(response.data.armRegionName));
      } else {
        dispatch(fetchRegionError(response.data ? response.data : response));
      }
      return response?.data?.armRegionName;
    } catch (err) {
      logException(parentContext, `v1/catalog/regions`, err);
      dispatch(fetchRegionError(err));
    }
  };
};
