import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AbstractService {
  constructor() {}

  protected handelError(error: any): Observable<any> {
    return throwError(error);
  }
}
