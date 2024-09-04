import {
  FETCH_USER_PROFILE_BEGIN,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  SET_USER_PROFILE_BEGIN,
  SET_USER_PROFILE_SUCCESS,
  SET_USER_PROFILE_ERROR,
  ReduxUserProfileState,
} from '..';

const userProfileInitialState: ReduxUserProfileState = {
  userProfile: {
    isFirstTimeUser: false,
    userPreference: {
      tilesOrder: [],
      locale: navigator.language.split(/[-_]/)[0],
      theme: 'default',
    }
  },
  isLoading: true,
  error: null
}

export const userProfile = (
  state: ReduxUserProfileState = userProfileInitialState,
  action: any
) => {
  switch (action.type) {
    case FETCH_USER_PROFILE_BEGIN:
      return {
        ...state,
        userProfile: null,
        isLoading: true,
        error: null
      };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        isLoading: false,
      };
    case FETCH_USER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case SET_USER_PROFILE_BEGIN:
      return {
        ...state
      };

    case SET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload
      };
    case SET_USER_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
