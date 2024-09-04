import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";
export interface IComponentProperties {
    parentContext: IAppContext;
}

export interface ICreateFlayoutPropsAttributes
    extends IComponentProperties,
    InjectedIntlProps {
    openFlyOut: boolean;
    handleOnDismiss: () => void;
    updatedManagerInfo:{
        [key: string]: string;
      };
    updateFutureManagerSaveCancelEvent: (updateCompleted: boolean) => void;
    pageName:string;
}


