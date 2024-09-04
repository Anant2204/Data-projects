import { create } from "lodash";
import { ReduxPermissionState, ReduxRootState } from "../store.types";
import { createSelector } from "reselect";
import { AxiosError } from "axios";

export const permissionState = (state: ReduxRootState): ReduxPermissionState =>
  state.permissionState;

export const getPermissionLoadingStatus = createSelector(
    permissionState,
    (permissionState: ReduxPermissionState): boolean => permissionState.isLoading
);

export const getPermission = (estimateId: string) =>
  createSelector(
    permissionState,
    (permissionState: ReduxPermissionState): string =>
      permissionState.permissionData?.[estimateId]
  );

export const getPermissionError = createSelector(
    permissionState,
    (permissionState: ReduxPermissionState): AxiosError => permissionState.error
);
