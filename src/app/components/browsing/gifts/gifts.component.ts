import { Component } from '@angular/core';
import { CacheService } from '../../../services/cache.service';
import { ProductListing } from '../../../helpers/product-listing';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ltf-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.sass']
})
export class GiftsComponent extends ProductListing {

  types = [3, 4]; // Gifts

  constructor(
    private config: NgbCarouselConfig,
    private cache: CacheService,
    private route: ActivatedRoute) {
    super(cache, route);

    // customize default values of carousels used by this component tree
    config.wrap = true;
    config.interval = 10000;
  }

}
