import {
  getTheme,
} from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";
export const theme = getTheme();
export const getStyles = (theme: IAppTheme) => {
  return {
    root: {
      background: theme.palette.neutralLighterAlt,
      fontFamily: "Segoe UI", 
    },
    pivotStyle:{
      fontFamily: 'Segoe UI',  
      fontSize: '14px',
      lineHeight: '20px',
    }, 
    pivotItemStyle:{
      paddingTop: 5
    }, 
    mainContainer: {
      background: theme.palette.neutralLighterAlt, 
      font: 'Segoe UI', 
      display: 'flex',
      flexDirection: 'column',
      padding: '30px'
    },
    tabContainer:{
      boxShadow: "0px 3.3px 7.2px 0px rgba(0, 0, 0, 0.13)", 
    },
    pageHeader: {
      width: '430px', 
      fontFamily: 'Segoe UI',
      fontWeight: 600,
      lineHeight: 36,
      "h1":{
        fontSize: 28
      }
    },
    columnsHeaderContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingBottom: 32,
      gap: 10
    },
    toggleHover: {
      ':hover': {
        background: `${theme.palette.neutralLighterAlt} !important`,
      },
      marginTop: 3,
      dispaly:'contents'
    }
  };
};
