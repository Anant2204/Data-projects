import {
  ITaxonomyDetails,
  IManagersList,
  IMessageState, IPerson, 
} from "../interfaces";
import { IReceiveConversation } from "../interfaces/ApiResponseModel/IReceiveConversation";
import { IStatistics } from "../interfaces/ApiResponseModel/IStatistics";
import { ISendConversation } from "../interfaces/ApiResponseModel/ISendConversation";
import { IEmployeeData } from "../interfaces/ApiResponseModel/IConversationScript";
import { IManageScriptAuditHistoryInfo, IManageScriptTileInfo, IScriptScenarios, ITaxonomyDetailsQualifierInfo } from "../interfaces/ApiResponseModel/ICreateConversationScript";
import { IEDMChangeRequest, IEDMChangeTaxonomyCorrection } from "../interfaces/ApiResponseModel/IEDMChangeRequest";

export interface ReduxRootState {
  config: ReduxConfigState;
  commonMessagesState: ReduxCommonMessageState;
}

export interface ReduxPermissionState {
  isLoading: boolean;
  error: string;
  permissionData: {
    [estimateId: string]: string;
  };
}

export interface ReduxRegionState {
  isLoading: boolean;
  error: string;
  regions: string[];
}


export interface ReduxConfigState {
  isLoading: boolean;
  error: string;
  config: string;
}

export interface ReduxCommonMessageState {
  messages: IMessageState[];
}

export interface ReduxCommonState {
  isLoading: boolean;
  isTaxonomyDetailsLoading:boolean,
  error: string;
  managerData: IManagersList;
  conversationScriptData: IEmployeeData;
  futureManagerData:IPerson[];
  taxonomyCorrectionsDetails:ITaxonomyDetails[];
}

export interface ReduxReceiveConversastionState {
  isLoading: boolean;
  error: string;
  receiveConversastionData:IReceiveConversation[];
}

export interface ReduxSendConversastionState {
  isLoading: boolean;
  error: string;
  sendConversastionData:ISendConversation[];
}

export interface ReduxRStatisticsState {
  isLoading: boolean;
  error: string;
  rStatistics: IStatistics;
}

export interface ReduxSStatisticsState {
  isLoading: boolean;
  error: string;
  sStatistics: IStatistics;
}

export interface ReduxConversationSummaryState {
  fySummaryCurrentDataIsLoading: boolean;
  fySummaryFuturetDataIsLoading: boolean;
  fySummaryStatisticsDataIsLoading: boolean;
  error: string;
  fySummaryCurrentData: null; 
  fySummaryFuturetData: null;
  fySummaryStatisticsData: null;
}

export interface ReduxCreateConversationScriptState {
  isLoading: boolean;
  isTaxonomyChangeContentDataLoading:boolean;
  error: string;
  createconversationScriptData: IScriptScenarios[],
  cyOrgDetailsData:string[];
  fyOrgDetailsData:string[];
  cyRoleSummaryQ1Q2Data:ITaxonomyDetailsQualifierInfo[];
  fyRoleSummaryQ1Q2Data:ITaxonomyDetailsQualifierInfo[];
  manageScriptTileData: IManageScriptTileInfo;
  manageScriptTileLoading: boolean;
  manageScriptAuditHistoryData: IManageScriptAuditHistoryInfo[];
}

export interface ReduxEDMChangeRequestState {
  isLoading: boolean;
  isLoadingTaxonomyData: boolean;
  error: string;
  edmChangeRequestData: IEDMChangeRequest[],
  edmChangeTaxomomyCorrectionData: IEDMChangeTaxonomyCorrection[],
}

export const FETCH_CONFIG_BEGIN = "FETCH_CONFIG_BEGIN";
export const FETCH_CONFIG_SUCCESS = "FETCH_CONFIG_SUCCESS";
export const FETCH_CONFIG_FAILURE = "FETCH_CONFIG_FAILURE";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const CLEAR_MESSAGE_WITH_PARAM = "CLEAR_MESSAGE_WITH_PARAM";
export const CLEAR_MESSAGE_FOR_COMPONENT = "CLEAR_MESSAGE_FOR_COMPONENT";

