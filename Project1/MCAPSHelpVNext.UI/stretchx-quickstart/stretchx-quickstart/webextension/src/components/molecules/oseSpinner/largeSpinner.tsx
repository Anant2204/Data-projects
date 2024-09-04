import { Spinner, SpinnerSize } from "@fluentui/react";
import { messages } from "./largeSpinner.messages";
import React, { FC } from "react";
import { ILargeSpinnerProps } from "./largeSpinner.types";
import { injectIntl } from "react-intl";

// export const LargerSpinner = (props) => {
//     const { intl, loaddingMessage } = props;
//     let loaderMsg;
    
//     if (loaddingMessage) {
//         loaderMsg = loaddingMessage;
//     }  else {
//         loaderMsg = intl && intl.formatMessage(messages.loadingData)
//     }

//     // return <Spinner size={SpinnerSize.large} label={loaderMsg} 
//     return null;
//     // />    
// }

// export const OseLargerSpinner = injectIntl(LargerSpinner);