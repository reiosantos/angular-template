import { initialNotificationState, NotificationState } from '@san/store/shared/notification/state';
import { NotificationTypes, NotifyAction, NotifyActionTypes } from '@san/store/shared/notification/actions';

export function notifyReducer(state = initialNotificationState, action: NotifyAction): NotificationState {
  switch (action.type) {
    case NotifyActionTypes.SHOW_NOTIFICATION: {
      const { message, type, title } = action.payload;

      if (state.show && type !== NotificationTypes.ERROR) {
        // give precedence to ERROR messages, should show regardless
        return state; // already showing
      }
      return { show: true, message, type, title };
    }
    case NotifyActionTypes.HIDE_NOTIFICATION: {
      if (!state.show) {
        return state; // already hidden
      }
      return { show: false, message: null };
    }
    default: {
      return state;
    }
  }
}
