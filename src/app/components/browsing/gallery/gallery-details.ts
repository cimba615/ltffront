import { Injectable, OnInit } from '@angular/core';
import { GalleryImage } from '../../../models/gallery-image';
import { NgxMasonryOptions } from 'ngx-masonry';
import { MatDialog } from '@angular/material/dialog';
import { MasonryDialogComponent } from '../../../dialogs/masonry-dialog/masonry-dialog.component';
import { CacheService } from '../../../services/cache.service';
import { IMAGES_URL } from '../../../Constants';
@Injectable()
export class GalleryDetails implements OnInit {

    type = 1;
    imgURL = IMAGES_URL + '/gallery/';
    allImages: GalleryImage[];
    masonryImages;
    maxToLoad = 0;
    cntToLoad = 15;

    public masonryOptions: NgxMasonryOptions = {
        // transitionDuration: '1s',
        gutter: 0,
        resize: true,
        initLayout: true,
        fitWidth: false,
        horizontalOrder: false
    };

    constructor(
        public masonryDialog: MatDialog,
        private cache: CacheService) { }

    ngOnInit() {
        this.cache.galleryImages.subscribe(images => {
            if (images) {
                this.allImages = images.filter(i => i.TypeID === this.type).sort((a, b) => {
                    return a.DisplayOrder - b.DisplayOrder;
                });

                this.maxToLoad = this.allImages.length;
            }

            if (this.allImages) {
                this.masonryImages = this.allImages.slice(0, this.cntToLoad);
            }
        });
    }

    loadMore() {
        this.cntToLoad += 5;
        this.masonryImages = this.allImages.slice(0, this.cntToLoad);
    }

    openDialog(title: string, imageURL): void {
        const dialogRef = this.masonryDialog.open(MasonryDialogComponent, {
            width: '600px',
            panelClass: 'panelClass',
            data: { title: title, image: imageURL }
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
        });
    }
}
