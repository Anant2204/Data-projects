import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { getCurrentTheme } from '../../../core/store';
import { messages } from './AppFooter.messages';
import { getStyles } from './AppFooter.styles';
import { FooterProps } from './AppFooter.types';
import { ApplicationContext } from '@msx/platform-services';

const getClassNames = classNamesFunction<any, any>();
let classes: any;

const AppFooterComponent: React.FC<FooterProps> = props => {
  const { appState } = useContext(ApplicationContext);
  const { intl } = props;
  const theme = useSelector(getCurrentTheme);
  classes = getClassNames(getStyles, theme);

  const renderMain = (): JSX.Element => {
    if (!appState.appConfig.showFooter) return null;
    return (
      <footer className={classes.container}>
        <Stack>
          <Text nowrap className={classes.message}>
            {intl.formatMessage(messages.footerText)}
          </Text>
        </Stack>
      </footer>
    );
  }
  return renderMain();
}

export const AppFooter = injectIntl(AppFooterComponent);