export const FETCH_MANAGER_LIST_BEGIN = "FETCH_MANAGER_LIST_BEGIN";
export const FETCH_MANAGER_LIST_SUCCESS = "FETCH_MANAGER_LIST_SUCCESS";
export const FETCH_MANAGER_LIST_FAILURE = "FETCH_MANAGER_LIST_FAILURE";

export const FETCH_RSTATISTICS_BEGIN = "FETCH_RSTATISTICS_BEGIN";
export const FETCH_RSTATISTICS_SUCCESS = "FETCH_RSTATISTICS_SUCCESS";
export const FETCH_RSTATISTICS_FAILURE = "FETCH_RSTATISTICS_FAILURE";

export const FETCH_SSTATISTICS_BEGIN = "FETCH_SSTATISTICS_BEGIN";
export const FETCH_SSTATISTICS_SUCCESS = "FETCH_SSTATISTICS_SUCCESS";
export const FETCH_SSTATISTICS_FAILURE = "FETCH_SSTATISTICS_FAILURE";

export const FETCH_GRID_LIST_BEGIN = "FETCH_GRID_LIST_BEGIN";
export const FETCH_GRID_LIST_SUCCESS = "FETCH_GRID_LIST_SUCCESS";
export const FETCH_GRID_LIST_FAILURE = "FETCH_GRID_LIST_FAILURE";

export const RECEIVE_LIST_BEGIN = "RECEIVE_LIST_BEGIN";
export const RECEIVE_LIST_SUCCESS = "RECEIVE_LIST_SUCCESS";
export const RECEIVE_LIST_FAILURE = "RECEIVE_LIST_FAILURE";

export const SEND_LIST_BEGIN = "SEND_LIST_BEGIN";
export const SEND_LIST_SUCCESS = "SEND_LIST_SUCCESS";
export const SEND_LIST_FAILURE = "SEND_LIST_FAILURE";

export const CONVERSATION_SCRIPT_BEGIN = "CONVERSATION_SCRIPT_BEGIN";
export const CONVERSATION_SCRIPT_SUCCESS = "CONVERSATION_SCRIPT_SUCCESS";
export const CONVERSATION_SCRIPT_FAILURE = "CONVERSATION_SCRIPT_FAILURE";

export const FY_SUMMARY_CURRENT_YEAR_BEGIN = "FY_SUMMARY_CURRENT_YEAR_BEGIN";
export const FY_SUMMARY_CURRENT_YEAR_SUCCESS = "FY_SUMMARY_CURRENT_YEAR_SUCCESS";
export const FY_SUMMARY_CURRENT_YEAR_FAILURE = "FY_SUMMARY_CURRENT_YEAR_FAILURE";

export const FY_SUMMARY_FUTURE_YEAR_BEGIN = "FY_SUMMARY_FUTURE_YEAR_BEGIN";
export const FY_SUMMARY_FUTURE_YEAR_SUCCESS = "FY_SUMMARY_FUTURE_YEAR_SUCCESS";
export const FY_SUMMARY_FUTURE_YEAR_FAILURE = "FY_SUMMARY_FUTURE_YEAR_FAILURE";

export const FY_SUMMARY_STATISTICS_BEGIN = "FY_SUMMARY_STATISTICS_BEGIN";
export const FY_SUMMARY_STATISTICS_SUCCESS = "FY_SUMMARY_STATISTICS_SUCCESS";
export const FY_SUMMARY_STATISTICS_FAILURE = "FY_SUMMARY_STATISTICS_FAILURE";

