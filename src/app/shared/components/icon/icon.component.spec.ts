import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon.component';
import { InitSpec } from '@san/init.spec';

describe('SanIconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  InitSpec.configureTestBed();

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    component.icon = 'home';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    component.type = 'fa';
    expect(component.faIcon).toBe('home');
    component.type = 'svg';
    expect(component.faIcon).toBeNull();
    expect(component.pngIcon).toBeNull();
    component.type = 'png';
    expect(component.pngIcon).toBe('home');
    expect(component.faIcon).toBeNull();
  });
});
