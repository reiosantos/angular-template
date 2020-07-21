import { initialLoaderState, LoaderState } from '@san/store/shared/loader/state';
import { LoaderAction, LoaderActionTypes } from '@san/store/shared/loader/actions';

export function loaderReducer(state = initialLoaderState, action: LoaderAction): LoaderState {
  switch (action.type) {
    case LoaderActionTypes.SHOW_LOADER: {
      if (state.loading) {
        return state; // already showing
      }
      return { loading: true };
    }
    case LoaderActionTypes.HIDE_LOADER: {
      if (!state.loading) {
        return state; // already hidden
      }
      return { loading: false };
    }
    default: {
      return state;
    }
  }
}

export const loadingSpinnerActive = (state: LoaderState) => state.loading;
