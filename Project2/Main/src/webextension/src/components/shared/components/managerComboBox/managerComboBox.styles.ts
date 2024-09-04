import { IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface ManagerStatisticStyles {
  rootcontainer: IStyle;
  comboContainer: IStyle;
  comboTitle: IStyle;
  toggleHover: IStyle;
}
export const getStyles = (theme: IAppTheme): ManagerStatisticStyles => {
  return {
    rootcontainer: {
      display: "flex",
      flexDirection:"row",
      flexWrap:"wrap",
      alignItems: 'baseline',
      gap: '16px',
      margin: '10px 0px 0px 0px', 
    "h1": {
      fontFamily: 'Segoe UI',
      fontSize: '24px',
      fontWeight: '600',
      fontStyle: 'normal',
      lineHeight: '36px',
      letterSpacing: '0px',
      textAlign: 'left'
      },
      "h2":{
        fontSize: 14,
        margin:0,
      }
    },
    comboContainer: {
      display: 'flex',
      flexDirection: 'row',
      margin: '0px 0px 0px 20px',
      "@media screen and (min-resolution: 150dpi)": {
        margin: '0px',
      },     
    },
    comboTitle: {
      margin: '0px 16px 0px 0px',
      fontFamily: 'Segoe UI',
      fontSize: '14px',
      fontWeight: '600',
      fontStyle: 'normal',
      color: theme.palette.neutralDark, 
      display: 'flex',
      padding: '4px 0px',
    },
    toggleHover: {
      ':hover': {
        background: `${theme.palette.neutralLighterAlt} !important`,
      },
    }
  };
};

