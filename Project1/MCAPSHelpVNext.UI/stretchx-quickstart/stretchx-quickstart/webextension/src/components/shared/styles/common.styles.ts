import { FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface IStyles {
  buttonStyles: IStyle
}
export const getStyles = (theme: IAppTheme): IStyles => {

  const customStyles = {    
    buttonStyles: { root: { marginRight: 8 } }
  };

  return customStyles;

};
