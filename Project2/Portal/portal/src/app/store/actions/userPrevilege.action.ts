import { AxiosError } from 'axios';
import {
  GET_LOGGED_IN_USER_PREVILIGE_BEGIN,
  GET_LOGGED_IN_USER_PREVILIGE_SUCCESS,
  GET_LOGGED_IN_USER_PREVILIGE_FAILURE,
} from '..';

export const fetchUserprivilegeBegin = () => ({
  type: GET_LOGGED_IN_USER_PREVILIGE_BEGIN,
});

export const fetchUserprivilegeSuccess = (payload: any) => ({
  type: GET_LOGGED_IN_USER_PREVILIGE_SUCCESS,
  payload,
});

export const fetchUserprivilegeError = (error: AxiosError | string) => ({
  type: GET_LOGGED_IN_USER_PREVILIGE_FAILURE,
  payload: error,
});