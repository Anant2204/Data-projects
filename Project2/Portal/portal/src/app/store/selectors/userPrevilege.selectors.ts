import { createSelector } from 'reselect';
import { ReduxRootState,  ReduxUserPreviligeState } from '..';

const userprivilegeState = (state: ReduxRootState): ReduxUserPreviligeState => state.userPrevilige;

export const getUserPrivilege = createSelector(
  userprivilegeState,
  (userprivilegeState: ReduxUserPreviligeState): any => userprivilegeState?.userPrevilige
);
export const isGetUserPrivilegeLoading = (state: ReduxRootState): any => state.userPrevilige.isLoading;