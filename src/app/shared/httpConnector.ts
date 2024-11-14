import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpConnector {
  protected apiURL = environment.apiURL;
  constructor(private httpClient: HttpClient) {}

  public request(params: {
    urlPath: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    query?: any;
  }): Observable<HttpResponse<any>> {
    const baseUrl = this.apiURL + params.urlPath;
    const method = params.method || 'POST';
    const body = params.body || {};
    const headers = new HttpHeaders('');
    const queryParams = params.query
      ? new HttpParams().appendAll(params.query)
      : undefined;

    const httpRequest = new HttpRequest(method, baseUrl, body, {
      headers,
      params: queryParams,
    });

    return new Observable<HttpResponse<any>>((observer) => {
      this.httpClient
        .request(httpRequest)
        .pipe(
          filter((response) => {
            return response instanceof HttpResponse;
          })
        )
        .subscribe({
          next: (response: HttpResponse<any>) => {
            switch (response.status) {
              case 200:
              case 201:
                observer.next(response);
                observer.complete();
                break;
              case 210:
                observer.error();
                observer.complete();
            }
          },
          error: (error: HttpErrorResponse) => {
            switch (error.status) {
              case 400:
              case 404:
              case 500:
              case 503:
                observer.error(error);
                observer.complete();
                break;
              default:
                throw new Error('Respons status invalid');
            }
          },
        });
    });
  }
}
