import { combineReducers } from "redux";
import consumptions from "./consumption.reducer";
import regions from "./region.reducer";
import config from "./config.reducer";
import commonMessagesState from "./commonMessages.reducer";
import permissionState from "./permission.reducer";
const rootReducer = combineReducers({
  consumptions,
  regions,
  config,
  commonMessagesState,
  permissionState,
});

export default rootReducer;
