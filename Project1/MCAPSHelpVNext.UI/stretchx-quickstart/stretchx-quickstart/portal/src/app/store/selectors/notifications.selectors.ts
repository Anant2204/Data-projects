import { createSelector } from 'reselect';
import { ReduxNotificationsState } from '..';
import { ReduxRootState } from '..';
import { AxiosError } from 'axios';
import { INotificationItem } from '../../interfaces';

const notificationsState = (state: ReduxRootState): ReduxNotificationsState => { return state.notifications; }

export const getNotifications = createSelector(
  notificationsState,
  (notificationsState: ReduxNotificationsState): INotificationItem[] => { return notificationsState.notifications }
);

export const getNotificationsLoadingStatus = createSelector(
  notificationsState,
  (notificationsState: ReduxNotificationsState): boolean => notificationsState.isLoading
);

export const getNotificationsError = createSelector(
  notificationsState,
  (notificationsState: ReduxNotificationsState): AxiosError => notificationsState.error
);
