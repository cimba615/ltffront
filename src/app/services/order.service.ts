import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs/Observable';
import { API_URL, SUBMIT_PAYMENT, COUPON_VALIDATE } from '../Constants';
import { Order } from '../models/order';

@Injectable()
export class OrderService extends ErrorHandlingService {

  constructor(private httpClient: HttpClient) { super(); }

  postOrder(requestData: Order): Observable<any> {
    const url = API_URL + SUBMIT_PAYMENT;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient
    .post(url, requestData, {headers: headers})
    .map(response => response)
    .catch((error: HttpErrorResponse) => this.handleError(error));
  }

  validateCoupon(couponCode: string): Observable<any> {
    const url = API_URL + COUPON_VALIDATE + '?coupon=' + couponCode;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient
    .get(url, {headers: headers})
    .map(response => response)
    .catch((error: HttpErrorResponse) => this.handleError(error));
  }

}
