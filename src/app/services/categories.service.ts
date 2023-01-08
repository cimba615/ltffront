import { Injectable } from '@angular/core';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { API_URL, CATEGORIES_LIST } from '../Constants';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable()
export class CategoriesService extends ErrorHandlingService {

  constructor(private httpClient: HttpClient) { super(); }

  getList(): Observable<Category[]> {
    const url = API_URL + CATEGORIES_LIST;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient
                  .get<Category[]>(url, {headers: headers})
                  .map(response => response)
                  .catch((error: HttpErrorResponse) => this.handleError(error));
  }

}
