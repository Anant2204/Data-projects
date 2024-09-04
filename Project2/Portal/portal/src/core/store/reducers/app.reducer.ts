import { IAppState } from '@msx/platform-services'
import {
  SET_CURRENT_THEME,
  SET_CURRENT_APP_STATE,
  SET_LOCALE_DATA,
  SET_CURRENT_LOCALE,
  ReduxAppState,
  SET_IS_MOCK_DATA,
  SET_IN_DASHBOARD_EDIT_MODE,
  SET_CURRENT_TEST_EXTENSIONS,
  SET_CURRENT_DISMISSEDANNOUNCEMENTS,
} from "..";
import {getThemeByName} from '../../utils'

export const defaultAppState: IAppState = {
  isReady: true,
}
const storageLocale = localStorage.getItem('locale');
const defaultLocale = storageLocale ? storageLocale : navigator.language.split(/[-_]/)[0];

const storageThemeName = localStorage.getItem('theme');
const defaultThemeName = storageThemeName ? storageThemeName : 'default';
const defaultThemeComponent = getThemeByName(defaultThemeName);
document.body.style.background = defaultThemeComponent.palette.white;
const defaultDismissedAnnouncements = JSON.parse(localStorage.getItem('dismissedAnnouncements')) || [];


const initialAppState: ReduxAppState = {
  locale:  defaultLocale,
  currentTheme: defaultThemeComponent, 
  currentAppState: defaultAppState,
  currentGuidedTourRunStatus: false,
  inDashboardEditMode: false,
  currentTestExtensoins: [],
  mockData: true,
  localeData: [],
  dismissedAnnouncements: defaultDismissedAnnouncements,
};

export const app = (state: ReduxAppState = initialAppState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_THEME:
      return {
        ...state,
        currentTheme: action.payload
      };
    case SET_IS_MOCK_DATA:
      return {
        ...state,
        mockData: action.payload
      };
    case SET_LOCALE_DATA:
      const newLocaleData = state.localeData.slice();
      const payloadItems = action.payload;
      payloadItems.forEach((payloadItem) => {
        let isNew = true;
        newLocaleData.forEach((item, index) => {
          if (item.key === payloadItem.key) {
            item.value = payloadItem.value;
            isNew = false;
          }
        });
        if (isNew) newLocaleData.push(payloadItem);
      });
      return {
        ...state,
        localeData: newLocaleData
      };
    case SET_CURRENT_APP_STATE:
      return {
        ...state,
        currentAppState: action.payload
      };
    case SET_CURRENT_LOCALE:
      return {
        ...state,
        locale: action.payload
      };
    case SET_CURRENT_TEST_EXTENSIONS:
      return {
        ...state,
        currentTestExtensoins: action.payload
      };
    case SET_IN_DASHBOARD_EDIT_MODE:
      return {
        ...state,
        inDashboardEditMode: action.payload
      };
    case SET_CURRENT_DISMISSEDANNOUNCEMENTS:
      return {
        ...state,
        dismissedAnnouncements: action.payload
      };
    default:
      return state;
  }
}
