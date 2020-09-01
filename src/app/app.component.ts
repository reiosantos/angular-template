import { Component, Inject, OnInit } from '@angular/core';
import { Config } from '@san/shared/interfaces/config';
import { Logger } from '@san/shared/interfaces/logger-publisher';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { StoreSelectors, StoreState } from '@san/store';
import { AuthToken } from '@san/shared/interfaces/auth-token';
import { Store } from '@ngrx/store';
import { WINDOW } from '@san/core/providers/injetion-tokens';

@Component({
  selector: 'san-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private headerTitle: string;

  constructor(
    private vcConfig: Config,
    private vcLogger: Logger,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<StoreState>,
    private authToken: AuthToken,
    @Inject(WINDOW) private win: any
  ) {}

  private getHeaderTitleFromRouteData = () => {
    let route = this.activatedRoute.firstChild;
    if (!route) {
      return;
    }

    while (route.firstChild) {
      route = route.firstChild;
    }

    if (route.outlet === 'primary') {
      route.data.subscribe(value => {
        this.headerTitle = value.title;
        this.titleService.setTitle(this.headerTitle || 'No Title');
      });
    }
  };

  isAuthenticated = (user: any): any => {
    const token: any = this.authToken.getTokenData();

    const { routerState } = this.router;
    const onAuthPage = routerState.snapshot.url.match('auth');

    const fn = () => {
      // can dispatch action to fetch current user info from backend
      // this.store.dispatch(new StoreActions.user.CurrentUserFetchAction());
      if (onAuthPage) {
        this.router.navigate(['/']);
      }
    };

    if (user && user.token) {
      return fn();
    }

    if (token && token.username && token.user_id && token.email) {
      return fn();
    }
  };

  ngOnInit(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.getHeaderTitleFromRouteData();
      }
    });
    this.store.select(StoreSelectors.selectAuthUser).subscribe(this.isAuthenticated);
  }
}
