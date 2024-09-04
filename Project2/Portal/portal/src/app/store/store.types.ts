import { INotificationItem } from '../interfaces';
import { AxiosError } from 'axios';
import {
  ReduxExtensionsRegistrationState,
  ReduxAppState
} from '../../core/store'
import { IUserProfile } from '../interfaces';

export interface ReduxUserProfileState {
  userProfile: IUserProfile;
  isLoading: boolean;
  error: AxiosError;
}

export interface ReduxNotificationsState {
  notifications: INotificationItem[];
  isLoading: boolean;
  error: AxiosError;
}


export interface ReduxToDoCrudState {
  isLoading: boolean;
  error: AxiosError;
}

export interface ReduxRootState {
  app: ReduxAppState;
  extensionsRegistration: ReduxExtensionsRegistrationState;
  userProfile: ReduxUserProfileState;
  notifications: ReduxNotificationsState;
  todoCrud: ReduxToDoCrudState;
  userPrevilige:ReduxUserPreviligeState;
}

export interface ReduxUserPreviligeState {
  userPrevilige: any;
  isLoading: boolean;
  error: AxiosError;
}


export const FETCH_USER_PROFILE_BEGIN = 'FETCH_USER_PROFILE_BEGIN';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

export const SET_USER_PROFILE_BEGIN = 'SET_USER_PROFILE_BEGIN';
export const SET_USER_PROFILE_SUCCESS = 'SET_USER_PROFILE_SUCCESS';
export const SET_USER_PROFILE_ERROR = 'SET_USER_PROFILE_ERROR';
export const SET_CURRENT_SUPPLIER = 'SET_CURRENT_SUPPLIER';
export const SET_CURRENT_COMPANY_CODE = 'SET_CURRENT_COMPANY_CODE';

export const FETCH_NOTIFICATIONS_BEGIN = "FETCH_NOTIFICATIONS_BEGIN";
export const FETCH_NOTIFICATIONS_SUCCESS = "FETCH_NOTIFICATIONS_SUCCESS";
export const FETCH_NOTIFICATIONS_FAILURE = "FETCH_NOTIFICATIONS_FAILURE";
export const SET_NOTIFICATIONS_BEGIN = "SET_NOTIFICATIONS_BEGIN";
export const SET_NOTIFICATIONS_SUCCESS = "SET_NOTIFICATIONS_SUCCESS";
export const SET_NOTIFICATIONS_ERROR = "SET_NOTIFICATIONS_ERROR";

export const FETCH_TODO_LIST_BEGIN = 'FETCH_TODO_LIST_BEGIN';
export const FETCH_TODO_LIST_SUCCESS = 'FETCH_TODO_LIST_SUCCESS';
export const FETCH_TODO_LIST_FAILURE = 'FETCH_TODO_LIST_FAILURE';

export const CRUD_TODO_LIST_BEGIN = 'CRUD_TODO_LIST_BEGIN';
export const CRUD_TODO_LIST_SUCCESS = 'CRUD_TODO_LIST_SUCCESS';
export const CRUD_TODO_LIST_FAILURE = 'CRUD_TODO_LIST_FAILURE';

export const GET_LOGGED_IN_USER_PREVILIGE_BEGIN = 'GET_LOGGED_IN_USER_PREVILIGE_BEGIN';
export const GET_LOGGED_IN_USER_PREVILIGE_SUCCESS = 'GET_LOGGED_IN_USER_PREVILIGE_SUCCESS';
export const GET_LOGGED_IN_USER_PREVILIGE_FAILURE = 'GET_LOGGED_IN_USER_PREVILIGE_FAILURE';
