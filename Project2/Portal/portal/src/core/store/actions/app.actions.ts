import { IAppState, IKeyValueItem } from '@msx/platform-services'
import {
  SET_CURRENT_THEME,
  SET_CURRENT_APP_STATE,
  SET_CURRENT_LOCALE,
  SET_IS_MOCK_DATA,
  SET_LOCALE_DATA,
  SET_IN_DASHBOARD_EDIT_MODE,
  SET_CURRENT_TEST_EXTENSIONS,
  SET_CURRENT_DISMISSEDANNOUNCEMENTS,
} from '..';

export const setCurrentTheme = (currentTheme: any) => ({
  type: SET_CURRENT_THEME,
  payload: currentTheme
});

export const setMockData = (mockData: boolean) => ({
  type: SET_IS_MOCK_DATA,
  payload: mockData
});

export const setCurrentTestExtensions = (extensions: IKeyValueItem[]) => ({
  type: SET_CURRENT_TEST_EXTENSIONS,
  payload: extensions
});

export const setLocaleData = (data: IKeyValueItem[]) => ({
  type: SET_LOCALE_DATA,
  payload: data
});

export const setCurrentAppState = (currentAppState: IAppState) => ({
  type: SET_CURRENT_APP_STATE,
  payload: currentAppState
});


export const setCurrentLocale = (payload: any) => ({
  type: SET_CURRENT_LOCALE,
  payload: payload
});

export const setInDashboardEditMode = (inDashboardEditMode: boolean) => {
  return {
    type: SET_IN_DASHBOARD_EDIT_MODE,
    payload: inDashboardEditMode
  }
}

export const setDismissedAnnouncements = (payload: any) => {
  return {
    type: SET_CURRENT_DISMISSEDANNOUNCEMENTS,
    payload: payload
  }
}
