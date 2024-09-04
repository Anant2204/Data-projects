import { IAppContext } from "@msx/platform-services";
import React from 'react';
import { InjectedIntlProps } from "react-intl";
import {
    IBreadcrumbItem, IIconProps, MessageBarType
} from '@fluentui/react';
export interface IComponentProperties {
    parentContext: IAppContext;
}

export interface IBottomList {
    key: number | string,
    value: number | string
}
export interface ISubTileList {
    key: string,
    toolTip: string,
    iconName: string,
}

export interface ILeftSection {
    headerText: string, 
    headerTopLinkText: string,
    subTitleList?:ISubTileList[]
    subHeaderList?: IBottomList[],
    isBackButtonVisible: boolean,
}
export interface IData {
    id?: number,
    labelText?: string,
    toolTip?: string,
    value?:number | string
}

export interface IRightSection {
    data?: IData[],
}

export interface INotificationDetails {
    type: MessageBarType, 
    notificationMessage: JSX.Element,
    onDismiss?: (ev?: React.MouseEvent<HTMLElement>) => void | null,
    messageBarIconProps?: IIconProps;
}

export interface IHeaderState {
    leftSection?: ILeftSection,
    rightSection?: IRightSection, 
    notificationMessageDetails?: INotificationDetails | null,
}
export interface IHeaderEvents {
    //This should be manadatory when the "isBackButtonVisible" is true
    onBackButtonClickHandler?: () => void;
    //This should be manadatory when the "headerTopLinkText" is provided
    onTopLinkClickHandler?: () => void; 
}
export interface IComponentAttributes {
    breadCrumbItems?: IBreadcrumbItem[];
    headerState?: IHeaderState;
    headerEvents?: any;
}

export interface IComponentProps extends IComponentProperties, IComponentAttributes { }

export type IPageLayoutProps = IComponentProps & InjectedIntlProps;