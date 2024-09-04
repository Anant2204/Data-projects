import { AnyAction } from 'redux';
import { IExtensionsRegistration } from '@msx/platform-services';

import {
  FETCH_EXTENSIONS_REGISTRATION_BEGIN,
  FETCH_EXTENSIONS_REGISTRATION_SUCCESS,
  FETCH_EXTENSIONS_REGISTRATION_FAILURE,
  ReduxExtensionsRegistrationState,
} from "..";

const initalExtensionsRegistration: IExtensionsRegistration = {
  extensions: [],
  routes: []
}

const extensionsRegistrationInitialState: ReduxExtensionsRegistrationState = {
  extensionsRegistration: initalExtensionsRegistration,
  isLoading: false,
  error: null,
};

export const extensionsRegistration = (
  state: ReduxExtensionsRegistrationState = extensionsRegistrationInitialState,
  action: AnyAction
) => {
  switch (action.type) {
    case FETCH_EXTENSIONS_REGISTRATION_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        extensionsRegistration: initalExtensionsRegistration
      };
    case FETCH_EXTENSIONS_REGISTRATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        extensionsRegistration: action.payload
      };
    case FETCH_EXTENSIONS_REGISTRATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
