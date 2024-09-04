import React, { useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from "react-router";
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { ApplicationContext } from '@msx/platform-services'
import { messages } from './NotFound.messages';
import { getStyles } from './NotFound.styles';
import { ScrollablePane } from '@fluentui/react';
import { shellStyles } from '../../App.styles';

const getClassNames = classNamesFunction<any, any>();
let classes: any;

interface OwnProps extends InjectedIntlProps {
  //TODO;
}

type NotFoundProps = OwnProps & InjectedIntlProps & RouteComponentProps;

const NotFoundComponent: React.FC<NotFoundProps> = props => {
  const { intl } = props;
  const { appState, extensionsRegistrationClient } = useContext(ApplicationContext);
  const allowExtensions = appState.appConfig.registrationConfig.active;

  classes = getClassNames(getStyles, appState.theme);

  const renderMain = (): JSX.Element => {

    if (appState.isUserLoggedIn && allowExtensions && extensionsRegistrationClient.getRoutes().length === 0)
      return null;

    return (
      <ScrollablePane className={appState.isNavCollapsed ? shellStyles.scrollablePaneCollapsed : shellStyles.scrollablePaneExpand}>
        <div className={appState.isNavCollapsed ? shellStyles.mainPanelCollapsed : shellStyles.mainPanelExpand}>
          <h1 className={classes.headingMain}>{intl.formatMessage(messages.pageTile)}</h1>
          <p>{intl.formatMessage(messages.pageDescription)}</p>
          <Link className={classes.homeLink} to="/">
            {intl.formatMessage(messages.homePage)}
          </Link>
        </div>
      </ScrollablePane>)
  }
  return renderMain();
}

export const NotFound = withRouter(injectIntl(NotFoundComponent));
