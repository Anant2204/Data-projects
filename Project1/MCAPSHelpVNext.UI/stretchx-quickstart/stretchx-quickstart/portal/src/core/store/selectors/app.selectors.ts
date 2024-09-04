import { createSelector } from 'reselect';
import { IAnnouncementId,ReduxAppState } from '..';
import { ReduxRootState } from '../../../app/store';
import { IKeyValueItem, IAppTheme, IAppState  } from '@msx/platform-services'

const appState = (state: ReduxRootState): ReduxAppState => state.app;

export const getCurrentTheme = createSelector(
  appState,
  (appState: ReduxAppState): IAppTheme => appState.currentTheme
);

export const getMockData = createSelector(
  appState,
  (appState: ReduxAppState): boolean => appState.mockData
);

export const getCurrentTestExtensions = createSelector(
  appState,
  (appState: ReduxAppState): IKeyValueItem[] => appState.currentTestExtensoins
);

export const getCurrentAppState = createSelector(
  appState,
  (appState: ReduxAppState): IAppState => appState.currentAppState
);

export const getTourRunStatus = createSelector(
  appState,
  (appState: ReduxAppState): boolean => appState.currentGuidedTourRunStatus
);

export const getInDashboardEditMode = createSelector(
  appState,
  (appState: ReduxAppState): boolean => appState.inDashboardEditMode
)

export const getCurrentLocale = createSelector(
  appState,
  (appState: ReduxAppState): string => appState.locale
)

export const getLocaleData = createSelector(
  appState,
  (appState: ReduxAppState): IKeyValueItem[] => appState.localeData
);

export const getSelectedCategories = createSelector(
  appState,
  (appState: ReduxAppState): [] => appState.selectedCategories
)
export const getDismissedAnnouncements = createSelector(
  appState,
  (appState: ReduxAppState): IAnnouncementId[] => appState.dismissedAnnouncements
);
export const getTitleLoaderName = createSelector(
  appState,
  (appState: ReduxAppState): string => appState.titleLoaderName
)
export const getisLoader = createSelector(
  appState,
  (appState: ReduxAppState): boolean => appState.isLoader
)
export const getisBotError = createSelector(
  appState,
  (appState: ReduxAppState): boolean => appState.isBotError
)
export const getBotToken = createSelector(
  appState,
  (appState: ReduxAppState): string => appState.botToken
)
export const getCurrUserData = createSelector(
  appState,
  (appState: ReduxAppState): any => appState.currentUserData
)
export const getChildComponentName = createSelector(
  appState,
  (appState: ReduxAppState): any => appState.childComponentName
)
export const getHasServiceRequestTypeLogData = createSelector(
  appState,
  (appState: ReduxAppState): any => appState.hasServiceRequestTypeLogData
)
export const getServiceRequestTypeLogData = createSelector(
  appState,
  (appState: ReduxAppState): any => appState.ServiceRequestTypeLogData
)
export const getLogEventData = createSelector(
  appState,
  (appState: ReduxAppState): any => appState.LogEventData
)
export const getIsCustomeLog = createSelector(
  appState,
  (appState: ReduxAppState): any => appState.isCustomeLog
)


