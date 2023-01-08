import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../../services/cache.service';
import { Occasion } from '../../../models/occasion';
import { IMAGES_URL } from '../../../Constants';

@Component({
  selector: 'ltf-occasions',
  templateUrl: './occasions.component.html',
  styleUrls: ['./occasions.component.sass']
})
export class OccasionsComponent implements OnInit {

  occasions: Occasion[];
  imgUrl = IMAGES_URL;

  constructor(private cache: CacheService) { }

  ngOnInit() {
    this.cache.occasions.subscribe(data => {
      this.occasions = data;
    });
  }

}
