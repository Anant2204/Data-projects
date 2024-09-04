import { InjectedIntlProps } from "react-intl";

export interface IComponentProperties {
    isDialogVisible: boolean;
    title: string;
    subText: string;
    handleDialogClose: (boolean) => void;
    yesButtonText?: string; // default value assigned
    noButtonText?: string; // default value assigned
}

export type IOseDialogProps = IComponentProperties & InjectedIntlProps;
