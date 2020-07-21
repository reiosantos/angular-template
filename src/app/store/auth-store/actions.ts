import { Action } from '@ngrx/store';
import { User } from '@san/shared/models/user';

export enum AuthActionTypes {
  LOGIN_REQUEST = '[Auth] Login Request',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGIN_SUCCESS = '[Auth] Login Success'
}

export class LoginRequestAction implements Action {
  readonly type: string = AuthActionTypes.LOGIN_REQUEST;
  private readonly authPayload: any;
  public get payload() {
    return this.authPayload;
  }
  constructor(payload: Record<string, unknown>) {
    this.authPayload = payload;
  }
}

export class LoginFailureAction implements Action {
  readonly type: string = AuthActionTypes.LOGIN_FAILURE;
  private readonly authPayload: any;
  public get payload() {
    return this.authPayload;
  }
  constructor(payload: { error: string }) {
    this.authPayload = payload;
  }
}

export class LoginSuccessAction implements Action {
  readonly type: string = AuthActionTypes.LOGIN_SUCCESS;
  private readonly authPayload: { user: User };
  public get payload(): { user: User } {
    return this.authPayload;
  }
  constructor(payload: { user: User }) {
    this.authPayload = payload;
  }
}

export type AuthAction = LoginRequestAction | LoginFailureAction | LoginSuccessAction;
