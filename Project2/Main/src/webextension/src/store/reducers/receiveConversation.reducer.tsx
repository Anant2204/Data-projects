import { AnyAction } from "redux";
import { Reducer } from "@reduxjs/toolkit";
import {
  CLEAR_RECEIVE_DATA,
  RECEIVE_LIST_BEGIN,
  RECEIVE_LIST_FAILURE,
  RECEIVE_LIST_SUCCESS,
  ReduxReceiveConversastionState
} from "../store.types";

const receiveState: ReduxReceiveConversastionState = {
  isLoading: false,
  receiveConversastionData:[],
  error: null
};

const receiveReducer: Reducer<ReduxReceiveConversastionState, AnyAction> = (
  state: ReduxReceiveConversastionState = receiveState,
  action: AnyAction
) => {
  switch (action.type) {
      case RECEIVE_LIST_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        receiveConversastionData: action.payload,
      };
    case RECEIVE_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_RECEIVE_DATA:
      return {
        ...state,
        isLoading: false,
        receiveConversastionData: null,
      }; 
    default:
  }
  return state;
};

export default receiveReducer;