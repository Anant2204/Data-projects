import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";
import { ColDef, GridOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

export interface IComponentProperties {
  parentContext: IAppContext;
}
export interface IComponentAttributes {
  grRef: React.MutableRefObject<AgGridReact<any>>;
  columnDefinitions: ColDef[];
  rowDataProps: Array<Object>;
  gridOptions: GridOptions;
  classNameGrid: string;
  gridName?: string;
}

export interface IComponentProps
  extends IComponentProperties,
    IComponentAttributes {}

export type IGridProps = IComponentProps & InjectedIntlProps;
