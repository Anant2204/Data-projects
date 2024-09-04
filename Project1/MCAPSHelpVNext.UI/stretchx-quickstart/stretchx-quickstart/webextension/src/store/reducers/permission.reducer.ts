import {
  FETCH_PERMISSIONS_BEGIN,
  FETCH_PERMISSIONS_FAILURE,
  FETCH_PERMISSIONS_SUCCESS,
  ReduxPermissionState,
} from "../store.types";

const permissionInitialState:ReduxPermissionState = {
  isLoading: false,
  error: null,
  permissionData: null,
};

export default function permissionReducer(
  state: ReduxPermissionState = permissionInitialState,
  action: any
): ReduxPermissionState {
  switch (action.type) {
    case FETCH_PERMISSIONS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_PERMISSIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        permissionData: {
          [action.payload.estimateId]: action.payload.permission,
        },
      };
    case FETCH_PERMISSIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
