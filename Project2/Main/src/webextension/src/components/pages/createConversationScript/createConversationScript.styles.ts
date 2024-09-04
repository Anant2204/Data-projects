import {
  getTheme,
} from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";
import { Padding } from "ag-grid-enterprise/dist/lib/ag-charts-community/sparklines-util";
export const theme = getTheme();

export const getStyles = (theme: IAppTheme) => {
  return {
    root: {
      background: theme.palette.neutralLighterAlt,
      fontFamily: "Segoe UI", 
    },
    mainContainer: {
      background: theme.palette.neutralLighterAlt, 
      font: 'Segoe UI', 
      display: 'flex',
      flexDirection: 'column',
      padding: '30px'
    },
    pageHeader: {
      flex: '1 1 358px',
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
      padding:20,
      gap:10
    },
    columnsContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      gap:12
    },
    checkboxStyle : {
      marginTop: '10px',
    }, 
    uploadScriptButton:{
      display: 'flex',
      justifyContent: 'left',
      PaddingLeft:'20px'
    }
  };
};
