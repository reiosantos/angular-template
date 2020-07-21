import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken('window', {
  providedIn: 'root',
  factory: () => window
});

export const TIME_INTERVAL = new InjectionToken<number>('timeInterval', {
  providedIn: 'root',
  factory: () => 30
});
