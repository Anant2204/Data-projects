import { IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface IFlyOutStyle {
  comment:IStyle;
  maxCharText:IStyle;
}

export const getFlyoutStyles = (theme: IAppTheme):IFlyOutStyle => {
  return {
    comment:{
      marginTop:30,
    },
    maxCharText:{
      fontSize: '12px' 
    }
  };
};
