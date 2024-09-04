import { AnyAction } from "redux";
import { Reducer } from "@reduxjs/toolkit";
import {
    CREATE_CONVERATOIN_SCENARIO_BEGIN, 
    CREATE_CONVERATOIN_SCENARIO_SUCCESS,
    CREATE_CONVERATOIN_SCENARIO_FAILURE,
    FETCH_CY_ORG_DETAILS_BEGIN,
    FETCH_CY_ORG_DETAILS_SUCCESS,
    FETCH_CY_ORG_DETAILS_FAILURE,
    ReduxCreateConversationScriptState,
    FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_BEGIN,
    FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_SUCCESS,
    FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_FAILURE,
    FETCH_FY_ORG_DETAILS_BEGIN,
    FETCH_FY_ORG_DETAILS_SUCCESS,
    FETCH_FY_ORG_DETAILS_FAILURE,
    FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_BEGIN,
    FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_SUCCESS,
    FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_FAILURE,
    MANAGE_SCRIPT_TILE_BEGIN,
    MANAGE_SCRIPT_TILE_SUCCESS,
    MANAGE_SCRIPT_TILE_FAILURE,
    MANAGE_SCRIPT_AUDIT_HISTORY_BEGIN,
    MANAGE_SCRIPT_AUDIT_HISTORY_SUCCESS,
    MANAGE_SCRIPT_AUDIT_HISTORY_FAILURE,
} from "../store.types";

const mctState: ReduxCreateConversationScriptState = {
  isLoading: false,
  isTaxonomyChangeContentDataLoading: false, // This loader is included because if we use isLoading, it will render the shimmer in the background
  createconversationScriptData:null,
  error: null,
  cyOrgDetailsData:null,
  fyOrgDetailsData:null,
  cyRoleSummaryQ1Q2Data:null,
  fyRoleSummaryQ1Q2Data:null, 
  manageScriptTileData:null, 
  manageScriptTileLoading:false, 
  manageScriptAuditHistoryData:null
};

const createConversationScriptReducer: Reducer<ReduxCreateConversationScriptState, AnyAction> = (
  state: ReduxCreateConversationScriptState = mctState,
  action: AnyAction,
) => {
  switch (action.type) {
    case CREATE_CONVERATOIN_SCENARIO_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_CONVERATOIN_SCENARIO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        createconversationScriptData: action.payload,
      };
    case CREATE_CONVERATOIN_SCENARIO_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case FETCH_CY_ORG_DETAILS_BEGIN:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: true,
      };
    case FETCH_CY_ORG_DETAILS_SUCCESS:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: false,
        cyOrgDetailsData: action.payload,
      };
    case FETCH_CY_ORG_DETAILS_FAILURE:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: false,
        error: action.payload,
      }; 
    case FETCH_FY_ORG_DETAILS_BEGIN:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: true,
      };
    case FETCH_FY_ORG_DETAILS_SUCCESS:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: false,
        fyOrgDetailsData: action.payload,
      };
    case FETCH_FY_ORG_DETAILS_FAILURE:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: false,
        error: action.payload,
      };   
    case FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_BEGIN:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: true,
      };
    case FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_SUCCESS:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: false,
        cyRoleSummaryQ1Q2Data: action.payload,
      };
    case FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_FAILURE:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: false,
        error: action.payload,
      };  
    case FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_BEGIN:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: true,
      };
    case FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_SUCCESS:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: false,
        fyRoleSummaryQ1Q2Data: action.payload,
      };
    case FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_FAILURE:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: false,
        error: action.payload,
      };
    case MANAGE_SCRIPT_TILE_BEGIN:
      return {
        ...state,
        manageScriptTileLoading: true,
      };
    case MANAGE_SCRIPT_TILE_SUCCESS:
      return {
        ...state,
        manageScriptTileLoading: false,
        manageScriptTileData: action.payload,
      };
    case MANAGE_SCRIPT_TILE_FAILURE:
      return {
        ...state,
        manageScriptTileLoading: false,
        error: action.payload,
      }; 
    case MANAGE_SCRIPT_AUDIT_HISTORY_BEGIN:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: true,
      };
    case MANAGE_SCRIPT_AUDIT_HISTORY_SUCCESS:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: false,
        manageScriptAuditHistoryData: action.payload,
      };
    case MANAGE_SCRIPT_AUDIT_HISTORY_FAILURE:
      return {
        ...state,
        isTaxonomyChangeContentDataLoading: false,
        error: action.payload,
      }; 
    default:
  }
  return state;
};

export default createConversationScriptReducer;