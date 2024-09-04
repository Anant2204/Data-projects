import { IAuthClient, IExtensionsRegistration, IHttpClient, IHttpClientRequest } from '@msx/platform-services';
import { DefaultHttpClientRequest } from '../App.types';
import { IDataService, INotificationItem, IUserProfile } from '../interfaces';
import { appConfig } from '../App.config';
import { IAnnouncement } from '../interfaces/IAnnouncement';


export class DataService implements IDataService {
  private httpClient: IHttpClient;
  private authClient: IAuthClient;
  private baseUrl: string;

  public constructor(httpClient: IHttpClient, authClient: IAuthClient) {
    this.httpClient = httpClient;
    this.authClient = authClient;
    this.baseUrl = appConfig.apiConfig.baseUrl;
  }

  public async GetUserProfile(): Promise<IUserProfile> {
    const url = appConfig.isMockData ?
      '/data/userProfile.json' :
      `${this.baseUrl}userSettings`;

    if (appConfig.isMockData) {
      return new Promise((resolve, reject): void => {
        fetch(url)
          .then(response => response.json())
          .then((data): void => {
            resolve(data as IUserProfile);
          })
          .catch((error): void => {
            reject(error);
          });
      });
    }

    return new Promise((resolve, reject): void => {
      const request: IHttpClientRequest = {
        ...DefaultHttpClientRequest,
        method: 'GET',
        url: url
      };
      this.httpClient
        .request<IUserProfile>(request)
        .then((response): void => {
          resolve(response.data);
        })
        .catch((error): void => {
          reject(error);
        });
    });
  }

  public async UpdateUserProfile(userProfile: IUserProfile): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      // TODO: Actual API integration 
      resolve(true);

    });
  }

  public async GetExtensionsRegistration(): Promise<IExtensionsRegistration> {
    // TODO: Actual API endpoint integration 
    const url = `${appConfig.registrationConfig.apiEndpoint}`;

    if (appConfig.isMockData) {
      return new Promise((resolve, reject): void => {
        fetch(url)
          .then(response => response.json())
          .then((data): void => {
            resolve(data as IExtensionsRegistration);
          })
          .catch((error): void => {
            reject(error);
          });
      });
    }

     return new Promise((resolve, reject): void => {
      const request: IHttpClientRequest = {
        ...DefaultHttpClientRequest,
        method: 'GET',
        url: url
      };
      this.httpClient.request<IExtensionsRegistration>(request)
        .then((response): void => {
          resolve(response.data);
        })
        .catch((error): void => {
          reject(error);
        });
    });
  }
  

  public async GetAnnouncements(): Promise<IAnnouncement> {
    const url = appConfig.isLocalWelcomeExp
    ? "/data/announcement/announcement.json"
    : `${process.env.REACT_APP_WELCOMEEXP_CDN_JSON_URL}?${process.env.REACT_APP_CDN_TOKEN}`;
    //const url = `/data/announcement/announcement.json`;
      
    
    return new Promise((resolve, reject): void => {
      fetch(url)
        .then((response) => response.json())
        .then((data): void => {
          resolve(data as IAnnouncement);
        })
        .catch((error): void => {
          reject(error);
        });
    });
  
  }
  public async GetNotifications(): Promise<[INotificationItem]> {
    // TODO: Actual API endpoint integration
    const url = `/data/notifications.json`;

    if (appConfig.isMockData) {
      return new Promise((resolve, reject): void => {
        fetch(url)
          .then(response => response.json())
          .then((data): void => {
            resolve(data as [INotificationItem]);
          })
          .catch((error): void => {
            reject(error);
          });
      });
    }
    

    return new Promise((resolve, reject): void => {
      const request: IHttpClientRequest = {
        ...DefaultHttpClientRequest,
        method: 'GET',
        url: url
      };
      this.httpClient
        .request<[INotificationItem]>(request)
        .then((response): void => {
          resolve(response.data);
        })
        .catch((error): void => {
          reject(error);
        });
    });
  }

  public async UpdateNotifications(notifications: [INotificationItem]): Promise<[INotificationItem]> {
    const url = `${this.baseUrl}Notifications`;
    return new Promise(async (resolve, reject) => {
      if (appConfig.isMockData)
        resolve(notifications);

      const request: IHttpClientRequest = {
        ...DefaultHttpClientRequest,
        data: notifications,
      };
      try {
        await this.httpClient.post(url, request);
        resolve(notifications);
      }
      catch (err) {
        reject(err);
      }
    });
  }
}
