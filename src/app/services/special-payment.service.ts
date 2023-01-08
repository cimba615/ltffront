import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { API_URL, SPECIAL_PAYMENT, SPECIAL_PAYMENT_LBP } from '../Constants';
import { ErrorHandlingService } from './error-handling.service';

@Injectable()
export class SpecialPaymentService extends ErrorHandlingService {

  constructor(private httpClient: HttpClient) { super(); }

  postSpecialPayment(requestData: any): Observable<any> {
    const url = API_URL + SPECIAL_PAYMENT;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'object': 'objectValue' });

    return this.httpClient
    .post(url, requestData, {headers: headers})
    .map(response => response)
    .catch((error: HttpErrorResponse) => this.handleError(error));
  }
  postSpecialPaymentLBP(requestData: any): Observable<any> {
    const url = API_URL + SPECIAL_PAYMENT_LBP;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'object': 'objectValue' });

    return this.httpClient
    .post(url, requestData, {headers: headers})
    .map(response => response)
    .catch((error: HttpErrorResponse) => this.handleError(error));
  }
}
