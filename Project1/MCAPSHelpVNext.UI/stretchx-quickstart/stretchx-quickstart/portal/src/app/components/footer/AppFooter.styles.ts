import { IStyle } from '@fluentui/react/lib/Styling';
import { IAppTheme } from '@msx/platform-services';
import { FOOTER_HEIGHT } from './AppFooter.types';

interface IAppFooterStyles {
  container: IStyle;
  message: IStyle;
}


export const getStyles = (theme: IAppTheme): IAppFooterStyles => {
  return {
    container: {
      padding: '5px 15px',
      backgroundColor: `${theme.palette.white}`,
      overflow: 'hidden',
      height: `${FOOTER_HEIGHT}px`,
    },
    message: {
      fontFamily: "Segoe UI",
      color: `${theme.palette.black}`,
      fontSize: "11px",
      margin: "0",
    }
  }
};


