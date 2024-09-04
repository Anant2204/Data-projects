import { AxiosError } from 'axios';
import {
  FETCH_USER_PROFILE_BEGIN,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  SET_USER_PROFILE_BEGIN,
  SET_USER_PROFILE_SUCCESS,
  SET_USER_PROFILE_ERROR,
} from '..';
import { IDataService, IUserProfile } from '../../interfaces';


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

export const updateUserProfile = (dataService: IDataService, userProfile: IUserProfile) => {
  return async (dispatch: any) => {
    dispatch(setUserProfileBegin());
    try {
      await dataService.UpdateUserProfile(userProfile)
      dispatch(setUserProfileSuccess(userProfile));
    } catch (err) {
      dispatch(setUserProfileError(err));
    }
  }
}
