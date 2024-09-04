import { FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface IConsumptionStyles {
  root: IStyle;
  mainContent: IStyle;
}
export const getStyles = (theme: IAppTheme): IConsumptionStyles => {
  return {
  root: {
    background: theme.palette.neutralLight,
    selectors: {
      '.ms-DetailsRow': {
        fontSize: '14px'
      },
      'h1':{
        fontWeight: '500'
      }
    }
  },
  mainContent: {
    padding: "0px",

    h1:{
      fontSize:'24px',      
       marginTop: '10px'
    }
  },
}};
