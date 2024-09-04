import { getTheme, mergeStyleSets, FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface IFlyOutStyle {
  container:IStyle;
  conversationsContainer:IStyle;
  leftContainer:IStyle;
  rightContainer:IStyle;
  title:IStyle;
  content:IStyle;
  comment:IStyle;
  roleSummary:IStyle;
  seperator:IStyle;
  maxCharText:IStyle;
  q1q2:IStyle;
  tableHeadingFont:IStyle;
  tableStyling:IStyle;
  details:IStyle;
}

export const getFlyoutStyles = (theme: IAppTheme):IFlyOutStyle => {
  return {
    container: {
      display: 'flex',
      fontFamily: "Segoe UI", 
      marginBottom:16,
    },
    conversationsContainer: {
      display: 'flex',
      marginBottom:0,
    },
    q1q2: {
      display: 'flex',
      flexWrap:"wrap",
      gap:14,
      marginTop: 10,
      
    },
    leftContainer : {
      flex: 1,
    },
    rightContainer: {
      flex: 1,
    },
    title:{
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '20px',
      margin:0,
    },
    content:{
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '20px',
      marginTop:0,
    },
    comment:{
      marginTop:20,
    },
    roleSummary:{
      marginTop:20,

    },
    seperator:{
      marginTop:10,
      'div':{
        padding:0,
        '::before': {
          content: '""',
          backgroundColor: theme.palette.neutralTertiary, 
          height: '1px',
        }
      }
    },
    maxCharText:{
      fontSize: '12px' 
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
        overflowY: "scroll",
        border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
        marginTop:10,
      },
      'caption':{
        fontSize: 14,
        fontWeight: 500,
        color: theme.palette.black,
        captionSide: 'top',
      },
      'tr':{
        borderBottom: `1px solid ${theme.palette.neutralTertiaryAlt}`,
      },   
      'th': {
        fontSize: 14,
        fontWeight: 600,
        padding: '8px',   
        borderRight: `1px solid ${theme.palette.neutralTertiaryAlt}`
      },
      'td': {
        padding: '8px',
        textAlign: 'left',
        
      }
    },
    details:{
      marginTop:15,
    },
  };
};
