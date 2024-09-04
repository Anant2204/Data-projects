import { IAppContext } from "@msx/platform-services";

export interface IComponentProperties {
    parentContext: IAppContext;
}

export interface IGroupsList {
    groupName: string;
    cards: JSX.Element
}

export interface IOseGroupCardAttributes {
    render: any; 
    groupName: string;
    listData: any[]; // Put any becasue this is generic component and accept other component data.
}

export interface IGroupsListData {
    data: IGroupsList[] ;
}
  
export interface IComponentProps extends IComponentProperties, IOseGroupCardAttributes {}