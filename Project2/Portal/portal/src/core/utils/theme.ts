import { IAppTheme } from '@msx/platform-services';

export const getCustomTheme = (DefaultTheme : IAppTheme, DarkTheme: IAppTheme) : IAppTheme[] => {
    const customDarkTheme : IAppTheme = {
        ...DarkTheme, 
        palette: {
            ...DarkTheme.palette, 
            white: "#292929", 
            neutralLight: "#1F1F1F", 
            themeDark: "#478EF5", 
            neutralTertiaryAlt: "#5C5C5C", 
            themePrimary: "#479EF5", 
            neutralQuaternary: "#5C5C5C"
        }
    }

    const customDefaultTheme : IAppTheme = {
        ...DefaultTheme
    }

    return [customDefaultTheme, customDarkTheme]
}