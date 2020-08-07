import { Observable } from 'rxjs';

export abstract class User {
  abstract currentUser(): Observable<any>;
}
