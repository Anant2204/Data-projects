import { RouteComponentProps } from "react-router";
import { IAppExtensionPage } from '@msx/platform-services'
import { InjectedIntlProps } from 'react-intl';

interface OwnProps {
  onRenderRoutes: (extensonPages: IAppExtensionPage[]) => JSX.Element;
}
export type ShellProps = OwnProps & InjectedIntlProps & RouteComponentProps;


