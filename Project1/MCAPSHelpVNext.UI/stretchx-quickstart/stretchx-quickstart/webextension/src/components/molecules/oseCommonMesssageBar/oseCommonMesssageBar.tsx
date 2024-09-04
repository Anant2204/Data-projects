import React from "react";
import {
  MessageBar,
  classNamesFunction,
  MessageBarType,
  MessageBarButton,
  Link,
} from "@fluentui/react";
import { IExpandableCommonMessageBarProps } from "./oseCommonMesssageBar.types";
import { injectIntl } from "react-intl";
import { messages } from "./oseCommonMesssageBar.messages";
import { getMessageStyles, getStyles } from "./oseCommonMesssageBar.styles";
import { clearMessageWithParam } from "../../../store";
import { useDispatch } from "react-redux";

import _, { isArray } from "lodash";
import { getCurrentTheme } from "../../../utils";
let classes;
let stickyClasses: any;
const getClassNames = classNamesFunction<any, any>();

export const CommonMesssageBar: React.FunctionComponent<
  IExpandableCommonMessageBarProps
> = ({ intl, commonMessage, parentContext }) => {
  const theme = getCurrentTheme(parentContext);
  classes = getMessageStyles();
  stickyClasses = getClassNames(getStyles(theme));

  const dispatch = useDispatch();

  const removeMessgae = (errorMessage) => {
    const { level: { componentCode, messageCode}} = errorMessage;
    dispatch(
      clearMessageWithParam({
        componentCode: componentCode,
        messageCode: messageCode,
      })
    );
  };

  return (
    <>
      <div className={stickyClasses.stickyContent}>
        {isArray(commonMessage) && commonMessage.length ? (
          commonMessage.map((comMessage) => {
            const {
              message,
              primaryButton,
              link,
              type = MessageBarType.error,
              secondaryButton,
              hideCloseButton,
              level :{
                componentCode,
                messageCode,
              }
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
                {message && message}{" "}
                {link?.text ? (
                  <button
                    tabIndex={0}
                    onClick={() => link?.actionHandler()}
                    className={stickyClasses.currentVersionLink }
                  >
                    {link?.text}
                  </button>
                ): null}
              </MessageBar>
            );
          })
        ) : null}
      </div>
    </>
  );
};

export const OseCommonMesssageBar = injectIntl(CommonMesssageBar);
