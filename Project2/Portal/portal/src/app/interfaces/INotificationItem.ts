import { Dayjs } from "dayjs";

export interface INotificationItem {
  source: string;
  persist?: boolean;
  itemKey: string;
  subjectHeader: string;
  timeDelivered?: Dayjs;
  status?: string;
  displayStatus?: string;
  messageBodyText?: string;
  subjectIcon?: string;
  senderName?: string;
  senderImageUrl?: string;
  eventTimeBlock?: string;
  eventLocation?: string;
  actionRequiredText?: string;
  actionRequiredLink?: string;
  summaryBodyText?: string;
  suppressTranslation?: boolean;
  locale?: string;
  actionRequiredIsRelative? : boolean;
  expireBy? : any;
}
