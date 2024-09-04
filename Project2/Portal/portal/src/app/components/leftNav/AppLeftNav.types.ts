import { IAppExtensionPage } from '@msx/platform-services';
import { InjectedIntlProps } from 'react-intl';
import { IAppTheme } from '@msx/platform-services'

export interface LeftNavProps extends InjectedIntlProps {
  isAppReady: boolean;
  isUserLoggedIn: boolean;
  extensionsPages: IAppExtensionPage[];
  appName: string;
  theme: IAppTheme;
  isNavCollapsed: boolean;
  onNavCollapsed: (isCollapsed) => void;
}