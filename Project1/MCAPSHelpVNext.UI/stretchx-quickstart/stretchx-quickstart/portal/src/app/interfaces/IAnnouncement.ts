import { IDashboardTile } from "@msx/platform-services";

export interface ITilesOrder extends IDashboardTile {
  isVisible?: boolean;
}

  export interface IAnnouncement {
    id: string;
    title: string;
    subTitle: string;
    Announcements: IAnnouncementDetail[];
    wikiLink: string;
    dateAdded: string;
    audience: string;
    feature: string;
  }
  
  export interface IAnnouncementDetail {
    id: string;
    startDate: string;
    endDate: string;
    announcementTitle: string;
    announcementDescription: AnnouncementDescription[];
    wikiLink: string;
    imageName: string;
    dateAdded: string;
    audience: string;
    feature: string;
  }

  export interface AnnouncementDescription {
    subheading: string;
    description: string;
    bulletPoints: string[];
    wikiLink: string;
  }
