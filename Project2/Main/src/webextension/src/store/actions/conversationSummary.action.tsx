import {
    FY_SUMMARY_CURRENT_YEAR_BEGIN,
    FY_SUMMARY_CURRENT_YEAR_SUCCESS,
    FY_SUMMARY_CURRENT_YEAR_FAILURE,
    FY_SUMMARY_FUTURE_YEAR_BEGIN,
    FY_SUMMARY_FUTURE_YEAR_SUCCESS,
    FY_SUMMARY_FUTURE_YEAR_FAILURE,
    FY_SUMMARY_STATISTICS_BEGIN,
    FY_SUMMARY_STATISTICS_SUCCESS,
    FY_SUMMARY_STATISTICS_FAILURE,
    CLEAR_CONVERSATION_SUMMARY_DATA,
  } from "../store.types";
  import { IAppContext } from "@msx/platform-services";
  import { getErrorMessage, logException } from "../../utils/utils";
  import { AppDispatch, reduxStore } from "../reduxStore";
  import { postAPI } from "../../utils/httpUtils";
  import { addMessage, clearMessageWithParam } from "./commonMessages.actions";
  import {
    all,
    level,
  } from "../../constants/componentCodes.constant";
  import { 
    fySummaryCurrentError,
    fySummaryFutureError,
    fySummaryStatistcsError
 } from "../../constants/messageCodes.constant";
  import { IMessageState } from "../../interfaces";
  import { MessageBarType } from "@fluentui/react";
  
  export const fetchFySummaryCurrentBegin = () => ({
    type: FY_SUMMARY_CURRENT_YEAR_BEGIN,
  });
  export const fetchFySummaryCurrentSuccess = (payload: []) => ({
    type: FY_SUMMARY_CURRENT_YEAR_SUCCESS,
    payload: payload,
  });

  export const fetchFySummaryCurrentError = (error: string) => ({
    type: FY_SUMMARY_CURRENT_YEAR_FAILURE,
    payload: error,
  });

  export const clearConversationSummaryData = () => ({
    type: CLEAR_CONVERSATION_SUMMARY_DATA,
  });

  export const fetchFySummaryCurrentData: any = (parentContext: IAppContext, listOfSelected: [],isCompleteHierarchy:boolean = true) => {
    return async (dispatch: AppDispatch) => {
      dispatch(
        clearMessageWithParam({
          componentCode: all,
          messageCode: fySummaryCurrentError,
        })
      );
      dispatch(fetchFySummaryCurrentBegin());
      try {
        const url = `/v1/fysummary/currentyear/get`;
        const postData = {
            "managerAliases": listOfSelected,
            "paginationDetails": {
              "pageSize": 0,
              "pageNumber": 0
            },
            "completeReportingHierarchy": isCompleteHierarchy
          }
        const response = await postAPI(url,postData,parentContext);
        if (response && response.status == 200 && response.data) {
          reduxStore.dispatch(fetchFySummaryCurrentSuccess(addIsMovingHasTaxonomyChange(response.data?.team))); 
        }  
        else {
          const errorObj: IMessageState = {
            type: MessageBarType.error,
            level: {
              type: level.Page,
              componentCode: all,
              messageCode: fySummaryCurrentError,
            },
  
            message: getErrorMessage(response),
          };
          dispatch(addMessage(errorObj));
          reduxStore.dispatch(fetchFySummaryCurrentError(errorObj.message));
        }
      } catch (err) {
        logException(parentContext, `/v1/fysummary/currentyear/get`, err);
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.Page,
            componentCode: all,
            messageCode: fySummaryCurrentError,
          },
          message: getErrorMessage(err),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchFySummaryCurrentError(errorObj.message));
      }
    };
  };

  export const fetchFySummaryFutureBegin = () => ({
    type: FY_SUMMARY_FUTURE_YEAR_BEGIN,
  });
  export const fetchFySummaryFutureSuccess = (payload: []) => ({
    type: FY_SUMMARY_FUTURE_YEAR_SUCCESS,
    payload: payload,
  });
  
  export const fetchFySummaryFutureError = (error: string) => ({
    type: FY_SUMMARY_FUTURE_YEAR_FAILURE,
    payload: error,
  });
  const addIsMovingHasTaxonomyChange = (response) => {
    return response?.map((item) => {
      if (item.isMoving === true) {
        item.isMovingHasTaxonomyChange = 2;
      } else if (item.hasTaxonomyChange === true) {
        item.isMovingHasTaxonomyChange = 1;
      } else {
        item.isMovingHasTaxonomyChange = 0;
      }
      return item;
    });
  }
  export const fetchFySummaryFutureData: any = (parentContext: IAppContext, listOfSelected: [],isCompleteHierarchy:boolean = true) => {
    return async (dispatch: AppDispatch) => {
      dispatch(
        clearMessageWithParam({
          componentCode: all,
          messageCode: fySummaryFutureError,
        })
      );
      dispatch(fetchFySummaryFutureBegin());
      try {
        const url = `/v1/fysummary/futureyear/get`;
        const postData = {
            "managerAliases": listOfSelected,
            "paginationDetails": {
              "pageSize": 0,
              "pageNumber": 0
            },
            "completeReportingHierarchy": isCompleteHierarchy
          }
        const response = await postAPI(url,postData,parentContext);
        if (response && response.status == 200 && response.data) {
          reduxStore.dispatch(fetchFySummaryFutureSuccess(addIsMovingHasTaxonomyChange(response.data?.team))); 
        }  
        else {
          const errorObj: IMessageState = {
            type: MessageBarType.error,
            level: {
              type: level.Page,
              componentCode: all,
              messageCode: fySummaryFutureError,
            },
  
            message: getErrorMessage(response),
          };
          dispatch(addMessage(errorObj));
          reduxStore.dispatch(fetchFySummaryFutureError(errorObj.message));
        }
      } catch (err) {
        logException(parentContext, `/v1/fysummary/futureyear/get`, err);
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.Page,
            componentCode: all,
            messageCode: fySummaryFutureError,
          },
          message: getErrorMessage(err),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchFySummaryFutureError(errorObj.message));
      }
    };
  };

  export const fetchFySummaryStatisticsBegin = () => ({
    type: FY_SUMMARY_STATISTICS_BEGIN,
  });
  export const fetchFySummaryStatisticsSuccess = (payload: []) => ({
    type: FY_SUMMARY_STATISTICS_SUCCESS,
    payload: payload,
  });

  export const fetchFySummaryStatisticsError = (error: string) => ({
    type: FY_SUMMARY_STATISTICS_FAILURE,
    payload: error,
  });

  export const fetchFySummaryStatisticsData: any = (parentContext: IAppContext, listOfSelected: [],isCompleteHierarchy:boolean = true) => {
    return async (dispatch: AppDispatch) => {
      dispatch(
        clearMessageWithParam({
          componentCode: all,
          messageCode: fySummaryStatistcsError,
        })
      );
      dispatch(fetchFySummaryStatisticsBegin());
      try {
        const url = `/v1/fysummary/statistics/get`;
        const postData = {
            "managerAliases": listOfSelected,
            "paginationDetails": {
              "pageSize": 0,
              "pageNumber": 0
            },
            "completeReportingHierarchy": isCompleteHierarchy
          }
        const response = await postAPI(url,postData,parentContext);
        if (response && response.status == 200 && response.data) {
          reduxStore.dispatch(fetchFySummaryStatisticsSuccess(response.data)); 
        }  
        else {
          const errorObj: IMessageState = {
            type: MessageBarType.error,
            level: {
              type: level.Page,
              componentCode: all,
              messageCode: fySummaryStatistcsError,
            },
  
            message: getErrorMessage(response),
          };
          dispatch(addMessage(errorObj));
          reduxStore.dispatch(fetchFySummaryStatisticsError(errorObj.message));
        }
      } catch (err) {
        logException(parentContext, `/v1/fysummary/statistics/get`, err);
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.Page,
            componentCode: all,
            messageCode: fySummaryStatistcsError,
          },
          message: getErrorMessage(err),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchFySummaryStatisticsError(errorObj.message));
      }
    };
  };
