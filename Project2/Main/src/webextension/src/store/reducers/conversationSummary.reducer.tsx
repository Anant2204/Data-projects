import { AnyAction } from "redux";
import { Reducer } from "@reduxjs/toolkit";
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
    ReduxConversationSummaryState,
    CLEAR_CONVERSATION_SUMMARY_DATA
} from "../store.types";

const mctState: ReduxConversationSummaryState = {
  fySummaryCurrentDataIsLoading: false,
  fySummaryFuturetDataIsLoading: false,
  fySummaryStatisticsDataIsLoading: false,
  fySummaryCurrentData: null,
  fySummaryFuturetData: null,
  fySummaryStatisticsData: null,
  error: null
};

const conversationSummaryReducer: Reducer<ReduxConversationSummaryState, AnyAction> = (
  state: ReduxConversationSummaryState = mctState,
  action: AnyAction,
) => {
  switch (action.type) {
      case FY_SUMMARY_CURRENT_YEAR_BEGIN:
      return {
        ...state,
        fySummaryCurrentDataIsLoading: true 
      };
    case FY_SUMMARY_CURRENT_YEAR_SUCCESS:
      return {
        ...state,
        fySummaryCurrentDataIsLoading:false,
        fySummaryCurrentData: action.payload,
      };
    case FY_SUMMARY_CURRENT_YEAR_FAILURE:
      return {
        ...state,
        fySummaryCurrentDataIsLoading:false,
        error: action.payload,
      };
    case FY_SUMMARY_FUTURE_YEAR_BEGIN:
      return {
        ...state,
        fySummaryFuturetDataIsLoading:true
      };
    case FY_SUMMARY_FUTURE_YEAR_SUCCESS:
      return {
        ...state,
        fySummaryFuturetDataIsLoading:false,
        fySummaryFuturetData: action.payload,
      };
    case FY_SUMMARY_FUTURE_YEAR_FAILURE:
      return {
        ...state,
        fySummaryFuturetDataIsLoading:false,
        error: action.payload,
      };

      case FY_SUMMARY_STATISTICS_BEGIN:
      return {
        ...state,
        fySummaryStatisticsDataIsLoading:true
      };
    case FY_SUMMARY_STATISTICS_SUCCESS:
      return {
        ...state,
        fySummaryStatisticsDataIsLoading:false,
        fySummaryStatisticsData: action.payload,
      };
    case FY_SUMMARY_STATISTICS_FAILURE:
      return {
        ...state,
        fySummaryStatisticsDataIsLoading:false,
        error: action.payload,
      };
    case CLEAR_CONVERSATION_SUMMARY_DATA:
      return {
        ...state,
        fySummaryCurrentData: null,
        fySummaryFuturetData: null,
        fySummaryStatisticsData: null,
        fySummaryCurrentDataIsLoading: false,
        fySummaryFuturetDataIsLoading: false,
        fySummaryStatisticsDataIsLoading: false,
      };
    default:
  }
  return state;
};

export default conversationSummaryReducer;