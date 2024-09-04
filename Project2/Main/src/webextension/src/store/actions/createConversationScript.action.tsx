import {
  CREATE_CONVERATOIN_SCENARIO_BEGIN,
  CREATE_CONVERATOIN_SCENARIO_SUCCESS,
  CREATE_CONVERATOIN_SCENARIO_FAILURE,
  FETCH_CY_ORG_DETAILS_BEGIN,
  FETCH_CY_ORG_DETAILS_SUCCESS,
  FETCH_CY_ORG_DETAILS_FAILURE,
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
import { IAppContext } from "@msx/platform-services";
import { getErrorMessage, logException } from "../../utils/utils";
import { AppDispatch, reduxStore } from "../reduxStore";
import { getAPI, postAPI } from "../../utils/httpUtils";
import { addMessage, clearMessageWithParam } from "./commonMessages.actions";
import {
  all,
  createTaxonomyChangeContent,
  level,
} from "../../constants/componentCodes.constant";
import {
  fetchTaxonomyScriptContentDataAPIError, fetchOrgDetailsAPIError, fetchTaxonomyDetailsQualifierAPIError, taxonomyScriptContentStatisticsAPIError,
} from "../../constants/messageCodes.constant";
import { IMessageState } from "../../interfaces";
import { MessageBarType } from "@fluentui/react";
import { IManageScriptAuditHistoryInfo, IManageScriptTileInfo, IScriptScenarios, ITaxonomyDetailsQualifierInfo } from "../../interfaces/ApiResponseModel/ICreateConversationScript";

export const fetchTaxonomyScriptContentBegin = () => ({
  type: CREATE_CONVERATOIN_SCENARIO_BEGIN,
});
export const fetchTaxonomyScriptContentSuccess = (payload: IScriptScenarios[]) => ({
  type: CREATE_CONVERATOIN_SCENARIO_SUCCESS,
  payload: payload,
});
export const fetchTaxonomyScriptContentError = (error: string) => ({
  type: CREATE_CONVERATOIN_SCENARIO_FAILURE,
  payload: error,
});

export const fetchTaxonomyScriptContentData: any = (parentContext: IAppContext) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      clearMessageWithParam({
        componentCode: all,
        messageCode: fetchTaxonomyScriptContentDataAPIError,
      })
    );
    dispatch(fetchTaxonomyScriptContentBegin());
    try {
      const url = `/v1/taxonomyScriptContent/get`
      const response = await getAPI(url,parentContext);
      if (response && response.status == 200 && response.data) {
        reduxStore.dispatch(fetchTaxonomyScriptContentSuccess(response.data?.taxonomyScriptsContent));
      }
      else {
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.Page,
            componentCode: all,
            messageCode: fetchTaxonomyScriptContentDataAPIError,
          },

          message: getErrorMessage(response),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchTaxonomyScriptContentError(errorObj.message));
      }
    } catch (err) {
      logException(parentContext, `/v1/taxonomyScriptContent/get`, err);
      const errorObj: IMessageState = {
        type: MessageBarType.error,
        level: {
          type: level.Page,
          componentCode: all,
          messageCode: fetchTaxonomyScriptContentDataAPIError,
        },
        message: getErrorMessage(err),
      };
      dispatch(addMessage(errorObj));
      reduxStore.dispatch(fetchTaxonomyScriptContentError(errorObj.message));
    }
  };
}

export const fetchOrgDetailstBegin = (type) => ({
  type: type,
});
export const fetchOrgDetailsSuccess = (payload: string[], type) => ({
  type: type,
  payload: payload,
});

export const fetchOrgDetailsError = (error: string, type) => ({
  type: type,
  payload: error,
});

export const getOrgDetailsData: any = (parentContext: IAppContext, requestType: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      clearMessageWithParam({
        componentCode: createTaxonomyChangeContent,
        messageCode: fetchOrgDetailsAPIError,
      })
    );
    const beginType = requestType === 'cy' ? FETCH_CY_ORG_DETAILS_BEGIN : FETCH_FY_ORG_DETAILS_BEGIN;
    const successType = requestType === 'cy' ? FETCH_CY_ORG_DETAILS_SUCCESS : FETCH_FY_ORG_DETAILS_SUCCESS;
    const failureTpe = requestType === 'cy' ? FETCH_CY_ORG_DETAILS_FAILURE : FETCH_FY_ORG_DETAILS_FAILURE;

    dispatch(fetchOrgDetailstBegin(beginType));
    try {
     const url = `/v1/common/getOrgDetails/${requestType}`;
      const response = await getAPI(url,parentContext);

      if (response && response.status == 200 && response.data) {
        reduxStore.dispatch(fetchOrgDetailsSuccess(response.data,successType)); 
      } 
      else {
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.component,
            componentCode: createTaxonomyChangeContent,
            messageCode: fetchOrgDetailsAPIError,
          },

          message: getErrorMessage(response),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchOrgDetailsError(errorObj.message,failureTpe));
      }
    } catch (err) {
      logException(parentContext, `v1/master/orgDetails/get/${requestType}`, err);
      const errorObj: IMessageState = {
        type: MessageBarType.error,
        level: {
          type: level.component,
          componentCode: createTaxonomyChangeContent,
          messageCode: fetchOrgDetailsAPIError,
        },
        message: getErrorMessage(err),
      };
      dispatch(addMessage(errorObj));
      reduxStore.dispatch(fetchOrgDetailsError(errorObj.message, failureTpe));
    }
  };
}


export const fetchTaxonomyDetailstBegin = (type) => ({
  type: type,
});
export const fetchTaxonomyDetailsSuccess = (payload: ITaxonomyDetailsQualifierInfo[], type) => ({
  type: type,
  payload: payload,
});

