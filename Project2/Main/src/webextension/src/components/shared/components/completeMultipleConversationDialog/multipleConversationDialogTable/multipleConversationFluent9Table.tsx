import * as React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
} from "@fluentui/react-components";
import { injectIntl } from "react-intl";
import { messages } from "../multipleConversationDialog.messages";
import { IMultipleConversationDialog } from "./multipleConversationFluent9Table.types";

export interface IConversationDialogGridData {
  fullName: string;
  fyManagerChange: string;
  conversation: string;
  conversationStatus: string;
}
export const MultipleConversationFluent9TableComponent = (props:IMultipleConversationDialog) => {
    const { intl, gridData} = props;

    const columns = [    
    {
        columnKey: "fieldName",
        label: intl.formatMessage(messages.fullName),
    },
    {
        columnKey: "fyManager",
        label: intl.formatMessage(messages.fyManagerChange),
    },
    {
        columnKey: "conversation",
        label: intl.formatMessage(messages.conversation),
    }
    ];

  return (
    <Table arial-label={intl.formatMessage(messages.pendingConversations)}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell  key={column.columnKey}>
              {column.label}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {gridData?.map((row, index) => (
          <TableRow key={index}>
            <TableCell>
                {row.fullName}
            </TableCell>
            <TableCell>
                {row.fyManagerChange === 'N' ? 'No' : "Yes"}
            </TableCell>
            <TableCell>{row.conversation}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
 
export const MultipleConversationFluent9Table =  injectIntl(MultipleConversationFluent9TableComponent);
