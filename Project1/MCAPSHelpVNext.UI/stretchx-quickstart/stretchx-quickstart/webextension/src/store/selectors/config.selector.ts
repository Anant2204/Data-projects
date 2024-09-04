import { createSelector } from 'reselect';
import { ReduxConfigState, ReduxRootState } from '..';
import { AxiosError } from 'axios';

const configState = (state: ReduxRootState): ReduxConfigState => state.config;

export const getConfigLoadingStatus = createSelector(
    configState,
    (configState: ReduxConfigState): boolean => configState?.isLoading
);
export const getConfig = createSelector(
    configState,
  (configState: ReduxConfigState): string =>  configState?.config
);

export const getConfigError = createSelector(
    configState,
  (configState: ReduxConfigState): AxiosError => configState?.error
);
