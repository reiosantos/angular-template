import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { AppMaterialModule } from '@san/app-material.module';
import { SharedModule } from '@san/shared/shared.module';
import { SanStoreModule } from '@san/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from '@san/shared/components/toolbar/toolbar.component';
import { AuthToken } from '@san/shared/interfaces/auth-token';
import { AuthTokenService } from '@san/core/providers/auth-token/auth-token.service';
import { HttpClient } from '@san/shared/interfaces/http-client';
import { HttpWrapperService } from '@san/core/http/http-wrapper.service';
import { Auth } from '@san/shared/interfaces/auth';
import { AuthService } from '@san/core/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { Storage } from '@san/shared/interfaces/storage';
import { StorageService } from '@san/core/providers/storage/storage.service';
import { NavMenu } from '@san/shared/interfaces/nav-menu';
import { NavMenuService } from '@san/core/providers/nav-menu/nav-menu.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { mockMatDialogData, mockMatDialogRef } from '@san/core/mocks/dialog';
import { of } from 'rxjs';
import { Config } from '@san/shared/interfaces/config';
import { AppConfigService } from '@san/configs/app-config.service';
import { UrlComponent } from '@san/shared/interfaces/url-component';
import { UrlComponentService } from '@san/configs/url-component/url-component.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '@san/app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const MockStore = {
  dispatch: jasmine.createSpy('dispatch'),
  select: jasmine.createSpy('select').and.returnValue(of({ name: 'santos' }))
};

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppMaterialModule,
        SharedModule,
        SanStoreModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
          }
        })
      ],
      declarations: [ToolbarComponent],
      providers: [
        { provide: UrlComponent, useClass: UrlComponentService },
        { provide: Config, useClass: AppConfigService },
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
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
