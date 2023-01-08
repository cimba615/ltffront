import { Component, OnInit } from '@angular/core';
import { Cart, CartProduct } from '../../models/cart';
import { CacheService } from '../../services/cache.service';
import { IMAGES_URL } from '../../Constants';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ltf-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {
  cart: Cart;
  imgURL = IMAGES_URL + '/products/';
  bndlURL = IMAGES_URL + '/bundles/';
  bqtURL = IMAGES_URL + '/customBouquet/customBouquet.jpg';
  constructor(public cache: CacheService,
    private router: Router,
    ) {}


  
  ngOnInit(): void {
    this.cart = this.cache.cart;
  }

  getCartProductImage(cp: CartProduct) {
    if (cp.product.ID) {
      return this.imgURL + cp.product.Image;
    }
    if (cp.customBouquet && cp.customBouquet.length) {
      return this.bqtURL;
    }
    if (cp.bundle) {
      return this.bndlURL + cp.bundle.Image;
    }
  }

  calculateUnitPrice(cp: CartProduct): number {
    if (cp.product.ID) {
      let unitPrice: number = cp.product.Price;

      if (cp.variant) {
        unitPrice = cp.variant.Price;
      }

      cp.addons.forEach((p) => {
        unitPrice += p.Price;
      });

      return unitPrice;
    }

    if (cp.customBouquet && cp.customBouquet.length) {
      let total = 0;
      cp.customBouquet.forEach((f) => {
        total += f.Price * f.Quantity;
      });

      return total;
    }

    if (cp.bundle) {
      return cp.bundle.Price;
    }
  }

  calculateTotalPrice(cp: CartProduct): number {
    return cp.quantity * this.calculateUnitPrice(cp);
  }

  calculateSubTotal(): number {
    let subtotal = 0;
    this.cart.cartProducts.forEach((cp) => {
      subtotal += this.calculateTotalPrice(cp);
    });

    return subtotal;
  }

  removeItem(cp: CartProduct) {
    this.cache.cartRemove(cp);
  }
  checkout() {
    this.router.navigate(['checkoutDetails']);
  }
  
}
