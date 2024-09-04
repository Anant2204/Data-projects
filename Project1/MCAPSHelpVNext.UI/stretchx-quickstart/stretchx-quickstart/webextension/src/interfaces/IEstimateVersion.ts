import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";
import { IMappedConsumptionDetails } from "../components/shared/components/consumptionList/ConsumptionList.types";

export interface IComponentProperties {
  parentContext: IAppContext;
}

export interface IComponentAttributes {
  openFlyOut: boolean;
  handleOnDismiss: () => void;
  estimationDetails: IMappedConsumptionDetails;
}

export interface IEstimateVersion {
  id: string;
  versionName: string;
  createdBy: string;
  createdDateTime: string;
  programAzureRevenue: number;
  programStartDate: {
    month: number;
    year: number;
  };
  duration: number;
}

export interface IEstimateVersionData {
  data: IEstimateVersion[];
}

export interface IEstimateVersionList {
  date: string;
  versions: IEstimateVersion[];
}

export interface IEstimateVersionGroupingByDate {
  [key: string] : IEstimateVersion[]
}

export interface IEstimateVersionDataProps extends IComponentProperties, IEstimateVersionData {}

export interface IComponentProps
  extends IComponentProperties,
    IComponentAttributes {}
    
export type IEstimateViewVersionComponentProps = IComponentProps & InjectedIntlProps;
