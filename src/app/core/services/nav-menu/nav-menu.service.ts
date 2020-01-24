import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { PartialObserver, Subject } from 'rxjs';
import { SanNavMenu } from '@san/shared/interfaces/san-nav-menu';

@Injectable()
export class NavMenuService extends SanNavMenu {

  public progressListener = new Subject();

  private sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public showProgress() {
    return this.progressListener.next(true);
  }

  public stopProgress() {
    return this.progressListener.next(false);
  }

  public open() {
    return this.sidenav.open();
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }

  public addSubscriber(subscriber: PartialObserver<{}>) {
    return this.progressListener.subscribe(subscriber);
  }
}
