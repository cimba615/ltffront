import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGES_URL } from '../../../Constants';
import { TransactionService } from '../../../services/transaction.service';
import { Transaction } from '../../../models/transaction';
import { Cart as ModelsCart, CartProduct, CartCoupon } from '../../../models/cart';
import { CacheService } from '../../../services/cache.service';

@Component({
  selector: 'ltf-areeba-hook',
  templateUrl: './areeba-hook.component.html',
  styleUrls: ['./areeba-hook.component.sass']
})
export class AreebaHookComponent implements OnInit {
  imgUrl = IMAGES_URL;
  tx: Transaction = new Transaction();
  products: CartProduct[] = [];

  constructor(
    private route: ActivatedRoute,
    private txService: TransactionService,
    private cache: CacheService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.txService.getStatus(params['id']).subscribe(res => {
          this.tx = res;
          if (res.Cart) {
            res.Cart.CartProducts.forEach(ci => {
              const tmp = JSON.parse(ci.ProductJson);
              const cpp = new CartProduct();
              cpp.product = tmp.Product;
              cpp.addons = tmp.Addons;
              cpp.customBouquet = tmp.CustomBouquet;
              cpp.bundle = tmp.Bundle;
              cpp.quantity = tmp.Quantity;
              cpp.variant = tmp.Variant;
              this.products.push(cpp);
            });
          }
          if (this.tx.Status) {
            localStorage.removeItem('userCart');
            this.cache.cart = new ModelsCart();
            this.cache.cartUpdate();
          }
        });
    });
  }

  calculateUnitPrice(cp: CartProduct): number {
    if (cp.product.ID !== 0) {
      let unitPrice: number = cp.product.Price;

      if (cp.variant) {
        unitPrice = cp.variant.Price;
      }

      cp.addons.forEach(p => {
        unitPrice += p.Price;
      });

      return unitPrice;
    }

    if (cp.product.ID === 0 && cp.customBouquet && cp.customBouquet.length > 0) {
      let unitPrice = 0;
      cp.customBouquet.forEach(cb => {
        unitPrice += cb.Price * cb.Quantity;
      });

      return unitPrice;
    }

    if (cp.product.ID === 0 && cp.bundle) {
      return cp.bundle.Price;
    }
  }

  calculateTotalPrice(cp: CartProduct): number {
    return cp.quantity * this.calculateUnitPrice(cp);
  }

  calculateSubTotal(): number {
    let subtotal = 0;
    this.products.forEach(cp => {
      subtotal += this.calculateTotalPrice(cp);
    });

    return subtotal;
  }

  calculateDelivery(): number {
    return this.tx.Cart.DeliveryCharge;
  }

  calculateDiscount(): number {
    if (this.tx.Cart.Coupon) {
      switch (this.tx.Cart.Coupon.TypeID) {
        case 1:
          return this.tx.Cart.Coupon.Value;
        case 2:
          return this.calculateSubTotal() * this.tx.Cart.Coupon.Value / 100;
      }
    }

    return 0;
  }

  calculateTotal() {
    return this.calculateSubTotal() + this.calculateDelivery() - this.calculateDiscount();
  }

  getCartProductImage(cp: CartProduct) {
    if (cp.product.ID !== 0) {
      return this.imgUrl + '/products/' + cp.product.Image;
    }

    if (cp.product.ID === 0 && cp.customBouquet && cp.customBouquet.length > 0) {
      return this.imgUrl + '/customBouquet/customBouquet.jpg';
    }

    if (cp.product.ID === 0 && cp.bundle) {
      return this.imgUrl + '/bundles/' + cp.bundle.Image;
    }
  }

}

export class Cart {
  ID: number;
  DeliveryCharge: number;
  CartProducts: CartItem[];
  Coupon: CartCoupon;
}

export class CartItem {
  ID: number;
  CartID: number;
  ProductJson: string;
}
