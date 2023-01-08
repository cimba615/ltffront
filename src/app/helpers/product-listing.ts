import { Product } from '../models/product';
import { Injectable, OnInit } from '@angular/core';
import { CacheService } from '../services/cache.service';
import { setTimeout } from 'timers';
import { SimpleRange } from '../models/simple-range';
import { ActivatedRoute } from '@angular/router';
@Injectable()
export class ProductListing implements OnInit {
    listingProducts: Product[]; // Unfiltered
    products: Product[]; // Filtered
    maxToLoad = 0;
    cntToLoad = 9;
    types = []; // Default
    lCache: CacheService;
    lRoute: ActivatedRoute;
    searchFilterTimeout: NodeJS.Timer;
    searchFilterQuery = '';
    categoryFilterQuery = 0;
    priceFilterQuery: SimpleRange = null;
    requireBestSeller = false;

    tmpTypes = [];
    tmpBestSeller = false;
    discardingPageFilter = false;

    constructor(
        cache: CacheService,
        route: ActivatedRoute) {
        this.lCache = cache;
        this.lRoute = route;
    }

    ngOnInit() {
        this.lCache.productsRefreshed.subscribe(refreshed => {
            if (refreshed) {
                this.lCache.productsRefreshed.next(false);
                this.listingProducts = this.lCache.products.filter(p => this.types.find(t => t === p.TypeID));
                this.filterProducts();
            }
        });

        if (this.lCache.products) {
            this.listingProducts = this.lCache.products.filter(p => this.types.find(t => t === p.TypeID));
        }

        this.filterProducts();

        this.lCache.productsSearchFilter.subscribe(s => {
         if (s && s.length > 0) {
              if (!this.discardingPageFilter) {
                        this.tmpTypes = this.types;
                        this.tmpBestSeller = this.requireBestSeller;
                        this.discardingPageFilter = true;
                    }

                    // Discard the page type you are on: As requested by Eddy
                    this.types = [1, 2, 3, 4];
                    this.listingProducts = this.lCache.products.filter(p => this.types.find(t => t === p.TypeID));

                    // Discard best seller on home page
                    this.requireBestSeller = false;

                    // Apply filter
                    this.searchFilterQuery = s;
                    this.filterProducts(); } else {
                  this.types = this.tmpTypes;
                    this.requireBestSeller = this.tmpBestSeller;
                    this.discardingPageFilter = false;
                    this.listingProducts = this.lCache.products.filter(p => this.types.find(t => t === p.TypeID));
                    this.searchFilterQuery = null;
                    this.filterProducts(); }
        });

        this.lCache.productsPriceFilter.subscribe(p => {
            if (p) {
                this.priceFilterQuery = p;
                this.filterProducts();
            }
        });

        this.lRoute.params.subscribe(params => {
            this.filterByCateg(params['categId']);
        });
    }

    loadMore() {
        this.cntToLoad += 6;
        this.filterProducts();
        this.products = this.products.slice(0, this.cntToLoad);
    }

    filterProducts() {
        if (!this.listingProducts || this.listingProducts.length === 0) {
            return;
        }

        let prodArray = this.listingProducts;

        if (this.searchFilterQuery) {
            const re = new RegExp('\\b' + this.searchFilterQuery.toLowerCase() + '\\b', 'g');
            let res = null;
            let option2 = this.searchFilterQuery.toLowerCase();
            if (this.searchFilterQuery.endsWith('s')) {
                option2 = this.searchFilterQuery.toLowerCase().slice(0, -1);
                res = new RegExp('\\b' + option2 + '\\b', 'g');

            } else {
                option2 =  this.searchFilterQuery.toLowerCase() + 's';
                res = new RegExp('\\b' + option2 + '\\b', 'g');
            }
            const sssq = this.searchFilterQuery.split(' ');
            const sssq2 = new Array();
            sssq.forEach(element => {
                if (element.toLowerCase().endsWith('s')) {
                   sssq2.push(this.searchFilterQuery.toLowerCase().slice(0, -1));
                } else {
                    sssq2.push(this.searchFilterQuery + 's');
                }
            });
            prodArray = prodArray.filter(p => (p.Name.toLowerCase().match(re) || p.Name.toLowerCase().match(res))
                || (p.Description && (p.Description.toLowerCase().match(re)  || p.Description.toLowerCase().match(res) ))
                || (p.Tags && (sssq.filter(ss => p.Tags.indexOf(ss.toLowerCase()) >= 0).length > 0
                || sssq2.filter(ss => p.Tags.indexOf(ss.toLowerCase()) >= 0).length > 0 )));
        }

        if (this.categoryFilterQuery) {
            prodArray = prodArray.filter(p => p.CategoryID.toString() === this.categoryFilterQuery.toString());
        }

        if (this.priceFilterQuery) {
            prodArray = prodArray.filter(p => p.Price >= this.priceFilterQuery.MIN && p.Price <= this.priceFilterQuery.MAX);
        }

        if (this.requireBestSeller) {
            prodArray = prodArray.filter(p => p.IsBestSeller);
        }

        // Can filter more based on new filter variables and this.products
        this.maxToLoad = prodArray.length;
        this.products = prodArray.slice(0, this.cntToLoad);
    }

    filterByCateg(e: number) {
        if (e) {
            this.categoryFilterQuery = e;
        } else {
            this.categoryFilterQuery = 0;
        }

        this.filterProducts();
    }

    filterByPrice(e) {
        if (e) {
            this.priceFilterQuery = e;
        } else {
            this.priceFilterQuery = null;
        }

        this.filterProducts();
    }
}
