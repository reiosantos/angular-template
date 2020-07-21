import { Action } from '@ngrx/store';

export enum LoaderActionTypes {
  SHOW_LOADER = '[Request] Show Loader',
  HIDE_LOADER = '[Request] Hide Loader'
}

export class ShowLoaderAction implements Action {
  readonly type: string = LoaderActionTypes.SHOW_LOADER;
}

export class HideLoaderAction implements Action {
  readonly type: string = LoaderActionTypes.HIDE_LOADER;
}

export type LoaderAction = HideLoaderAction | ShowLoaderAction;
