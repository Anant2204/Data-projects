import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";

export interface IComponentProperties {
    parentContext: IAppContext;
    setTileFilter: (tileFilter: object) => void;
    // tileFilter: object;
    statistics: ITileProps[];    
}

interface ITileProps {
    statisticsValue: number;
    statisticsText: string;
}

export const MctAppProperties: IComponentProperties = {
    parentContext: null,
    setTileFilter: (tileFilter: object) => {},
    // tileFilter:{},
    statistics: null
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
    extends IComponentProperties {}
    

export type IMctStatisticsProps = IComponentProps & InjectedIntlProps;