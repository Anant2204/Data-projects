import { getTheme, mergeStyleSets, FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface IFlyOutStyle {
  container:IStyle;
  leftDiv:IStyle;
  rightDiv:IStyle;
  title:IStyle;
  content:IStyle;
  comment:IStyle;
  futureManagerPicker:IStyle;
  seperator:IStyle;
  peoplePickerWidth:IStyle;
  maxCharText:IStyle;
  tableStyling:IStyle;
  tableHeadingFont:IStyle;
  emptyError:IStyle;
}

export const getFlyoutStyles = (theme: IAppTheme):IFlyOutStyle => {
  return {
    container: {
      display: 'flex',
      fontFamily: "Segoe UI", 
    },
    leftDiv : {
      flex: 1,
    },
    rightDiv: {
      flex: 1,
    },
    title:{
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '20px',
    },
    content:{
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '20px',
      marginTop:10,
    },
    comment:{
      marginTop:30,
    },
    futureManagerPicker:{
      marginTop:24,
    },
    seperator:{
      marginTop:27
    },
    peoplePickerWidth:{
      width:288,
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
      'caption': {
        textAlign: 'left',
        fontSize: 14,
        fontWeight: 500,
        captionSide: 'top',
        color: theme.palette.black, // added color
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
    emptyError: {
      fontSize: '12px',
      color: '#a4262c',  
      paddingTop: '5px',    
    }
  };
};
