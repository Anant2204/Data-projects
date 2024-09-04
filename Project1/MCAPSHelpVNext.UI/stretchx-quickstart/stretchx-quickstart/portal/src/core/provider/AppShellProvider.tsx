import {
  ITelemetryClient,
  IGraphClient,
  IHttpClient,
  withStore,
  MSALV2Client,
} from '@msx/platform-services';
import {
  TelemetryClient,
  HttpClient,
  GraphClient,
  ReducerRegistry,
  StoreBuilder,
} from '@msx/platform-services';
import { Shell } from '@msx/platform-services';
import { appConfig } from '../../app/App.config';

const telemetryClient: ITelemetryClient = new TelemetryClient(
  {
    instrumentationKey: appConfig.telemetryConfig.instrumentationKey,
    UTPConfig: appConfig.UTPConfig,
    defaultProperties: {
      appName: appConfig.appName,
    },

  });

// --------------------
// ADAL http client
// --------------------
// const authClient: IAuthClient = new ADALClient(
//   {
//     clientId: appConfig.authConfig.clientId,
//     redirectUri: window.location.origin,
//     cacheLocation: "sessionStorage",
//   },
//   telemetryClient
// );

//--------------------
// MSAL http client
//--------------------
// const authClient = new MSALClient(
//   {
//     auth: {
//       clientId: appConfig.authConfig.clientId,
//       redirectUri: window.location.origin,
//       authority: appConfig.authConfig.authority,
//     },
//     cache: {
//       cacheLocation: "localStorage",
//       storeAuthStateInCookie: true
//     },
//   },
//   telemetryClient
// );

//--------------------
// MSALV2 http client
//--------------------
const authClient = new MSALV2Client(
  {
    auth: {
      clientId: appConfig.authConfig.clientId,
      redirectUri: window.location.origin,
      authority: appConfig.authConfig.authority,
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true,
    },
  },
  telemetryClient
);

const httpClient: IHttpClient = new HttpClient(
  telemetryClient,
  authClient,
  { logPayload: appConfig.telemetryConfig.logPayload }
);
const graphClient: IGraphClient = new GraphClient(httpClient);

const initialAppState = {};
const isDevelopment = process.env.NODE_ENV === 'development' || true;
const reducerRegistry = new ReducerRegistry();
const storeResult = new StoreBuilder(reducerRegistry, initialAppState)
  .configureLogger(isDevelopment)
  .configureSaga({
    authClient,
    telemetryClient,
    httpClient,
    graphClient,
  })
  .build();

export const AppShellProvider = withStore(storeResult)(Shell);
