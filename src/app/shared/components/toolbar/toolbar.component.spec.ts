import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { Storage } from '@san/shared/interfaces/storage';
import { StorageService } from '@san/core/providers/storage/storage.service';
import { NavMenu } from '@san/shared/interfaces/nav-menu';
import { NavMenuService } from '@san/core/providers/nav-menu/nav-menu.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { mockMatDialogData, mockMatDialogRef } from '@san/core/mocks/dialog';
import { SanStoreModule } from '@san/store';
import { Store } from '@ngrx/store';
import { Auth } from '@san/shared/interfaces/auth';
import { AuthService } from '@san/core/services/auth/auth.service';
import { HttpClient } from '@san/shared/interfaces/http-client';
import { HttpWrapperService } from '@san/core/http/http-wrapper.service';
import { AuthToken } from '@san/shared/interfaces/auth-token';
import { AuthTokenService } from '@san/core/providers/auth-token/auth-token.service';
import { AppMaterialModule } from '@san/app-material.module';
import { SharedModule } from '@san/shared/shared.module';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from '@san/shared/components/sidebar/sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const MockStore = {
  dispatch: jasmine.createSpy('dispatch'),
  select: jasmine.createSpy('select').and.returnValue(of({ name: 'santos' }))
};

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, SharedModule, SanStoreModule, HttpClientTestingModule, NoopAnimationsModule],
      declarations: [ToolbarComponent, SidebarComponent],
      providers: [
        { provide: AuthToken, useClass: AuthTokenService },
        { provide: HttpClient, useClass: HttpWrapperService },
        { provide: Auth, useClass: AuthService },
        { provide: Store, useValue: MockStore },
        { provide: Storage, useClass: StorageService },
        { provide: NavMenu, useClass: NavMenuService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockMatDialogData }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
