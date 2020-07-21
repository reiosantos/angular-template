import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import * as mainRoutes from '../main-routes.json';
import { Route } from '@san/shared/models/route';
import { ToolbarComponent } from '@san/modules/main/toolbar/toolbar.component';
import { Config } from '@san/shared/interfaces/config';
import { NavMenu } from '@san/shared/interfaces/nav-menu';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'san-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {
  position: 'over' | 'push' | 'side' = 'side';
  watcher: Subscription;
  activeRoute = '';
  loading = false;
  routes: Route[] = mainRoutes.routes as Route[];
  value = 0;

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild(ToolbarComponent, { static: false }) header: ToolbarComponent;

  constructor(
    private config: Config,
    private navMenu: NavMenu,
    private media: MediaObserver,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  responsiveLogout = () => {
    // TODO: call logout model
    // Logout modal
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
    if (this.watcher) {
      this.watcher.unsubscribe();
    }
  }

  createMediaWatcher = () => {
    this.watcher = this.media.asObservable().subscribe((changes: MediaChange[]) => {
      changes.map(change => {
        if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
          this.navMenu.close().then(() => {
            this.position = 'over';
          });
        } else {
          this.navMenu.open().then(() => {
            this.position = 'side';
          });
        }
      });

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

  funcShowRoute = (section = '', venueSetting = '', permissions: [] = [], onlyIf = ''): boolean => {
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
