import { createSelector } from 'reselect';
import { ReduxRegionState, ReduxRootState } from '..';
import { AxiosError } from 'axios';

const regionState = (state: ReduxRootState): ReduxRegionState => state.regions;

export const getRegionLoadingStatus = createSelector(
    regionState,
  (regionState: ReduxRegionState): boolean => regionState.isLoading
  );
  export const getRegions = createSelector(
    regionState,
  (regionState: ReduxRegionState): string[] => regionState.regions
  );
  
  export const getRegionError = createSelector(
    regionState,
  (regionState: ReduxRegionState): AxiosError => regionState.error
  );
  