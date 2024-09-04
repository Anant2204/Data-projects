import { getTheme, mergeStyleSets, FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface IFlyOutStyle {
  fieldLabel: IStyle;
  fieldValue: IStyle;
  root: IStyle;
  tileTextBoxStyleing:IStyle;
  container:IStyle;
  tabDefault:IStyle;
  tabSelected:IStyle;
  auditHistoryTable: IStyle;
  previewScript: IStyle;
  scriptContainer:IStyle;
  conversationTitle: IStyle;

}

export const getFlyoutStyles = (theme: IAppTheme): IFlyOutStyle => {
  return {
    fieldLabel: {
      fontSize: "13px",
      font: "Segoe UI",
      fontWeight: "400",
      paddingRight: "8px",
    },
    fieldValue: {
      fontSize: "13px",
      font: "Segoe UI",
      paddingBottom: "8px",
      fontWeight: "400",
    },
    root: {
      ".RichTextEditor__root___2QXK-": {
        background: `${theme.palette.white}`,
      },
      ".EditorToolbar__root___3_Aqz": {
        "font-Family": "Segoe UI",
        "font-Size": "12px",
        background: `${theme.palette.white}`,
      },
      ".RichTextEditor__editor___1QqIU": {
        "font-size": "14px",
        color: `${theme.palette.black}`,
      },
      //TODO: Background color is getting applied, but the button icon is svg hence not getting applied
      // ".IconButton__root___3tqZW": {
      //     "padding-left": "3px",
      //     "padding-right": "13px",
      //     "background": `${theme.palette.white}`,
      // },
    },
    tileTextBoxStyleing: {
      marginBottom:16,
    },
    conversationTitle:{
      marginBottom:16,
    },
    container: {
      display: 'flex',
      marginBottom:16,
      flexWrap:"wrap",
      gap:14,
      marginTop: 10,
    },
    tabDefault: {
      marginRight:"40px",
      color:theme.palette.neutralPrimary,
      flexDirection:"column",  
      height: "30px",  
      width: "90px",  
      paddingLeft: 5,
      paddingRight: 5,
      '&:focus': {
        outline: '2px solid '+ theme.palette.black, // Change the color and size as needed
      },
    },
    tabSelected: {
      marginRight:"40px",
      borderBottom: `2px solid ${theme.palette.themePrimary} !importent`,
      color:theme.palette.neutralPrimary,  
      fontWeight: 600,
      flexDirection:"column",
      paddingLeft: 5,
      paddingRight: 5,
      height: "30px",  
      width: "90px",  
      '&:focus': {
        outline: '2px solid '+ theme.palette.black, // Change the color and size as needed
      },
    },
    previewScript: {
        display:'flex', 
        justifyContent:'right'
    }, 
    auditHistoryTable: {
      overflow: 'auto', 
      //borderTop: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
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
    scriptContainer: {
      marginBottom:16,
      gap:14,
      flexWrap:"wrap",
      marginTop: 10,
    },
  };
};
