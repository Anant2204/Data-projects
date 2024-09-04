import {IAppContext} from '@msx/platform-services'
import { InjectedIntlProps } from 'react-intl';

export interface IComponentProperties {
  parentContext:IAppContext;
}


export interface IFilterOption {
  name: string;
  selected?: boolean;
}

export interface IFilterCategory {
  name: string, 
  key: string,
  options: IFilterOption[],
}

export interface ISelectedFilter { 
  [key : string]: IFilterOption[]
}


export interface IComponentAttributes extends IComponentProperties, InjectedIntlProps { 
  filterOptions: IFilterCategory[];
  onFilterChange: (selected: ISelectedFilter) => void
}
