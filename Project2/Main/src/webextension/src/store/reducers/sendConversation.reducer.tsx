import { AnyAction } from "redux";
import { Reducer } from "@reduxjs/toolkit";
import {
  SEND_LIST_BEGIN,
  SEND_LIST_FAILURE,
  SEND_LIST_SUCCESS,
  ReduxSendConversastionState,
  CLEAR_SEND_STAY_DATA
} from "../store.types";

const sendState: ReduxSendConversastionState = {
  isLoading: false,
  sendConversastionData:[],
  error: null
};

const sendReducer: Reducer<ReduxSendConversastionState, AnyAction> = (
  state: ReduxSendConversastionState = sendState,
  action: AnyAction
) => {
  switch (action.type) {
      case SEND_LIST_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SEND_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sendConversastionData: action.payload,
      };
    case SEND_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_SEND_STAY_DATA:
      return {
        ...state,
        isLoading: false,
        sendConversastionData: null,
      };  
    default:
  }
  return state;
};

export default sendReducer;