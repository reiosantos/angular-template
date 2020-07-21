/** Error when invalid control is dirty, touched, or submitted. */
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher as EsM } from '@angular/material/core';

export class ErrorStateMatcher implements EsM {
  constructor() {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const submitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || submitted));
  }
}
