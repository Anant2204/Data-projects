import { IAppTheme, IUser } from '@msx/platform-services';
import { InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';

export const HEADER_HEIGHT = 48;


export interface OwnProps extends InjectedIntlProps {
  showFabricComponent: boolean;
  onFabricVisibilityChanged: (isVisible: boolean) => void;
  dispatchUpdateLocaleAction: any;
  locales: any;
  isAppReady: boolean;
  isUserLoggedIn: boolean;
  theme: IAppTheme;
  appName: string;
  user: IUser;
}
export type HeaderProps = OwnProps & RouteComponentProps;