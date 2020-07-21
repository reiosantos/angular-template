import { Directive, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { withDestroy } from '@san/core/mixins/with-destroy';
import { takeUntil } from 'rxjs/operators';
import { Required } from '@san/core/utils/decorators/required';

@Directive({
  selector: '[sanErrorControl]'
})
export class ErrorControlDirective extends withDestroy() implements OnInit {
  @Input('sanErrorControl') errorControl: AbstractControl;
  @Input() @Required sanErrorControlContainer: HTMLElement;

  constructor(private renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {
    if (!this.errorControl) {
      return;
    }
    this.errorControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(this.extractError);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private extractError = (value: any): void => {
    const { errors } = this.errorControl;

    this.renderer.setProperty(this.sanErrorControlContainer, 'innerHTML', '');

    if (!errors) {
      return;
    }

    let error: string;

    if (errors.required) error = 'Field_Required';
    if (errors.minlength) {
      const errObj = this.errorControl.getError('minlength');
      error = `Expected length to be at-least ${errObj.requiredLength} but actual is ${errObj.actualLength}`;
    }

    if (errors.email) error = 'Invalid_Email';

    this.renderer.setProperty(this.sanErrorControlContainer, 'innerHTML', error);
  };
}
