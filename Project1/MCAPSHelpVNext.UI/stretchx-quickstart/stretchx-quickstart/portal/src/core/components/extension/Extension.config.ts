import { appConfig } from '../../../app/App.config';

export const getConfig = () => {
  const config = appConfig.extensionConfig;
  Object.assign(config, { IsMockData: appConfig.isMockData });
  // Bellow attributes added for demo purpose only to support Supplier extension. 
  // Please remove during actual implementation
  Object.assign(config, { API_ENDPOINT: '' });
  return config;
};