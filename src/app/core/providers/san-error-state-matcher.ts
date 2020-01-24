/** Error when invalid control is dirty, touched, or submitted. */
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class SanErrorStateMatcher implements ErrorStateMatcher {
  constructor() {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const submitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || submitted));
  }
}
