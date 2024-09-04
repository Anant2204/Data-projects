import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IntlProvider } from "react-intl";
import { ExtensionEventTypes } from '@msx/platform-services';
import { getCurrentLocale, getCurrentTheme } from '../store';
import { messages } from '../../app/App.messages';
import { createTheme } from "@fluentui/react";
import { ThemeProvider } from "@fluentui/react-theme-provider";
import { loadTheme } from '@fluentui/react/lib/Styling';
import { appConfig } from '../../app/App.config';

const AppSettings: React.FC = props => {
  const currentLocale = useSelector(getCurrentLocale);
  const currentLocaleRef = useRef(currentLocale);
  const currentTheme = useSelector(getCurrentTheme);
  
  useEffect(() => {
    //MOUNT
    window.addEventListener(ExtensionEventTypes.LOCALE_CHANGED, e => handleLocaleChange(e));
    window.addEventListener(ExtensionEventTypes.THEME_CHANGED, e => handleThemeChange(e));
    window.addEventListener(ExtensionEventTypes.DASHBOARD_EDIT_ACTION_SAVE, e => handleDashboardTileSave(e));

    //UNMOUNT
    return () => {
      window.removeEventListener(ExtensionEventTypes.LOCALE_CHANGED, handleLocaleChange);
      window.removeEventListener(ExtensionEventTypes.THEME_CHANGED, handleThemeChange);
      window.removeEventListener(ExtensionEventTypes.DASHBOARD_EDIT_ACTION_SAVE, handleDashboardTileSave);
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

  const handleThemeChange = (e: any): void => {
    if (!appConfig.enableUserSettingsApi) {
      return;
    }
    if (!e.detail) return;
    const data = e.detail;
    if (!data) return;
    const theme = data.theme;
    const selectedTheme = createTheme(theme);
    loadTheme(selectedTheme);
    console.warn('handleThemeChange: Call API here to  save user preferences -> theme', theme.name);
    // NOTE: Call API here to  save user preferences -> theme
    // use httpClient instance to call the API
  }

  const handleDashboardTileSave = (e: any): void => {
    if (!appConfig.enableUserSettingsApi) {
      return;
    }
    if (!e.detail) return;
    const data = e.detail;
    if (!data) return;
    const tiles = data.tiles;
    console.warn('handleDashboardTileSave: Call API here to  save user preferences -> tilesOrder', tiles);
    // NOTE: Call API here to  save user preferences -> tilesOrder
    // use httpClient instance to call the API
  }

  const renderMain = (): JSX.Element => {
    currentLocaleRef.current = currentLocale;
    const msg = messages[currentLocale];
    const selectedTheme = createTheme(currentTheme);
    return (
      <IntlProvider key={currentLocale} locale={currentLocale} messages={msg}>
        <ThemeProvider theme={selectedTheme}>
          {props.children}
        </ThemeProvider>
      </IntlProvider>
    );
  }
  return renderMain();

}

export const AppSettingsProvider = withRouter(AppSettings);

