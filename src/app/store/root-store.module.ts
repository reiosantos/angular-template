import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@san/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthStoreModule } from '@san/store/auth-store/auth-store.module';
import { LoaderStoreModule } from '@san/store/shared/loader/loader-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    AuthStoreModule,
    LoaderStoreModule
  ]
})
export class SanStoreModule {}
