import {
  ADD_MESSAGE,
  CLEAR_MESSAGE,
  CLEAR_MESSAGE_WITH_PARAM,
  CLEAR_MESSAGE_FOR_COMPONENT
} from "..";
import { Messagestate, IRemoveMessagesForComponent } from "../../interfaces";

export const addMessage = (messages: Messagestate) => ({
  type: ADD_MESSAGE,
  payload: messages,
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGE,
});

export const clearMessagesForComponent = (params: IRemoveMessagesForComponent) => ({
  type: CLEAR_MESSAGE_FOR_COMPONENT,
  payload: params,
});

export const clearMessageWithParam = (params) => ({
  type: CLEAR_MESSAGE_WITH_PARAM,
  payload: params,
});
