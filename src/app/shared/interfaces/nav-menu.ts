import { PartialObserver, Subscription } from 'rxjs';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';

export abstract class NavMenu {
  abstract setSidenav(sidenav: MatSidenav): void;

  abstract showProgress(): void;

  abstract stopProgress(): void;

  abstract open(): Promise<MatDrawerToggleResult>;

  abstract close(): Promise<MatDrawerToggleResult>;

  abstract get opened(): boolean;

  abstract get mode(): 'over' | 'push' | 'side';

  abstract toggle(): void;

  abstract addSubscriber(subscriber: PartialObserver<{}>): Subscription;
}
