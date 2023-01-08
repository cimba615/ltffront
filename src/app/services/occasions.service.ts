import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API_URL, OCCASIONS_LIST } from '../Constants';
import { ErrorHandlingService } from './error-handling.service';
import { Occasion } from '../models/occasion';

@Injectable()
export class OccasionsService extends ErrorHandlingService {

  constructor(private httpClient: HttpClient) { super(); }

  getList(): Observable<Occasion[]> {
    const url = API_URL + OCCASIONS_LIST;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient
                  .get<Occasion[]>(url, {headers: headers})
                  .map(response => response)
                  .catch((error: HttpErrorResponse) => this.handleError(error));
  }

}
