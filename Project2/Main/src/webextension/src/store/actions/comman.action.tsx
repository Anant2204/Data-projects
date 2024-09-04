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
  CLEAR_CONVERSATION_SCRIPT_DATA,
  FETCH_TAXONOMY_CORRECTIONS_DETAILS_BEGIN,
  FETCH_TAXONOMY_CORRECTIONS_DETAILS_SUCCESS,
  FETCH_TAXONOMY_CORRECTIONS_DETAILS_FAILURE,
} from "../store.types";
import { IAppContext } from "@msx/platform-services";
import { getErrorMessage, logException } from "../../utils/utils";
import { AppDispatch, reduxStore } from "../reduxStore";
import { getAPI, postAPI } from "../../utils/httpUtils";
import { addMessage, clearMessageWithParam } from "./commonMessages.actions";
import {
  all,
  level,
  receiveConversationPage,
  sendConversationPage,
  taxonomyCorrections,
} from "../../constants/componentCodes.constant";
import { fetchManagerDataAPIError, fetchConversationScriptDataAPIError, fetchFutureManagerDataAPIError, 
  fetchTaxonomyDetailsAPIError} from "../../constants/messageCodes.constant";
import { ITaxonomyCorrections, ITaxonomyDetails, IMessageState, IPerson } from "../../interfaces";
import { MessageBarType } from "@fluentui/react";
import { IEmployeeData } from "../../interfaces/ApiResponseModel/IConversationScript";
import { cloneDeep } from "lodash";

export const fetchManagersListBegin = () => ({
  type: FETCH_MANAGER_LIST_BEGIN,
});
export const fetchManagersListSuccess = (payload: string) => ({
  type: FETCH_MANAGER_LIST_SUCCESS,
  payload: payload,
});

export const fetchManagersListError = (error: string) => ({
  type: FETCH_MANAGER_LIST_FAILURE,
  payload: error,
});

export const clearConversationScriptData = () => ({
  type: CLEAR_CONVERSATION_SCRIPT_DATA,
});

export const fetchManagerData: any = (parentContext: IAppContext,isCompleteHierarchy:boolean = true) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      clearMessageWithParam({
        componentCode: all,
        messageCode: fetchManagerDataAPIError,
      })
    );
    dispatch(fetchManagersListBegin());
    try {
      const url = `/v1/manager/get`;
      const postData = {
        "searchPattern":"",
        "paginationDetails": {
          "pageSize": 0,
          "pageNumber": 0
        },
        "completeReportingHierarchy": isCompleteHierarchy
      }
      const response = await postAPI(url,postData,parentContext);
      if (response && response.status == 200 && response.data) {
        reduxStore.dispatch(fetchManagersListSuccess(response.data)); 
      }  
      else {
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.Page,
            componentCode: all,
            messageCode: fetchManagerDataAPIError,
          },

          message: getErrorMessage(response),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchManagersListError(errorObj.message));
      }
    } catch (err) {
      logException(parentContext, `/v1/manager/get`, err);
      const errorObj: IMessageState = {
        type: MessageBarType.error,
        level: {
          type: level.Page,
          componentCode: all,
          messageCode: fetchManagerDataAPIError,
        },
        message: getErrorMessage(err),
      };
      dispatch(addMessage(errorObj));
      reduxStore.dispatch(fetchManagersListError(errorObj.message));
    }
  };
};

export const fetchConversationScriptBegin = () => ({
  type: CONVERSATION_SCRIPT_BEGIN,
});
export const fetchConversationScriptSuccess = (payload: IEmployeeData) => ({
  type: CONVERSATION_SCRIPT_SUCCESS,
  payload: payload,
});

export const fetchConversationScriptError = (error: string) => ({
  type: CONVERSATION_SCRIPT_FAILURE,
  payload: error,
});

