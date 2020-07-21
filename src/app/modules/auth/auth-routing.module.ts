import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@san/modules/auth/login/login.component';
import { SignupComponent } from '@san/modules/auth/signup/signup.component';
import { ForgotPasswordComponent } from '@san/modules/auth/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'login',
    data: { title: 'Login' },
    component: LoginComponent
  },
  {
    path: 'signup',
    data: { title: 'Create Account' },
    component: SignupComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: 'Forgot Password' }
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
