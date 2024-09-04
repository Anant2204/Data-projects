import { IAppTheme } from '@msx/platform-services'
import { IStyle } from '@fluentui/react';

export interface IAppStyles {
  root: IStyle;
  main: IStyle;
  errorMessage:IStyle;
  openClose: IStyle;
}

export const getStyles = (theme: IAppTheme): IAppStyles => {
  return {
    root: { 
    },
    main: {
      outline: 'none',
    },
    errorMessage:{
      backgroundColor: theme.palette.neutralLighterAlt,
      paddingTop: 50,
    },
    openClose: {
      textAlign: "center",
      fontSize: "20px",
      fontFamily: "Segoe UI",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "28px",
      width: "480px",
    },
  }
};


