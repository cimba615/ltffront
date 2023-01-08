import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GalleryDetails } from '../gallery-details';
import { CacheService } from '../../../../services/cache.service';

@Component({
  selector: 'ltf-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent extends GalleryDetails implements OnInit {

  type = 3;

  constructor(
    masonryDialog: MatDialog,
    cache: CacheService) {

    super(masonryDialog, cache);
  }

}
