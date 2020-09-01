import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { NavigationEnd, RouteConfigLoadEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import * as mainRoutes from '@san/routes.json';
import { RouteType } from '@san/shared/models/route-type';
import { ToolbarComponent } from '@san/shared/components/toolbar/toolbar.component';
import { Config } from '@san/shared/interfaces/config';
import { NavMenu } from '@san/shared/interfaces/nav-menu';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { UserType } from '@san/shared/models/user-type';
import { Strings } from '@san/shared/interfaces/strings';
import { Storage } from '@san/shared/interfaces/storage';

@Component({
  selector: 'san-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {
  position: 'over' | 'push' | 'side' = 'side';
  observer: Subscription;
  activeRoute = '';
  loading = false;
  routes: RouteType[] = mainRoutes.routes as RouteType[];
  value = 0;

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild(ToolbarComponent, { static: false }) toolbarComponent: ToolbarComponent;

  constructor(
    private config: Config,
    private navMenu: NavMenu,
    private media: MediaObserver,
    private router: Router,
    private cd: ChangeDetectorRef,
    private storage: Storage,
    public breakpointObserver: BreakpointObserver
  ) {}

  responsiveLogout = () => {
    this.toolbarComponent.showLogoutModal();
  };

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.activeRoute = this.router.url;
      }
    });
  }

  ngAfterViewInit() {
    this.navMenu.setSidenav(this.sidenav);
    this.createMediaWatcher();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.unsubscribe();
    }
  }

  createMediaWatcher = () => {
    this.observer = this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.navMenu.close().then(() => {
            this.position = 'over';
          });
        } else {
          this.navMenu.open().then(() => {
            this.position = 'side';
          });
        }
        this.cd.detectChanges();
      });
  };

  menuClicked = (shouldCloseWhenClicked: boolean): Promise<MatDrawerToggleResult> | null => {
    if (this.position === 'over' && shouldCloseWhenClicked) {
      return this.navMenu.close();
    }
    return null;
  };

  getRouterLink = (link: string): string => {
    // tslint:disable-next-line:no-this-assignment
    const instance: any = this;
    try {
      if (link && link.startsWith('func')) {
        return instance[link]();
      }
      return link;
    } catch (e) {
      return link;
    }
  };

  isRouteVisible = (route: RouteType): boolean => {
    //TODO: add more filters based on ===> section = '', venueSetting = '', permissions: Array<String> = [], onlyIf
    // = '', and many others, also to refactor this to a separate service

    if (route.userRole.length > 0 || route.companyRole.length > 0) {
      // first filter based on user and company roles; means user should poses one of those roles
      const routeUserRole = route.userRole || [];
      const routeCompanyRole = route.companyRole || [];

      const user = new UserType(this.storage.get(Strings.USER_KEY));
      const userRole: string = user.userRole?.toLowerCase();
      const userCompanyRole: string = user.companyRole?.toLowerCase();

      for (const role of routeUserRole) {
        if (userRole === role.toLowerCase()) {
          return true;
        }
      }
      for (const role of routeCompanyRole) {
        if (userCompanyRole === role.toLowerCase()) {
          return true;
        }
      }
      return false;
    }
    return true;
  };

  getIconStyle = (isLinkActive = false): any => {
    if (isLinkActive) {
      return { color: 'yellow', 'font-size': '15px' };
    }
    return { color: 'white', 'font-size': '15px' };
  };

  isRouteActive(item: RouteType) {
    return this.activeRoute === item.link;
  }
}
