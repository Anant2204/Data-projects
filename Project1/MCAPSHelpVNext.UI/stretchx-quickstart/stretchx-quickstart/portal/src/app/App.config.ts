import { IPortalConfig } from "@msx/platform-services";


export interface IAppConfig extends IPortalConfig {
  notificaitonConfig: {
    active: boolean,
    customPanel: boolean,
  },
  brandConfig: {
    active: boolean,
    loginScreenOnly: boolean,
  },
  isLocalWelcomeExp: boolean
}

export const appConfig: IAppConfig = {
  appName: 'MCAPSHelp',
  authConfig: {
    clientId: process.env.REACT_APP_AD_CLIENT_ID,
    authority: process.env.REACT_APP_AD_AUTHORITY,
  },
  apiConfig: {
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    resource: process.env.REACT_APP_API_RESOURCE,
  },
  telemetryConfig: {
    instrumentationKey: process.env.REACT_APP_INSTRUMENTATION_KEY,
    logPayload: true,
  },  isLocalWelcomeExp: true,
  UTPConfig: {
    EnvironmentName: 'Non-Production',
    ServiceOffering: 'Example Service Offering',
    ServiceLine: 'Example Service Line',
    Service: 'Example Service',
    ComponentName: 'Example Component',
    ComponentId: 'Example Id',
  },
  extensionConfig: {
    RING: 1,
  },
  isMockData: false,
  registrationConfig: {
    apiEndpoint: process.env.REACT_APP_EXTENSION_API_ENDPOINT,
    resource: process.env.REACT_APP_EXTENSION_API_RESOURCE,
    active: true,
  },
  botConfig: {
    hostAppId: process.env.REACT_APP_BOT_HOST_APP_ID,
    scriptUrl: process.env.REACT_APP_BOT_SCRIPT_URL,
    active: false,
  },
  globalSearchConfig: {
    active: true,
  },
  guidedTourConfig: {
    active: false,
  },
  ocvFeedbackConfig: {
    appId: parseInt(process.env.REACT_APP_OCV_APP_ID),
    sdkUrl: process.env.REACT_APP_OCV_SDK_URL,
    active: false,
  },
  notificaitonConfig: {
    active: false,
    customPanel: false,
  },
  themeConfig: {
    theme: 'default',
    active: true,
  },
  loginOnStartup: false,
  enableUserSettingsApi: false,
  brandConfig: {
    active: true,
    loginScreenOnly: false,
  },
  languageConfig: {
    active: true,
    locales: {
      "en": "English - EN ",
      "de": "Deutsch - de",
      "fr": "Français - fr",
      "hu": "Magyar - hu",
      "it": "Italiano - it",
      "pl": "Polski - pl",
      "ru": "Русский - ru",
      "es": "Español - es",
      "tr": "Türkçe - tr",
      "zh-CN": "简体中文 - zh-CN",
      "zh-TW": "繁體中文 - zh-TW",
      "ja": "日本語 - ja",
      "ko": "한국어 - ko",
      "ar": "عربى - ar",
      "bg": "български - bg",
      "el": "Ελληνικά - el",
      "id": "Bahasa Indonesia - id",
      "pt": "Português - pt",
      "ro": "Română - ro",
      "sr": "Српски - sr",
      "th": "ไทย - th",
      "vi": "Tiếng Việt - vi",
      "he": "עִברִית - he",
      "uk": "Український - uk"
    },
  },
}