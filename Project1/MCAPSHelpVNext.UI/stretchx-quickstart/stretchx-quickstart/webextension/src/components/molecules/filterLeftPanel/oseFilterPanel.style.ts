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
}
export const getStyles = (theme: IAppTheme): IConsumptionStyles => {
    return {
        filterHeader: {
            display: "flex",
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
            borderBottom: `1px solid ${theme.palette.neutralTertiaryAlt}`,
        },
        filterHeaderLabel: {
            fontWeight: FontWeights.semibold,
            fontSize: "20px",
        },
        clearAllText: {
            fontSize: "14px",
            marginRight: 5,
            cursor: 'pointer'
        },
        filterClearAll: {
            display: "flex",
            alignItems: 'center',
        },
        filterContainerCls: {
            display: 'flex',
            flexFlow: 'column nowrap',
            gap: 15,
            marginTop: 15,
            height: 'auto',
            //overflowY: 'auto',
            //overflowX: 'hidden',

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
