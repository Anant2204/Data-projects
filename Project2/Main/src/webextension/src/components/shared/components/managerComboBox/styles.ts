import { getTheme, mergeStyleSets, FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface IManagerListStyles {
  para: IStyle;
}

export const getStyles = (theme: IAppTheme): IManagerListStyles => {
  return {
    para: {
      color: theme.palette.neutralSecondary,
    }
  };
};
