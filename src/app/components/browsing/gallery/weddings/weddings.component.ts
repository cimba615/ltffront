import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GalleryDetails } from '../gallery-details';
import { CacheService } from '../../../../services/cache.service';

@Component({
  selector: 'ltf-weddings',
  templateUrl: './weddings.component.html',
  styleUrls: ['./weddings.component.sass']
})
export class WeddingsComponent extends GalleryDetails implements OnInit {

  type = 1;

  constructor(
    masonryDialog: MatDialog,
    cache: CacheService) {

    super(masonryDialog, cache);
  }

}
