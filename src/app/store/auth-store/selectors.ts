import { AuthState } from '@san/store/auth-store/state';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { UserType } from '@san/shared/models/user-type';
import { STATE_KEYS } from '@san/store/state-keys';
import { getError, getUser } from '@san/store/auth-store/reducer';

export const selectAuthState: MemoizedSelector<object, AuthState> = createFeatureSelector<AuthState>(
  STATE_KEYS.AUTH_FEATURE_KEY
);

export const selectAuthError: MemoizedSelector<object, any> = createSelector(selectAuthState, getError);

export const selectAuthUser: MemoizedSelector<object, UserType> = createSelector(selectAuthState, getUser);
