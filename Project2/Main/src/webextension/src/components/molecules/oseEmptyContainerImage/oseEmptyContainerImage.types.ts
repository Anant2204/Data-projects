import { injectIntl, InjectedIntlProps } from 'react-intl';
import {IAppContext} from '@msx/platform-services'

export interface IComponentProperties {
  parentContext: IAppContext;
}

export interface IComponentAttributes {
  buttonLabel?:string;
  buttonToolTip?:string
  noContentMessage:string
  OnCreateButtonClick?: (event : any ) => void | Promise<void>;
  type?: string;
  ImageSvg: any;
  readonly?: boolean;
}

export interface IComponentProps extends IComponentProperties, IComponentAttributes { }

export type IEmptyContainerImageProps = IComponentProps;
