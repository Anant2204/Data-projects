import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";

export interface IComponentProperties {
    parentContext: IAppContext;
}

export interface IComponentAttributes {
  opportunityId: string;
  readOnly?: boolean;
}

export interface IPublishRecords {
  publishedBy: string;
  publishedDate: string;
  version: number;
  versionId: string;
  appIdentifier: string;
}

export interface IMappedConsumptionDetails {
  EstimateId: string;
  Name: string;
  ACR: number;
  ACRFormattedValue: string;
  Description: string;
  Duration: string;
  DurationMonth: string;
  Status: string;
  MsxId: string;
  Month: number;
  Year: number;
  CreatedBy: string;
  CreatedDate: string;
  ModifiedBy: string;
  ModifiedDate: string;
  PublishedBy: string;
  PublishedDate: string;
  PublishRecords: IPublishRecords[];
  Region: string;
  OpportunityId: string;
  Etag: string;
  M365?: number;
  D365?: number;
}


export interface INewConsumption {
  EstimateId: string;
}

export interface IComponentProps extends IComponentProperties, IComponentAttributes { }

export type IConsumptionListProps = IComponentProps & InjectedIntlProps; 
