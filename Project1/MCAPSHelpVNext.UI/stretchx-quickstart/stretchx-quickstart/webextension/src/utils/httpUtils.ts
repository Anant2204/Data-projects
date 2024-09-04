import { IAppContext } from "@msx/platform-services";
import axios from "axios";
import { Guid, logException } from "./utils";

export const getConsumptionAPI = async (
  url: string,
  parentContext: IAppContext
): Promise<any> => {
  try {
    const auth = parentContext.getAuthContext();
    const resource: any = process.env.REACT_APP_Consumption_API_RESOURCE_ID;
    const apiEndPoint = `${process.env.REACT_APP_Consumption_API_ENDPOINT}${url}`;
    const token = await auth?.getToken(resource);
    const request = {
      headers: {
        Authorization: "Bearer " + token,
        "x-ose-activity-id": new Guid().toString(),
      },
    };
    let response = await axios.get(apiEndPoint, request);
    return response;
  } catch (err) {
    logException(parentContext, url, err);
    if (err && err.response) {
      return err.response;
    } else {
      return err;
    }
  }
};


export const postConsumptionAPI = async (
  url: string,
  postData: object,
  parentContext: IAppContext
): Promise<any> => {
  try {
    const auth = parentContext.getAuthContext();
    const resource: any = process.env.REACT_APP_Consumption_API_RESOURCE_ID;
    const apiEndPoint = `${process.env.REACT_APP_Consumption_API_ENDPOINT}${url}`;
    const token = await auth.getToken(resource);
    const request = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "x-ose-activity-id": new Guid().toString(),
      },
    };
    let response = await axios.post(apiEndPoint, postData, request);
    return response;
  } catch (err) {
    logException(parentContext, url, err);
    if (err && err.response) {
      return err.response;
    } else {
      return err;
    }
  }
};

export const putConsumptionAPI = async (
  url: string,
  putData: object,
  parentContext: IAppContext
): Promise<any> => {
  try {
    const auth = parentContext.getAuthContext();
    const resource: any = process.env.REACT_APP_Consumption_API_RESOURCE_ID;
    const apiEndPoint = `${process.env.REACT_APP_Consumption_API_ENDPOINT}${url}`;
    const token = await auth.getToken(resource);
    const request = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "x-ose-activity-id": new Guid().toString(),
      },
    };
    let response = await axios.put(apiEndPoint, putData, request);
    return response;
  } catch (err) {
    logException(parentContext, url, err);
    if (err && err.response) {
      return err.response;
    } else {
      return err;
    }
  }
};

