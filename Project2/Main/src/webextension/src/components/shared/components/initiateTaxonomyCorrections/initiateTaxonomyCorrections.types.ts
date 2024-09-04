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
    taxonomyCorrectionsInfo?:{
        [key: string]: string;
      };
    initiateTaxonomyCorrectionsSaveCancelEvent?: (updateCompleted: boolean) => void;
    pageName:string;
    disabled?:boolean;
    selectedOption?: (selectedOption) => void;
    defaultSelectedManagers?:string[];
}


