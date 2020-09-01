import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ConfirmModalComponent } from '@san/shared/components/confirmation-dialog/confirmation-dialog.component';
import { AppMaterialModule } from '@san/app-material.module';
import { AppFontIconModule } from '@san/app-font-icon.module';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '@san/shared/components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarComponent } from '@san/shared/components/toolbar/toolbar.component';
import { SidebarComponent } from '@san/shared/components/sidebar/sidebar.component';
import { IconComponent } from '@san/shared/components/icon/icon.component';
import { ErrorControlDirective } from '@san/shared/directives/error/error-control.directive';
import { LanguageComponent } from '@san/shared/components/language/language.component';
import { NotificationComponent } from '@san/shared/components/notification/notification.component';
import { CopyToClipboardComponent } from '@san/shared/components/copy-to-clipboard/copy-to-clipboard.component';
import { LayoutComponent } from '@san/shared/components/layout/layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ConfirmModalComponent,
    IconComponent,
    LanguageComponent,
    ErrorControlDirective,
    LoaderComponent,
    ToolbarComponent,
    SidebarComponent,
    NotificationComponent,
    CopyToClipboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppMaterialModule,
    AppFontIconModule,
    TranslateModule.forChild()
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppMaterialModule,
    AppFontIconModule,
    TranslateModule,
    ConfirmModalComponent,
    IconComponent,
    LanguageComponent,
    ErrorControlDirective,
    LoaderComponent,
    NotificationComponent,
    LayoutComponent,
    CopyToClipboardComponent
  ],
  providers: [TitleCasePipe]
})
export class SharedModule {}
