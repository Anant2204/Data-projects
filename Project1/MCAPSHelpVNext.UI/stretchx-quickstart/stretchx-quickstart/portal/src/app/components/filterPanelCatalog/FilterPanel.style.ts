import { FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface IConsumptionStyles {
    filterHeader: IStyle;
    filterHeaderLabel: IStyle;
    clearAllText: IStyle;
    filterClearAll: IStyle;
    filterContainerCls: IStyle;
    stackItemHeader: IStyle;
    leftFilterItem: IStyle;
    leftFilterItemsContainer: IStyle;
    filterlist:IStyle,
    filterSubList:IStyle
}
export const getStyles = (): IConsumptionStyles => {
    return {
        filterHeader: {
            display: "flex",
            justifyContent: 'space-between',
            alignItems:"center"
        },
        filterHeaderLabel: {
            fontWeight: FontWeights.semibold,
            fontSize: "20px",
        },
        filterlist:{
                listStyleType:"none",
                display:"flex",
                justifyContent:"left",
                flexWrap:"wrap",
                paddingLeft:"10px"

        },
        filterSubList:{
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between",
            width:"fit-content",
            backgroundColor:"#EDEBE9",
            padding:"8px",
            borderRadius:"20px",
            fontSize:"12px",
            fontWeight:"600",
            marginLeft:"5px",
            marginRight:"5px",
            marginBottom:"10px"
        },
        clearAllText: {
            fontSize: "14px",
            marginRight: 5,
            cursor: 'pointer',
            color:"#0078D4"

        },
        filterClearAll: {
            display: "flex",
            // alignItems: 'center',
        },
        filterContainerCls: {
            display: 'flex',
            flexFlow: 'column nowrap',
            gap: 15,
            height: 'auto',

            '@media (max-width: 750px)': {
                gap: 0,
                height: '100%'
            }
        },
        stackItemHeader: {
            marginBottom: '5px',
            padding: '5px 5px 5px 0',
            selectors: {
                '.label': {
                    fontSize: 14,
                    fontWeight: FontWeights.semibold
                }
            }
        },
        leftFilterItemsContainer: {
            '@media (max-width: 750px)': {
                'flex-flow': 'wrap',
                marginBottom: '10px'
            }

        },
        leftFilterItem: {
            '@media (max-width: 750px)': {
                width: '50%',
                margin: '5px 0px'
            }
        }
    };
};
