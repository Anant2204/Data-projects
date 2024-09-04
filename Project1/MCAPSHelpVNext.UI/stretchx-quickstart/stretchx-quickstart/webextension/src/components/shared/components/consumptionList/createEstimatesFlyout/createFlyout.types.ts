import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";
import { IComboBoxOption } from "@fluentui/react";

export interface IComponentProperties {
  parentContext: IAppContext;
}

export interface ICreateFlayoutPropsAttributes
  extends IComponentProperties,
    InjectedIntlProps {
  openFlyOut: boolean;
  handleOnDismiss: () => void;
  parentContext: any;
  handleApplyConsumption?: (estimateId: String) => void;
  handleUpdateConsumption?: () => void;
  regions: IComboBoxOption[];
  scenarioStartMonth?: Date;
  actionButtonName?: string;
  editMode?: boolean;
  opportunityId: string;
  estimateDetails?: IEstimate;

}

export interface IEstimate {
  EstimateId?: string;
  Name: string;
  Description?: string;
  Region: string;
  Month: any;
  Year: any;
  ModifiedDate?: string;
  ModifiedBy?: string;
  CreatedDate?: string;
  CreatedBy?: string;
  PublishedBy?: string;
  PublishedDate?: string;
  PublishRecords?:IPublishRecords[];
}

export interface IEstimatePost {
  name: string;
  description?: string;
  programStartDate: any;
  opportunityId: string;
  defaultRegion: string;
  id?: string;
  etag?: string;
}

export interface IPublishRecords {
  publishedBy: string;
  publishedDate: string;
  versionId: string;
  appIdentifier: string;
 
}
