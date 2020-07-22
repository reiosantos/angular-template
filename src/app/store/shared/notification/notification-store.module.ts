import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { STATE_KEYS } from '@san/store/state-keys';
import { notifyReducer } from '@san/store/shared/notification/reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(STATE_KEYS.NOTIFY_FEATURE_KEY, notifyReducer),
    EffectsModule.forFeature([])
  ],
  providers: []
})
export class NotificationStoreModule {}
