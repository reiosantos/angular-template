import { ErrorControlDirective } from './error-control.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailValidator } from '@san/shared/validators/email.validator';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `
    <form [formGroup]="form" novalidate>
      <mat-form-field [sanErrorControl]="form.get('email')" [sanErrorControlContainer]="emailError">
        <input type="email" matInput placeholder="Email" formControlName="email" name="email" />
        <p class="mat-small" translate #emailError></p>
      </mat-form-field>
    </form>
  `
})
class TestErrorComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, EmailValidator.isValid]),
      password: this.fb.control('', [Validators.required])
    });
  }
}

describe('ErrorContainerDirective', () => {
  let component: TestErrorComponent;
  let fixture: ComponentFixture<TestErrorComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestErrorComponent, ErrorControlDirective],
      imports: [ReactiveFormsModule, MatInputModule, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestErrorComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  it('Show error on email', async () => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.form.get('email').invalid).toBeTrue();

      // eslint-disable-next-line @typescript-eslint/quotes
      const input: HTMLInputElement = element.querySelector("input[name='email']");
      // ensure its not valid
      input.value = 'santos';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.form.get('email').invalid).toBeTrue();
      expect(component.form.get('email').value).toBe('santos');

      const p = element.querySelector('p');
      expect(p.innerHTML).toBe('Invalid_Email');

      // ensure its valid
      input.value = 'santos@email.com';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.form.get('email').valid).toBeTrue();
      expect(component.form.get('email').value).toBe('santos@email.com');
    });
  });
});
