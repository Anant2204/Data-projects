
// This will cause the authConfig and apiConfig settings to change below.
// This file is part of the local Microsoft StretchX shell for local dev and is not part of the extension components.

window.globals = {
  appName: 'Consumption',
  isFirstPartyApp: false,
  authConfig: {
    clientId: '738fe1de-ae5f-4d79-8a8c-bcee17f0b24c', 
    authority: 'https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47',
  },
  apiConfig: {
    baseUrl: 'https://msxtodolistapi.azurewebsites.net/api/', 
    resource: 'api://7d8cedcc-ca83-4144-9a3c-5a7238e645df/access_as_user', 
  },
  telemetryConfig: {
    instrumentationKey: 'cb57717c-66ee-418a-98d8-a704fe0fd424',
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
