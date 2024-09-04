import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from '@fluentui/react';
import {
  AppDataServiceProvider, AppSettingsProvider,
  AppShellProvider, AppStoreProvider
} from './core/provider'
import { App } from './app/App';
import { mergeStyles } from '@fluentui/react';
import './index.css';

const clarityinit = (projectid: string) => {
  if(!projectid) return
  (function (c, l, a, r, i, t, y) {
    // console.log('clarity init;',projectid);
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", projectid);
}

clarityinit(process.env.REACT_APP_CLARITY_PROJECTID)
// let a = document.getElementById('app');
// a["style"].overflow = "scroll";


// Inject some global styles
mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#app)': {
      margin: 0,
      padding: 0,
      height: '100vh'
    }
  }
});

initializeIcons();

ReactDOM.render(
  <AppShellProvider >
    <AppStoreProvider>
      <AppDataServiceProvider>
        <AppSettingsProvider>
          <App />
        </AppSettingsProvider>
      </AppDataServiceProvider>
    </AppStoreProvider>
  </AppShellProvider>,
  document.getElementById('app'));

