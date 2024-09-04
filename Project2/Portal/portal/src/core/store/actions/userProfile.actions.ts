import { AxiosError } from 'axios';
import { IPortalConfig, IHttpClient, IHttpClientRequest } from '@msx/platform-services';
import { IUserProfile } from '../../models';
import { FETCH_USER_PROFILE_BEGIN, FETCH_USER_PROFILE_SUCCESS, FETCH_USER_PROFILE_FAILURE, SET_USER_PROFILE_BEGIN, SET_USER_PROFILE_SUCCESS, SET_USER_PROFILE_ERROR } from '../../../app/store';


export const fetchUserProfileBegin = () => ({
  type: FETCH_USER_PROFILE_BEGIN,
});

export const fetchUserProfileSuccess = (payload: IUserProfile) => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  payload,
});

export const fetchUserProfileError = (error: AxiosError | string) => ({
  type: FETCH_USER_PROFILE_FAILURE,
  payload: error,
});

export const setUserProfileBegin = () => ({
  type: SET_USER_PROFILE_BEGIN,
});

export const setUserProfileSuccess = (payload: IUserProfile) => ({
  type: SET_USER_PROFILE_SUCCESS,
  payload,
});

export const setUserProfileError = (error: AxiosError) => ({
  type: SET_USER_PROFILE_ERROR,
  payload: error,
});

export const fetchUserProfile = async (httpClient: IHttpClient, appConfig:IPortalConfig) => {
  return new Promise(async function (resolve, reject) {
    try {
      // TODO: replace the above url with actual API endpoint
      // follow the below example 
      // const url = `${appConfig.apiConfig.baseUrl}userProfile`;
      const url = '/data/userProfile.json';
      const resource = appConfig.apiConfig.resource;
      //alert('fetchUserProfile ' + resource);
      const request: IHttpClientRequest = {
        resource: resource,
      };
      const response: any = await httpClient.get(url, request);
      resolve(response.data ? response.data : {});
    } catch (err) {
      reject(err);
    }
  })
}

export const updateUserProfile = (httpClient: IHttpClient, userProfile: IUserProfile, appConfig:IPortalConfig) => {
  return async (dispatch: any) => {
    dispatch(setUserProfileBegin());
    try {
      alert('TODO: updateUserProfile')
      //const resource = appConfig.apiConfig.todoApiResource ; 
      // const url = `${appConfig.apiConfig.userProfileApiBaseUrl}`;
      // const request: IHttpClientRequest = {
      //   resource: resource,
      //   data: userProfile,
      // };
      // const response: any = await httpClient.post(url, request);
      dispatch(setUserProfileSuccess(userProfile));
    } catch (err) {
      dispatch(setUserProfileError(err));
    }
  }
}
