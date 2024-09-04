import { createSelector } from 'reselect';
import { ReduxExtensionsRegistrationState } from '..';
import { ReduxRootState } from '../../../app/store';
import { IExtensionsRegistration } from '@msx/platform-services';
import { AxiosError } from 'axios';

const extensionsRegistrationState = (state: ReduxRootState): ReduxExtensionsRegistrationState => state.extensionsRegistration;

export const getExtensionsRegistration = createSelector(
  extensionsRegistrationState,
  (extensionsRegistrationState: ReduxExtensionsRegistrationState): IExtensionsRegistration => extensionsRegistrationState.extensionsRegistration
);

export const getExtensionsLoadingStatus = createSelector(
  extensionsRegistrationState,
  (extensionsRegistrationState: ReduxExtensionsRegistrationState): boolean => extensionsRegistrationState.isLoading
);

export const getExtensionsError = createSelector(
  extensionsRegistrationState,
  (extensionsRegistrationState: ReduxExtensionsRegistrationState): AxiosError => extensionsRegistrationState.error
);

