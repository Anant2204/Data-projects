import React, { FC } from "react";
import { Provider } from "react-redux";
import { reduxStore } from "../../../store/reduxStore";
import { EDMChangeRequest } from "./edmChangeRequest";
import { IMctPageProps } from "./edmChangeRequest.types";
import {
  ScrollablePane,
  classNamesFunction,
  initializeIcons,
} from "@fluentui/react";
import { getCurrentLocale, getCurrentTheme } from "../../../utils";
import { ThemeProvider } from "react-jss";
import { getStyles } from "./edmChangeRequest.styles";
import ErrorBoundary from "../../shared/components/errorBoundary/errorBoundary";

// import locale related
import { IntlProvider } from "react-intl";
import { IMessageTranslationMap } from "@msx/platform-services";
import EventLoggingProvider from "../../shared/components/logging/logging";

initializeIcons();
let classes: any;

const messages: IMessageTranslationMap = {
  en: null,
};
export const EDMChangeRequestApp: FC<IMctPageProps> = (props) => {
  const localeName = getCurrentLocale(props.parentContext);
  const msg = messages[localeName];
  const theme = getCurrentTheme(props.parentContext);
  const getClassNames = classNamesFunction<any, any>();
  classes = getClassNames(getStyles(theme));

  return (
    <Provider store={reduxStore}>
      <IntlProvider key={localeName} locale={localeName} messages={msg}>
        <ThemeProvider theme={theme}>
          <ScrollablePane className={classes.root}>
            <ErrorBoundary parentContext={props.parentContext}>
              <EventLoggingProvider parentContext={props.parentContext}>
                <EDMChangeRequest
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
