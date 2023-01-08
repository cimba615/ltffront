import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs/Observable';
import { API_URL, PRODUCT_LIST, BUNDLE_LIST, CUSTOMFLOWER_LIST } from '../Constants';
import { Product } from '../models/product';
import { Bundle } from '../models/bundle';
import { CustomFlower } from '../models/cart';

@Injectable()
export class ProductsService extends ErrorHandlingService {

  constructor(private httpClient: HttpClient) { super(); }

  getList(): Observable<Product[]> {
    const url = API_URL + PRODUCT_LIST;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<Product[]>(url, { headers: headers })
                          .map(response => response)
                          .catch((error: HttpErrorResponse) => this.handleError(error));
  }

  getBundleList(): Observable<Bundle[]> {
    const url = API_URL + BUNDLE_LIST;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<Bundle[]>(url, { headers: headers })
                          .map(response => response)
                          .catch((error: HttpErrorResponse) => this.handleError(error));
  }

  getCustomFlowers(): Observable<CustomFlower[]> {
    const url = API_URL + CUSTOMFLOWER_LIST;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<CustomFlower[]>(url, { headers: headers })
                          .map(response => {
                            response.forEach(cf => cf.Quantity = 0);
                            return response;
                          })
                          .catch((error: HttpErrorResponse) => this.handleError(error));
  }
}
