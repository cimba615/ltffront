import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { API_URL, ACCOUNT_LOGIN, ACCOUNT_UPDATE, ACCOUNT_REGISTER, ACCOUNT_RESETPASS, ACCOUNT_VALIDATEPASS } from '../Constants';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService extends ErrorHandlingService {

  constructor(private httpClient: HttpClient) {

    super();
  }

  Register(email: string, password: string, newsletter: boolean) {
    const url = API_URL + ACCOUNT_REGISTER;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const requestData = {
      Username: email,
      Password: password,
      Newsletter: newsletter
    };

    return this.httpClient
      .post(url, requestData, { headers: headers/*, observe: 'response'*/ })
      .map(response => response)
      .catch((error: HttpErrorResponse) => this.handleError(error));
  }

  LogIn(email: string, password: string): Observable<any> {
    const url = API_URL + ACCOUNT_LOGIN;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const requestData = {
      Username: email,
      Password: password
    };

    return this.httpClient
      .post(url, requestData, { headers: headers/*, observe: 'response'*/ })
      .map(response => response)
      .catch((error: HttpErrorResponse) => this.handleError(error));
  }

  ValidatePass(request: any): Observable<any> {
    const url = API_URL + ACCOUNT_VALIDATEPASS;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient
      .post(url, request, { headers: headers/*, observe: 'response'*/ })
      .map(response => response)
      .catch((error: HttpErrorResponse) => this.handleError(error));
  }

  ResetPass(email: string): Observable<any> {
    const url = API_URL + ACCOUNT_RESETPASS;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient
      .post(url, {email: email}, { headers: headers/*, observe: 'response'*/ })
      .map(response => response)
      .catch((error: HttpErrorResponse) => this.handleError(error));
  }

  UpdateProfile(user: User) {
    const url = API_URL + ACCOUNT_UPDATE;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient
      .post(url, user, { headers: headers })
      .map(response => response)
      .catch((error: HttpErrorResponse) => this.handleError(error));
  }

}
