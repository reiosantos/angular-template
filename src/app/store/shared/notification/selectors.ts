import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { STATE_KEYS } from '@san/store/state-keys';
import { NotificationState } from '@san/store/shared/notification/state';

export const getNotificationState: MemoizedSelector<object, NotificationState> = createFeatureSelector<
  NotificationState
>(STATE_KEYS.NOTIFY_FEATURE_KEY);
