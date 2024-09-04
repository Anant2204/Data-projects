
import React, { FC } from "react";
import { DirectionalHint, Icon, Label, TooltipHost } from "@fluentui/react";
import { IInfoIconWithLabel } from "./oseInfoIconWithLabel.types";
import {getStyles} from './oseinfoIconWithLabelStyles';
import { classNamesFunction } from "office-ui-fabric-react";

let classes: any;
const getClassNames = classNamesFunction<any, any>();

const oseInfoIconWithLabel: FC<IInfoIconWithLabel> = (props): JSX.Element => {

    const { labelTitle, tooltipMessage, required } = props;
    classes = getClassNames(getStyles());

    return (
<>
        {labelTitle?
            <span className={classes.tooltipContainer}>

                    {labelTitle && <span><Label htmlFor={props.htmlFor}  className={classes.requiredLabel} required={required ? props.required : false}>{labelTitle}</Label></span>}
        
            <span><TooltipHost content={tooltipMessage} directionalHint={DirectionalHint.topAutoEdge}>
                <Icon className={classes.infoIcon} iconName="info" aria-label={tooltipMessage} />
            </TooltipHost></span>
        
        </span>
            :<TooltipHost content={tooltipMessage} directionalHint={DirectionalHint.topAutoEdge}>
            <Icon className={classes.infoIcon} iconName="info" />
        </TooltipHost>
        
            }
            </>
          
    );

};

export const OseInfoIconWithLabel = oseInfoIconWithLabel;