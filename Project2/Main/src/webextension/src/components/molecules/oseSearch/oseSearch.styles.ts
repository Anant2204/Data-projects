import { IAppTheme } from "@msx/platform-services";

export const getStyles = (theme: IAppTheme) => {
    return {
        root: { 
            borderRadius: '5px',
            background: theme.palette.white,
            border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
        }

    }
};