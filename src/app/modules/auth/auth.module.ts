import { NgModule } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { LoginComponent } from '@san/modules/auth/login/login.component';
import { SignupComponent } from '@san/modules/auth/signup/signup.component';
import { SharedModule } from '@san/shared/shared.module';
import { AuthRoutingModule } from '@san/modules/auth/auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, ForgotPasswordComponent, AuthWrapperComponent],
  imports: [SharedModule, AuthRoutingModule],
  providers: [TitleCasePipe]
})
export class AuthModule {}
