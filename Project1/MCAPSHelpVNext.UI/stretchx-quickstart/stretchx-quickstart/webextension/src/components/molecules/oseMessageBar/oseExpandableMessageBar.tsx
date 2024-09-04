import React from "react";
import { MessageBar, classNamesFunction } from "@fluentui/react";
import { IExpandableMessageBarProps } from "./oseExpandableMessageBar.types";
import { injectIntl } from "react-intl";
import { messages } from "./oseExpandableMessage.messages";
import { getMessageStyles, getStyles } from './oseExpandableMessage.styles';

let classes;
let stickyClasses: any;
const getClassNames = classNamesFunction<any, any>();

export const ExpandableMessageBar: React.FunctionComponent<
  IExpandableMessageBarProps
> = ({ onDismiss, children, messageBarType , messageBarIconProps, intl}) => {
   classes = getMessageStyles();
   stickyClasses = getClassNames(getStyles());
  // TODO if exapand and collapse is required
  // const [isMultiline, setIsMultiline] = useState(false);
  // const handleExpand = () => {
  //   setIsMultiline(!isMultiline);
  // };

  return (
    <>
      <div className={stickyClasses.stickyContent}>
        <MessageBar
          messageBarType={messageBarType}
          isMultiline={true}
          onDismiss={onDismiss}
          dismissButtonAriaLabel={intl.formatMessage(
            messages.btnCloseMessageBar
          )}
          styles={classes.messageClass}
          messageBarIconProps={messageBarIconProps}
          // actions={
          //   <div>
          //     <span onClick={handleExpand}
          //       style={{ cursor: 'pointer' }} >
          //       {isMultiline ? 'Collapse' : 'Expand'}</span>
          //   </div>
          // }
        >
          {children && children}
        </MessageBar>
      </div>
    </>
  );
};

export const OseExpandableMessageBar = injectIntl(ExpandableMessageBar);
