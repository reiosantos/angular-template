import { Component, OnInit } from '@angular/core';
import { SanConfig } from '@san/shared/interfaces/san-config';
import { SanLogger } from '@san/shared/interfaces/san-logger-publisher';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'san-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private headerTitle: string;

  constructor(
    private vcConfig: SanConfig,
    private vcLogger: SanLogger,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  private getHeaderTitleFromRouteData = () => {
    let route = this.activatedRoute.firstChild;
    if (!route) {
      return;
    }

    while (route.firstChild) {
      route = route.firstChild;
    }

    if (route.outlet === 'primary') {
      route.data.subscribe((value) => {
        this.headerTitle = value.title;
        this.titleService.setTitle(`SAN - ${this.headerTitle}`);
      });
    }
  };

  ngOnInit(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.getHeaderTitleFromRouteData();
      }
    });
  }
}
