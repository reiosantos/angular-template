import { Observable } from 'rxjs';

export abstract class HttpClient {
  abstract post<T>(endpoint: string, data?: any, params?: any, showLoader?: boolean): Observable<T>;

  abstract put<T>(endpoint: string, data?: any, params?: any, showLoader?: boolean): Observable<T>;

  abstract patch<T>(endpoint: string, data?: any, params?: any, showLoader?: boolean): Observable<T>;

  abstract delete<T>(endpoint: string, params?: any, showLoader?: boolean): Observable<T>;

  abstract get<T>(endpoint: string, params?: any, showLoader?: boolean): Observable<T>;
}
