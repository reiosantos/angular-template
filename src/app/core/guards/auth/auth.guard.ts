import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad, Route, UrlSegment, Router
} from '@angular/router';
import { Observable } from 'rxjs';
// @ts-ignore
import jwtDecode from 'jwt-decode';
import { SanStrings } from '@san/shared/interfaces/san-strings';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) { }

  isAuthenticated() {
    try {
      const tokenX: string = localStorage.getItem(SanStrings.TOKEN_KEY);
      const user = JSON.parse(localStorage.getItem(SanStrings.USER_KEY));

      const token: any = jwtDecode(tokenX);
      return !!token && !!token.user_id && !!token.email && !!user;
    } catch (e) {
      localStorage.clear();
      return false;
    }
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isAuthenticated()) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    // this.router.navigate(['/login']);
    // return state.url.includes('login');
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return undefined;
  }
}
