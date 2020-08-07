import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  const routeMock: any = { snapshot: {} };
  const routeStateMock: any = { snapshot: {}, url: '/cookies' };
  const routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerMock }],
      imports: [HttpClientTestingModule]
    });
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should redirect an unauthenticated user to the login route', () => {
    expect(authGuard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should allow the authenticated user to access app', () => {
    spyOn(authGuard, 'isAuthenticated').and.returnValue(true);
    expect(authGuard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });
});
