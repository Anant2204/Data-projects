import { AnyAction } from "redux";
import { Reducer } from "@reduxjs/toolkit";
import {
  ReduxSStatisticsState,
  FETCH_SSTATISTICS_BEGIN,
  FETCH_SSTATISTICS_FAILURE,
  FETCH_SSTATISTICS_SUCCESS
} from "../store.types";

const mctState: ReduxSStatisticsState = {
  isLoading: false,
  sStatistics: null,
  error: null
};

const sendStatisticsReducer: Reducer<ReduxSStatisticsState, AnyAction> = (
  state: ReduxSStatisticsState = mctState,
  action: AnyAction,
) => {
  switch (action.type) {
      case FETCH_SSTATISTICS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SSTATISTICS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sStatistics: action.payload,
      };
    case FETCH_SSTATISTICS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
  }
  return state;
};

export default sendStatisticsReducer;