import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '@san/store/auth-store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthStoreEffects } from '@san/store/auth-store/effects';
import { STATE_KEYS } from '@san/store/state-keys';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(STATE_KEYS.AUTH_FEATURE_KEY, authReducer),
    EffectsModule.forFeature([AuthStoreEffects])
  ]
})
export class AuthStoreModule {}
