import { IAuthClient, IExtensionsRegistration } from '@msx/platform-services';
import { INotificationItem, IUserProfile } from '.';
import { IAnnouncement } from './IAnnouncement';

export interface IDataService {
  GetUserProfile: () => Promise<IUserProfile>;
  UpdateUserProfile: (userProfile: IUserProfile) => Promise<boolean>;
  GetExtensionsRegistration: () => Promise<IExtensionsRegistration>;
  GetNotifications: () => Promise<[INotificationItem]>;
  UpdateNotifications: (notifications: INotificationItem[]) => Promise<[INotificationItem]>;
  GetAnnouncements: () => Promise<IAnnouncement>;
  GetLoggedInUserPrevilige: (context:IAuthClient) => Promise<any>; 
}
