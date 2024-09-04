import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";

export interface IComponentProperties {
    parentContext: IAppContext;
}

export const MctAppProperties: IComponentProperties = {
    parentContext: null,
};

export interface IComponentAttributes {
    selectedIndex: number;
    slimLayout: boolean;
}

export const MctAppAttributes: IComponentAttributes = {
    selectedIndex: -1,
    slimLayout: false,
};

export interface IComponentProps
    extends IComponentProperties,
    IComponentAttributes {}

export type IMctProps = IComponentProps;


export interface IGridData {
  fullName: string;
  alias: string;
  roleChange: string;
  cyManagerAlias: string;
  fyManagerChange: string;
  scriptLink: string;
  conversation: string;
  conversationStatus: string;
  edmValidation: string;
  fyManagerAlias: string;
  fyOrg: string;
  fyRoleSummary: string;
  fyQ1: string;
  fyQ2: string;
  fyIncentivePlan: string;
  fyCostCenter: string;
  cyOrg: string;
  cyRoleSummary: string;
  cyQ1: string;
  cyQ2: string;
  cyCareerStage: string;
  cyIncentivePlan: string;
  cyCostCenter: string;
  cyManagerFullName:string;
  hasActiveFutureManagerRequest:boolean;
  futureManagerRequestSubmittedBy:string;
  taxonomyCorrectionRequestSubmittedBy:string;
  hasActiveTaxonomyCorrectionRequest:boolean;
  fyManagerFullName:string;
  fyCareerStage:string;
  isEmployeeRecordApproved: boolean;
  }

export type IMctPageProps = IComponentProps & InjectedIntlProps;