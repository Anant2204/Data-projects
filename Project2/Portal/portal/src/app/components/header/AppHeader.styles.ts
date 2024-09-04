import { IAppTheme } from '@msx/platform-services';

export const getStyles = (theme: IAppTheme) => {
    return {
        callOutStyle: {
            selectors: {
                '.ms-ContextualMenu-icon': {
                    fontSize: '14px'
                },
                '.ms-ContextualMenu-container': {
                    padding:'15px'
                }
            }   
        },
        iconProp: {
            selectors: {
                ':hover':{
                    '.ms-Button-menuIcon':{
                        background: "transparent",
                    }
                },
                '.ms-Button-menuIcon':{
                    color: "#FFFFFF !important"
                }
            }
        },
        copiloticon : {
            width: '20px',
            height: '20px',
            '@media screen and (-ms-high-contrast: active) and (prefers-color-scheme: light)': {
                    filter: 'invert(100%)',
            },
            '@media screen and (-ms-high-contrast: active) and (prefers-color-scheme: light) and (min--moz-device-pixel-ratio: 3), screen and (-o-min-device-pixel-ratio: 6/2), screen and (-webkit-min-device-pixel-ratio: 3), screen and (min-device-pixel-ratio: 3), screen and (min-resolution: 288dpi), screen and (min-resolution: 3dppx)': {
                filter: 'invert(100%)', // Change to black color
            },
        }
    }
};


