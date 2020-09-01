/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  Route,
  UrlSegment,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { isAuthenticated } from '@san/core/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}
  isAuthenticated = isAuthenticated;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isAuthenticated()) {
      // logged in so return true
      if (state.url.match('auth')) {
        this.router.navigate(['/']);
      }
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login']);
    // return state.url.includes('login');
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isAuthenticated()) {
      if (route.path.match('auth')) {
        this.router.navigate(['']);
        return false;
      }
      // logged in so return true
      return true;
    }
    return !!route.path.match('auth');
  }
}
