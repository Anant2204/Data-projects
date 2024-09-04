import { AxiosError } from "axios";
import {
  IConsumption,
  Messagestate,
} from "../interfaces";

export interface ReduxRootState {
  consumptions: ReduxConsumptionState;
  regions: ReduxRegionState;
  config: ReduxConfigState;
  commonMessagesState: ReduxCommonMessageState;
  permissionState: ReduxPermissionState;
}

export interface ReduxPermissionState {
  isLoading: boolean;
  error: AxiosError;
  permissionData: {
    [estimateId: string]: string;
  };
}

export interface ReduxConsumptionState {
  isLoading: boolean;
  consumptions: IConsumption[];
  error: AxiosError;
}


export interface ReduxRegionState {
  isLoading: boolean;
  error: AxiosError;
  regions: string[];
}


export interface ReduxConfigState {
  isLoading: boolean;
  error: AxiosError;
  config: string;
}

export interface ReduxCommonMessageState {
  messages: Messagestate[];
}

export const FETCH_CONSUMPTION_BEGIN = "FETCH_CONSUMPTION_BEGIN";
export const FETCH_CONSUMPTION_SUCCESS = "FETCH_CONSUMPTION_SUCCESS";
export const FETCH_CONSUMPTION_FAILURE = "FETCH_CONSUMPTION_FAILURE";
export const FETCH_REGION_BEGIN = "FETCH_REGION_BEGIN";
export const FETCH_REGION_FAILURE = "FETCH_REGION_FAILURE";
export const FETCH_REGION_SUCCESS = "FETCH_REGION_SUCCESS";
export const FETCH_OPP_DETAILS_BEGIN = "FETCH_OPP_DETAILS_BEGIN";
export const FETCH_OPP_DETAILS_SUCCESS = "FETCH_OPP_DETAILS_SUCCESS";
export const FETCH_OPP_DETAILS_FAILURE = "FETCH_OPP_DETAILS_FAILURE";

export const FETCH_CONFIG_BEGIN = "FETCH_CONFIG_BEGIN";
export const FETCH_CONFIG_SUCCESS = "FETCH_CONFIG_SUCCESS";
export const FETCH_CONFIG_FAILURE = "FETCH_CONFIG_FAILURE";

export const FETCH_PERMISSIONS_BEGIN = "FETCH_PERMISSIONS_BEGIN";
export const FETCH_PERMISSIONS_SUCCESS = "FETCH_PERMISSIONS_SUCCESS";
export const FETCH_PERMISSIONS_FAILURE = "FETCH_PERMISSIONS_FAILURE";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const CLEAR_MESSAGE_WITH_PARAM = "CLEAR_MESSAGE_WITH_PARAM";
export const CLEAR_MESSAGE_FOR_COMPONENT = "CLEAR_MESSAGE_FOR_COMPONENT";
