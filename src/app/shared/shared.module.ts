import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { LanguageComponent } from './components/language/language.component';
import { ErrorControlDirective } from './directives/error/error-control.directive';
import { ConfirmModalComponent } from '@san/shared/components/confirmation-dialog/confirmation-dialog.component';
import { AppMaterialModule } from '@san/app-material.module';
import { AppFontIconModule } from '@san/app-font-icon.module';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '@san/shared/components/loader/loader.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarComponent } from '@san/shared/components/toolbar/toolbar.component';
import { SidebarComponent } from '@san/shared/components/sidebar/sidebar.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    IconComponent,
    LanguageComponent,
    ErrorControlDirective,
    LoaderComponent,
    ToolbarComponent,
    SidebarComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppMaterialModule,
    AppFontIconModule,
    TranslateModule.forChild()
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppMaterialModule,
    AppFontIconModule,
    TranslateModule,
    ConfirmModalComponent,
    IconComponent,
    LanguageComponent,
    ErrorControlDirective,
    LoaderComponent,
    NotificationComponent
  ]
})
export class SharedModule {}
