import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IntlProvider } from "react-intl";
import { ExtensionEventTypes } from '@msx/platform-services';
import { getCurrentLocale } from '../store';
import { messages } from '../../app/App.messages';
import { appConfig } from '../../app/App.config';

const AppSettings: React.FC = props => {
  const currentLocale = useSelector(getCurrentLocale);
  const currentLocaleRef = useRef(currentLocale);

  useEffect(() => {
    //MOUNT
    window.addEventListener(ExtensionEventTypes.LOCALE_CHANGED, e => handleLocaleChange(e));

    //UNMOUNT
    return () => {
      window.removeEventListener(ExtensionEventTypes.LOCALE_CHANGED, handleLocaleChange);
    }

  }, [])

  const handleLocaleChange = (e: any): void => {
    if (!appConfig.enableUserSettingsApi) {
      return;
    }
    if (!e.detail) return;
    const data = e.detail;
    if (!data) return;
    const locale = data.locale;
    console.warn('handleLocaleChange: Call API to save user preferences -> language ', locale);
    // NOTE: Call API here to  save user preferences -> language
    // use httpClient instance to call the API
  }

  const renderMain = (): JSX.Element => {
    currentLocaleRef.current = currentLocale;
    const msg = messages[currentLocale];
    return (
      <IntlProvider key={currentLocale} locale={currentLocale} messages={msg}>
        {props.children}
      </IntlProvider>
    );
  }
  return renderMain();

}

export const AppSettingsProvider = withRouter(AppSettings);