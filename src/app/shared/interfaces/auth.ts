import { Observable } from 'rxjs';

export abstract class Auth {
  abstract login(username: string, password: string): Observable<any>;
}
