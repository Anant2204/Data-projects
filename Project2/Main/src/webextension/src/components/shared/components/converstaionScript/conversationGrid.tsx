import {  classNamesFunction } from "@fluentui/react";
import React from "react";
import { messages } from "./conversationScript.messages";
import { injectIntl } from "react-intl";
import { getCurrentTheme } from "../../../../utils";
import { getStyles } from "./conversationScript.styles";
import JoiningSvgIcon from "../../../../images/joiningSvgIcon.svg";

let classes: any;
const ConversationGridComponent = (props) => {
  const { parentContext, intl, gridData} = props;

  //Styles
  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getStyles(theme);
  classes = getClassNames(styles);

  //Grid Columns
  const colsDef = [    
    {
      field: "fieldName",
      headerName: intl.formatMessage(messages.columnManagerInfo),
    },
    {
      field: "cy",
      headerName: intl.formatMessage(messages.columnCy),
    },
    { 
      field: "fy",
      headerName: intl.formatMessage(messages.columnFy),
    },
  ];

  let hasAnyChanged = gridData.some(item => item.hasChanged);

  // if(hasAnyChanged){
  //   colsDef.unshift( {
  //     field: "",
  //     headerName: '',
  //   })
  // }
  return (
    <>
        {gridData?.length>0 && (
           <div className={classes.tableStyling}> 
          <table aria-label={intl.formatMessage(messages.taxonomyTableName)}>
            <tr>
              {colsDef.map(col => <th>{col.headerName}</th>)}
            </tr>
            {gridData.map(row =>
              <tr className={row.hasChanged ? classes.hasChangedStyling : ''}>
                {/* {hasAnyChanged? 
                <td>
                  {row.hasChanged ? <div  title={intl.formatMessage(messages.taxonomyChangeIconTitle)} className={classes.iconFormatting}> <JoiningSvgIcon /> </div> : ''}
                </td>
                : null} */}
                <td className={classes.tableHeadingFont}>
                {row.fieldName}
                </td>
                <td>{row.cy}</td>
                <td>{row.fy}</td>
              </tr>)}
          </table>
         </div>
        )}
    </>
  );
};

export const ConversationGrid =  injectIntl(ConversationGridComponent);
