import { IAppContext } from "@msx/platform-types";
import { getConsumptionAPI } from "../../utils";
import { getErrorMessage, logException } from "../../utils/utils";
import {
  FETCH_PERMISSIONS_BEGIN,
  FETCH_PERMISSIONS_FAILURE,
  FETCH_PERMISSIONS_SUCCESS,
} from "../store.types";
import { Messagestate } from "../../interfaces";
import { MessageBarType } from "@fluentui/react";
import {
  commonComponent,
  all,
  level,
} from "../../constants/componentCodes.constant";
import { fetchPermissionsAPI } from "../../constants/messageCodes.constant";
import { addMessage, clearMessageWithParam } from "./commonMessages.actions";

const errorObject: Messagestate = {
  type: MessageBarType.error,
  level: {
    type: level.component,
    componentCode: commonComponent,
    messageCode: fetchPermissionsAPI,
  },
  message: "",
};

export const fetchPermissionsBegin = () => ({
  type: FETCH_PERMISSIONS_BEGIN,
});
export const fetchPermissionsSuccess = (payload) => ({
  type: FETCH_PERMISSIONS_SUCCESS,
  payload: payload,
});
export const fetchPermissionsError = (error) => ({
  type: FETCH_PERMISSIONS_FAILURE,
  payload: error,
});
export const fetchPermissions: any = (
  estimateId: string,
  parentContext: IAppContext
) => {
  return async (dispatch) => {
    dispatch(fetchPermissionsBegin());
    try {
      const url = `v1/consumption/auth/${estimateId}/entityType/ConsumptionEstimate`;
      const response = await getConsumptionAPI(url, parentContext);
      if (response && response.status == 200 && response.data) {
        // identify the permission level
        let permission = "";
        switch (response.data.toLowerCase()) {
          case "reader":
            permission = "readonly";
            break;
          case null:
          case "none":
            permission = "unauthorized";
            break;
          default:
            permission = "readwrite";
            break;
        }
        //clear the error message if any from cache
        dispatch(
          clearMessageWithParam({
            componentCode: commonComponent,
            messageCode: fetchPermissionsAPI,
          })
        );
        //dispatch the success or unauthorized action
        if (permission === "unauthorized")
        {
          dispatch(
            addMessage({
              type: MessageBarType.error,
              level: {
                type: level.Page,
                componentCode: all,
                messageCode: fetchPermissionsAPI,
              },
              message: "You are not authorized to view this estimate",
            })
          );
        }
        else
        {
          dispatch(
            fetchPermissionsSuccess({
              estimateId: estimateId,
              permission: permission,
            })
          );
        }
      } else {
        errorObject.message = getErrorMessage(response);
        //TODO : this needs to be removed once loder is implemented on error
        dispatch(fetchPermissionsError(null));
        //Add the message to the store to appear on as sticky message
        dispatch(addMessage(errorObject));
      }
    } catch (err) {
      logException(parentContext, `v1/consumption/auth`, err);
      errorObject.message = getErrorMessage(err);
      dispatch(fetchPermissionsError(null));
      //Add the message to the store to appear on as sticky message
      dispatch(addMessage(errorObject));
    }
  };
};
