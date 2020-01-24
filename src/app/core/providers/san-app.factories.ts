import { SanConfig } from '@san/shared/interfaces/san-config';
import { of } from 'rxjs';

export function configFactory(appConfigService: SanConfig): () => Promise<any> {
  return (): Promise<any> => of(true).toPromise();
  // return (): Promise<any> => appConfigService.initSettings().toPromise();
}
