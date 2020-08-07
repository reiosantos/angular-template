import { initialState, AuthState } from '@san/store/auth-store/state';
import { AuthAction, AuthActionTypes } from '@san/store/auth-store/actions';
import { UserType } from '@san/shared/models/user-type';

export function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST: {
      return { authError: null, authUser: null };
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return { ...state, authUser: action.payload.user, authError: null };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return { ...state, authUser: null, authError: action.payload.error };
    }
    default: {
      return state;
    }
  }
}

export const getError = (state: AuthState): any => state.authError;
export const getUser = (state: AuthState): UserType => state.authUser;
