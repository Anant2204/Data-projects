import { AnyAction } from "redux";
import { Reducer } from "@reduxjs/toolkit";
import {
  FETCH_MANAGER_LIST_BEGIN,
  FETCH_MANAGER_LIST_SUCCESS,
  FETCH_MANAGER_LIST_FAILURE,
  CONVERSATION_SCRIPT_BEGIN,
  CONVERSATION_SCRIPT_FAILURE,
  CONVERSATION_SCRIPT_SUCCESS,
  FUTURE_MANAGER_BEGIN,
  FUTURE_MANAGER_SUCCESS,
  FUTURE_MANAGER_FAILURE,
  ReduxCommonState,
  CLEAR_CONVERSATION_SCRIPT_DATA,
  FETCH_TAXONOMY_CORRECTIONS_DETAILS_BEGIN,
  FETCH_TAXONOMY_CORRECTIONS_DETAILS_SUCCESS,
  FETCH_TAXONOMY_CORRECTIONS_DETAILS_FAILURE,
} from "../store.types";

const commonState: ReduxCommonState = {
  isLoading: false,
  isTaxonomyDetailsLoading:null, // This loader is included because if we use isLoading, it will render the shimmer in the background
  managerData: null,
  error: null,
  conversationScriptData: null,
  futureManagerData:null,
  taxonomyCorrectionsDetails:null,
};

const commonReducer: Reducer<ReduxCommonState, AnyAction> = (
  state: ReduxCommonState = commonState,
  action: AnyAction
) => {
  switch (action.type) {
    case FETCH_MANAGER_LIST_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_MANAGER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        managerData: action.payload,
      };
    case FETCH_MANAGER_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CONVERSATION_SCRIPT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case CONVERSATION_SCRIPT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        conversationScriptData: action.payload,
      };
    case CONVERSATION_SCRIPT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      case FUTURE_MANAGER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case FUTURE_MANAGER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        futureManagerData: action.payload,
      };
    case FUTURE_MANAGER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_CONVERSATION_SCRIPT_DATA:
      return {
        ...state,
        isLoading: false,
        conversationScriptData: null,
      };
    
    case FETCH_TAXONOMY_CORRECTIONS_DETAILS_BEGIN:
      return {
        ...state,
        isTaxonomyDetailsLoading: true,
      };
    case FETCH_TAXONOMY_CORRECTIONS_DETAILS_SUCCESS:
      return {
        ...state,
        isTaxonomyDetailsLoading: false,
        taxonomyCorrectionsDetails: action.payload,
      };
    case FETCH_TAXONOMY_CORRECTIONS_DETAILS_FAILURE:
      return {
        ...state,
        isTaxonomyDetailsLoading: false,
        error: action.payload,
      };  
    default:
  }
  return state;
};

export default commonReducer;