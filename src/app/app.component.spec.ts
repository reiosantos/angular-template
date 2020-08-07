import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { InitSpec } from '@san/init.spec';

describe('AppComponent', () => {
  InitSpec.configureTestBed();

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
