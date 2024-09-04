
// This will cause the authConfig and apiConfig settings to change below.
// This file is part of the local Microsoft StretchX shell for local dev and is not part of the extension components.

window.globals = {
  appName: 'MCT',
  isFirstPartyApp: false,
  authConfig: {
    clientId: 'dde8fa9c-f1d9-46df-add3-4b88abcfe8a8', 
    authority: 'https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47',
  },
  apiConfig: {
    baseUrl: 'https://mct-dev1-wa-mctapi.azurewebsites.net', 
    resource: 'api://cc97a3b2-dd2e-4995-9b8f-9738aef65865/user_impersonation', 
  },
  telemetryConfig: {
    instrumentationKey: '67361e08-bdee-458d-acd8-2ebb0e62a672',
    logPayload: true,
  },
  UTPConfig: {
    environmentName: 'Non-Production',
    serviceOffering: 'Example Service Offering',
    serviceLine: 'Example Service Line',
    service: 'Example Service',
    componentName: 'Example Component',
    componentId: 'Example Id',
  },
  registrationConfig: {
    apiEndpoint: '/data/extensionsRegistration.json',
    resource: 'api://7d8cedcc-ca83-4144-9a3c-5a7238e645df/access_as_user',
    active: false,
  },
  extensionConfig: {
    RING: 1,
  },
  botConfig: {
    hostAppId: '9C9C9871-5A46-48F7-9376-815E1C284D35',
    scriptUrl: 'https://onefinancecdn.azureedge.net/onefinancestore/staging-fda.js',
    active: false,
  },
  guidedTourConfig: {
    active: false,
  },
  isSupplierExtension: false,
  isMockData: true,
  authClient: 'MSAL',
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
    "ko": "한국어 - ko"
  },
};
