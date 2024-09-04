

import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";

export interface IComponentProperties {
    parentContext: IAppContext;
    gridData: IConversationDialogGridData[];
}

export interface IComponentProps
    extends IComponentProperties {}
    

export type IMultipleConversationDialog = IComponentProps & InjectedIntlProps;

export interface IConversationDialogGridData {
  fullName: string;
  fyManagerChange: string;
  conversation: string;
  conversationStatus: string;
}