import { IAppTheme } from "@msx/platform-services";

export const getStyles = (theme: IAppTheme) => {
  return {
    agGridContainer: {
      ".header-container": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      },

      ".ag-theme-alpine": {
        "--ag-alpine-active-color": `transparent !important`,

        ".ag-header-viewport ": {
          background: theme.palette.neutralLight,
          fontWeight: 400,
        },

        ".ag-root-wrapper": {
          border: "none",
        },
        '.ag-keyboard-focus': {
                '.ag-header-cell': {
                    ':focus': {                       
                            borderColor: `${theme.palette.black} !important`,
                            content: '',
                            border: "1px solid",                       
                    }
                },
                '.ag-cell': {
                    ':focus': {                       
                            borderColor: `${theme.palette.black} !important`,
                            content: '',
                            border: "1px solid",                       
                    }
                },

                '.ag-row-group':{
                    ':focus': {                       
                            borderColor: `${theme.palette.black} !important`,
                            content: '',
                            border: "1px solid",                       
                    }

                }
        },

        ".ag-header": {
          border: "none",
        },
        ".ag-cell-wrapper.ag-row-group": {
          ".ag-icon": {
            fontSize: 25,
            color: theme.colors.Application.Primary,
          },
        },

        ".ag-row": {
          border: "none",
          borderBottom: `1px solid ${theme.palette.neutralLight}`,
          ":hover": {
            backgroundColor: "none !important",
          },
          ".ag-cell-expandable": {
            ".ag-group-expanded": {
              " --ag-alpine-active-color": theme.colors.Application.Primary,
            },
            ".ag-group-contracted": {
              " --ag-alpine-active-color": theme.colors.Application.Primary,
            },
          },
        },

        ".ag-group-value": {
          fontWeight: 600,
          fontSize: "16px",
          fontFamily: "Segoe UI",
          color: theme.palette.neutralPrimary,
        },

        ".ag-header-cell-text": {
          paddingLeft: "38px",
          color: theme.palette.neutralPrimary,
          fontWeight: 600,
          fontSize: "12px",
          fontFamily: "Segoe UI",
        },
        ".ag-header-cell": {
          ":after": {
            content: "",
            display: "block",
            position: "absolute",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            clip: "rect(1px, 1px, 1px, 1px)",
          },
        },

        ".ag-cell-value": {
          fontWeight: 400,
          fontSize: "14px",
          color: theme.palette.neutralPrimary,
          fontFamily: "Segoe UI",
        },

        ".ag-row-odd": {
          background: theme.palette.white,
          borderBotton: `1px solid ${theme.palette.neutralLight}`,
        },

        ".ag-row-even": {
          background: theme.palette.white,
          borderBotton: `1px solid ${theme.palette.neutralLight}`,
        },

        ".ag-icon-tree-open": {
          fontSize: 25,
          color: theme.colors.Application.Primary,
        },
        ".ag-icon-tree-closed": {
          fontSize: 25,
          color: theme.colors.Application.Primary,
        },

        "@media screen and (-ms-high-contrast: active), screen and (forced-colors: active)":
          {
            ".ag-ltr": {
              ".ag-row": {
                ".ag-cell": {
                  border: "1px solid",
                },
              },
            },
          },
      },
    },
  };
};
