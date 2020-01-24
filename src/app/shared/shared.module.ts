import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanIconComponent } from './components/san-icon/san-icon.component';
import { LanguageComponent } from './components/language/language.component';
import { ErrorControlDirective } from './directives/error/error-control.directive';
import {
  ConfirmModalComponent
} from '@san/shared/components/confirmation-dialog/confirmation-dialog.component';
import { AppMaterialModule } from '@san/app-material.module';
import { AppFontIconModule } from '@san/app-font-icon.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    SanIconComponent,
    LanguageComponent,
    ErrorControlDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
    AppFontIconModule,
  ],
  exports: [
    ConfirmModalComponent,
    SanIconComponent,
    LanguageComponent,
    ErrorControlDirective
  ]
})
export class SharedModule {
}
