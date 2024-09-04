import { AxiosError } from 'axios';
import {
  IAppState,
  IAppTheme,
  IExtensionsRegistration,
  IKeyValueItem
} from '@msx/platform-services'

export interface ReduxCommonState {
  isLoading: string[];
  error: Error;
}

export interface IAnnouncementId {
  id: string;
  expiryDate: string;
};

export interface ReduxAppState {
  locale: string;
  currentTheme: IAppTheme;
  currentAppState: IAppState;
  currentGuidedTourRunStatus: boolean;
  inDashboardEditMode: boolean;
  currentTestExtensoins: IKeyValueItem[];
  mockData: boolean;
  localeData: IKeyValueItem[];
  dismissedAnnouncements: IAnnouncementId[];
}

export interface ReduxExtensionsRegistrationState {
  extensionsRegistration: IExtensionsRegistration;
  isLoading: boolean;
  error: AxiosError;
}

export const SET_CURRENT_LOCALE = 'SET_CURRENT_LOCALE';
export const SET_CURRENT_DISMISSEDANNOUNCEMENTS = 'SET_CURRENT_DISMISSEDANNOUNCEMENTS';
export const SET_CURRENT_THEME = 'SET_CURRENT_THEME';
export const SET_CURRENT_APP_STATE = 'SET_CURRENT_APP_STATE';
export const SET_IS_MOCK_DATA = 'SET_IS_MOCK_DATA';
export const SET_LOCALE_DATA = 'SET_LOCALE_DATA';
export const SET_CURRENT_TEST_EXTENSIONS = 'SET_CURRENT_TEST_EXTENSIONS';
export const SET_IN_DASHBOARD_EDIT_MODE = "SET_IN_DASHBOARD_EDIT_MODE";

export const FETCH_EXTENSIONS_REGISTRATION_BEGIN = 'FETCH_EXTENSIONS_REGISTRATION_BEGIN';
export const FETCH_EXTENSIONS_REGISTRATION_SUCCESS = 'FETCH_EXTENSIONS_REGISTRATION_SUCCESS';
export const FETCH_EXTENSIONS_REGISTRATION_FAILURE = 'FETCH_EXTENSIONS_REGISTRATION_FAILURE';

