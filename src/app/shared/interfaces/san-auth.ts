import { Observable } from 'rxjs';

export abstract class SanAuth {
  abstract login(username: string, password: string): Observable<any>;
}
