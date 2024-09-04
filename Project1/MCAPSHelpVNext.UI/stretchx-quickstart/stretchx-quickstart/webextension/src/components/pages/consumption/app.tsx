import React, { FC } from "react";
import { Provider } from "react-redux";
import { configureStore } from "../../../store/store.config";
import { Consumption } from "./consumption";
import { IComponentProps } from "./consumption.types";
import {
  ScrollablePane,
  classNamesFunction,
  initializeIcons,
} from "@fluentui/react";
import { getCurrentLocale, getCurrentTheme } from "../../../utils";
import { ThemeProvider } from "react-jss";
import { getStyles } from "./styles";
import ErrorBoundary from "../../shared/components/errorBoundary/errorBoundary";

// import locale related
import { IntlProvider, addLocaleData } from "react-intl";
import localeEn from 'react-intl/locale-data/en';
import { IMessageTranslationMap } from '@msx/platform-services';
import EventLoggingProvider from "../../shared/components/logging/logging";

initializeIcons();
let { store } = configureStore();
let classes: any;

addLocaleData([
  ...localeEn,
]);
const messages: IMessageTranslationMap = {
  'en': null,
};
export const ConsumptionApp: FC<IComponentProps> = (props) => {
  const localeName = getCurrentLocale(props.parentContext);
  const msg = messages[localeName];
  const theme = getCurrentTheme(props.parentContext);
  const getClassNames = classNamesFunction<any, any>();
  classes = getClassNames(getStyles(theme));
  return (
    <Provider store={store}>
      <IntlProvider key={localeName} locale={localeName} messages={msg}>
        <ThemeProvider theme={theme}>
          <ScrollablePane className={classes.root}>
            <ErrorBoundary parentContext={props.parentContext}>
              <EventLoggingProvider parentContext={props.parentContext}>
                  <Consumption
                    parentContext={props.parentContext}
                    selectedIndex={props.selectedIndex}
                    slimLayout={props.slimLayout}
                  />
              </EventLoggingProvider>
            </ErrorBoundary>
          </ScrollablePane>
        </ThemeProvider>
      </IntlProvider>
    </Provider>
  );
};
