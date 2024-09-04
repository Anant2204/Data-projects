import {
  RECEIVE_LIST_BEGIN,
  RECEIVE_LIST_SUCCESS, 
  RECEIVE_LIST_FAILURE,
  FETCH_RSTATISTICS_FAILURE,
  FETCH_RSTATISTICS_BEGIN,
  FETCH_RSTATISTICS_SUCCESS,
  CLEAR_RECEIVE_DATA,
} from "../store.types";
import { IAppContext } from "@msx/platform-services";
import { getErrorMessage, logException } from "../../utils/utils";
import { AppDispatch, reduxStore } from "../reduxStore";
import { postAPI } from "../../utils/httpUtils";
import { addMessage, clearMessageWithParam } from "./commonMessages.actions";
import {
  receiveConversationPage,
  level
} from "../../constants/componentCodes.constant";
import { fetchReceiveStatisticeDataAPIError, fetchReceiveDataAPIError } from "../../constants/messageCodes.constant";
import { IMessageState } from "../../interfaces";
import { MessageBarType } from "@fluentui/react";


export const fetchMctReceiveBegin = () => ({
  type: RECEIVE_LIST_BEGIN,
});
export const fetchMctReceiveSuccess = (payload: string) => ({
  type: RECEIVE_LIST_SUCCESS,
  payload: payload,
});

export const fetchMctReceiveError = (error: string) => ({
  type: RECEIVE_LIST_FAILURE,
  payload: error,
});

export const clearReceiveData = () => ({
  type: CLEAR_RECEIVE_DATA,
});

export const fetchReceiveData: any = (parentContext: IAppContext, searchstring:string[],isCompleteHierarchy:boolean = true) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      clearMessageWithParam({
        componentCode: receiveConversationPage
      })
    );
    dispatch(fetchMctReceiveBegin());
    try {  
      const url = "/v1/conversation/receive/get";
      const postData = {
        "managerAliases": searchstring || [],
        "paginationDetails": {
          "pageSize": 0,
          "pageNumber": 0
        },
        "filterOption": 0, //todo along with pagination
        "completeReportingHierarchy": isCompleteHierarchy,
        "requestFrom":"Receive"
      };
      const response = await postAPI(url, postData, parentContext);

      if (response && response.status == 200 && response.data) {
        reduxStore.dispatch(fetchMctReceiveSuccess(response.data?.conversations)); 
      }  
      else {
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.Page,
            componentCode: receiveConversationPage,
            messageCode: fetchReceiveDataAPIError,
          },
          message: getErrorMessage(response),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchMctReceiveError(errorObj.message));

     
      }
    } catch (err) {
      logException(parentContext, `/v1/conversation/receive/get`, err);
      const errorObj: IMessageState = {
        type: MessageBarType.error,
        level: {
          type: level.Page,
          componentCode: receiveConversationPage,
          messageCode: fetchReceiveDataAPIError,
        },
        message: getErrorMessage(err),
      };
      reduxStore.dispatch(fetchMctReceiveError(errorObj.message));
      dispatch(addMessage(errorObj));
    }
  };
}; 

export const fetchStatisticsBegin = () => ({
  type: FETCH_RSTATISTICS_BEGIN,
});
export const fetchStatisticsSuccess = (payload: string) => ({
  type: FETCH_RSTATISTICS_SUCCESS,
  payload: payload,
});
export const fetchStatisticsError = (error: string) => ({
  type: FETCH_RSTATISTICS_FAILURE,
  payload: error,
});

//fetchStatisticeData using v1/conversation/sendstay/statistics
export const fetchReceiveStatisticeData: any = (parentContext: IAppContext, managerAliases:string[],isCompleteHierarchy:boolean = true) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      clearMessageWithParam({
        componentCode: receiveConversationPage,
        messageCode: fetchReceiveStatisticeDataAPIError,
      })
    );
    dispatch(fetchStatisticsBegin());
    try {  
      const url = `/v1/conversation/receive/statistics/get`;
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
            componentCode: receiveConversationPage,
            messageCode: fetchReceiveStatisticeDataAPIError,
          },

          message: getErrorMessage(response),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchStatisticsError(errorObj.message));
      }
    } catch (err) {
      logException(parentContext, `/v1/conversation/receive/statistics/get`, err);
      const errorObj: IMessageState = {
        type: MessageBarType.error,
        level: {
          type: level.Page,
          componentCode: receiveConversationPage,
          messageCode: fetchReceiveStatisticeDataAPIError,
        },
        message: getErrorMessage(err),
      };
      dispatch(addMessage(errorObj));
      reduxStore.dispatch(fetchStatisticsError(errorObj.message));
    }
  };
};