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
    updatedEdmInfo:string[];
    updatedEdmIds:number[];
    updateEdmSaveCancelEvent: (updateCompleted: boolean) => void;
    actionType:string;
}


