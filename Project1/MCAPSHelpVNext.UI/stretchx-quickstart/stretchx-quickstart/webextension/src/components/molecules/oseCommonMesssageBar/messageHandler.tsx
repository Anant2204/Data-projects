import React from "react";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { getCommonMessageSelector } from "../../../store";
import { OseCommonMesssageBar } from "../../molecules";
import { IMessageHandlerProps } from "./oseCommonMesssageBar.types";

const MessageHandler: React.FunctionComponent<IMessageHandlerProps> = ({
  parentContext,
  type,
}) => {
  const commonMessage = useSelector(getCommonMessageSelector);
  const commonMessagePageLevel = commonMessage.filter(
    (message) => message.level.type === type
  );

  if (commonMessagePageLevel?.length > 0) {
    return <OseCommonMesssageBar commonMessage={commonMessagePageLevel} parentContext={parentContext} />;
  }
  return null;
};

export const OseMessageHandler = injectIntl(MessageHandler);
