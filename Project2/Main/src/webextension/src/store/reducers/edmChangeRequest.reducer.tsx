import { AnyAction } from "redux";
import { Reducer } from "@reduxjs/toolkit";
import {
  EDM_CHANGE_REQUEST_BEGIN,
  EDM_CHANGE_REQUEST_SUCCESS,
  EDM_CHANGE_REQUEST_FAILURE,
  ReduxEDMChangeRequestState,
  EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_BEGIN, 
  EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_SUCCESS, 
  EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_FAILURE,
} from "../store.types";

const mctState: ReduxEDMChangeRequestState = {
  isLoading: false,
  isLoadingTaxonomyData: false,
  edmChangeRequestData:null,
  edmChangeTaxomomyCorrectionData:null,
  error: null
};

const edmChangeRequestReducer: Reducer<ReduxEDMChangeRequestState, AnyAction> = (
  state: ReduxEDMChangeRequestState = mctState,
  action: AnyAction,
) => {
  switch (action.type) {
    case EDM_CHANGE_REQUEST_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case EDM_CHANGE_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        edmChangeRequestData: action.payload,
      };
    case EDM_CHANGE_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_BEGIN:
        return {
          ...state,
          isLoadingTaxonomyData: true,
        };
      case EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_SUCCESS:
        return {
          ...state,
          isLoadingTaxonomyData: false,
          edmChangeTaxomomyCorrectionData: action.payload,
        };
      case EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_FAILURE:
        return {
          ...state,
          isLoadingTaxonomyData: false,
          error: action.payload,
        };
    default:
  }
  return state;
};

export default edmChangeRequestReducer;