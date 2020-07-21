import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthStoreEffects } from '@san/store/auth-store/effects';
import { loaderReducer } from '@san/store/shared/loader/reducer';
import { STATE_KEYS } from '@san/store/state-keys';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(STATE_KEYS.LOADER_FEATURE_KEY, loaderReducer),
    EffectsModule.forFeature([])
  ],
  providers: [AuthStoreEffects]
})
export class LoaderStoreModule {}
