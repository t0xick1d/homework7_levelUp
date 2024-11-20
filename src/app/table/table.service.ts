import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { AbstractService } from '../shared/rep.service';
import { HttpConnector } from '../shared/httpConnector';
import { Router } from '@angular/router';

import { Product, newProduct } from '../interface/table.interface';
import { FilterConfig } from '../interface/table.interface';
import { Filter } from '../store/shared/filter.inerface';

@Injectable({
  providedIn: 'root',
})
export class TableService extends AbstractService {
  public productSubject = new BehaviorSubject<Product[]>([]);
  public filterSubject = new BehaviorSubject<FilterConfig[]>([]);

  constructor(private http: HttpConnector, private router: Router) {
    super();
  }

  public getData(): Observable<any> {
    return this.http
      .request({
        method: 'GET',
        urlPath: `api/${this.router.url.slice(1)}/products`,
      })
      .pipe(
        catchError((error: any) => {
          return this.handelError(error);
        })
      );
  }
  public getDataFilter(): Observable<any> {
    return this.http
      .request({
        method: 'GET',
        urlPath: `api/${this.router.url.slice(1)}/filters`,
      })
      .pipe(
        catchError((error: any) => {
          return this.handelError(error);
        })
      );
  }
  public nGetData() {
    // this.getData().subscribe((data) => {
    //   this.productSubject.next(data.body);
    // });
    return this.getData();
  }
  public nGetDataFilter() {
    // this.getDataFilter().subscribe((data) => {
    //   this.filterSubject.next(data.body);
    //   return data.body;
    // });
    // this.getDataFilter().subscribe((data) => data.body);
    return this.getDataFilter();
  }
  public postData(body: newProduct): Observable<any> {
    return this.http
      .request({ method: 'POST', urlPath: `products`, body })
      .pipe(
        catchError((error: any) => {
          return this.handelError(error);
        })
      );
  }
  public putData(body: Product): Observable<any> {
    return this.http
      .request({ method: 'PUT', urlPath: `products/${body.id}`, body })
      .pipe(
        catchError((error: any) => {
          return this.handelError(error);
        })
      );
  }

  public deleteData(productID: number): Observable<any> {
    return this.http
      .request({ method: 'DELETE', urlPath: `products/${productID}` })
      .pipe(
        catchError((error: any) => {
          return this.handelError(error);
        })
      );
  }
}
