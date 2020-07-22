import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreActions, StoreSelectors, StoreState } from '@san/store';
import { NotificationState } from '@san/store/shared/notification/state';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar/snack-bar-config';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'san-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @ViewChild('templateRef', { static: false }) template: TemplateRef<any>;

  private snackBarRef: MatSnackBarRef<any>;
  durationInSeconds = 5;
  snackOptions: MatSnackBarConfig = {
    duration: this.durationInSeconds * 1000, // convert to milliseconds
    verticalPosition: 'top',
    horizontalPosition: 'right',
    panelClass: ['notification']
  };
  state: NotificationState;
  icons = {
    success: 'check',
    info: 'info-circle',
    warn: 'exclamation-circle',
    error: 'exclamation-triangle'
  };

  constructor(private store: Store<StoreState>, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.store.select(StoreSelectors.getNotificationState).pipe(debounceTime(500)).subscribe(this.notifyStateChanges);
  }

  notifyStateChanges = (state: NotificationState) => {
    this.state = state;

    if (this.snackBarRef && !this.state.show) {
      return this.snackBarRef.dismiss();
    }

    if (Array.isArray(this.snackOptions.panelClass)) {
      this.snackOptions.panelClass.push(state.type);
    } else {
      this.snackOptions.panelClass += ` ${state.type}`;
    }

    if (this.template && this.state.show) {
      this.snackBarRef = this.snackBar.openFromTemplate(this.template, this.snackOptions);
      this.snackBarRef.afterDismissed().subscribe(this.onSnackClose);
    }
  };

  onSnackClose = () => {
    if (this.state.show) {
      this.store.dispatch(new StoreActions.notify.HideNotification());
    }
  };
}
