import { IHttpClientRequest } from '@msx/platform-services'
import { appConfig } from './App.config';

export const HTTP_STATUS_NOT_FOUND = 404;

export const AppRoutePath = {
  Dashboard: '/Dashboard',
  Profile: '/Profile',
  Search: '/Search',
}

export const DefaultHttpClientRequest: Partial<IHttpClientRequest> = {
  responseType: 'json',
  header: {
    'Access-Control-Allow-Origin': '*'
  },
  resource: appConfig.apiConfig.resource
};

