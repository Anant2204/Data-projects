import { IDropdownStyles } from "@fluentui/react";

export interface IGroupedDropdownProps {
    selectedRegions: any;
    onSelect: (region: string) => void;
    defaultRegion?: string;
    region?: string;
    label?: string;
    required?: boolean;
    isButtonAriaHidden?: boolean;
    onRenderLabel?: (props: any) => JSX.Element;
    disabled?: boolean;
    onBlur?: () => void;
    styles?: Partial<IDropdownStyles>;
    id?: string;
    defaultSelectedKey?: string;
    arialabel?: string;
}