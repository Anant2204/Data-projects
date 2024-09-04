import React from "react";
import {
  MessageBar,
  classNamesFunction,
  MessageBarType,
  MessageBarButton,
} from "@fluentui/react";
import { IExpandableCommonMessageBarProps } from "./oseCommonMesssageBar.types";
import { injectIntl } from "react-intl";
import { messages } from "./oseCommonMesssageBar.messages";
import { getMessageStyles, getStyles } from "./oseCommonMesssageBar.styles";
import { clearMessageWithParam } from "../../../store/actions/commonMessages.actions";

import _, { isArray } from "lodash";
import { getCurrentTheme } from "../../../utils";
import { useAppDispatch } from "../../../store/hooks";
let classes;
let stickyClasses: any;
const getClassNames = classNamesFunction<any, any>();

export const CommonMesssageBar: React.FunctionComponent<
  IExpandableCommonMessageBarProps
> = ({ intl, commonMessage, parentContext, setShowTopBannerFlag }) => {
  const theme = getCurrentTheme(parentContext);
  classes = getMessageStyles();
  stickyClasses = getClassNames(getStyles(theme));

  const dispatch = useAppDispatch();

  const removeMessgae = (errorMessage) => {
    const { level: { componentCode, messageCode}} = errorMessage;
    dispatch(
      clearMessageWithParam({
        componentCode: componentCode,
        messageCode: messageCode,
      })
    );
  };

  const renderMessageBar = (comMessage) => {
    const {
      message,
      primaryButton,
      link,
      type = MessageBarType.error,
      secondaryButton,
      hideCloseButton,
      level: { componentCode, messageCode },
    } = comMessage;
    const isAction =
      _.isObject(primaryButton) || _.isObject(secondaryButton) || false;
    return (
      <MessageBar        
        messageBarType={type}
        isMultiline={true}
        onDismiss={
          hideCloseButton ? null : () => removeMessgae(comMessage)
        }
        key={`${componentCode}_${messageCode}`}
        dismissButtonAriaLabel={intl.formatMessage(
          messages.btnCloseMessageBar
        )}
        styles={classes.messageClass}
        actions={
          isAction ? (
            <div>
              {primaryButton ? (
                <MessageBarButton
                  onClick={() => primaryButton?.actionHandler()}
                  data-testid="ok-button"
                >
                  {primaryButton.text}
                </MessageBarButton>
              ) : null}
              {secondaryButton ? (
                <MessageBarButton
                  onClick={() => secondaryButton?.actionHandler()}
                  data-testid="cancel-button"
                >
                  {secondaryButton.text}
                </MessageBarButton>
              ) : null}
            </div>
          ) : null
        }
      >
        {message}{" "}
        {link?.text ? (
          <button
            tabIndex={0}
            onClick={() => link?.actionHandler()}
            className={stickyClasses.currentVersionLink}
          >
            {link?.text}
          </button>
        ) : null}
      </MessageBar>
    );
  };

  return (
    <div className={stickyClasses.stickyContent}>
      {isArray(commonMessage) && commonMessage.length
        ? _.uniqBy(commonMessage, "message").map((comMessage) =>
            renderMessageBar(comMessage)
          )
        : null}
    </div>
  );
};

export const OseCommonMesssageBar = injectIntl(CommonMesssageBar);
