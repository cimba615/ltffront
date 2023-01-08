import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpError } from '../models/httpError';
import { of } from 'rxjs';

@Injectable()
export class ErrorHandlingService {

  constructor() { }

  handleError(error: HttpErrorResponse): Observable<any> {
    const httpError = new HttpError();
    httpError.status = error.status;
    httpError.srcError = (error.error) ? error.error.Message : '';
    httpError.url = error.url;
    return of(httpError);
  }
}
