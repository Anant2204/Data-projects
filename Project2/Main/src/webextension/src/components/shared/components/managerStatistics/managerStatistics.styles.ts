import { IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface ManagerStatisticStyles {
  rootContainer: IStyle;
  gridItem: IStyle;
  tileStyle: IStyle;
  tileText: IStyle;
  selectedTile: IStyle;
}
export const getStyles = (theme: IAppTheme): ManagerStatisticStyles => {
  return {
    rootContainer: {
      display: "flex",
      flexDirection:"row",
      gap: "24px",
      flexWrap:"wrap",
      fontFamily: "Segoe UI", 
    },
    gridItem: {
       textAlign: "left",
       width: "260px",
      // "@media (max-width: 990px)": {
      //   width: "100%",
      // },
    },
    tileStyle:{
      height: "8.4%",
      padding: '10px',
      width: "99%",
      borderRadius: "4px",
      display: "flex",
      verticalAlign:'center',
      justifyContent: "left",
      background: theme.palette.neutralLighterAlt,
      "&:hover": {
        background: theme.palette.white,
        border: `2px solid ${theme.palette.neutralTertiary}`,
        boxShadow: `0px 2px 4px 0px ${theme.palette.white}`,
      },
      border: `1px solid ${theme.palette.white}`,
      boxShadow: `0px 0px 2px 0px ${theme.palette.neutralPrimaryAlt}, 0px 2px 4px 0px ${theme.palette.neutralLight}`,
      "span:nth-child(1)": {  
        display: 'block',
        fontFamily: "Segoe UI",
        fontSize: "24px",
        fontWeight: "600",
        lineHeight: "28px",
        letterSpacing: "0px",
        textAlign: "left",
      },
      "span:nth-child(2)": {
        fontFamily: "Segoe UI",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "20px",
        color: theme.palette.neutralPrimary,
      },
    },
    tileText: {
      fontFamily: "Segoe UI",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "20px",
      color: theme.palette.neutralPrimary,
    },
    selectedTile: {
      background: theme.palette.white,
      border: `2px solid ${theme.palette.themeSecondary}`,
      boxShadow: `0px 2px 2px 0px ${theme.palette.themeLight}`,
    },
  };
};

