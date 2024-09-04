import { getTheme } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export const theme = getTheme();

export const getStyles = (theme: IAppTheme) => {
  return {
    root: {
      margin: "0",
      paddingLeft: "24px",
      borderBottom: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
      selectors: {
        ".ms-Link": {
          fontSize: "12px",
        },
        ".ms-Breadcrumb-item": {
          fontSize: "12px",
        },
      },
    },
  };
};
