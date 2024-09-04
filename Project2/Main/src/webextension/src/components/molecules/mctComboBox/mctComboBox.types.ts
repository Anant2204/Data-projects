import { ComboboxProps } from '@fluentui/react-components';
import {IAppContext} from '@msx/platform-services'

export interface IComponentProps extends Partial<ComboboxProps> {
  parentContext:IAppContext;
}

export interface IComponentAttributes extends IComponentProps {
    theme?:string;
    onSelectOptions?: (selectedOptions:string[]) => void;
    options:any;
    comboId?:string;
    placeholder?:string;
    noResultsText?:string;
  }

export type IMctComboBoxProps = IComponentAttributes;

