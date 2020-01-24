import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '@san/modules/main/toolbar/toolbar.component';
import { SidebarComponent } from '@san/modules/main/sidebar/sidebar.component';
import { AppMaterialModule } from '@san/app-material.module';
import { AppFontIconModule } from '@san/app-font-icon.module';
import { SharedModule } from '@san/shared/shared.module';
import { MainRoutingModule } from '@san/modules/main-routing.module';

@NgModule({
  declarations: [ToolbarComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    AppMaterialModule,
    AppFontIconModule,
    SharedModule,
    MainRoutingModule
  ],
  exports: []
})
export class MainModule {}
