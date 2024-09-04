import {
  FETCH_NOTIFICATIONS_BEGIN,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  SET_NOTIFICATIONS_BEGIN,
  SET_NOTIFICATIONS_SUCCESS,
  SET_NOTIFICATIONS_ERROR,
  ReduxNotificationsState,
} from '..';

const NotificationsInitialState: ReduxNotificationsState = {
  notifications: [],
  isLoading: true,
  error: null
}

export const notifications = (
  state: ReduxNotificationsState = NotificationsInitialState,
  action: any
) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_BEGIN:
      return {
        ...state,
        notifications: null,
        isLoading: true,
        error: null
      };
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        isLoading: false,
      };
    case FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    case SET_NOTIFICATIONS_BEGIN:
      return {
        ...state
      };
    case SET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
      };
    case SET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
}
