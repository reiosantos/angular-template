import { Action } from '@ngrx/store';

export enum NotifyActionTypes {
  SHOW_NOTIFICATION = '[Notify] Show Notification',
  HIDE_NOTIFICATION = '[Notify] Hide Notification'
}

export enum NotificationTypes {
  SUCCESS = 'success',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export class ShowNotification implements Action {
  readonly type: string = NotifyActionTypes.SHOW_NOTIFICATION;
  private readonly nPayload: { message: string; type: NotificationTypes; title?: string };
  public get payload() {
    return this.nPayload;
  }
  constructor(payload: { message: string; type: NotificationTypes; title?: string }) {
    this.nPayload = payload;
  }
}

export class HideNotification implements Action {
  readonly type: string = NotifyActionTypes.HIDE_NOTIFICATION;
  readonly payload: { message?: string; type?: NotificationTypes; title?: string } = {};
}

export type NotifyAction = HideNotification | ShowNotification;
