import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";

export interface IComponentProperties {
  parentContext: IAppContext;
  pageName?: string;
  hideMultipleConversationDialog: boolean;
  multipleConversationSaveCancelEvent: (conversationCompleted: boolean) => void;
  data: any;
}

export interface IComponentProps
    extends IComponentProperties {}
    

export type IMultipleConversationDialog = IComponentProps & InjectedIntlProps;