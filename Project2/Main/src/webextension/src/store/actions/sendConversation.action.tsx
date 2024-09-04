import {
  SEND_LIST_BEGIN,
  SEND_LIST_SUCCESS, 
  SEND_LIST_FAILURE,
  FETCH_SSTATISTICS_FAILURE,
  FETCH_SSTATISTICS_BEGIN,
  FETCH_SSTATISTICS_SUCCESS,
  CLEAR_SEND_STAY_DATA,
} from "../store.types";
import { IAppContext } from "@msx/platform-services";
import { getErrorMessage, logException } from "../../utils/utils";
import { AppDispatch, reduxStore } from "../reduxStore";
import { postAPI } from "../../utils/httpUtils";
import { addMessage, clearMessageWithParam } from "./commonMessages.actions";
import {
  sendConversationPage,
  level
} from "../../constants/componentCodes.constant";
import { fetchSendDataAPIError, fetchSendStatisticeDataAPIError } from "../../constants/messageCodes.constant";
import { IMessageState } from "../../interfaces";
import { MessageBarType } from "@fluentui/react";


export const fetchMctSendBegin = () => ({
  type: SEND_LIST_BEGIN,
});
export const fetchMctSendSuccess = (payload: string) => ({
  type: SEND_LIST_SUCCESS,
  payload: payload,
});

export const fetchMctSendError = (error: string) => ({
  type: SEND_LIST_FAILURE,
  payload: error,
});

export const clearSendStayData = () => ({
  type: CLEAR_SEND_STAY_DATA,
});

export const fetchSendData: any = (parentContext: IAppContext, searchstring:string[],isCompleteHierarchy:boolean = true) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      clearMessageWithParam({
        componentCode: sendConversationPage,
        messageCode: fetchSendDataAPIError,
      })
    );
    dispatch(fetchMctSendBegin());
    try {  
      const url = "/v1/conversation/sendstay/get";
      const postData = {
        "managerAliases": searchstring || [],
        "paginationDetails": {
          "pageSize": 0,
          "pageNumber": 0
        },
        "filterOption": 0, //todo along with pagination
        "completeReportingHierarchy": isCompleteHierarchy,
      };
      const response = await postAPI(url, postData, parentContext);

      if (response && response.status == 200 && response.data) {
        reduxStore.dispatch(fetchMctSendSuccess(response.data?.conversations)); //TODO remove conversations after API change to send Array
      }  
      else {
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.Page,
            componentCode: sendConversationPage,
            messageCode: fetchSendDataAPIError,
          },
          message: getErrorMessage(response),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchMctSendError(errorObj.message));

     
      }
    } catch (err) {
      logException(parentContext, `/v1/conversation/sendstay/get`, err);
      const errorObj: IMessageState = {
        type: MessageBarType.error,
        level: {
          type: level.Page,
          componentCode: sendConversationPage,
          messageCode: fetchSendDataAPIError,
        },
        message: getErrorMessage(err),
      };
      reduxStore.dispatch(fetchMctSendError(errorObj.message));
      dispatch(addMessage(errorObj));
    }
  };
}; 

export const fetchStatisticsBegin = () => ({
  type: FETCH_SSTATISTICS_BEGIN,
});
export const fetchStatisticsSuccess = (payload: string) => ({
  type: FETCH_SSTATISTICS_SUCCESS,
  payload: payload,
});
export const fetchStatisticsError = (error: string) => ({
  type: FETCH_SSTATISTICS_FAILURE,
  payload: error,
});

//fetchStatisticeData using v1/conversation/sendstay/statistics
export const fetchSendStatisticeData: any = (parentContext: IAppContext, managerAliases:string[],isCompleteHierarchy:boolean = true) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      clearMessageWithParam({
        componentCode: sendConversationPage,
        messageCode: fetchSendStatisticeDataAPIError,
      })
    );
    dispatch(fetchStatisticsBegin());
    try {  
      const url = `/v1/conversation/sendstay/statistics/get`;
      const postData = {
        managerAliases: managerAliases || [],
        "completeReportingHierarchy": isCompleteHierarchy
        };
      
      const response = await postAPI(url, postData, parentContext);
      if (response && response.status == 200 && response.data) {
        reduxStore.dispatch(fetchStatisticsSuccess(response.data));
      }  
      else {
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.Page,
            componentCode: sendConversationPage,
            messageCode: fetchSendStatisticeDataAPIError,
          },

          message: getErrorMessage(response),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchStatisticsError(errorObj.message));
      }
    } catch (err) {
      logException(parentContext, `/v1/conversation/sendstay/statistics/get`, err);
      const errorObj: IMessageState = {
        type: MessageBarType.error,
        level: {
          type: level.Page,
          componentCode: sendConversationPage,
          messageCode: fetchSendStatisticeDataAPIError,
        },
        message: getErrorMessage(err),
      };
      dispatch(addMessage(errorObj));
      reduxStore.dispatch(fetchStatisticsError(errorObj.message));
    }
  };
};