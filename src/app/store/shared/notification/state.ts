import { NotificationTypes } from '@san/store/shared/notification/actions';

export interface NotificationState {
  show: boolean;
  message?: string;
  type?: NotificationTypes;
  title?: string;
}

export const initialNotificationState: NotificationState = {
  show: false
};
