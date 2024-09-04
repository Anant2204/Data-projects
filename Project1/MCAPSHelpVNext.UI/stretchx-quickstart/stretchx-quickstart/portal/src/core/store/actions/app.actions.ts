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
  SET_SELECTED_CATEGORY,
  SET_title_Loader_Name,
  SET_Is_Loader,
  SET_Is_Bot_Error,
  SET_Bot_Token,
  SET_CURR_USERDATA,
  SET_CHILD_COMPONENT,
  SET_HAS_SERVICEREQUESTTYPE,
  SET_SERVICE_REQUESTTYPE_DATA,
  SET_LOGEVENT_DATA,
  SET_IS_CUSTOMLOG,


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

export const setSelectedCategories = (selectedCategories: any) => {
  return {
    type: SET_SELECTED_CATEGORY,
    payload: selectedCategories
  }
}
export const setDismissedAnnouncements = (payload: any) => {
  return {
    type: SET_CURRENT_DISMISSEDANNOUNCEMENTS,
    payload: payload
  }
}
export const settitleLoaderName = (payload: any) => {
  return {
    type: SET_title_Loader_Name,
    payload: payload
  }
  
}
export const setIsLoader = (payload: any) => {
  return {
    type: SET_Is_Loader,
    payload: payload
  }
  
}
export const setIsBotError = (payload: any) => {
  return {
    type: SET_Is_Bot_Error,
    payload: payload
  }
  
}
export const SETBotToken = (payload: any) => {
  return {
    type: SET_Bot_Token,
    payload: payload
  }
  
}

export const SETCurrUserData = (payload: any) => {
  return {
    type: SET_CURR_USERDATA,
    payload: payload
  }
  
}

export const SETChileComponentName = (payload: any) => {
  return {
    type: SET_CHILD_COMPONENT,
    payload: payload
  }
  
}
export const SETHasServiceRequestTypeLogData = (payload: boolean) => {
  return {
    type: SET_HAS_SERVICEREQUESTTYPE,
    payload: payload
  }
  
}
export const SETServiceRequestTypeLogData = (payload: any) => {
  return {
    type: SET_SERVICE_REQUESTTYPE_DATA,
    payload: payload
  }
  
}
export const SETLogEventData = (payload: any) => {
  return {
    type: SET_LOGEVENT_DATA,
    payload: payload
  }
  
}
export const SETIsCustomeLog = (payload: boolean) => {
  return {
    type: SET_IS_CUSTOMLOG,
    payload: payload
  }
  
}

