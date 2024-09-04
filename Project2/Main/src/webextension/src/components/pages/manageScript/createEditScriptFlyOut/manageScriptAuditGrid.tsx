import {  Link, classNamesFunction } from "@fluentui/react";
import React from "react";
import { messages } from "./createEditScriptFlyOut.messages";
import { injectIntl } from "react-intl";
import { formatDateAndTime, getCurrentTheme } from "../../../../utils";
import { getFlyoutStyles } from "./createEditScriptFlyOut.styles";

let classes: any;
const ManageScriptAuditGridComponent = (props) => {
  const { parentContext, intl, auditHistory} = props;

  //Styles
  const getClassNames = classNamesFunction<any, any>();
  const theme = getCurrentTheme(parentContext);
  const styles = getFlyoutStyles(theme);
  classes = getClassNames(styles);

  //Grid Columns
  const colsDef = [    
    {
      field: "modifiedBy",
      headerName: intl.formatMessage(messages.auditHistoryTableColUpdatedBy),
    },
    {
      field: "modifiedDate",
      headerName: intl.formatMessage(messages.auditHistoryTableColUpdatedOn),
    },
  ];

  return (
    <>
        {/* <div className={classes.previewScript}><Link href="#" aria-level={intl.formatMessage(messages.previewScriptLink)}>{intl.formatMessage(messages.previewScriptLink)}</Link> </div> */}
        {auditHistory?.length>0 && (
           <div className={classes.auditHistoryTable}> 
          <table>
            <tr>
              {colsDef.map(col => <th>{col.headerName}</th>)}
            </tr>
            {auditHistory.map(row =>
              <tr>
                <td className={classes.tableHeadingFont}>{row.modifiedBy}</td>
                <td>{formatDateAndTime(row.modifiedDate)}</td> 
              </tr>)}
          </table>
         </div>
        )}       
    </>
  );
};

export const ManageScriptAuditGrid =  injectIntl(ManageScriptAuditGridComponent);