export const CREATE_CONVERATOIN_SCENARIO_BEGIN = "CREATE_CONVERATOIN_SCENARIO_BEGIN";
export const CREATE_CONVERATOIN_SCENARIO_SUCCESS = "CREATE_CONVERATOIN_SCENARIO_SUCCESS";
export const CREATE_CONVERATOIN_SCENARIO_FAILURE = "CREATE_CONVERATOIN_SCENARIO_FAILURE";
export const FUTURE_MANAGER_BEGIN = "FUTURE_MANAGER_BEGIN";
export const FUTURE_MANAGER_SUCCESS = "FUTURE_MANAGER_SUCCESS";
export const FUTURE_MANAGER_FAILURE = "FUTURE_MANAGER_FAILURE";
export const EDM_CHANGE_REQUEST_BEGIN = "EDM_CHANGE_REQUEST_BEGIN";
export const EDM_CHANGE_REQUEST_SUCCESS = "EDM_CHANGE_REQUEST_SUCCESS";
export const EDM_CHANGE_REQUEST_FAILURE = "EDM_CHANGE_REQUEST_FAILURE";

export const EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_BEGIN = "EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_BEGIN";
export const EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_SUCCESS = "EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_SUCCESS";
export const EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_FAILURE = "EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_FAILURE";

export const CLEAR_CONVERSATION_SCRIPT_DATA = 'CLEAR_CONVERSATION_SCRIPT_DATA';
export const CLEAR_CONVERSATION_SUMMARY_DATA = 'CLEAR_CONVERSATION_SUMMARY_DATA';
export const CLEAR_RECEIVE_DATA = 'CLEAR_RECEIVE_DATA';
export const CLEAR_SEND_STAY_DATA = 'CLEAR_SEND_STAY_DATA';

export const FETCH_TAXONOMY_CORRECTIONS_DETAILS_BEGIN = "FETCH_TAXONOMY_CORRECTIONS_DETAILS_BEGIN";
export const FETCH_TAXONOMY_CORRECTIONS_DETAILS_SUCCESS = "FETCH_TAXONOMY_CORRECTIONS_DETAILS_SUCCESS";
export const FETCH_TAXONOMY_CORRECTIONS_DETAILS_FAILURE = "FETCH_TAXONOMY_CORRECTIONS_DETAILS_FAILURE";

export const FETCH_CY_ORG_DETAILS_BEGIN = "FETCH_CY_ORG_DETAILS_BEGIN";
export const FETCH_CY_ORG_DETAILS_SUCCESS = "FETCH_CY_ORG_DETAILS_SUCCESS";
export const FETCH_CY_ORG_DETAILS_FAILURE = "FETCH_CY_ORG_DETAILS_FAILURE";

export const FETCH_FY_ORG_DETAILS_BEGIN = "FETCH_FY_ORG_DETAILS_BEGIN";
export const FETCH_FY_ORG_DETAILS_SUCCESS = "FETCH_FY_ORG_DETAILS_SUCCESS";
export const FETCH_FY_ORG_DETAILS_FAILURE = "FETCH_FY_ORG_DETAILS_FAILURE";

export const FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_BEGIN = "FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_BEGIN";
export const FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_SUCCESS = "FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_SUCCESS";
export const FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_FAILURE = "FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_FAILURE";

export const FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_BEGIN = "FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_BEGIN";
export const FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_SUCCESS = "FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_SUCCESS";
export const FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_FAILURE = "FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_FAILURE";

export const MANAGE_SCRIPT_TILE_BEGIN = "MANAGE_SCRIPT_TILE_BEGIN";
export const MANAGE_SCRIPT_TILE_SUCCESS = "MANAGE_SCRIPT_TILE_SUCCESS";
export const MANAGE_SCRIPT_TILE_FAILURE = "MANAGE_SCRIPT_TILE_FAILURE";

export const MANAGE_SCRIPT_AUDIT_HISTORY_BEGIN = "MANAGE_SCRIPT_AUDIT_HISTORY_BEGIN";
export const MANAGE_SCRIPT_AUDIT_HISTORY_SUCCESS = "MANAGE_SCRIPT_AUDIT_HISTORY_SUCCESS";
export const MANAGE_SCRIPT_AUDIT_HISTORY_FAILURE = "MANAGE_SCRIPT_AUDIT_HISTORY_FAILURE";