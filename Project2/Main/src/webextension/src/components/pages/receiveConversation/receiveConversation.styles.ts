import {
  getTheme,
} from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";
import { FontWeights } from '@fluentui/react';
export const theme = getTheme();

export const getStyles = (theme: IAppTheme) => {
  return {
    root: {
      padding: "20px",
      background: theme.palette.neutralLighterAlt,
      selectors:{
        ".is-checked:hover":{
          background:`${theme.palette.themeDark}`
        }
      },
      fontFamily: "Segoe UI", 
    },
    layoutContainer: {
      selectors: {
        '.cst-clearPadding': {
          'padding-left': '100px !important',
          'padding-right': '0px !important',
          'padding-top': '0px !important',
          'padding-bottom': '0px !important',
        },
        '.cst-noPaddingLeftRight': {
          'padding-left': '100px !important',
          'padding-right': '0px !important',
        },
        '.cst-clearMargin': {
          'margin': '0px !important'
        },
        '.cst-paddingBottom10': {
          'padding-bottom': '10px'
        },
        '.cst-headerSection': {
          padding: '100px 0px'
        },
        '.notification': {
          padding: '10px 20px',
          background: theme.palette.neutralSecondary,
          color: theme.palette.neutralLighterAlt,
          fontSize: '14px',
          fontWeight: 600,
          font: 'Segoe UI',
        }
      },
      '.addButton': {
        paddingLeft: '16px',
        fontSize: 14,
        background: 'transparent',
        color: theme.palette.themeDark,
        selectors: {
          '.ms-Button-label': {
            fontWeight: FontWeights.semibold
          }
        }
      },
    },
    container: {
      margin: "0 50px",
    },
    main: {
      display: "flex",
      "@media (max-width: 990px)": {
        display: "block",
      },
      width: '100%'
    },
    gridContainer: {
      display: 'grid',
      padding: '10px 30px 10px 40px',
      gap: '32px'
    },
    gridItem : {
      gridColumnStart: 1,
      gridColumnEnd: 4,
    },
    selectedTileContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding:'10px 10px 10px 0px', 
    },
    bannerItem : { 
      flexDirection: 'column',
    },
    completeButtonStyle: {
      fontFamily: "Segoe UI", 
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '20px'
    },
    conversationCompleteIcon : {
      color: theme.palette.themeTertiary,  
      fontSize: "14px", 
      padding:"5px 5px 5px 10px" 
    }
  };
};