const taxonomyMap = (data: IEmployeeData) : IEmployeeData => {
  //define a const object of type IEmployeeData
  let localData:IEmployeeData = null;
  if(data?.cyTaxonomy && data?.fyTaxonomy){
  localData = cloneDeep(data);
  localData.tableData = [];
  if(data?.cyTaxonomy?.org && data?.fyTaxonomy?.org){
    localData.tableData.push({
      fieldName: "Org",
      cy: data?.cyTaxonomy?.org,
      fy: data?.fyTaxonomy?.org,
      hasChanged:
        data?.cyTaxonomy?.org !== data?.fyTaxonomy?.org,
    })
  }
  if(data?.cyTaxonomy?.profession && data?.fyTaxonomy?.profession){
    localData.tableData.push({
      fieldName: "Profession",
      cy: data?.cyTaxonomy?.profession,
      fy: data?.fyTaxonomy?.profession,
      hasChanged:
        data?.cyTaxonomy?.profession !== data?.fyTaxonomy?.profession,
    })
  }
  if(data?.cyTaxonomy?.discipline && data?.fyTaxonomy?.discipline){
    localData.tableData.push({
      fieldName: "Discipline",
      cy: data?.cyTaxonomy?.discipline,
      fy: data?.fyTaxonomy?.discipline,
      hasChanged:
        data?.cyTaxonomy?.discipline !== data?.fyTaxonomy?.discipline,
    })
  }
  if(data?.cyTaxonomy?.roleSummary && data?.fyTaxonomy?.roleSummary){
    localData.tableData.push({
      fieldName: "Role Summary",
      cy: data?.cyTaxonomy?.roleSummary,
      fy: data?.fyTaxonomy?.roleSummary,
      hasChanged:
        data?.cyTaxonomy?.roleSummary !== data?.fyTaxonomy?.roleSummary,
    })
  }
  if(data?.cyTaxonomy?.q1 && data?.fyTaxonomy?.q1){
    localData.tableData.push({
      fieldName: "Qualifier 1",
      cy: data?.cyTaxonomy?.q1,
      fy: data?.fyTaxonomy?.q1,
      hasChanged:
        data?.cyTaxonomy?.q1 !== data?.fyTaxonomy?.q1,
    })
  }
  if(data?.cyTaxonomy?.q2 && data?.fyTaxonomy?.q2){
    localData.tableData.push({
      fieldName: "Qualifier 2",
      cy: data?.cyTaxonomy?.q2,
      fy: data?.fyTaxonomy?.q2,
      hasChanged:
        data?.cyTaxonomy?.q2 !== data?.fyTaxonomy?.q2,
    })
  }
  if(data?.cyTaxonomy?.incentivePlan && data?.fyTaxonomy?.incentivePlan){
    localData.tableData.push({
      fieldName: "Incentive Plan",
      cy: data?.cyTaxonomy?.incentivePlan,
      fy: data?.fyTaxonomy?.incentivePlan,
      hasChanged:
        data?.cyTaxonomy?.incentivePlan !== data?.fyTaxonomy?.incentivePlan,
    })
  }
  if(data?.cyTaxonomy?.businessLeader && data?.fyTaxonomy?.businessLeader){
    localData.tableData.push({
      fieldName: "Business Leader",
      cy: data?.cyTaxonomy?.businessLeader,
      fy: data?.fyTaxonomy?.businessLeader,
      hasChanged:
        data?.cyTaxonomy?.businessLeader !== data?.fyTaxonomy?.businessLeader,
    })
  }
  if(data?.cyTaxonomy?.manager && data?.fyTaxonomy?.manager){
    localData.tableData.push({
      fieldName: "Manager",
      cy: data?.cyTaxonomy?.manager,
      fy: data?.fyTaxonomy?.manager,
      hasChanged:
        data?.cyTaxonomy?.manager !== data?.fyTaxonomy?.manager,
    })
  }
}
return localData;
};
export const fetchConversationScriptData: any = (parentContext: IAppContext, pageName:string ,empAlias:string) => {
  return async (dispatch: AppDispatch) => {
    let uriPage:string = '';
    switch (pageName) {
      case receiveConversationPage:
        uriPage = 'receive';
        break;
      case sendConversationPage:
        uriPage = 'sendstay';
        break;
      default:
        break;
    }
    dispatch(
      clearMessageWithParam({
        componentCode: all,
        messageCode: fetchConversationScriptDataAPIError,
      })
    );
    dispatch(fetchConversationScriptBegin());
    try {
      const url = `/v1/conversation/${uriPage}/script?empAlias=${empAlias}`;      
      const response = await getAPI(url,parentContext);
      if (response && response.status == 200 && response.data) {
        const objEmp: IEmployeeData = taxonomyMap(response.data);
        reduxStore.dispatch(fetchConversationScriptSuccess(objEmp)); 
      } 
      else {
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.Page,
            componentCode: all,
            messageCode: fetchConversationScriptDataAPIError,
          },
 
          message: getErrorMessage(response),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchConversationScriptError(errorObj.message));
      }
    } catch (err) {
      logException(parentContext, `/v1/conversation/${uriPage}/script?empAlias=${empAlias}`, err);
      const errorObj: IMessageState = {
        type: MessageBarType.error,
        level: {
          type: level.Page,
          componentCode: all,
          messageCode: fetchConversationScriptDataAPIError,
        },
        message: getErrorMessage(err),
      };
      dispatch(addMessage(errorObj));
      reduxStore.dispatch(fetchConversationScriptError(errorObj.message));
    }
  };
}


