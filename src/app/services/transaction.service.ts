import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs/Observable';
import { API_URL, TRANSACTION_STATUS } from '../Constants';
import { Transaction } from '../models/transaction';

@Injectable()
export class TransactionService extends ErrorHandlingService {

  constructor(private httpClient: HttpClient) { super(); }

  getStatus(txRef): Observable<Transaction> {
    const url = API_URL + TRANSACTION_STATUS + '?txRef=' + txRef;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<Transaction>(url, { headers: headers })
                          .map(response => response)
                          .catch((error: HttpErrorResponse) => this.handleError(error));
  }

}
