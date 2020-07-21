/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Alert } from '@san/shared/interfaces/alert';

// TODO: Complete the service to show toaster

@Injectable()
export class AlertService extends Alert {
  constructor() {
    super();
  }

  success(msg: string, title?: string) {
    // this.toastr.success(msg, title, this.options);
  }

  info(msg: string, title?: string) {
    // return this.toastr.info(msg, title, this.options);
  }

  warning(msg: string, title?: string) {
    // this.toastr.warning(msg, title, this.options);
  }

  error(msg: string, title?: string) {
    // this.toastr.error(msg, title, this.options);
  }

  clear() {
    // this.toastr.clear(toastr);
  }
}
