import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from '../../../services/cache.service';
import { Occasion } from '../../../models/occasion';
import { ProductListing } from '../../../helpers/product-listing';

@Component({
    selector: 'ltf-occasion-products',
    templateUrl: './occasion-products.component.html',
    styleUrls: ['./occasion-products.component.sass']
})
export class OccasionProductsComponent extends ProductListing implements OnInit {
    occasion: Occasion = new Occasion();

    constructor(
        private route: ActivatedRoute,
        private cache: CacheService) {
        super(cache, route);
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params) {
                // (+) converts string 'id' to a number i.e: +params['id']
                this.cache.occasions.subscribe(occs => {
                    if (occs) {
                        this.occasion = occs.find(o => o.ID.toString() === params['occasionId']);

                        this.loadInit();

                        this.lCache.productsSearchFilter.subscribe(s => {
                            clearTimeout(this.searchFilterTimeout);

                            if ((!s && s === '') || s) {
                                this.searchFilterTimeout = setTimeout(() => {
                                    this.searchFilterQuery = s;
                                    this.filterProducts();
                                }, 500);
                            }
                        });

                        this.lCache.productsPriceFilter.subscribe(p => {
                            if (p) {
                                this.priceFilterQuery = p;
                                this.filterProducts();
                            }
                        });

                    }
                });
            }
        });
    }

    loadInit() {
        if (this.occasion) {
            this.cache.productsRefreshed.subscribe(refreshed => {
                if (refreshed) {
                    this.cache.productsRefreshed.next(false);
                    // tslint:disable-next-line:max-line-length
                    this.maxToLoad = this.cache.products.filter(p => p.Occasions.filter(pocc => pocc.ID === this.occasion.ID).length).length;
                    // tslint:disable-next-line:max-line-length
                    this.listingProducts = this.cache.products.filter(p => p.Occasions.filter(pocc => pocc.ID === this.occasion.ID).length);
                    this.filterProducts();
                }
            });

            if (this.cache.products) {
                this.maxToLoad = this.cache.products.filter(p => p.Occasions.filter(pocc => pocc.ID === this.occasion.ID).length).length;
                // tslint:disable-next-line:max-line-length
                this.listingProducts = this.cache.products.filter(p => p.Occasions.filter(pocc => pocc.ID === this.occasion.ID).length);
                this.filterProducts();
            }
        }
    }

}
