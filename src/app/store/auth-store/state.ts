import { UserType } from '@san/shared/models/user-type';
import { getAuthData } from '@san/core/utils';

export interface AuthState {
  authUser: UserType | null;
  authError?: any;
}

export const initialState: AuthState = {
  authError: null,
  authUser: getAuthData()
};
