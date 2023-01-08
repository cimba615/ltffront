import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs/Observable';
import { API_URL, CITIES_LIST } from '../Constants';
import { City } from '../models/city';

@Injectable()
export class LogisticsService extends ErrorHandlingService {

  constructor(private httpClient: HttpClient) { super(); }

  listCities(): Observable<City[]> {
    const url = API_URL + CITIES_LIST;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<City[]>(url, { headers: headers })
                          .map(response => response)
                          .catch((error: HttpErrorResponse) => this.handleError(error));
  }

}
