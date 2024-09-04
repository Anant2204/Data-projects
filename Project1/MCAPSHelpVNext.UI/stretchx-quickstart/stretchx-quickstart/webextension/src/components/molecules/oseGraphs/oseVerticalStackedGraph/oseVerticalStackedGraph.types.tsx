import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";

export interface IComponentProperties {
  parentContext: IAppContext;
}

interface IRightSideContent {
  labelText: string;
  value: any;
  id?: any;
}
interface IRightSideContentList {
  data: IRightSideContent[];
}

export interface IComponentAttributes {
  GraphData: any;
  extraProps?: any;
  rightSideContent?: IRightSideContentList;
}

export interface IComponentProps
  extends IComponentProperties,
    IComponentAttributes {}

export type IChartViewProps = IComponentProps & InjectedIntlProps;

export interface IChartState {
  chartTitle: string;
  barWidth: number;
  width: number;
  height: number;
  showLine: boolean;
  barGapMax: number;
  hideLabels: boolean;
  isCalloutForStack: boolean;
  data: IChartData[];
}
export interface IRootStyle {
  width: string;
  height: string;
  minWidth: string;
  margin: string;
}
export interface IChartData {
  xAxisPoint: string;
  chartData: IChartIndividualData[];
}

export interface IChartIndividualData {
  legend: string;
  data: any;
  color: string;
  month: string;
  isRecurring?: boolean;
}
