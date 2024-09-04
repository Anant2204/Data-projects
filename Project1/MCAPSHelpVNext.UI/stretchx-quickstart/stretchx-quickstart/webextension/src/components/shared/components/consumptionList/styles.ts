import { getTheme, mergeStyleSets, FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";
import { getCustomThemePalette } from "../../../../utils";
export interface IConsumptionListStyles {
  noContentImg: IStyle;
  nameColumnFlex: IStyle;
  para: IStyle;
  imgContainer: IStyle;
  consumptionName: IStyle;
  msxId: IStyle;
  searchBoxContainer: IStyle;
  actionButtonContainer: IStyle;
  applyButton: IStyle;
  detailsList: IStyle;
  menuContainer: IStyle;
  iconTick: IStyle;
  detailsListColumnStyle: IStyle;
  detailsListRowStyle: IStyle;
  subTitleText: IStyle;
  formFieldsContainer: IStyle;
  fieldLabel: IStyle;
  fieldValue: IStyle;
  detailsListLabel: IStyle;
  searchDiv: IStyle;
  consumptionNameLink: IStyle;
  msxIdLink: IStyle;
  publishC1Data: IStyle;
  publishMsxData: IStyle;
  consumptionDetailsGrid: IStyle;
}

export const getStyles = (theme: IAppTheme): IConsumptionListStyles => {
  const customThemePalette = getCustomThemePalette(theme);
  return {
    noContentImg: {
      selectors: {
        img: {
          maxWidth: "599px",
        },
      },
    },
    para: {
      color: theme.palette.neutralSecondary,
    },
    imgContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    consumptionName: {
      cursor: "pointer",
      marginLeft: "20px",
      fontSize: "16px",
      fontWeight: "600",
      font: "Segoe UI",
      ":hover": {
        opacity: "0.7",
      },
    },
    consumptionDetailsGrid: {
      ".ag-root-wrapper": {
        background: "transparent !important",
        border: "0 !important",
      },
      ".ag-root-wrapper.ag-layout-normal": {
        background: "transparent !important",
      },
      ".ag-header": {
        background: "transparent !important",
      },
      ".ag-grid-duration-column": {
        paddingLeft: "45px !important"
      },

      ".ag-header-cell-text": {
        paddingLeft: "0px !important",
      },

      ".ag-ltr": {
        ".ag-row": {
          ".ag-cell": {
            border: 0,
          },
        },
      },

      ".ag-cell-wrapper.ag-row-group": {
        alignItems: "center !important",
      },

      ".ag-row": {
        background: "transparent !important",
        borderBottom: `0px !important`,
        ":hover": {
          background: "transparent !important",
        },
        ".ag-cell": {
          "--ag-internal-calculated-line-height": "none !important",
          display: "flex  !important",
          flexDirection: "column",
          justifyContent: "center",
          background: theme.palette.white,
          height: "calc(100% - 6px) !important",
        },
      },

      ".disabled-row": {
        ".ag-cell": {
          color: theme.palette.neutralTertiary,
        },
        ".ms-Button--action": {
          color: theme.palette.neutralTertiary,
          ":hover": {
            color: theme.palette.neutralTertiary,
          },
        },
      },
    },

    consumptionNameLink: {
      cursor: "pointer",
      marginLeft: "20px",
      fontSize: "16px",
      fontWeight: "600",
      font: "Segoe UI",
      color: theme.palette.black,
      selectors: {
        ":hover": {
          textDecoration: "none",
          opacity: 0.7,
          color: theme.palette.themePrimary,
        },
      },
    },
    msxId: {
      color: theme.palette.themePrimary,
      cursor: "pointer",
      //padding: '40px',
      marginLeft: "20px",
      fontSize: "12px",
      fontWeight: "600",
      font: "Segoe UI",
    },
    msxIdLink: {
      cursor: "pointer",
      marginLeft: "20px",
      fontSize: "12px",
      fontWeight: "400",
      font: "Segoe UI",
      color: theme.palette.neutralSecondary,
      selectors: {
        ":hover": {
          textDecoration: "none",
          opacity: 1,
          color: theme.palette.themePrimary,
        },
      },
    },
    searchBoxContainer: {
      selectors: {
        ".ms-Button": {
          padding: "0",
        },
        ".btnDiv": {
          margin: "10px 0px",
        },
      },
    },
    searchDiv: {
      display: "flex",
      alignItems: "center !important",
      justifyContent: "flex-end",
      margin: "10px 0px",
      selectors: {
        ".ms-TooltipHost": {
          width: "100%",
        },
      },
    },
    actionButtonContainer: {
      marginTop: "1rem",
    },
    applyButton: {
      marginRight: "1rem",
    },
    detailsList: {
      selectors: {
        ".ms-DetailsHeader": {
          background: "transparent",
        },
        ".ms-DetailsRow": {
          borderRadius: "4px",
          marginBottom: "4px",
          background: `${theme.palette.white}`,
          ":focus": {
            background: theme.palette.white,
            ":hover": {
              background: theme.palette.neutralLighter,
            },
          },
          ":hover": {
            backgroundColor: theme.palette.white,
          },
        },
        ".ms-DetailsRow-cell": {
          minHeight: "80px",
          display: "flex",
          alignItems: "center",
        },
        ".ms-DetailsHeader-cellName": {
          fontSize: "12px",
        },
        ".ms-DetailsHeader-cell": {
          cursor: "pointer",
          ":first-child": {
            cursor: "default",
            ":hover": {
              background: "transparent",
            },
          },
          ":last-child": {
            cursor: "default",
            ":hover": {
              background: "transparent",
            },
          },
        },
        ".right-text": {
          justifyContent: "flex-end",
          ".ms-DetailsHeader-cellTitle": {
            justifyContent: "flex-end",
          },
        },
        ".left-text": {
          justifyContent: "flex-start",
          ".ms-DetailsHeader-cellTitle": {
            justifyContent: "flex-start",
          },
        },
        ".padding-left-30": {
          paddingLeft: "30px",
          ".ms-DetailsHeader-cellTitle": {
            paddingLeft: "30px",
          },
        },
      },
    },

    menuContainer: {
      flex: 0,
    },
    iconTick: {
      borderRadius: "50%",
      fill: theme.palette.white,
      color: customThemePalette.themeTickmarkGreen,
      fontSize: ".8em",
      marginLeft: "20px",
    },
    publishC1Data: { display: "flex", alignItems: "center", gap: "14px" },
    publishMsxData: { display: "flex", alignItems: "center", gap: "4px" },
    subTitleText: {
      fontSize: "12px",
      margin: "0px",
    },
    detailsListColumnStyle: {
      flex: 1,
    },
    detailsListRowStyle: {
      flexDirection: "row",
      justifyContent: "center",
    },
    formFieldsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
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
    detailsListLabel: {
      display: "flex",
      alignItems: "center",
    },
    nameColumnFlex: {
      display: "flex",
      flexDirection: "column",
      ".ms-Button-flexContainer": {
        display: "inline-block",
        textAlign: "left",
        width: "100%",
      },
      ".ms-Button-label": {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      },
    },
  };
};
