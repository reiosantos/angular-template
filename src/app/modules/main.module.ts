import { NgModule } from '@angular/core';
import { ToolbarComponent } from '@san/modules/main/toolbar/toolbar.component';
import { SidebarComponent } from '@san/modules/main/sidebar/sidebar.component';
import { SharedModule } from '@san/shared/shared.module';
import { MainRoutingModule } from '@san/modules/main-routing.module';

@NgModule({
  declarations: [ToolbarComponent, SidebarComponent],
  imports: [SharedModule, MainRoutingModule],
  exports: []
})
export class MainModule {}
