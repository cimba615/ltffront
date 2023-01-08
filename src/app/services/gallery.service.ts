import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs/Observable';
import { API_URL, GALLERY_IMAGES_LIST, GALLERY_BANNERS_LIST } from '../Constants';
import { GalleryImage } from '../models/gallery-image';
import { BannerImage } from '../models/banner-image';

@Injectable()
export class GalleryService extends ErrorHandlingService {

  constructor(private httpClient: HttpClient) { super(); }

  listImages(): Observable<GalleryImage[]> {
    const url = API_URL + GALLERY_IMAGES_LIST;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<GalleryImage[]>(url, { headers: headers })
                          .map(response => response)
                          .catch((error: HttpErrorResponse) => this.handleError(error));
  }

  listBanners(): Observable<BannerImage[]> {
    const url = API_URL + GALLERY_BANNERS_LIST;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<BannerImage[]>(url, { headers: headers })
                          .map(response => response)
                          .catch((error: HttpErrorResponse) => this.handleError(error));
  }

}
