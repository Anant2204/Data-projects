import { IStyle } from '@fluentui/react/lib/Styling';
import { IAppTheme } from '@msx/platform-services'

export interface IExtensionStyles {
  root: IStyle;
}

export const getStyles = (theme: IAppTheme): IExtensionStyles => {
  return {
    root: {
      padding: '5px',
    },
  }
};


