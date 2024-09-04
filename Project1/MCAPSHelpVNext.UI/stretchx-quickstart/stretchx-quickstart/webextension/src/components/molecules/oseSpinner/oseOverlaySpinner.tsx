import { Spinner, SpinnerSize, classNamesFunction, ISpinnerStyles   } from "@fluentui/react";
import { messages } from "./largeSpinner.messages";
import React, { FC } from "react";
import { IOseOverlaySpinnerProps } from "./largeSpinner.types";
import { injectIntl } from "react-intl";
import { getStyles } from './oseSpinner.styles';
import { getCurrentTheme } from "../../../utils";

const getClassNames = classNamesFunction<any, any>();



export const OseSpinnerLarge = (props) => {
    const { parentContext, intl, loaddingMessage } = props;
    const theme = getCurrentTheme(parentContext);
    let classes: any;
    classes = getClassNames(getStyles(theme));

    const spinnerStyle: ISpinnerStyles = {
        label: {
            fontSize: '16px'
        }
    };

    let loaderMsg;
    
    if (loaddingMessage) {
        loaderMsg = loaddingMessage;
    }  else {
        loaderMsg = intl && intl.formatMessage(messages.loadingData)
    }

    return (
        <>
            { <div className={classes.overlay}></div> }
            { <Spinner size={SpinnerSize.large} label={loaderMsg} className={classes.spinner} styles={spinnerStyle}/>  }
        </>
        
    );  
}

export const OseOverlaySpinner = injectIntl(OseSpinnerLarge);