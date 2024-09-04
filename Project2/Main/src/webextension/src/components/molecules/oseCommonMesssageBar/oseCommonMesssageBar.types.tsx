import { IIconProps } from "@fluentui/react";
import { InjectedIntlProps } from "react-intl";
import { IMessageState } from "../../../interfaces";
import { IAppContext } from "@msx/platform-services";

export interface IComponentProps {
  parentContext: IAppContext;
}

export interface IComponentAttributes {
  messageBarIconProps?: IIconProps;
  commonMessage?: IMessageState[];
  setShowTopBannerFlag?: (boolean)=>void;
}

export interface IMessageComponentAttributes {
  parentContext: IAppContext;
  type: string;
  setShowTopBannerFlag: (boolean)=>void;
}

export interface IExpandableMessageProps extends IComponentProps, IComponentAttributes {}

export type IExpandableCommonMessageBarProps = IExpandableMessageProps &
  InjectedIntlProps;

export type IMessageHandlerProps = IMessageComponentAttributes &
  InjectedIntlProps;
