import { TestBed } from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

const mockMatDialogRef = {
  close: () => {},
};

const mockMatDialogData = {
  data: {
    displayText: 'display data',
    confirmText: 'yes'
  }
};

export class InitSpec {
  static configureTestBed(declarations?: [], providers?: []) {
    describe('', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [
            ...declarations
          ],
          providers: [
            { provide: MatDialogRef, useValue: mockMatDialogRef },
            { provide: MAT_DIALOG_DATA, useValue: mockMatDialogData },
            ...providers
          ]
        });
      });
    });
  }
}
