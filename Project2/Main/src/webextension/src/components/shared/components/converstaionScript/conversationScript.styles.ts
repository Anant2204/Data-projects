import {
  getTheme,
} from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";
export const theme = getTheme();

export const getStyles = (theme: IAppTheme) => {
  return {
    accodianMargin: {
      "margin-top": "-30px",
      "margin-left": "-16px",
    },  
    modalSerfaceContainer: {
      fontFamily: 'Segoe UI', 
    //  width: '1800px', 
    "@media (max-width: 990px)": {
      display: "flex",
      flexDirection: 'column',
      fontSize:  'calc( var(--column-width) / 100 )' 
    },
    },
    modalHeaderContainer : {
      overflow: 'auto hidden',  
      lineHeight: 24,
      display: 'flex',
      flex: '0 1 100%', 
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    //  background: theme.palette.neutralLighter, //Not sutable with theme default and dark mode
      padding:10,
      borderBottom: "1px solid "+theme.palette.neutralQuaternaryAlt,
      marginTop: '-10px', 
     // flexDirection: 'row',
    //  height: 144,
    },
    headerLeftTextStyling: {
      flex: '1 1 30%', 
      'h1': {
        fontWeight: 600,
        fontSize: 24,
      },
    //  height: '40px',
      top: '72px',
      left: '71px',
      "@media (max-width: 990px)": {
        'h1': {
          fontSize:  12,
          lineHeight: 10,
        },
       // height: '0px',
        top: '0px',
        left: '0px',
        fontSize: 10,
        padding: 0
      },
    },
    employeeProfileName: {
      "@media (max-width: 990px)": {
        fontSize: 10,
        lineHeight: 10,
      },
      fontSize: 20,
      fontFamily: 'Segoe UI', 
      fontWeight: 400,
      lineHeight: 28,
      letterSpacing: 0,
      textLign: 'left'
    },
    employeeProfileEmail: {
      "@media (max-width: 990px)": {
        fontSize: 8,
      },
      fontSize: 14,
      fontFamily: 'Segoe UI', 
      fontWeight: 400,
      lineHeight: 20,
      letterSpacing: 0,
      textLign: 'left'
    },
    modelBodyContainer: {
      display: 'flex',
     // height: '90%',
      overflowY: 'auto', // Add scrollbar for overflow,
      justifyContent: 'space-around',
      fontFamily: 'Segoe UI',
      overflowX: 'hidden', 
    },
    gridKeyMessageContainer: {
      width: '38%',
      margin: '0px 10px 0px 0px',
      paddingLeft: 15, 
      gap: 12,
    },
    keyMessageTopSpacing:{
      marginTop: "10px",
      overflowX: 'hidden', 
      overflowY: "scrol"    
    },  
    hasChangedStyling:{ 
     background: '#ECFAEB',
     color: `${theme.palette.black}`
    }, 
    tableHeadingFont: {
      fontSize: 14,
      fontWeight: 600,
    },
    tableStyling: {
      overflow: 'auto', 
      'table': {
        borderCollapse: 'collapse',
        width: '100%', 
        overflowX: 'hidden', 
        overflowY: "scrol"
      },
      'tr':{
        borderBottom: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
      },   
      'th': {
        fontSize: 14,
        fontWeight: 600,
        padding: '8px',   
      },
      'td': {
        padding: '8px',
        textAlign: 'left',
      }
    },
    htmlMessageContainer: {
      width: '62%',
      borderLeft: `1px solid ${theme.palette.neutralLight}`,
      padding: 30,
      gap: 10,
    },
    sectionStyling: {
     // overflowX: 'hidden', 
      'h3': {
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: 0,
        textAlign: 'left',
      },
      'div' : {
        fontWeight: 400,
        lineHeight: 22,
        letterSpacing: 0,
        marginBottom: 15,
        fontSize: 14,
        //maxHeight: '220px',
      //  minHeight: '50px',
        paddingTop: '5px',
        //paddingBottom: '10px',
      }
    },
    modelBodyBorder: { 
      borderBottom: "1px solid "+theme.palette.neutralQuaternaryAlt,
    },
    footer: {
      paddingTop: '15px',
      "@media (max-width: 990px)": {
        //width: 100,
        height: 200,  
        fontSize:  10 
      },
    },
    checkboxStyle : {
      float: 'left',
      display: "flex",
      paddingRight: "30px",
      paddingTop: 'inherit',
    }, 
    SaveAndCloseStyle : {
      float: 'left',
      display: "flex",
      paddingRight: "15px"
    }, 
    cancelButton : {
      float: 'right',
      marginRight: 10
    },
    iconFormatting: {
      fontSize: '12px'
    },
    extendedContextFont: {
      fontWeight:400
    }
  };
};

