import {IAppContext} from '@msx/platform-services'

export interface IComponentProps {
  parentContext:IAppContext;
}

export interface IComponentAttributes extends IComponentProps {
    onSearch: (query: string) => void;
    searchPlaceHolder: string;
    onClear?: () => void;
  }

export type ISearchProps = IComponentAttributes;

