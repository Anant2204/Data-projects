import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import * as createHistory from "history";
import { useLoginOnStartup } from '@msx/platform-services';
import { configureStore } from '../../app/store';
import { appConfig } from '../../app/App.config';
import { initializeBot, initializeOcv } from '../utils'


const Window = window as any;
Window.hasStartupDataLoaded = false;

const history = createHistory.createBrowserHistory();
let { store } = configureStore()

initializeBot();
initializeOcv();

export const AppStoreProvider: (React.FC) = props => {

  useLoginOnStartup(appConfig.loginOnStartup);

  return (
    <Provider store={store}>
      <Router history={history}>
        {props.children}
      </Router>
    </Provider>
  );
}
