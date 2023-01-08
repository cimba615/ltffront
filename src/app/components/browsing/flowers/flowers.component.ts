import { Component } from '@angular/core';
import { ProductListing } from '../../../helpers/product-listing';
import { CacheService } from '../../../services/cache.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ltf-flowers',
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.sass']
})
export class FlowersComponent extends ProductListing {

  types = [1]; // Flowers

  constructor(
    private cache: CacheService,
    private route: ActivatedRoute) {
    super(cache, route);
  }

}
