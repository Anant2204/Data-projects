import {
  getTheme,
} from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";
export const theme = getTheme();

export const getStyles = (theme: IAppTheme) => {
  return {
    root: {
      background: theme.palette.neutralLighterAlt,
      fontFamily: 'Segoe UI',
      "h2":{
        fontSize: 14,
        margin:0,
      }
    },
    mainContainer: {
      background: theme.palette.neutralLighterAlt, //'linear-gradient(91deg, #FFF -0.03%, #DCF0FF 133.03%)',
      // boxShadow: '0px 1.6px 3.6px 0px rgba(0, 0, 0, 0.13), 0px 0.3px 0.9px 0px rgba(0, 0, 0, 0.10)',
      font: 'Segoe UI', 
      display: 'flex',
      flexDirection: 'column',
      //height: "1001px",
      padding: '40px 40px 40px 40px'
      //width: '1872px',
    },
    fyTeamHeading:{
      fontFamily: 'Segoe UI',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 28,
      marginBottom: 25
    },
    pageHeader: {
      fontFamily: 'Segoe UI',
      fontWeight: 600,
    //  lineHeight: 36,
      "h1":{
        fontSize: 28,
        margin: '0px 0px 20px 0px',
      }
    },
    managerComboStyle:{
      marginTop: '5px'
    },
    columnsHeaderContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10
    },
    columnsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap:12
    },
    tileRows: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      gap: 24,  
      listStyle: 'none',
      padding:  '20px 5px 0px 0px',
    },
    iconWrapper: {
      display: 'inline-flex',
      height: '38px', 
      padding: '9px',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
      verticalAlign: 'middle'
    },
    teamTexStyle: {
      display: 'inline-flex',
      height: '38px', 
      padding: '9px',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
      verticalAlign: 'middle',
      // color: `${theme.name === "default"?'#323130':'#ffffff' }` ,
    },
    cyIconBackground:{
      borderRadius: '6px',
      background: '#F5F5F5',
      "@media screen and (-ms-high-contrast: active)" : {
        backgroundColor: 'Highlight',  
      },
    },
    cyTileBackground:{
      background: '#F5F5F5',
    },
    fyIconBackground:{
      borderRadius: '6px',
      background: '#DAEFFF',
      "@media screen and (-ms-high-contrast: active)" : {
        backgroundColor: 'Highlight',  
      }, 
    },
    fyTileBackground:{
      background: '#DAEFFF'
    },
    fyTileBackgroundTexonomy:{
      background: '#FFF6E4' 
    },
    leavingIconBackground:{
      borderRadius: '6px',
      background: 'rgb(255 243 244)',
    },
    leavingTileBackground:{
      background: '#FDE7E9',
    },
    joingIconBackground:{
      borderRadius: '6px',
      background: 'rgb(239 255 237)'
    },
    joiningTileBackground:{
      background: '#dff6dd'
    },
    tileStatistic: {
      display: 'flex',
      flexDirection: 'column',
      width: '144px',
      height: '90px',
      padding: '12px',
      alignItems: 'flex-start',
      gap: '12px',
      fontSize: 12,
      fontWeight: 400,
      fontFamily: 'Segoe UI',
      lineHeight: 16,
      flexShrink: 0, 
      borderRadius: 'var(--Medium, 4px)',
      border: `1px solid ${theme.palette.themeLighterAlt}`,
      // background: theme.palette.white,
      boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px 0px rgba(0, 0, 0, 0.14)' ,   
    },
    taxonomyImpactTile: {
      width: '170px',
      height: '90px',
    }, 
    gridItem:{
      gap: '12px',    
    },
    tileNumber :{ 
      fontFamily: 'Segoe UI',
      fontSize: 27,
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 'normal',
      color: '#000000',
    },
    tileTitle: {
      fontFamily: 'Segoe UI',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 'normal',
      color: '#000000',
    },
    tileIconWrapper: {
      display: 'inline-flex',
      "@media screen and (-ms-high-contrast: active)" : {
        backgroundColor: 'Highlight', 
      }, 
      height: '21px', 
      padding: '9px',
      justifyContent: 'space-around',
      alignItems: 'center', 
      flexShrink: 0,
      margin: '-67px 0px 0px 72px',
    },
    taxonomyIconWrapper: {
      margin: '-67px 0px 0px 108px',
    },
    gridIconWrapper: {
      display: 'inline-flex',
      padding: '5px',
      marginLeft: '-4px',
      marginBottom: '3px',
      alignItems: 'center',
      flexShrink: 0,
      verticalAlign: 'middle'
    },
    tileColumn: {
      display: 'flex',
      justifyContent: 'space-around',
      padding:20,
    },
    middleContentLeftColumn: {
      flex: '1 1 358px', // Adjust the width as needed
      margin: '0px 30px 0px 0px',
      paddingTop: 20,
      height: '62vh',
      "@media screen and (min-resolution: 150dpi)": {
        height: '100%',
      }, 
    },
    row: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '60px',     
    },
  };
};
