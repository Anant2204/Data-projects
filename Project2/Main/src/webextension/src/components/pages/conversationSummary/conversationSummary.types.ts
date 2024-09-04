import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";

export interface IComponentProperties {
    parentContext: IAppContext;
}

export const MctAppProperties: IComponentProperties = {
    parentContext: null,
};

export interface IComponentAttributes {
    selectedIndex: number;
    slimLayout: boolean;
}

export const MctAppAttributes: IComponentAttributes = {
    selectedIndex: -1,
    slimLayout: false,
};

export interface IConversationSummary {
    fullName: string;
    alias: string;
    roleSummary: string;
    q1: string;
    q2: string;
    isMoving: boolean;
    hasTaxonomyChange: boolean;
    isMovingHasTaxonomyChange: number;
  } 
export interface IComponentProps
    extends IComponentProperties,
    IComponentAttributes {}

export type IMctProps = IComponentProps;

export type IMctPageProps = IComponentProps & InjectedIntlProps;