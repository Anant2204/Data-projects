import { PanelType } from "@fluentui/react";
import { IAppContext } from "@msx/platform-services";

export interface IComponentProperties {
  parentContext: IAppContext;
}

export interface IComponentAttributes {
    isOpen: boolean;
    title: string;
    onDismiss: () => void;
    onSave?: () => void;
    onCancel?: () => void;
    footerButtons?: {
        text: string; onClick?: () => void;
        isPrimary?: boolean;
        isDefault?: boolean;
    }[];
    isSaveDisabled?: boolean;
    panelSize?: PanelType,
    customWidth?: string,
    formstyle?: any,
    formikProps?: any,
    initialValues?: any,
    validationSchema?: any,
    handleSubmit?: any,
    submitButtonTitle?: string,
    cancelButtonTitle?: string,
    saveButtonText?: string,
    cancelButtonText?: string,
    isResetVisible?: boolean;
    resetButtonText?: string;
    isResetDisabled?: boolean;
    onReset?: () => void;
    showFooterButtons?: boolean;
}

export interface IFlyoutProps
  extends IComponentProperties,
    IComponentAttributes {}

