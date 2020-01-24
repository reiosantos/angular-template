import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanIconComponent } from './san-icon.component';

describe('SanIconComponent', () => {
  let component: SanIconComponent;
  let fixture: ComponentFixture<SanIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SanIconComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
