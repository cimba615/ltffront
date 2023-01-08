import { Component, OnInit, Input } from '@angular/core';
import { CacheService } from '../../../services/cache.service';
import { ProductListing } from '../../../helpers/product-listing';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ltf-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.sass']
})
export class PlantsComponent extends ProductListing {

  types = [2]; // Plants

  constructor(
    private cache: CacheService,
    private route: ActivatedRoute) {
    super(cache, route);
  }

}
