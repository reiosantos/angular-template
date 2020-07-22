import { AuthState } from '@san/store/auth-store/state';
import { LoaderState } from '@san/store/shared/loader/state';
import { NotificationState } from '@san/store/shared/notification/state';

export interface State {
  auth: AuthState;
  loader: LoaderState;
  notify: NotificationState;
}
