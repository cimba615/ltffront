import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { API_URL, SETTINGS_LIST } from '../Constants';
import { Observable } from 'rxjs/Observable';
import { Setting } from '../models/setting';

@Injectable()
export class SettingsService extends ErrorHandlingService {

  constructor(private httpClient: HttpClient) { super(); }

  getList(): Observable<Setting[]> {
    const url = API_URL + SETTINGS_LIST;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<Setting[]>(url, { headers: headers })
                          .map(response => response)
                          .catch((error: HttpErrorResponse) => this.handleError(error));
  }
}
