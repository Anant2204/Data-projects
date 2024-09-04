import React, { useContext } from 'react';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { withRouter, RouteComponentProps } from 'react-router'
import { ApplicationContext } from '@msx/platform-services'
import { CoherenceBreadcrumb } from '@coherence-design-system/controls';
import { IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';
import { getStyles } from './Learn.styles'
import { messages } from './Learn.messages';

const getClassNames = classNamesFunction<any, any>();
let classes: any;


type SignInHelpPageProps = InjectedIntlProps & RouteComponentProps;

const LearnComponent: React.FC<SignInHelpPageProps> = props => {
  const { intl, history } = props;
  const { appState } = useContext(ApplicationContext);

  classes = getClassNames(getStyles, appState.theme);

  const handleBreadcrumbItemClicked = (ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void => {
    history.push({ pathname: `/` });
  }

  const renderMain = (): JSX.Element => {
    const linkItems = [
      { text: intl.formatHTMLMessage(messages.homeBreadcrumbText), key: 'keyHome', onClick: handleBreadcrumbItemClicked },
      { text: intl.formatHTMLMessage(messages.learnBreadcrumbText), key: 'keyLearn', isCurrentItem: true }
    ];

    return (
      <>
        <CoherenceBreadcrumb
          items={linkItems}
          ariaLabel="Breadcrumb bar with 5 items"
          overflowAriaLabel="More links"
        />

        <div className={classes.root}>
          <p>{intl.formatMessage(messages.description1)}</p>
          <div className={classes.header}>
            <h2 className={classes.title} >{props.intl.formatMessage(messages.title1)}</h2>
          </div>
          <div>
            <p>{intl.formatMessage(messages.description2)}</p>
            <p>
              <ul>
                <li className={classes.listItem}>{props.intl.formatMessage(messages.listItem11)}</li>
                <li className={classes.listItem}>
                  {props.intl.formatMessage(messages.listItem12)}
                </li>
              </ul>
            </p>
            <p>
              {props.intl.formatMessage(messages.description3)}
            </p>
            <div>
              <h2>{intl.formatMessage(messages.hdrTroubleShooting)}</h2>
              <p>{intl.formatMessage(messages.descTroubleShooting)}</p>
            </div>
            <ul>
              <li className={classes.listItem}>
                {props.intl.formatMessage(messages.listItem21)}
              </li>
              <li className={classes.listItem}>{props.intl.formatMessage(messages.listItem22)}</li>
              <li className={classes.listItem}>{props.intl.formatMessage(messages.listItem23)}</li>
              <li className={classes.listItem}>
                {props.intl.formatMessage(messages.listItem232)}
                <a href="mailto:mycontact@microsoft.com" rel="noopener noreferrer" className={classes.link} target="_blank">{props.intl.formatMessage(messages.here1)}</a>
              </li>
            </ul>
            <div>
              <h2>{intl.formatMessage(messages.hdrRequestAccessSuplrWeb)}</h2>
              <p>{intl.formatMessage(messages.descRequestAccessSuplrWeb)}</p>
            </div>
            <ul>
              <li className={classes.listItem}>
                {props.intl.formatMessage(messages.lstRequestAccess1)}
              </li>
              <li className={classes.listItem}>{props.intl.formatMessage(messages.lstRequestAccess2)}</li>
              <li className={classes.listItem}>
                {props.intl.formatMessage(messages.lstRequestAccess3)}
                <a href="mailto:mycontact@microsoft.com" rel="noopener noreferrer" className={classes.link} target="_blank">{props.intl.formatMessage(messages.here1)}</a>
              </li>
            </ul>
            <div>
              <h2>{intl.formatMessage(messages.hdrRequestSupport)}</h2>
            </div>
            <ul>
              <li className={classes.listItem}>
                {props.intl.formatMessage(messages.lstRequestSupport1)}
              </li>
              <li className={classes.listItem}>
                {props.intl.formatMessage(messages.lstRequestSupport2)}
                <a href="mailto:mycontact@microsoft.com" rel="noopener noreferrer" className={classes.link} target="_blank">{props.intl.formatMessage(messages.here1)}</a>
                {props.intl.formatMessage(messages.lstRequestSupport3)}
              </li>
            </ul>

          </div>
        </div>
      </>
    );
  }
  return renderMain();
}

export const Learn = withRouter(injectIntl(LearnComponent));