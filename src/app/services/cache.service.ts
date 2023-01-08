import { Injectable } from '@angular/core';
import { Occasion } from '../models/occasion';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { OccasionsService } from './occasions.service';
import { CategoriesService } from './categories.service';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { SimpleRange } from '../models/simple-range';
import { SettingsService } from './settings.service';
import { Setting } from '../models/setting';
import { GalleryService } from './gallery.service';
import { GalleryImage } from '../models/gallery-image';
import { BannerImage } from '../models/banner-image';
import { Cart, CartProduct, CustomFlower } from '../models/cart';
import { LogisticsService } from './logistics.service';
import { City } from '../models/city';
import { Bundle } from '../models/bundle';
import { LoadingService } from './loading.service';

@Injectable()
export class CacheService {
  settings: Observable<Setting[]>;
  occasions: Observable<Occasion[]>;
  categories: Observable<Category[]>;
  products: Product[]; // Observable<Product[]>;
  productsRefreshed: Subject<boolean> = new Subject();
  bundles: Observable<Bundle[]>;
  productsSearchFilter: Subject<string> = new Subject();
  productsPriceFilter: Subject<SimpleRange> = new Subject();
  galleryImages: Observable<GalleryImage[]>;
  bannerImages: Observable<BannerImage[]>;
  cities: Observable<City[]>;
  customFlowers: Observable<CustomFlower[]>;

  cart = new Cart();

  constructor(
    private loadingSevice: LoadingService,
    private occasionsService: OccasionsService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private settingService: SettingsService,
    private galleryService: GalleryService,
    private logisticsService: LogisticsService) { }

  init() {
    // this.loadingSevice.showLoading(); // Disable spinner for development
    // init observables
    this.bannerImages = this.galleryService.listBanners();
    this.galleryImages = this.galleryService.listImages();
    this.occasions = this.occasionsService.getList();
    this.categories = this.categoriesService.getList();
    // this.products = this.productsService.getList();
    this.productsRefreshed.next(false);
    this.productsService.getList().subscribe(data => {
      this.products = data;
      this.occasionsService.getList().subscribe(occs => {
        this.products.forEach(p => {
          p.SpecialItems = [];

          occs.filter(occ => p.Occasions.map(oc => oc.ID).indexOf(occ.ID) > -1).forEach(occ => {
            occ.SpecialItems.forEach(si => {
              p.SpecialItems.push(si);
            });
          });
        });
        this.categoriesService.getList().subscribe(cats => {
          this.products.forEach(c => {
           cats.filter(cat => cat.ID === c.CategoryID).forEach(c2 => {
              c2.SpecialItems.forEach(sp => {
                if (c.SpecialItems.filter( csp => csp.ID === sp.ID).length === 0) {
                  c.SpecialItems.unshift(sp);
                }
              });
            });
          });
          this.productsRefreshed.next(true);
          this.loadingSevice.hideLoading();
        });
      });
    });
    this.bundles = this.productsService.getBundleList();
    this.customFlowers = this.productsService.getCustomFlowers();
    this.cities = this.logisticsService.listCities();
    this.settings = this.settingService.getList();

    if (localStorage.getItem('userCart')) {
      this.cart = JSON.parse(localStorage.getItem('userCart'));
    } else {
      localStorage.setItem('userCart', JSON.stringify(this.cart));
    }
  }

  updateSearchQuery(value: string) {
    this.productsSearchFilter.next(value);
  }

  updatePriceQuery(min: number, max: number) {
    this.productsPriceFilter.next(new SimpleRange(min, max));
  }

  cartAdd(p: CartProduct) {
    this.cart.cartProducts.push(p);
    localStorage.setItem('userCart', JSON.stringify(this.cart));
  }

  cartRemove(p: CartProduct) {
    this.cart.cartProducts.splice(this.cart.cartProducts.findIndex(cp => cp.ID === p.ID), 1);
    localStorage.setItem('userCart', JSON.stringify(this.cart));
  }

  cartUpdate() {
    localStorage.setItem('userCart', JSON.stringify(this.cart));
  }

}
