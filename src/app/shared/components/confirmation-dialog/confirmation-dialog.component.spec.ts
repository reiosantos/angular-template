import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmModalComponent } from './confirmation-dialog.component';
import { EventEmitter } from '@angular/core';
import { InitSpec } from '@san/init.spec';

describe('ConfirmModalComponent', () => {
  let fixture: ComponentFixture<ConfirmModalComponent>;
  let element: HTMLElement;
  let component: ConfirmModalComponent;

  InitSpec.configureTestBed();

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    component.displayText = 'Logout';
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('initial load', () => {
    it('should have correct message', () => {
      expect(element.querySelector('p').textContent).toContain('You are about to Logout.');
    });
  });

  describe('functionality', () => {
    it('should close the dialog', () => {
      spyOn(component.dialogRef, 'close');
      component.closeDialog();
      expect(component.dialogRef.close).toHaveBeenCalledTimes(1);
    });

    it('should emit an event when confirmDialog is called', () => {
      const spy = spyOn(EventEmitter.prototype, 'emit');
      component.confirmDialog();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
