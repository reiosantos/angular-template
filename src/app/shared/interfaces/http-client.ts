import { Observable } from 'rxjs';

export abstract class HttpClient {
  abstract post(endpoint: string, data?: any, params?: any): Observable<any>;

  abstract put(endpoint: string, data?: any, params?: any): Observable<any>;

  abstract patch(endpoint: string, data?: any, params?: any): Observable<any>;

  abstract delete(endpoint: string, params?: any): Observable<any>;

  abstract get(endpoint: string, params?: any): Observable<any>;
}
