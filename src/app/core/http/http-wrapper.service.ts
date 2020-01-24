import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SanHttpClient } from '@san/shared/interfaces/san-http-client';

@Injectable()
export class HttpWrapperService extends SanHttpClient {
  private readonly options: {
    headers?: HttpHeaders | { [header: string]: string | string[]; };
    observe?: 'body';
    params?: HttpParams | { [param: string]: string | string[]; };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  };

  constructor(private httpClient: HttpClient) {
    super();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*'
    });

    this.options = {
      headers,
      reportProgress: true,
      withCredentials: true,
      params: {}
    };
  }

  post = (endpoint: string, data: any = {}, params: any = {}): Observable<any> => {
    return this.httpClient.post(endpoint, data, { ...this.options, params });
  };

  put = (endpoint: string, data: any = {}, params: any = {}): Observable<any> => {
    return this.httpClient.put(endpoint, data, { ...this.options, params });
  };

  patch = (endpoint: string, data: any = {}, params: any = {}): Observable<any> => {
    return this.httpClient.patch(endpoint, data, { ...this.options, params });
  };

  delete = (endpoint: string, params: any = {}): Observable<any> => {
    return this.httpClient.delete(endpoint, { ...this.options, params });
  };

  get = (endpoint: string, params: any = {}): Observable<any> => {
    return this.httpClient.get(endpoint, { ...this.options, params });
  };
}
