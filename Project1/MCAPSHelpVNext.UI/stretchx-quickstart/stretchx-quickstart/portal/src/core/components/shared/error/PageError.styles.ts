import { IStyle } from '@fluentui/react/lib/Styling';
import { IAppTheme } from '@msx/platform-services'

export interface IExtensionStyles {
  contentContainer: IStyle;
  content: IStyle;
  errorInfo: IStyle;
  title: IStyle;
  details: IStyle;
  retryButton: IStyle;
  detailsList: IStyle;
}

export const getStyles = (theme: IAppTheme): IExtensionStyles => {
  return {
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      display: 'flex',
    },
    errorInfo: {
      marginTop: '10px',
      display: 'flex',
      flexDirection: 'column',
      width: '500px',
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    details: {
      fontSize: '14px',
    },
    retryButton: {
      width: '120px',
    },
    detailsList: {
      listStyle: 'none',
      paddingLeft: '0',
    },
  }
};

