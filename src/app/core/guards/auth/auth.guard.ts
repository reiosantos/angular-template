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
import jwtDecode from 'jwt-decode';
import { Strings } from '@san/shared/interfaces/strings';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  isAuthenticated() {
    try {
      const tokenX: string = localStorage.getItem(Strings.TOKEN_KEY);
      const user = JSON.parse(localStorage.getItem(Strings.AUTH_USER_KEY));

      const token: any = jwtDecode(tokenX);
      return !!token && !!token.user_id && !!token.email && !!user;
    } catch (e) {
      localStorage.clear();
      return false;
    }
  }

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
