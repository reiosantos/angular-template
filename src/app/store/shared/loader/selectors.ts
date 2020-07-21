import { LoaderState } from '@san/store/shared/loader/state';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { loadingSpinnerActive } from '@san/store/shared/loader/reducer';
import { STATE_KEYS } from '@san/store/state-keys';

export const getLoaderState: MemoizedSelector<object, LoaderState> = createFeatureSelector<LoaderState>(
  STATE_KEYS.LOADER_FEATURE_KEY
);

export const isLoadingSpinnerActive = createSelector(getLoaderState, loadingSpinnerActive);
