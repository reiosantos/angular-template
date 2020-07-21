import { NgModule } from '@angular/core';
import { SharedModule } from '@san/shared/shared.module';
import { MainRoutingModule } from '@san/modules/main-routing.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, MainRoutingModule],
  exports: []
})
export class MainModule {}
