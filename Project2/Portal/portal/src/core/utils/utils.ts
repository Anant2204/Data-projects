import { DefaultTheme, DarkTheme } from '@msx/react-ui-component';
import { IAppTheme } from '@msx/platform-services';
import { appConfig } from '../../app/App.config';
import queryString from 'query-string';
import { getCustomTheme } from './theme';

let navScrollBarWidth = 0;

export const getScrollBarWidth = () => {
  if (navScrollBarWidth !== 0) {
    return navScrollBarWidth;
  }
  // Get the browser scrollbar width because they're all different
  var scrollDiv = document.createElement('div');
  scrollDiv.setAttribute('style', 'width: 100px;height: 100px;overflow: scroll;position: absolute;top: -999px;');
  var contentDiv = document.createElement('p');
  contentDiv.setAttribute('style', 'width: 100px;height: 200px;');
  scrollDiv.appendChild(contentDiv);
  document.body.appendChild(scrollDiv);
  navScrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return navScrollBarWidth;
}


// export const getThemeByName = (name: string): IAppTheme => {
//   const theme = name === 'dark' ? DarkTheme : DefaultTheme;
//   return theme;
// }

export const getThemeByName = (name: string): IAppTheme => {
  const [customDefaultTheme, customDarkTheme] = getCustomTheme(DefaultTheme, DarkTheme)
  const theme = name === 'dark' ? customDarkTheme : customDefaultTheme;
  return theme;
}

export const initializeBot = () => {
  if (appConfig.botConfig.active) {
    const script = document.createElement("script");
    script.src = appConfig.botConfig.scriptUrl;
    document.head.appendChild(script);
  }
}

export const initializeOcv = () => {
  if (!appConfig.ocvFeedbackConfig.active)
    return;

  const Window = window as any;

  Window.OfficeBrowserFeedback = window.OfficeBrowserFeedback || {};
  Window.OfficeBrowserFeedback.initOptions = {
    appId: appConfig.ocvFeedbackConfig.appId, // Replace by your own app id
    stylesUrl: `${appConfig.ocvFeedbackConfig.sdkUrl}styles/officebrowserfeedback.css`, // Replace by where you have hosted the .css
    intlUrl: `${appConfig.ocvFeedbackConfig.sdkUrl}intl/`, // Replace by where you have hosted the intl files.
    environment: 0, // 0 - Prod, 1 - Int
    primaryColour: "#008272", // Replace by a colour which goes with your website.
    secondaryColour: "#004B50",// Replace by a colour which goes with your website.
    onError: function onError(err) { console.log("OfficeBrowserFeedback SDK encountered error: " + err); }, // (optional) Callback which gets executed when SDK errors
    bugForm: true, // (optional) false by DefaultTheme
    isShowThanks: true,
  };

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = `${appConfig.ocvFeedbackConfig.sdkUrl}scripts/officebrowserfeedback.js`;
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'officebrowserfeedback-jssdk'));

  Window.startMultiFeedback_AllOptional = function startMultiFeedback_AllOptional() {
    var launchOptions = {
      telemetryGroup: {
        sourceContext: appConfig.appName,
      },
      categories: {
        show: true,
        customCategories: ["Calc", "Portal", "Marketing Events"]
      },
      // one app id with multiple
      // direct link with filter
      // filter to specific 
    };
    handlePromise(Window.OfficeBrowserFeedback.multiFeedback(launchOptions));
  };

}

function handlePromise(promise) {
  promise
    .then(
      function onFulfilled() { console.log('handlePromise succeeded'); }
    )
    .catch(
      function onRejected(err) { console.log('handlePromise failed with error: ' + err); }
    );
}

export function parseQueryString(url: string): any {
  let params = [];
  let obj = queryString.parse(url);
  Object.keys(obj).forEach(function (key, idx) {
    params.push(
      {
        key: key,
        value: obj[key]
      });
  });
  return params;
}

export class Guid {
  private static s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  static newGuid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }
}

