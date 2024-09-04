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
      "h1":{
        fontSize: 28
      }, 
      paddingBottom: 20
    },
    gridItem : {
      gridColumnStart: 1,
      gridColumnEnd: 4,
    },
    selectedTileTextContainer: {
      display: 'flex',
      flexWrap:"wrap",
      justifyContent: "space-between", 
      paddingTop: 20,   
      paddingBottom: 5,    
    },
    subHeading:{
      "h2":{
        fontSize: 16
      }
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
    gridIconText:{
      paddingLeft: 10,  
    },
    createScriptButton:{
      marginTop: -150,
      display: 'flex',
      justifyContent: 'center',
    }
    
  };
};
