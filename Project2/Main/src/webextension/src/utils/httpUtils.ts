import { IAppContext } from "@msx/platform-services";
import axios from "axios";
import { Guid, logException } from "./utils";

export const getAPI = async (
  url: string,
  parentContext: IAppContext
): Promise<any> => {
  try {
    const auth = parentContext.getAuthContext();
    const resource: any = process.env.REACT_APP_MCT_API_RESOURCE_ID;
    const apiEndPoint = `${process.env.REACT_APP_MCT_API_ENDPOINT}${url}`;
    const token = await auth?.getToken(resource);
    const request = {
      headers: {
        Authorization: "Bearer " + token,
        "x-activity-id": new Guid().toString(),
      },
    };
    let response = await axios.get(apiEndPoint, request);
    return response;
  } catch (err) {
    logException(parentContext, url, err);
    if (err?.response) {
      return err.response;
    } else {
      return err;
    }
  }
};


export const postAPI = async (
  url: string,
  postData: object,
  parentContext: IAppContext
): Promise<any> => {
  try {
    const auth = parentContext.getAuthContext();
    const resource: any = process.env.REACT_APP_MCT_API_RESOURCE_ID;
    const apiEndPoint = `${process.env.REACT_APP_MCT_API_ENDPOINT}${url}`;
    const token = await auth.getToken(resource);
    const request = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "x-activity-id": new Guid().toString(),
      },
    };
    let response = await axios.post(apiEndPoint, postData, request);
    return response;
  } catch (err) {
    logException(parentContext, url, err);
    return err?.response || err;
  }
};

export const putAPI = async (
  url: string,
  putData: object,
  parentContext: IAppContext
): Promise<any> => {
  try {
    const auth = parentContext.getAuthContext();
    const resource: any = process.env.REACT_APP_MCT_API_RESOURCE_ID;
    const apiEndPoint = `${process.env.REACT_APP_MCT_API_ENDPOINT}${url}`;
    const token = await auth.getToken(resource);
    const request = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "x-activity-id": new Guid().toString(),
      },
    };
    let response = await axios.put(apiEndPoint, putData, request);
    return response;
  } catch (err) {
    logException(parentContext, url, err);
    if (err?.response) {
      return err.response;
    } else {
      return err;
    }
  }
};

