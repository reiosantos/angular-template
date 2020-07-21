import { User } from '@san/shared/models/user';
import { getAuthData } from '@san/core/utils';

export interface AuthState {
  authUser: User | null;
  authError?: any;
}

export const initialState: AuthState = {
  authError: null,
  authUser: getAuthData()
};
