import { InjectedIntlProps } from "react-intl";
import { IContextualMenuProps } from "@fluentui/react";
import { IAppContext } from "@msx/platform-services";

export interface IComponentProperties {
    menuProps: IContextualMenuProps;
    ariaLabel: string; 
    parentContext: IAppContext;
    disabled?: boolean;
    id?: string;
    updateSelectedCellId?: (id: string) => void;
}

export type IOseVerticalDotsContextualMenuProps = IComponentProperties & InjectedIntlProps;
