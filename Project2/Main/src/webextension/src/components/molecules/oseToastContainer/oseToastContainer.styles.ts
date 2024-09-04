import { IAppTheme } from "@msx/platform-services";

export const getCustomStyles = () => {
    return {
        defaultToast: {
            top: '50px',
            '@media screen and (-ms-high-contrast: active)': {
                border: '1px solid white !important',
            },
        },
        
    }
};