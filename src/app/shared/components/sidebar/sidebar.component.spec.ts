import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { InitSpec } from '@san/init.spec';

const MockStore = {
  dispatch: jasmine.createSpy('dispatch'),
  select: jasmine.createSpy('select').and.returnValue(of({ name: 'santos' }))
};

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  InitSpec.configureTestBed([SidebarComponent], [{ provide: Store, useValue: MockStore }]);

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
