import { Injectable } from '@angular/core';
import { PartialObserver, Subject } from 'rxjs';
import { NavMenu } from '@san/shared/interfaces/nav-menu';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class NavMenuService extends NavMenu {
  private progressListener = new Subject();

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

  public addSubscriber(subscriber: PartialObserver<Record<string, unknown>>) {
    return this.progressListener.subscribe(subscriber);
  }
}
