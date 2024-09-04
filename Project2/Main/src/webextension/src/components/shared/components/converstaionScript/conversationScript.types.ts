import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";

export interface IComponentProperties {
    parentContext: IAppContext;
    pageName?: string;
}

export const MctAppProperties: IComponentProperties = {
    parentContext: null,
    pageName: '',
};

export interface IComponentProps
    extends IComponentProperties {}
    

export type IMCTConversation = IComponentProps & InjectedIntlProps;