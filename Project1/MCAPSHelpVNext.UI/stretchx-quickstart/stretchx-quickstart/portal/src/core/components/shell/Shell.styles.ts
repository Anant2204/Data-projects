import { IAppTheme } from '@msx/platform-services'
import { IStyle } from '@fluentui/react';

export interface IAppStyles {
  root: IStyle;
  main: IStyle;
}

export const getStyles = (theme: IAppTheme): IAppStyles => {
  return {
    root: {
    },
    main: {
      outline: 'none',
    },
  }
};


