import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product, Variant } from '../../../models/product';
import { NgbModalRef, NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { CacheService } from '../../../services/cache.service';
import { IMAGES_URL } from '../../../Constants';
import { CartProduct, Cart } from '../../../models/cart';
import { NotificationService } from '../../../services/notification.service';
import { ShareButton } from 'ngx-sharebuttons/button';

@Component({
  selector: 'ltf-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.sass']
})
export class ProductCartComponent implements OnInit {

  product: Product = new Product();
  specialItems: Product[];
  specialBalloons: Product[];
  quantity = 1;
  modalRef: NgbModalRef;
  imgUrl = IMAGES_URL + '/products/';
  selectedSpecialItems: Product[] = [];
  selectedVariant: Variant;

  @ViewChild('prodQty') prodQty: ElementRef;

  constructor(
    private config: NgbCarouselConfig,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private cache: CacheService,
    private toast: NotificationService,
    public share: ShareButton) {
    this.config.interval = 500000000;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cache.productsRefreshed.subscribe(refreshed => {
        if (refreshed) {
          this.cache.productsRefreshed.next(false);
          this.product = this.cache.products.find(p => p.ID.toString() === params['id']);
          // tslint:disable-next-line:max-line-length
          this.specialItems = this.product.SpecialItems.filter(si => si.TypeID === 3 || si.TypeID === 4 );
          this.specialBalloons = this.product.SpecialItems.filter(si => si.TypeID === 5);

          if (this.product.Variants && this.product.Variants.length) {
            this.selectedVariant = this.product.Variants.find(v => v.Price === this.product.Price);
            if (!this.selectedVariant) {
              this.selectedVariant = this.product.Variants[0];
            }

            this.selectedVariant.MatchesProductPrice = true;
          }
        }
      });

      if (this.cache.products) {
        this.product = this.cache.products.find(p => p.ID.toString() === params['id']);
        // tslint:disable-next-line:max-line-length
        this.specialItems = this.product.SpecialItems.filter(si => si.TypeID === 3 || si.TypeID === 4  || -si.CategoryID ===  this.product.CategoryID);
        this.specialBalloons = this.product.SpecialItems.filter(si => si.TypeID === 5);

        if (this.product.Variants && this.product.Variants.length) {
          this.selectedVariant = this.product.Variants.find(v => v.Price === this.product.Price);
          if (!this.selectedVariant) {
            this.selectedVariant = this.product.Variants[0];
          }

          this.selectedVariant.MatchesProductPrice = true;
        }
      }
    });
  }

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addItemToCart(modalContent) {
    this.modalRef = this.modalService.open(modalContent, {
      centered: true,
      size: 'lg'
    });
  }

  toggleSpecialItem(e: any, si: Product) {
    if (e.target.parentNode.classList.value.indexOf('productChecked') >= 0) {
      e.target.parentNode.classList.remove('productChecked');
      this.selectedSpecialItems.splice(this.selectedSpecialItems.findIndex(ssi => ssi.ID === si.ID), 1);
    } else {
      e.target.parentNode.classList.add('productChecked');
      this.selectedSpecialItems.push(si);
    }
  }

  toggleSize(e: any, variant: Variant) {
    for (let i = 0; i < e.target.parentNode.children.length; i++) {
      e.target.parentNode.children[i].classList.remove('productChecked');
    }

    e.target.classList.add('productChecked');

    this.selectedVariant = variant;
  }

  calcSubtotal(): number {
    let res = this.product.Price;

    if (this.product.Variants && this.product.Variants.length) {
      res = this.product.Variants.find(v => v.SizeVariantID === this.selectedVariant.SizeVariantID).Price;
    }

    this.selectedSpecialItems.forEach(p => {
      res += p.Price;
    });

    if (res) {
      return res * this.quantity;
    } else {
      return 0;
    }
  }

  addCartProduct() {
    this.toast.showMessage('Product Added To Cart', 'success');
    const cartProd = new CartProduct();
    cartProd.product = this.product;
    cartProd.quantity = this.quantity;
    cartProd.variant = this.selectedVariant;
    cartProd.addons = [];
    this.selectedSpecialItems.forEach(si => {
      cartProd.addons.push(si);
    });

    this.cache.cartAdd(cartProd);

    this.modalRef.close('resultObject');
  }

  checkout() {
    this.addCartProduct();

    this.router.navigate(['checkoutDetails']);
  }

}
