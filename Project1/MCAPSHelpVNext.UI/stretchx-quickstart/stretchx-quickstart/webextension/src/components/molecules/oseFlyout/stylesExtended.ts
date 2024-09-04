import { FontWeights, IStyle } from "@fluentui/react";
import { IAppTheme } from "@msx/platform-services";

export interface IPanelStyles {
  footer: any;
  content: any;
  buttonStyles: IStyle
}
export const getStyles = (theme: IAppTheme): IPanelStyles => {

  const customStyles = {
    footer: {
      padding: '0 1rem 0 5rem',
      borderTop: '1px solid green'
    }, header: { padding: '0 1rem 0 5rem' },
    content: { padding: '0 1rem 0 5rem' },
    buttonStyles: { root: { marginRight: 8 } }
  };

  return customStyles;

};
