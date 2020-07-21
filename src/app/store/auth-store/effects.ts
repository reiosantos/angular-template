import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as authActions from './actions';
import { Auth } from '@san/shared/interfaces/auth';
import { AuthToken } from '@san/shared/interfaces/auth-token';
import { Storage } from '@san/shared/interfaces/storage';
import { Strings } from '@san/shared/interfaces/strings';

@Injectable()
export class AuthStoreEffects {
  constructor(private auth: Auth, private authToken: AuthToken, private storage: Storage, private actions$: Actions) {}

  loginRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<authActions.AuthAction>(authActions.AuthActionTypes.LOGIN_REQUEST),
      switchMap(action =>
        this.auth.login(action.payload.username, action.payload.password).pipe(
          map(user => {
            this.authToken.setToken(user.token);
            this.storage.set(Strings.AUTH_USER_KEY, user);
            return new authActions.LoginSuccessAction({ user });
          }),
          catchError(error => {
            return of(new authActions.LoginFailureAction({ error: error.error || error }));
          })
        )
      )
    )
  );
}
