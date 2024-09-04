import { getTheme, mergeStyleSets, FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";
export interface IConsumptionListStyles {
  noContentImg: IStyle;
  para: IStyle;
  imgContainer: IStyle;
}

export const getStyles = (theme: IAppTheme): IConsumptionListStyles => {
  return {
  noContentImg: {
    selectors: {
      "img": {
        maxWidth: '599px'
      },
    },   
  },
  para: {
    color: theme.palette.neutralSecondary
  },
  imgContainer: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}}
