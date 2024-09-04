import {
    GET_LOGGED_IN_USER_PREVILIGE_BEGIN,
    GET_LOGGED_IN_USER_PREVILIGE_SUCCESS,
    GET_LOGGED_IN_USER_PREVILIGE_FAILURE,
    ReduxUserPreviligeState,
  } from '..';

  const userPreviligeInitialState: ReduxUserPreviligeState = {
    userPrevilige:null,
    isLoading: true,
    error: null
  }
  
  export const userPrevilige = (
    state: ReduxUserPreviligeState = userPreviligeInitialState,
    action: any
  ) => {
    switch (action.type) {
      case GET_LOGGED_IN_USER_PREVILIGE_BEGIN:
        return {
          ...state,
          userPrevilige: null,
          isLoading: true,
          error: null
        };
      case GET_LOGGED_IN_USER_PREVILIGE_SUCCESS:
        return {
          ...state,
          userPrevilige: action.payload,
          isLoading: false,
        };
      case GET_LOGGED_IN_USER_PREVILIGE_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      
      default:
        return state;
    }
  }
  