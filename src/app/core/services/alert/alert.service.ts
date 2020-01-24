import { Injectable } from '@angular/core';
import { SanAlert } from '@san/shared/interfaces/san-alert';

@Injectable()
export class AlertService extends SanAlert {
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
