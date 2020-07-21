import { Config } from '@san/shared/interfaces/config';
import { of } from 'rxjs';

export function configFactory(appConfigService: Config): () => Promise<any> {
  // return (): Promise<any> => of(true).toPromise();
  return (): Promise<any> => appConfigService.initSettings().toPromise();
}
