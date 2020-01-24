import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import * as mainRoutes from '../main-routes.json';
import { SanRoute } from '@san/shared/models/san-route';
import { ToolbarComponent } from '@san/modules/main/toolbar/toolbar.component';
import { SanConfig } from '@san/shared/interfaces/san-config';
import { SanNavMenu } from '@san/shared/interfaces/san-nav-menu';

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
  routes: SanRoute[] = mainRoutes.routes as SanRoute[];
  value = 0;

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild(ToolbarComponent, { static: false }) header: ToolbarComponent;

  constructor(
    private sanConfig: SanConfig,
    private sanNavMenu: SanNavMenu,
    private media: MediaObserver,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {
  }

  responsiveLogout = () => {
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
    this.sanNavMenu.setSidenav(this.sidenav);
    this.createMediaWatcher();
  }

  ngOnDestroy() {
    if (this.watcher) {
      this.watcher.unsubscribe();
    }
  }

  createMediaWatcher = () => {
    this.watcher = this.media.asObservable().subscribe((changes: MediaChange[]) => {
      changes.map((change) => {
        if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
          this.sanNavMenu.close().then(() => {
            this.position = 'over';
          });
        } else {
          this.sanNavMenu.open().then(() => {
            this.position = 'side';
          });
        }
      });

      this.cd.detectChanges();
    });
  };

  menuClicked = (shouldCloseWhenClicked: boolean): Promise<MatDrawerToggleResult>|null => {
    if (this.position === 'over' && shouldCloseWhenClicked) {
      return this.sanNavMenu.close();
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

  funcGetBookEventLink = (): string => {
    return !!+this.sanConfig.venueSettings.ENTERPRISE_VENUE
      ? 'booking-create.venue-select'
      : 'booking-create.event-select';
  };

  funcShowRoute = (
    section: string = '', venueSetting: string = '', permissions: [] = [],
    onlyIf: string = ''
  ): boolean => {
    // TODO: check for relevant settings if this route should be displayed to the currently
    //  logged in user
    return false;
  };

  getIconStyle = (isLinkActive: boolean = false): any => {
    if (isLinkActive) {
      return { color: 'yellow' };
    }
    return { color: 'white' };
  };
}
