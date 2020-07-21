import { Observable } from 'rxjs';

export abstract class UserI {
  abstract currentUser(): Observable<any>;
}
