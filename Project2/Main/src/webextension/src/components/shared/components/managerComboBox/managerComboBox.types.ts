import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";

export interface IComponentProperties {
    parentContext: IAppContext;
    pageTitle?: string;
    selectedOption?: (selectedOption) => void;
    setToggleCompleteHierarchy?: (isChecked) => void;
    defaultSelectedManagers:string[];
    disabled: boolean;
}

export const MctAppProperties: IComponentProperties = {
    parentContext: null,
    pageTitle: '',
    selectedOption: (selectedOption) => {},
    setToggleCompleteHierarchy: (isChecked) => {},
    defaultSelectedManagers:[],
    disabled: false
};

export interface IComponentAttributes {
    selectedIndex: number;
    slimLayout: boolean;

}



export const MctAppAttributes: IComponentAttributes = {
    selectedIndex: -1,
    slimLayout: false,
    
};

export interface IComponentProps
    extends IComponentProperties {}
    

export type IMctMangerComboProps = IComponentProps & InjectedIntlProps;