export const fetchTaxonomyDetailsError = (error: string, type) => ({
  type: type,
  payload: error,
});

export const getTaxonomyDetailsData: any = (parentContext: IAppContext, org: string, requestType: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      clearMessageWithParam({
        componentCode: createTaxonomyChangeContent,
        messageCode: fetchTaxonomyDetailsQualifierAPIError,
      })
    );
    const beginType = requestType === 'cy' ? FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_BEGIN : FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_BEGIN;
    const successType = requestType === 'cy' ? FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_SUCCESS : FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_SUCCESS;
    const failureTpe = requestType === 'cy' ? FETCH_CY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_FAILURE : FETCH_FY_ROLESUMMARY_Q1_Q2_TAXONOMY_DETAILS_FAILURE;

    dispatch(fetchTaxonomyDetailstBegin(beginType));
    try {
      const url = `/v1/common/${org}/getTaxonomyDetails/${requestType}`;
      // const url = `/v1/taxonomyScriptContent/getTaxonomyDetails`;
      const response = await getAPI(url, parentContext);
      if (response && response.status == 200 && response.data) {
        reduxStore.dispatch(fetchTaxonomyDetailsSuccess(response?.data.taxonomyInfoDetails, successType));
      }
      else {
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.Page,
            componentCode: createTaxonomyChangeContent,
            messageCode: fetchTaxonomyDetailsQualifierAPIError,
          },

          message: getErrorMessage(response),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchTaxonomyDetailsError(errorObj.message, failureTpe));
      }
    } catch (err) {
      logException(parentContext, `/v1/common/${org}/getTaxonomyDetails/${requestType}`, err);
      const errorObj: IMessageState = {
        type: MessageBarType.error,
        level: {
          type: level.Page,
          componentCode: createTaxonomyChangeContent,
          messageCode: fetchTaxonomyDetailsQualifierAPIError,
        },
        message: getErrorMessage(err),
      };
      dispatch(addMessage(errorObj));
      reduxStore.dispatch(fetchTaxonomyDetailsError(errorObj.message, failureTpe));
    }
  };
}

export const fetchManageScriptTileDataBegin = () => ({
  type: MANAGE_SCRIPT_TILE_BEGIN,
});
export const fetchManageScriptTileDataSuccess = (payload: IManageScriptTileInfo) => ({
  type: MANAGE_SCRIPT_TILE_SUCCESS,
  payload: payload,
});
export const fetchManageScriptTileDataError = (error: string) => ({
  type: MANAGE_SCRIPT_TILE_FAILURE,
  payload: error,
});

export const fetchManageScriptTileData: any = (parentContext: IAppContext) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      clearMessageWithParam({
        componentCode: all,
        messageCode: fetchTaxonomyScriptContentDataAPIError,
      })
    );
    dispatch(fetchManageScriptTileDataBegin());
    try {
      const url = `/v1/taxonomyScriptContent/statistics`
      const response = await getAPI(url,parentContext);
      if (response && response.status == 200 && response.data) {
        reduxStore.dispatch(fetchManageScriptTileDataSuccess(response.data));
      }
      else {
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.component,
            componentCode: createTaxonomyChangeContent,
            messageCode: taxonomyScriptContentStatisticsAPIError,
          },

          message: getErrorMessage(response),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchManageScriptTileDataError(errorObj.message));
      }
    } catch (err) {
      logException(parentContext, `/v1/taxonomyScriptContent/statistics`, err);
      const errorObj: IMessageState = {
        type: MessageBarType.error,
        level: {
          type: level.component,
          componentCode: createTaxonomyChangeContent,
          messageCode: taxonomyScriptContentStatisticsAPIError,
        },
        message: getErrorMessage(err),
      };
      dispatch(addMessage(errorObj));
      reduxStore.dispatch(fetchManageScriptTileDataError(errorObj.message));
    }
  };
}


export const fetchManageScriptAuditHistoryBegin = () => ({
  type: MANAGE_SCRIPT_AUDIT_HISTORY_BEGIN,
});
export const fetchManageScriptAuditHistorySuccess = (payload: IManageScriptAuditHistoryInfo[]) => ({
  type: MANAGE_SCRIPT_AUDIT_HISTORY_SUCCESS,
  payload: payload,
});
export const fetchManageScriptAuditHistoryError = (error: string) => ({
  type: MANAGE_SCRIPT_AUDIT_HISTORY_FAILURE,
  payload: error,
});

export const fetchManageScriptAuditHistoryData: any = (parentContext: IAppContext, id:number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      clearMessageWithParam({
        componentCode: createTaxonomyChangeContent,
        messageCode: fetchTaxonomyScriptContentDataAPIError,
      })
    );
    dispatch(fetchManageScriptAuditHistoryBegin());
    try {
      const url = `/v1/taxonomyScriptContent/${id}/auditDetails`
      const response = await getAPI(url,parentContext);
      if (response && response.status == 200 && response.data) {
        reduxStore.dispatch(fetchManageScriptAuditHistorySuccess(response.data));
      }
      else {
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.component,
            componentCode: createTaxonomyChangeContent,
            messageCode: fetchTaxonomyScriptContentDataAPIError,
          },

          message: getErrorMessage(response),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchManageScriptAuditHistoryError(errorObj.message));
      }
    } catch (err) {
      logException(parentContext, `/v1/taxonomyScriptContent/auditDetails/${id}`, err);
      const errorObj: IMessageState = {
        type: MessageBarType.error,
        level: {
          type: level.component,
          componentCode: all,
          messageCode: fetchTaxonomyScriptContentDataAPIError,
        },
        message: getErrorMessage(err),
      };
      dispatch(addMessage(errorObj));
      reduxStore.dispatch(fetchManageScriptAuditHistoryError(errorObj.message));
    }
  };
}