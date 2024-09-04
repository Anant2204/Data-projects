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
  SET_SELECTED_CATEGORY,
  SET_CURRENT_DISMISSEDANNOUNCEMENTS,
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
  selectedCategories:[],
  dismissedAnnouncements: defaultDismissedAnnouncements,
  isLoader:true,
  isBotError:false,
  botToken:"null",
  currentUserData:{},
  childComponentName:'',
  hasServiceRequestTypeLogData:false,
  ServiceRequestTypeLogData:{},
  LogEventData:{},
  isCustomeLog:false,
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
      case SET_SELECTED_CATEGORY:
        return {
          ...state,
          selectedCategories:{
            ...action.payload
          }
        }
      case SET_CURRENT_DISMISSEDANNOUNCEMENTS:
        return {
          ...state,
          dismissedAnnouncements: action.payload
        };
        case SET_title_Loader_Name:
      return {
        ...state,
        titleLoaderName: action.payload
      };
      case SET_Is_Loader:
        return {
          ...state,
          isLoader: action.payload
        };
        case SET_Is_Bot_Error:
          return {
            ...state,
            isBotError: action.payload
          };  
          case SET_Bot_Token:
            return {
              ...state,
              botToken: action.payload
            };  
       case SET_CURR_USERDATA:
        return{
          ...state,
          currentUserData: action.payload
       }
       case SET_CHILD_COMPONENT:
        return{
          ...state,
          childComponentName: action.payload
       }
       case SET_HAS_SERVICEREQUESTTYPE:
        return{
          ...state,
          hasServiceRequestTypeLogData: action.payload
       }  
       case SET_SERVICE_REQUESTTYPE_DATA:
        return{
          ...state,
          ServiceRequestTypeLogData: action.payload
       }  
       case SET_LOGEVENT_DATA:
        return{
          ...state,
          LogEventData: action.payload
       }
       case SET_IS_CUSTOMLOG:
        return{
          ...state,
          isCustomeLog: action.payload
       }         
    default:
      return state;
  }
}
