import { IBreadcrumbItem } from "@fluentui/react";
import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from 'react-intl';
export interface IComponentProperties {
  parentContext: IAppContext;
}

export interface IComponentAttributes {
  items: IBreadcrumbItem[];
}

export interface IComponentProps extends IComponentProperties, IComponentAttributes { }

export type IBreadcrumbComponentProps = IComponentProps & InjectedIntlProps; 
