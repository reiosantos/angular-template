import { AuthState } from '@san/store/auth-store/state';
import { LoaderState } from '@san/store/shared/loader/state';

export interface State {
  auth: AuthState;
  loader: LoaderState;
}
