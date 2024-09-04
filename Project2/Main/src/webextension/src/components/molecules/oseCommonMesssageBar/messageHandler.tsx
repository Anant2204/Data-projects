import React from "react";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { OseCommonMesssageBar } from "../../molecules";
import { IMessageHandlerProps } from "./oseCommonMesssageBar.types";
import { useAppSelector } from "../../../store/hooks";

const MessageHandler: React.FunctionComponent<IMessageHandlerProps> = ({
  parentContext,
  type,
}) => {
  const commonMessage = useAppSelector((state) => state.commonMessagesReducer.messages);
  const commonMessagePageLevel = commonMessage.filter(
    (message) => message.level.type === type
  );

  if (commonMessagePageLevel?.length > 0) {
    return <OseCommonMesssageBar commonMessage={commonMessagePageLevel} parentContext={parentContext} />;
  }
  return null;
};

export const OseMessageHandler = injectIntl(MessageHandler);
