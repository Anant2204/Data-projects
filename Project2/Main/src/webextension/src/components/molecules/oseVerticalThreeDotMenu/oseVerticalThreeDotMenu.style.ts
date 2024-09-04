import { IAppTheme } from "@msx/platform-services";

export const getStyles = (theme: IAppTheme) => {
    return {
        icon: {
            selectors: {
                '.ms-Button-menuIcon': {
                    display: 'none'
                },
                '>span.ms-Button-flexContainer': {
                    gap: 0
                },
                '.ms-Button-icon': {
                    fontWeight:'bold'
                }
            },
            color: theme.palette.themePrimary  
        },
        gridIconCallout: {
            selectors: {
                '.ms-ContextualMenu-icon': {
                    fontSize: '14px !important'
                },
                '.ms-ContextualMenu-container': {
                    padding:'15px !important'
                }
            }   
        }
    }
};
