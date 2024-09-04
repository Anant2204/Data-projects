import { IAppTheme } from "@msx/platform-services";

export const getStyles = (theme: IAppTheme) => {
  return {
    externalLink: {
        marginLeft: 8,
       color: theme.palette.themePrimary,
    },
  };
};
