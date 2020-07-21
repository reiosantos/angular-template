import { Observable } from 'rxjs';
import { Constants } from '@san/shared/interfaces/constants';

export abstract class Config {
  env: Constants;
  venueSettings: any;
  availableLanguages: any;
  translations: any;

  abstract initSettings(): Observable<any>;
}
