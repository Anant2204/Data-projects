import { InjectedIntlProps } from "react-intl";

export interface IComponentAttributes extends InjectedIntlProps {
  name?: string; // only required for formik
  label: string;
  date: Date;
  setDate: (date: Date) => void;
  endMonth?: Date;
  startMonth?: Date;
  disabled?: boolean;
}

export type IDateComponentProps = IComponentAttributes;
