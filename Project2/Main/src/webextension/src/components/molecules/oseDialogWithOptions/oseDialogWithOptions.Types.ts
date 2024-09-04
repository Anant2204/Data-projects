import { IChoiceGroupOption } from "@fluentui/react";
import { InjectedIntlProps } from "react-intl";

export interface IOptions {
  options: IChoiceGroupOption[];
  defaultSelectedKey?: string;
}

export interface IDialogOutPut {
  yesSelected: boolean;
  selectedOption?: string;
  anyOtherOutput?: any;
}
export interface IComponentProperties {
  isDialogVisible: boolean;
  title: string;
  subText: string;
  handleDialogClose: (output: IDialogOutPut) => void;
  yesButtonText?: string; // default value assigned
  noButtonText?: string; // default value assigned
  optionsData?: IOptions;
  anyOtherInput?: any;
}

export type IOseDialogWithOptionsProps = IComponentProperties &
  InjectedIntlProps;
