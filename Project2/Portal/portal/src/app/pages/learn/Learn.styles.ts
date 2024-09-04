import { IStyle } from '@fluentui/react/lib/Styling';
import { IAppTheme } from '@msx/platform-services'

export interface ISignUpStyles {
  root: IStyle;
  header: IStyle;
  title: IStyle;
  body: IStyle;
  link: any;
  listItem: any;
}

export const getStyles = (theme: IAppTheme): ISignUpStyles => {
  return {
    root: {
      display: 'flex',
      margin: '0 20px',
      padding: '10px 20px',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      margin: '0',
    },
    body: {
      display: 'flex',
      alignItems: 'center',
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.themePrimary,
    },
    listItem: {
      marginBottom: 10,
    },
  };
};
