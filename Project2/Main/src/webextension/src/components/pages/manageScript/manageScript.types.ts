import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";
import { IManageScriptGrid } from "../../../interfaces/ApiResponseModel/IConversationScript";

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


export type IMctPageProps = IComponentProps & InjectedIntlProps;

export interface IGridProps {
    parentContext: any;
    rowGridData:IManageScriptGrid[];
    intl: any;
    handleSelectionChanged?: (event:any) => void;
    isPageReadOnly:boolean;
    isApproveAccess:boolean;
    taxonomyChangeContextCompletedEvent:(updateCompleted:boolean) => void;
  }