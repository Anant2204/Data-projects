import { AnyAction } from "redux";
import { Reducer } from "@reduxjs/toolkit";
import {
  ReduxRStatisticsState,
  FETCH_RSTATISTICS_BEGIN,
  FETCH_RSTATISTICS_FAILURE,
  FETCH_RSTATISTICS_SUCCESS
} from "../store.types";

const mctState: ReduxRStatisticsState = {
  isLoading: false,
  rStatistics: null,
  error: null
};

const receieveStatisticsReducer: Reducer<ReduxRStatisticsState, AnyAction> = (
  state: ReduxRStatisticsState = mctState,
  action: AnyAction,
) => {
  switch (action.type) {
      case FETCH_RSTATISTICS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_RSTATISTICS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rStatistics: action.payload,
      };
    case FETCH_RSTATISTICS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
  }
  return state;
};

export default receieveStatisticsReducer;