import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { PrimaryButton } from '@fluentui/react';
import { ServiceContext } from '@msx/platform-services';
import { getCurrentTheme } from '../../../store';
import { getStyles } from './PageError.styles'
import messages from './PageError.messages';

export interface PageErrorProps extends InjectedIntlProps {
  error: any;
}

const getClassNames = classNamesFunction<any, any>();
let classes: any;

export const PageErrorComponent: (React.FC<PageErrorProps>) = props => {
  const theme = useSelector(getCurrentTheme);
  const { intl } = props;
  const { authClient } = useContext(ServiceContext);
  classes = getClassNames(getStyles, theme);

  const handleRetry = () => {
    const message = JSON.stringify(props.error);
    if (message.indexOf("silent sign-in request") > -1) {
      authClient.login().catch();
      return;
    }
    (window as any).location.reload();
  }

  const renderErrorContent = (): JSX.Element => {
    const items = [];
    items.push(<li key={'error'}><span>{JSON.stringify(props.error)}</span> </li>)

    return (
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <div className={classes.errorInfo}>
            <div className={classes.title}>
              {intl.formatMessage(messages.title)}
            </div>
            <div className={classes.details}>
              <ul className={classes.detailsList}>
                {items}
              </ul>
            </div>
            <PrimaryButton className={classes.retryButton} text={intl.formatMessage(messages.retryText)} onClick={handleRetry} />
          </div>
        </div>
      </div>
    );
  }

  const renderMain = (): JSX.Element => {
    return renderErrorContent()
  }
  return renderMain();
}

export const PageError = injectIntl(PageErrorComponent);
