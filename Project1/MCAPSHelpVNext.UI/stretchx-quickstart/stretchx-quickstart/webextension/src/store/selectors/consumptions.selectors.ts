import { createSelector } from 'reselect';
import { ReduxConsumptionState, ReduxRootState } from '..';
import { AxiosError } from 'axios';
import { IConsumption } from '../../interfaces';

const consumptionState = (state: ReduxRootState): ReduxConsumptionState => state.consumptions;

export const getConsumptionLoadingStatus = createSelector(
    consumptionState,
  (consumptionState: ReduxConsumptionState): boolean => consumptionState.isLoading
);
export const getConsumptions = createSelector(
    consumptionState,
  (consumptionState: ReduxConsumptionState): IConsumption[] => consumptionState.consumptions
);

export const getconsumptionsError = createSelector(
  consumptionState,
  (consumptionState: ReduxConsumptionState): AxiosError => consumptionState.error
);




