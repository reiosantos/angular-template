import { Component, OnInit } from '@angular/core';
import { Config } from '@san/shared/interfaces/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { EmailValidator } from '@san/shared/validators/email.validator';
import { Store } from '@ngrx/store';
import { StoreActions, StoreState } from '@san/store';

@Component({
  selector: 'san-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isEmailValid = true;
  isPasswordValid = true;
  showPassword = false;

  constructor(
    private config: Config,
    private fb: FormBuilder,
    private titleCasePipe: TitleCasePipe,
    private store: Store<StoreState>
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, EmailValidator.isValid]),
      password: this.fb.control('', [Validators.required])
    });
  }

  submitForm = (): void => {
    // @ts-ignore
    if (!this.validateField('email') || !this.validateField('password')) {
      return;
    }
    const username: string = this.form.get('email').value;
    // @ts-ignore
    const password: string = this.form.get('password').value;

    this.store.dispatch(new StoreActions.auth.LoginRequestAction({ username, password }));
  };

  validateField = (controlName: string): boolean => {
    const identifier = `is${this.titleCasePipe.transform(controlName)}Valid`;
    // @ts-ignore
    this[identifier] = this.form.get(controlName).valid;
    // @ts-ignore
    return this[identifier];
  };

  togglePasswordView = (): void => {
    this.showPassword = !this.showPassword;
  };
}
