import { Spinner, SpinnerSize } from "@fluentui/react";
import { messages } from "./largeSpinner.messages";
import React, { FC } from "react";
import { ILargeSpinnerProps } from "./largeSpinner.types";
import { injectIntl } from "react-intl";

export const LargerSpinner: FC<ILargeSpinnerProps> = (props) => {
    const { intl, loaddingMessage } = props;
    let loaderMsg;
    
    if (loaddingMessage) {
        loaderMsg = loaddingMessage;
    }  else {
        loaderMsg = intl && intl.formatMessage(messages.loadingData)
    }

    return <Spinner size={SpinnerSize.large} label={loaderMsg} />    
}

export const OseLargerSpinner = injectIntl(LargerSpinner);