import { IAppTheme } from "@msx/platform-services";

export const getStyles = (theme: IAppTheme) => {
  return {
    agGridContainer: {
      ".ag-theme-alpine-dark": {
        boxShadow: "0px 3.3px 7.2px 0px rgba(0, 0, 0, 0.13)", 
        ".ag-header-cell:focus-visible::after": {
          border: "2px solid " + theme.palette.themePrimary, // Apply a border to the selected header cell
        },
        ".ag-checkbox-input-wrapper.ag-indeterminate::after": {
          color: theme.palette.themePrimary,
        },
        ".ag-checkbox-input-wrapper.ag-checked::after": {
          color: theme.palette.themePrimary,
        },
      },
      ".ag-theme-alpine": {
        boxShadow: "0px 3.3px 7.2px 0px rgba(0, 0, 0, 0.13)",
        ".ag-checkbox-input-wrapper.ag-indeterminate::after": {
          color: theme.palette.themePrimary,
        },
        ".ag-header-cell:focus-visible::after": {
          border: "1px solid " + theme.palette.themePrimary, // Apply a border to the selected header cell
        },
        ".ag-checkbox-input-wrapper.ag-checked::after": {
          color: theme.palette.themePrimary,
        },
        ".ag-root-wrapper": {
          border: "none",
        },
        ".ag-icon": {
          color: `${theme.palette.black} !important`,
        },
        ".ag-header-viewport ": {
          background: theme.palette.white,
          fontWeight: 400,
        },
        // ".ag-row": {
        //   border: "none",
        //   borderBottom: `1px solid ${theme.palette.neutralLight}`,
        //   ":hover": {
        //     backgroundColor: "none !important",
        //   },
        //   ".ag-cell-expandable": {
        //     ".ag-group-expanded": {
        //       " --ag-alpine-active-color": theme.colors.Application.Primary,
        //     },
        //     ".ag-group-contracted": {
        //       " --ag-alpine-active-color": theme.colors.Application.Primary,
        //     },
        //   },
        // },
        // ".ag-header-cell-text": {
        //   color: theme.palette.neutralPrimary,
        //   fontSize: "12px",
        //   fontFamily: "Segoe UI",
        // },
        // ".ag-cell-value": {
        //   fontWeight: 400,
        //   fontSize: "14px",
        //   color: theme.palette.neutralPrimary,
        //   fontFamily: "Segoe UI",
        // },
        ".ag-row-odd": {
          background: theme.palette.white,
          borderBotton: theme.palette.neutralLight,
        },
        ".ag-row-even": {
          background: theme.palette.white,
          borderBotton: theme.palette.neutralLight,
        },
        //"--ag-selected-row-background-color": `transparent !important`,
        //ms-high-contrast focus issue
        "@media screen and (-ms-high-contrast: active)": {
          ".ag-checkbox-input-wrapper.ag-indeterminate::after": {
            color: `Highlight !important`,
          },
          ".ag-checkbox-input-wrapper.ag-checked::after": {
            color: `Highlight !important`,
          },
          ".ag-cell-focus": {
                content: '',
                border: "4px solid !important",       
          },
          ".ag-header-active": {
                content: '',
                border: "4px solid !important",       
          },
          ".ag-icon": {
            color: `Highlight !important`,
          },        
          ".ag-input-wrapper": {
            border: `2px solid Highlight !important`,
          },         
        },
      },
    },
    actionAndSearchBar: {
      display: "flex",
      flexWrap: "wrap",
      height: 52,
      justifyContent: "space-between",
      background: theme.palette.white,
      borderBottom: "1px solid " + theme.palette.neutralQuaternaryAlt,
      ".ms-CommandBar": {
        paddingLeft: 10,
        paddingTop: 7,
      },
      paddingRight: 10,
    },
    searchBox: {
      display: "flex",
      width: "100%",
      marginRight: 10,
      border: "1px solid " + theme.palette.neutralTertiary,
      marginTop: 10,
    },
    searchBoxDiv: {
      width: "25%",
    },
    commandBarDiv: {
      width: "75%",
    },
  };
};
