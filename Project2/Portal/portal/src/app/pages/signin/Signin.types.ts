import { RouteComponentProps } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
interface StateProps {
  classes: any;
}

export type Props = StateProps & RouteComponentProps & InjectedIntlProps;
