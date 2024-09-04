import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from "@fluentui/react-theme-provider";
import { createTheme } from "@fluentui/react";
import { getCurrentTheme } from '../store/selectors/app.selectors';
import { withRouter } from 'react-router-dom';
import { loadTheme } from '@fluentui/react/lib/Styling';

const AppTheme: React.FC = props => {
  const currentTheme = useSelector(getCurrentTheme);

  const renderMain = (): JSX.Element => {
    const selectedTheme = createTheme(currentTheme);
    loadTheme(selectedTheme);
    return (
      <ThemeProvider theme={selectedTheme}>
        {props.children}
      </ThemeProvider>
    );
  }
  return renderMain();

}

export const AppThemeProvider =  withRouter(AppTheme);