import { configureStore, Reducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import configReducer from "../store/reducers/config.reducer";
import commonMessagesReducer from "../store/reducers/commonMessages.reducer";
import {
  ReduxCommonMessageState,
  ReduxConfigState,
  ReduxCommonState,
  ReduxReceiveConversastionState,
  ReduxRStatisticsState,
  ReduxSendConversastionState,
  ReduxSStatisticsState,
  ReduxConversationSummaryState,
  ReduxCreateConversationScriptState,
  ReduxEDMChangeRequestState,
} from "./store.types";
import commonReducer from "./reducers/common.reducer";
import receiveReducer from "./reducers/receiveConversation.reducer";
import receieveStatisticsReducer from "./reducers/receiveStatistics.reducer";
import sendReducer from "./reducers/sendConversation.reducer"
import sendStatisticsReducer from "./reducers/sendStatistics.reducer";
import conversationSummaryReducer from "./reducers/conversationSummary.reducer";
import conversationScenarioReducer from "./reducers/createConversationScript.reducer";
import edmChangeRequestReducer from "./reducers/edmChangeRequest.reducer";



export interface CombinedRootState {
  configReducer: Reducer<ReduxConfigState>;
  commonMessagesReducer: Reducer<ReduxCommonMessageState>;
  receiveReducer:Reducer<ReduxReceiveConversastionState>;
  sendReducer:Reducer<ReduxSendConversastionState>;
  commonReducer:Reducer<ReduxCommonState>;
  receieveStatisticsReducer:Reducer<ReduxRStatisticsState>;
  sendStatisticsReducer:Reducer<ReduxSStatisticsState>;
  conversationSummaryReducer:Reducer<ReduxConversationSummaryState>;
  createConversationSriptReducer:Reducer<ReduxCreateConversationScriptState>;
  edmChangeRequestReducer:Reducer<ReduxEDMChangeRequestState>;
}

const conbinedReducers: CombinedRootState = {
  configReducer: configReducer,
  commonMessagesReducer: commonMessagesReducer,
  receiveReducer:receiveReducer,
  sendReducer:sendReducer,
  commonReducer:commonReducer,
  receieveStatisticsReducer:receieveStatisticsReducer,
  sendStatisticsReducer:sendStatisticsReducer,
  conversationSummaryReducer:conversationSummaryReducer,
  createConversationSriptReducer:conversationScenarioReducer,
  edmChangeRequestReducer:edmChangeRequestReducer,
};

const rootReducer = combineReducers(conbinedReducers);

export default rootReducer;

