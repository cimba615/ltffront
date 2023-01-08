import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { API_URL, CONTACT } from '../Constants';
import { ErrorHandlingService } from './error-handling.service';

@Injectable()
export class ContactService extends ErrorHandlingService {

  constructor(private httpClient: HttpClient) { super(); }

  postContact(requestData: any): Observable<any> {
    const url = API_URL + CONTACT;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'object': 'objectValue' });

    return this.httpClient
    .post(url, requestData, {headers: headers})
    .map(response => response)
    .catch((error: HttpErrorResponse) => this.handleError(error));
  }

}
