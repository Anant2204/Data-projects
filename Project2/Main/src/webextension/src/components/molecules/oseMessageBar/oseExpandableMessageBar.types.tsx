import { MessageBarType, IIconProps } from "@fluentui/react";
import { InjectedIntlProps } from "react-intl";

export interface IComponentAttributes {
  onDismiss: () => void;
  messageBarType: MessageBarType;
  messageBarIconProps?: IIconProps;
}

export type IExpandableMessageBarProps = IComponentAttributes & InjectedIntlProps;