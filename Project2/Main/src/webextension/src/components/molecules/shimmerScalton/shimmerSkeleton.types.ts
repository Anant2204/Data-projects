import { injectIntl, InjectedIntlProps } from 'react-intl';
import {IAppContext} from '@msx/platform-services'

export interface IComponentProps {
  parentContext:IAppContext;
}

export interface IComponentAttributes extends InjectedIntlProps {
    loaddingMessage?: string;
  }

  export interface IOseOverlaySpinnerAttributes extends IComponentProps, InjectedIntlProps {
    loaddingMessage?: string;
  }

export type ILargeSpinnerProps = IComponentAttributes;
export type IOseOverlaySpinnerProps = IOseOverlaySpinnerAttributes;
