import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmModalComponent {
  @Output() executeFunction = new EventEmitter<boolean>();
  public displayText = '';
  public confirmText = '';

  constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.displayText = this.data.displayText;
    this.confirmText = this.data.confirmText;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  confirmDialog() {
    this.executeFunction.emit(true);
  }
}
