import React from "react";
import { DirectionalHint, IconButton, classNamesFunction } from "@fluentui/react";
import { injectIntl } from "react-intl";
import { getStyles } from './oseVerticalThreeDotMenu.style';
import { getCurrentTheme } from '../../../utils';
import { IOseVerticalDotsContextualMenuProps } from "./oseVerticalThreeDotMenu.type";

const getClassNames = classNamesFunction<any, any>();
let classes: any;

const OSEVerticalThreeDotMenu: React.FC<IOseVerticalDotsContextualMenuProps> = 
({menuProps, ariaLabel, parentContext, disabled = false}) => {
    classes = getClassNames(getStyles(getCurrentTheme(parentContext)));

    return (
        <IconButton
            iconProps={{
                iconName: "MoreVertical",
            }}
            ariaLabel={ariaLabel}
            className={classes.icon}
            menuProps={
                {
                    ...menuProps,
                    calloutProps: {
                        className: classes.gridIconCallout,
                    },
                    directionalHint: DirectionalHint.bottomRightEdge,
                    shouldFocusOnMount: true,
                    isSubMenu: false
                }
            }
            disabled = {disabled}
         />
    );
};

export const OseVerticalThreeDotMenu = injectIntl(OSEVerticalThreeDotMenu);