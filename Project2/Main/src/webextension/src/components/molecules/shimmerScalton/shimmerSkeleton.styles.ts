import { getTheme, mergeStyleSets, FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";
export interface IMCTListStyles {
  overlay: IStyle;
}

export const getStyles = (theme: IAppTheme): IMCTListStyles => {
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
    }
  }
};