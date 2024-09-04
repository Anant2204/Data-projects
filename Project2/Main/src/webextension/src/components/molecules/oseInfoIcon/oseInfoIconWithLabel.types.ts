import {IAppContext} from '@msx/platform-services'

export interface IComponentProps {
  parentContext:IAppContext;
}

export interface IComponentAttributes extends IComponentProps {
    labelTitle?: string;
    required?: boolean;
    tooltipMessage: string;
    htmlFor?: string;
  }

export type IInfoIconWithLabel = IComponentAttributes;
