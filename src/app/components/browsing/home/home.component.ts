import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CacheService } from '../../../services/cache.service';
import { BannerImage } from '../../../models/banner-image';
import { IMAGES_URL } from '../../../Constants';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductListing } from '../../../helpers/product-listing';
import { Bundle } from '../../../models/bundle';

@Component({
  selector: 'ltf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent extends ProductListing implements OnInit {

  giftIdeaImage: string;
  giftIdeaText: string;
  customBouquetImage: string;
  customBouquetText: string;
  products: Product[];
  bundles: Bundle[];
  banners: BannerImage[];
  ImgURL = IMAGES_URL + '/banners/';

  types = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  cntToLoad = 6;
  requireBestSeller = true;

  constructor(
    config: NgbCarouselConfig,
    private cache: CacheService,
    private router: Router,
    private route: ActivatedRoute) {
    super(cache, route);

    // customize default values of carousels used by this component tree
    config.wrap = true;
    config.interval = 10000;
  }

  ngOnInit() {
    super.ngOnInit();

    this.cache.bannerImages.subscribe(data => {
      if (data) {
        this.banners = data;
      }
    });

    this.cache.bundles.subscribe(data => {
      if (data) {
        this.bundles = data;
      }
    });

    this.cache.settings.subscribe(s => {
      const giftSettings = s.filter(gs => gs.Section === 'Gift Idea');
      this.giftIdeaImage = giftSettings.find(setting => setting.Name === 'Image').Value;
      this.giftIdeaText = giftSettings.find(setting => setting.Name === 'Text').Value;
      const customBouquet = s.filter(gs => gs.Section === 'Custom Bouquet');
      this.customBouquetImage = customBouquet.find(setting => setting.Name === 'Image').Value;
      this.customBouquetText = customBouquet.find(setting => setting.Name === 'Text').Value;
    });
  }

  actionClick(a: number, p: number) {
    switch (a) {
      case 2:
        this.router.navigate(['aboutus']);
        break;
      default:
        this.router.navigate(['occasionProducts', p]);
        break;
    }
  }

}
