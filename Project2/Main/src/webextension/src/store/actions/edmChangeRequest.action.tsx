import {
  EDM_CHANGE_REQUEST_BEGIN, 
  EDM_CHANGE_REQUEST_SUCCESS, 
  EDM_CHANGE_REQUEST_FAILURE,
  EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_BEGIN, 
  EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_SUCCESS, 
  EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_FAILURE,  
  } from "../store.types";
  import { IAppContext } from "@msx/platform-services";
  import { getErrorMessage, logException } from "../../utils/utils";
  import { AppDispatch, reduxStore } from "../reduxStore";
  import { getAPI } from "../../utils/httpUtils";
  import { addMessage, clearMessageWithParam } from "./commonMessages.actions";
  import {
    all,
    level,
    edmChangeRequestPage
  } from "../../constants/componentCodes.constant";
  import { 
    fetchEDMChangeRequestDataAPIError, fetchEDMChangeTaxonomyCorrectionDataAPIError,
 } from "../../constants/messageCodes.constant";
  import { IMessageState } from "../../interfaces";
  import { MessageBarType } from "@fluentui/react";
  import { IEDMChangeRequest } from "../../interfaces/ApiResponseModel/IEDMChangeRequest";
  
  export const fetchEDMChangeRequestBegin = () => ({
    type: EDM_CHANGE_REQUEST_BEGIN,
  });
  export const fetchEDMChangeRequestSuccess = (payload: IEDMChangeRequest) => ({
    type: EDM_CHANGE_REQUEST_SUCCESS,
    payload: payload,
  });

  export const fetchEDMChangeRequestError = (error: string) => ({
    type: EDM_CHANGE_REQUEST_FAILURE,
    payload: error,
  });

  export const fetchEDMChangeRequestData: any = (parentContext: IAppContext) => {
    return async (dispatch: AppDispatch) => {
      dispatch(
        clearMessageWithParam({
          componentCode: all,
          messageCode: fetchEDMChangeRequestDataAPIError,
        })
      );
      dispatch(fetchEDMChangeRequestBegin());
      try {
        const url = `/v1/futureManagerCorrection/requests`; 
        const response = await getAPI(url,parentContext);
        if (response && response.status == 200 && response.data) {
          reduxStore.dispatch(fetchEDMChangeRequestSuccess(response.data)); 
        } 
        else {
          const errorObj: IMessageState = {
            type: MessageBarType.error,
            level: {
              type: level.component,
              componentCode: edmChangeRequestPage,
              messageCode: fetchEDMChangeRequestDataAPIError,
            },
   
            message: getErrorMessage(response),
          };
          dispatch(addMessage(errorObj));
          reduxStore.dispatch(fetchEDMChangeRequestError(errorObj.message));
        }
      } catch (err) {
        logException(parentContext, `/v1/futureManagerCorrection/requests`, err);   
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.component,
            componentCode: edmChangeRequestPage,
            messageCode: fetchEDMChangeRequestDataAPIError,
          },
          message: getErrorMessage(err),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchEDMChangeRequestError(errorObj.message));
      }
    };
  }

  export const fetchEDMChangeTaxonomyCorrectionRequestBegin = () => ({
    type: EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_BEGIN,
  });
  export const fetchEDMChangeTaxonomyCorrectionRequestSuccess = (payload: IEDMChangeRequest) => ({
    type: EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_SUCCESS,
    payload: payload,
  });

  export const fetchEDMChangeTaxonomyCorrectionRequestError = (error: string) => ({
    type: EDM_CHANGE_TAXONOMY_CORRECTION_REQUEST_FAILURE,
    payload: error,
  });

  export const fetchEDMChangeTaxonomyCorrectData: any = (parentContext: IAppContext) => {
    return async (dispatch: AppDispatch) => {
      dispatch(
        clearMessageWithParam({
          componentCode: edmChangeRequestPage,
          messageCode: fetchEDMChangeTaxonomyCorrectionDataAPIError,
        })
      );
      dispatch(fetchEDMChangeTaxonomyCorrectionRequestBegin());
      try {
        const url = `/v1/taxonomyCorrection/requests`; 
        const response = await getAPI(url,parentContext);
        if (response && response.status == 200 && response.data) {
          reduxStore.dispatch(fetchEDMChangeTaxonomyCorrectionRequestSuccess(response.data)); 
        } 
        else {
          const errorObj: IMessageState = {
            type: MessageBarType.error,
            level: {
              type: level.component,
              componentCode: edmChangeRequestPage,
              messageCode: fetchEDMChangeTaxonomyCorrectionDataAPIError,
            },
   
            message: getErrorMessage(response),
          };
          dispatch(addMessage(errorObj));
          reduxStore.dispatch(fetchEDMChangeTaxonomyCorrectionRequestError(errorObj.message));
        }
      } catch (err) {
        logException(parentContext, `/v1/taxonomyCorrection/requests`, err); 
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.component,
            componentCode: edmChangeRequestPage,
            messageCode: fetchEDMChangeTaxonomyCorrectionDataAPIError,
          },
          message: getErrorMessage(err),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchEDMChangeTaxonomyCorrectionRequestError(errorObj.message));
      }
    };
  }
