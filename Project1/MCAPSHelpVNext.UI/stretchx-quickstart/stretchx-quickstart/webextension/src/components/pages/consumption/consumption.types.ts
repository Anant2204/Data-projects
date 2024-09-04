import {IAppContext} from '@msx/platform-services'
import { InjectedIntlProps } from 'react-intl';

export interface IComponentProperties {
  parentContext:IAppContext;
}

export const ConsumptionAppProperties: IComponentProperties = {
  parentContext:null,
};

export interface IComponentAttributes {
  selectedIndex: number;
  slimLayout: boolean;
}

export const ConsumptionAppAttributes: IComponentAttributes = {
  selectedIndex: -1,
  slimLayout: false
};


export interface IComponentProps extends IComponentProperties, IComponentAttributes  { }

export type IConsumptionProps = IComponentProps;

export const HttpStatus = {
  HTTP_STATUS_NOT_FOUND: 404,
  HTTP_STATUS_NOT_FOUND_TEXT : 'Request failed with status code 404',
}

export type IConsumptionPageProps = IComponentProps & InjectedIntlProps;
