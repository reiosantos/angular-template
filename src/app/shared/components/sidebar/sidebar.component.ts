import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import * as mainRoutes from '@san/routes.json';
import { RouteType } from '@san/shared/models/route-type';
import { ToolbarComponent } from '@san/shared/components/toolbar/toolbar.component';
import { Config } from '@san/shared/interfaces/config';
import { NavMenu } from '@san/shared/interfaces/nav-menu';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

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
    public breakpointObserver: BreakpointObserver
  ) {}

  responsiveLogout = () => {
    this.toolbarComponent.showLogoutModal();
  };

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  funcShowRoute = (section = '', venueSetting = '', permissions: Array<String> = [], onlyIf = ''): boolean => {
    // TODO: check for relevant settings if this route should be displayed to the currently
    //  logged in user
    return false;
  };

  getIconStyle = (isLinkActive = false): any => {
    if (isLinkActive) {
      return { color: 'yellow' };
    }
    return { color: 'white' };
  };
}
