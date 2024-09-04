import exp from "constants";
import {
  ADD_MESSAGE,
  CLEAR_MESSAGE,
  ReduxCommonMessageState,
  CLEAR_MESSAGE_WITH_PARAM,
  CLEAR_MESSAGE_FOR_COMPONENT,
} from "../store.types";
import { AnyAction } from "redux";
import { Reducer } from "@reduxjs/toolkit";

const commonMessageinitialState: ReduxCommonMessageState = {
  messages: [],
};

const commonMessagesReducer: Reducer<ReduxCommonMessageState, AnyAction> = (
  state: ReduxCommonMessageState = commonMessageinitialState,
  action: AnyAction
): ReduxCommonMessageState => {
  switch (action.type) {
    case ADD_MESSAGE:
      const { level } = action.payload;
      const isMessageExist = state.messages.some(
        (message) =>

        (message.level.componentCode === level.componentCode &&
          message.level.messageCode === level.messageCode)
      );

      if (!isMessageExist) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      }

      return state;

    case CLEAR_MESSAGE:
      return {
        ...state,
        messages: [],
      };

    case CLEAR_MESSAGE_FOR_COMPONENT: {
      const { componentCode } = action.payload;
      const filteredMessages = state.messages.filter((message) => {
        return (
          !componentCode ||
          message.level.componentCode !== componentCode
        );
      });
      return {
        ...state,
        messages: filteredMessages,
      };

    };

    case CLEAR_MESSAGE_WITH_PARAM: {
      const { componentCode, messageCode } = action.payload;
      const filteredMessages = state.messages.filter((message) => {
        return (
          !componentCode ||
          message.level.componentCode !== componentCode ||
          !messageCode ||
          message.level.messageCode !== messageCode
        );
      });
      return {
        ...state,
        messages: filteredMessages,
      };
    }

    default:

  }
  return state;
}

export default commonMessagesReducer;