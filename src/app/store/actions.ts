import * as LoaderActions from './shared/loader/actions';
import * as AuthActions from './auth-store/actions';
import * as NotifyActions from './shared/notification/actions';

export const actions = {
  auth: AuthActions,
  loader: LoaderActions,
  notify: NotifyActions
};
