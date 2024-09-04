import {IAppContext} from '@msx/platform-services'
import { InjectedIntlProps } from 'react-intl';

export interface IFilterOption {
  ID:number,
  name: string;
  selected?: boolean;
}

export interface IFilterCategory {
  name: string, 
  key: string,
  options: IFilterOption[],
}

export interface ISelectedFilter { 
  [key : number]: IFilterOption[]
}


export interface IComponentAttributes extends  InjectedIntlProps { 
}
