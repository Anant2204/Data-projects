import { AxiosError } from "axios";
import {
  FETCH_CONFIG_BEGIN,
  FETCH_CONFIG_SUCCESS,
  FETCH_CONFIG_FAILURE,
} from "../store.types";
import { IAppContext } from "@msx/platform-services";
import { getAPI } from "../../utils/httpUtils";
import { getErrorMessage, logException } from "../../utils/utils";
import { AppDispatch, reduxStore } from "../reduxStore";

export const fetchConfigBegin = () => ({
  type: FETCH_CONFIG_BEGIN,
});
export const fetchConfigSuccess = (payload: string) => ({
  type: FETCH_CONFIG_SUCCESS,
  payload: payload,
});
export const fetchconfigError = (error: AxiosError) => ({
  type: FETCH_CONFIG_FAILURE,
  payload: error,
});

export const fetchConfigKey: any = (
  parentContext: IAppContext,
  keyName: string
) => {
  return async (dispatch: AppDispatch) => {
    (fetchConfigBegin());
    try {
      const url = `/v1/clientconfig/${keyName}`;
      const response = await getAPI(url, parentContext);
      if (response && response.status == 200 && response.data) {
        reduxStore.dispatch(fetchConfigSuccess(response.data));
      } else {
        console.log(
          "fetch config error:",
          response.data ? response.data : response
        );
        let error;
        error.message = getErrorMessage(response);
        reduxStore.dispatch(fetchconfigError(error));
      }
    } catch (err) {
      logException(parentContext, "v1/clientconfig", err);
      dispatch(fetchconfigError(err));
    }
  };
};
