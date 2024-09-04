import { createSelector } from 'reselect';
import { ReduxRootState, ReduxUserProfileState } from '../../../app/store';
import { IUserProfile } from '../../models';
import { AxiosError } from 'axios';
import { ReactText } from 'react';
import { IDashboardTile } from '@msx/platform-services';

const userProfileState = (state: ReduxRootState): ReduxUserProfileState => state.userProfile;

export interface TilesOrder {
  id: ReactText;
  isVisible: boolean;
}

export const getUserProfile = createSelector(
  userProfileState,
  (userProfileState: ReduxUserProfileState): IUserProfile => userProfileState.userProfile
);

export const getUserDashboardTiles = createSelector(
  userProfileState,
  (userProfileState: ReduxUserProfileState): IDashboardTile[] => (
    userProfileState.userProfile && userProfileState.userProfile.userPreference
      ? userProfileState.userProfile.userPreference.tilesOrder
      : []
  )
);

export const getUserProfileLoadingStatus = createSelector(
  userProfileState,
  (userProfileState: ReduxUserProfileState): boolean => userProfileState.isLoading
);

export const getUserProfileError = createSelector(
  userProfileState,
  (userProfileState: ReduxUserProfileState): AxiosError => userProfileState.error
);
