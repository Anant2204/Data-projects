import { createSelector } from "reselect";
import { ReduxCommonMessageState, ReduxRootState } from "..";
import { Messagestate } from "../../interfaces";
const commonMessagesState = (state: ReduxRootState): ReduxCommonMessageState =>
  state.commonMessagesState;

export const getCommonMessageSelector = createSelector(
  commonMessagesState,
  (commonMessagesState: ReduxCommonMessageState): Messagestate[] =>
    commonMessagesState.messages
);
