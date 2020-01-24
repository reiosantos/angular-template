import { MatDrawerToggleResult, MatSidenav } from '@angular/material';
import { PartialObserver, Subscription } from 'rxjs';

export abstract class SanNavMenu {
  abstract setSidenav(sidenav: MatSidenav): void;

  abstract showProgress(): void;

  abstract stopProgress(): void;

  abstract open(): Promise<MatDrawerToggleResult>;

  abstract close(): Promise<MatDrawerToggleResult>;

  abstract toggle(): void;

  abstract addSubscriber(subscriber: PartialObserver<{}>): Subscription;
}
