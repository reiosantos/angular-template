import { Injectable } from '@angular/core';
import { HttpClient as AHttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@san/shared/interfaces/http-client';

@Injectable()
export class HttpWrapperService extends HttpClient {
  private readonly options: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    observe?: 'body';
    params?: HttpParams | { [param: string]: string | string[] };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  };

  constructor(private httpClient: AHttpClient) {
    super();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*'
    });

    this.options = {
      headers,
      reportProgress: true,
      withCredentials: false,
      params: {}
    };
  }

  prepareOptions = (showLoader: boolean) => {
    let { headers } = this.options;
    // @ts-ignore
    headers = headers.append('Show-Loader', showLoader.toString());

    return { ...this.options, headers };
  };

  post = (endpoint: string, data: any = {}, params: any = {}, showLoader = true): Observable<any> => {
    return this.httpClient.post(endpoint, data, { ...this.prepareOptions(showLoader), params });
  };

  put = (endpoint: string, data: any = {}, params: any = {}, showLoader = true): Observable<any> => {
    return this.httpClient.put(endpoint, data, { ...this.prepareOptions(showLoader), params });
  };

  patch = (endpoint: string, data: any = {}, params: any = {}, showLoader = true): Observable<any> => {
    return this.httpClient.patch(endpoint, data, { ...this.prepareOptions(showLoader), params });
  };

  delete = (endpoint: string, params: any = {}, showLoader = true): Observable<any> => {
    return this.httpClient.delete(endpoint, { ...this.prepareOptions(showLoader), params });
  };

  get = (endpoint: string, params: any = {}, showLoader = true): Observable<any> => {
    return this.httpClient.get(endpoint, { ...this.prepareOptions(showLoader), params });
  };
}
