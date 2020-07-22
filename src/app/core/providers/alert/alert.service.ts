import { Injectable } from '@angular/core';
import { Alert } from '@san/shared/interfaces/alert';
import { Store } from '@ngrx/store';
import { StoreActions, StoreState } from '@san/store';
import { NotificationTypes } from '@san/store/shared/notification/actions';

@Injectable()
export class AlertService extends Alert {
  constructor(private store: Store<StoreState>) {
    super();
  }

  private dispatchShowAction = (payload: { message: string; type: NotificationTypes; title?: string }) => {
    this.store.dispatch(new StoreActions.notify.ShowNotification(payload));
  };

  success = (msg: string, title?: string) => {
    this.dispatchShowAction({ message: msg, title, type: NotificationTypes.SUCCESS });
  };

  info = (msg: string, title?: string) => {
    this.dispatchShowAction({ message: msg, title, type: NotificationTypes.INFO });
  };

  warning = (msg: string, title?: string) => {
    this.dispatchShowAction({ message: msg, title, type: NotificationTypes.WARN });
  };

  error = (msg: string, title?: string) => {
    this.dispatchShowAction({ message: msg, title, type: NotificationTypes.ERROR });
  };

  clear = () => {
    this.store.dispatch(new StoreActions.notify.HideNotification());
  };
}
