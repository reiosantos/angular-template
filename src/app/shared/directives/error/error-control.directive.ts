import { Directive, ElementRef, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { withDestroy } from '@san/core/mixins/with-destroy';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[sanErrorControl]'
})
export class ErrorControlDirective extends withDestroy() implements OnInit {

  @Input('sanErrorControl') errorControl: AbstractControl;
  @Input() sanErrorControlContainer: ElementRef;

  get element() {
    return this.elem.nativeElement;
  }
  constructor(
    private elem: ElementRef,
    private renderer: Renderer2,
    public vcr: ViewContainerRef
  ) {
    super();
  }

  ngOnInit(): void {
    if (!this.errorControl) {
      return;
    }
    this.errorControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.extractError);
  }

  private extractError = (value: any): void => {
    const errors: ValidationErrors|null = this.errorControl.errors;
    console.log(errors);

    const errorElem = this.element.querySelector('mat-error');
    this.renderer.setProperty(errorElem, 'innerHTML', '');

    errorElem.hide();

    if (!errors) {
      return;
    }
    let error: string;

    if (errors.required) error = 'Field_Required';
    if (errors.minlength) {
      const errObj = this.errorControl.getError('minlength');
      error = `Expected length to be at-least ${
        errObj.requiredLength} but actual is ${errObj.actualLength}`;
    }
    if (errors.email) error = 'Invalid_Email';

    // const text = this.renderer.createText(error);
    // this.renderer.appendChild(errorElem, text);
    this.renderer.setProperty(errorElem, 'innerHTML', error);
    this.renderer.setAttribute(errorElem, 'translate', '');
  }
}
