import { Observable } from 'rxjs';
import { SanConstants } from '@san/shared/interfaces/san-constants';

export abstract class SanConfig {
  env: SanConstants;
  venueSettings: any;
  availableLanguages: any;
  translations: any;

  abstract initSettings(): Observable<any>;
}
