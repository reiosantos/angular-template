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

@NgModule({
  declarations: [ConfirmModalComponent, IconComponent, LanguageComponent, ErrorControlDirective, LoaderComponent],
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
    LoaderComponent
  ]
})
export class SharedModule {}
