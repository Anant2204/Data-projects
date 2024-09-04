import { AnyAction } from "redux";
import { Reducer } from "@reduxjs/toolkit";
import {
  FETCH_CONFIG_BEGIN,
  FETCH_CONFIG_SUCCESS,
  FETCH_CONFIG_FAILURE,
  ReduxConfigState
} from "../store.types";

const configState: ReduxConfigState = {
  isLoading: false,
  error: undefined,
  config: undefined
};

const configReducer: Reducer<ReduxConfigState, AnyAction> = (
  state: ReduxConfigState = configState,
  action: AnyAction
) => {
  switch (action.type) {
    case FETCH_CONFIG_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_CONFIG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        config: action.payload,
      };
    case FETCH_CONFIG_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:

  }
  return state;
}

export default configReducer;