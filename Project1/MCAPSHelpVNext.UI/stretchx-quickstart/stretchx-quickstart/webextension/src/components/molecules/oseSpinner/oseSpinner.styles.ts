import { getTheme, mergeStyleSets, FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";
export interface IConsumptionListStyles {
  overlay: IStyle;
  spinner: IStyle;
}

export const getStyles = (theme: IAppTheme): IConsumptionListStyles => {
  return {
    overlay:{
        position:"fixed",
        height:"100%",
        width:"100%", 
        backgroundColor:theme.palette.neutralLight,
        opacity:"0.3",
        zIndex:6000000,
        top:0, 
        left:0, 
    },
    spinner:{
      position:"fixed",
      top:"100%",
      left:"calc(50% - 50px)",
      zIndex: '99999'
    }
  }
};