export const fetchFutureManagerBegin = () => ({
  type: FUTURE_MANAGER_BEGIN,
});
export const fetchFutureManagerSuccess = (payload: IPerson) => ({
  type: FUTURE_MANAGER_SUCCESS,
  payload: payload,
});

export const fetchFutureManagerError = (error: string) => ({
  type: FUTURE_MANAGER_FAILURE,
  payload: error,
});

export const fetchFutureManagerData: any = (parentContext: IAppContext, searchString:string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      clearMessageWithParam({
        componentCode: all,
        messageCode: fetchFutureManagerDataAPIError,
      })
    );
    dispatch(fetchFutureManagerBegin());
    try {
      const url = `/v1/futureManagerCorrection/getFutureManager?searchString=${searchString}`;      
      const response = await getAPI(url,parentContext);
      if (response && response.status == 200 && response.data) {
        reduxStore.dispatch(fetchFutureManagerSuccess(response.data)); 
      } 
      else {
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.component,
            componentCode: all,
            messageCode: fetchFutureManagerDataAPIError,
          },
 
          message: getErrorMessage(response),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchFutureManagerError(errorObj.message));
      }
    } catch (err) {
      logException(parentContext, `/v1/futureManagerCorrection/getFutureManager/searchString=${searchString}`, err);
      const errorObj: IMessageState = {
        type: MessageBarType.error,
        level: {
          type: level.component,
          componentCode: all,
          messageCode: fetchFutureManagerDataAPIError,
        },
        message: getErrorMessage(err),
      };
      dispatch(addMessage(errorObj));
      reduxStore.dispatch(fetchFutureManagerError(errorObj.message));
    }
  };
}

export const fetchTaxonomyDetailsBegin = () => ({
  type: FETCH_TAXONOMY_CORRECTIONS_DETAILS_BEGIN,
});
export const fetchTaxonomyDetailsSuccess = (payload: ITaxonomyDetails[]) => ({
  type: FETCH_TAXONOMY_CORRECTIONS_DETAILS_SUCCESS,
  payload: payload,
});

export const fetchTaxonomyDetailsError = (error: string) => ({
  type: FETCH_TAXONOMY_CORRECTIONS_DETAILS_FAILURE,
  payload: error,
});

export const fetchTaxonomyDetails: any = (parentContext: IAppContext,org:string,careerStage:string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      clearMessageWithParam({
        componentCode: taxonomyCorrections,
        messageCode: fetchTaxonomyDetailsAPIError,
      })
    );
    dispatch(fetchTaxonomyDetailsBegin());
    try {
      const url = `/v1/taxonomyCorrection/getTaxonomyDetails`;
      const postData = {
        "org": org,
        "careerStage": careerStage
      }
    
      const response = await postAPI(url,postData,parentContext);
      if (response && response.status == 200 && response.data) {
        const responseTaxonomyCorrections: ITaxonomyCorrections = response.data;
        reduxStore.dispatch(fetchTaxonomyDetailsSuccess(responseTaxonomyCorrections.taxonomyDetails)); 
      }  
      else {
        const errorObj: IMessageState = {
          type: MessageBarType.error,
          level: {
            type: level.Page,
            componentCode: taxonomyCorrections,
            messageCode: fetchTaxonomyDetailsAPIError,
          },

          message: getErrorMessage(response),
        };
        dispatch(addMessage(errorObj));
        reduxStore.dispatch(fetchTaxonomyDetailsError(errorObj.message));
      }
    } catch (err) {
      logException(parentContext, `/v1/taxonomyCorrection/getTaxonomyDetails`, err);
      const errorObj: IMessageState = {
        type: MessageBarType.error,
        level: {
          type: level.Page,
          componentCode: taxonomyCorrections,
          messageCode: fetchTaxonomyDetailsAPIError,
        },
        message: getErrorMessage(err),
      };
      dispatch(addMessage(errorObj));
      reduxStore.dispatch(fetchTaxonomyDetailsError(errorObj.message));
    }
  };
};
