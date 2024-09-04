import { IAppTheme } from '@msx/platform-services'

export const getStyles = (theme: IAppTheme) => {
  return {
    headingMain: {
      margin: '0',
    },
    homeLink: {
      textDecoration: 'none',
      color: theme.palette.themePrimary,
      fontSize: '14px',
      fontWeight: '400',
    }
  };
};
