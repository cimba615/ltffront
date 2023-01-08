import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxMasonryOptions } from 'ngx-masonry';
import { MasonryDialogComponent } from '../../../../dialogs/masonry-dialog/masonry-dialog.component';
import { GalleryDetails } from '../gallery-details';
import { CacheService } from '../../../../services/cache.service';

@Component({
  selector: 'ltf-landscaping',
  templateUrl: './landscaping.component.html',
  styleUrls: ['./landscaping.component.sass']
})
export class LandscapingComponent extends GalleryDetails implements OnInit {

  type = 2;

  constructor(
    masonryDialog: MatDialog,
    cache: CacheService) {

    super(masonryDialog, cache);
  }

}
