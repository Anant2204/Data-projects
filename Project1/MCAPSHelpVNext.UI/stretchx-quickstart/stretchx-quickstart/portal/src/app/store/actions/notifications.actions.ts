import { AxiosError } from 'axios';
import {
  FETCH_NOTIFICATIONS_BEGIN,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  SET_NOTIFICATIONS_BEGIN,
  SET_NOTIFICATIONS_SUCCESS,
  SET_NOTIFICATIONS_ERROR,
} from '..';

import { IDataService, INotificationItem } from '../../interfaces';
import { Dispatch } from 'redux';

export const fetchNotificationsBegin = () => ({
  type: FETCH_NOTIFICATIONS_BEGIN,
});

export const fetchNotificationsSuccess = (payload: INotificationItem[]) => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  payload,
});

export const fetchNotificationsError = (error: AxiosError | string) => ({
  type: FETCH_NOTIFICATIONS_FAILURE,
  payload: error,
});

export const setNotificationsBegin = () => ({
  type: SET_NOTIFICATIONS_BEGIN,
});

export const setNotificationsSuccess = (payload: INotificationItem[]) => ({
  type: SET_NOTIFICATIONS_SUCCESS,
  payload,
});

export const setNotificationsError = (error: AxiosError) => ({
  type: SET_NOTIFICATIONS_ERROR,
  payload: error,
});

export const fetchNotifications = (dataService: IDataService) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchNotificationsBegin());
    try {
      const response = await dataService.GetNotifications();
      return dispatch(fetchNotificationsSuccess(response ? response : null));
    } catch (err) {
      return dispatch(fetchNotificationsError(err));
    }
  };
};

export const updatetNotifications = (dataService: IDataService, notifications: INotificationItem[]) => {
  return async (dispatch: Dispatch) => {
    dispatch(setNotificationsBegin());
    try {
      await dataService.UpdateNotifications(notifications);
      dispatch(setNotificationsSuccess(notifications));
    } catch (err) {
      dispatch(setNotificationsError(err));
    }
  };
};
