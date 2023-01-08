import { Component, OnInit } from '@angular/core';
import { IMAGES_URL } from '../../../Constants';
import { NotificationService } from '../../../services/notification.service';
import { CartProduct, CustomFlower } from '../../../models/cart';
import { CacheService } from '../../../services/cache.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'ltf-create-bouquet',
  templateUrl: './create-bouquet.component.html',
  styleUrls: ['./create-bouquet.component.sass']
})
export class CreateBouquetComponent implements OnInit {

  imgUrl = IMAGES_URL + '/customBouquet/';
  // flowers = [
  //   { ID: 1, Name: 'Red Rose', Price: 4, ImageUrl: '/customBouquet/red-rose.jpg', Quantity: 0},
  //   { ID: 2, Name: 'Yellow Rose', Price: 3, ImageUrl: '/customBouquet/yellow-rose.jpg', Quantity: 0},
  //   { ID: 3, Name: 'Pink Rose', Price: 3, ImageUrl: '/customBouquet/pink-rose.jpg', Quantity: 0},
  //   { ID: 4, Name: 'White Rose', Price: 3, ImageUrl: '/customBouquet/white-rose.jpg', Quantity: 0},
  //   { ID: 5, Name: 'Pink Lily', Price: 4, ImageUrl: '/customBouquet/lily_pink.jpg', Quantity: 0},
  //   { ID: 6, Name: 'Orange Lily', Price: 4, ImageUrl: '/customBouquet/lily_orange.jpg', Quantity: 0},
  //   { ID: 7, Name: 'White Lily', Price: 4, ImageUrl: '/customBouquet/lily_white.jpg', Quantity: 0},
  //   { ID: 8, Name: 'Purple Tulip', Price: 4, ImageUrl: '/customBouquet/tulip_purple.jpg', Quantity: 0},
  //   { ID: 9, Name: 'White Tulip', Price: 4, ImageUrl: '/customBouquet/tulip_white.jpg', Quantity: 0},
  //   { ID: 10, Name: 'Yellow Tulip', Price: 4, ImageUrl: '/customBouquet/tulip_yellow.jpg', Quantity: 0},
  //   { ID: 11, Name: 'Red Tulip', Price: 4, ImageUrl: '/customBouquet/tulip_red.jpg', Quantity: 0},
  //   { ID: 12, Name: 'Deluxe Red', Price: 7, ImageUrl: '/customBouquet/red-rose.jpg', Quantity: 0},
  //   { ID: 0, Name: 'Exotic Greenery', Price: 10, ImageUrl: '/customBouquet/greenery.jpg', Quantity: 0}
  // ];
  flowers: CustomFlower[] = [];

  constructor(
    private notif: NotificationService,
    private cache: CacheService) { }

  ngOnInit() {
    this.cache.customFlowers.subscribe(data => {
      if (data) {
        this.flowers = data;
      }
    });
  }

  increase(flower) {
    if (flower.ID !== 0 || (flower.ID === 0 && flower.Quantity < 1)) {
      flower.Quantity++;
    }
  }

  decrease(flower) {
    if (flower.Quantity > 0) {
      flower.Quantity--;
    }
  }

  get Quantity() {
    let res = 0;
    this.flowers.forEach(f => {
      if (f.ID !== 0) {
        res += f.Quantity;
      }
    });
    return res;
  }

  get Total() {
    let res = 0;
    this.flowers.forEach(f => {
      res += f.Quantity * f.Price;
    });
    return res;
  }

  addToCart() {
    if (this.Total < 25) {
      this.notif.showMessage('Total cost of custom bouquet must be at least 25 USD');
      return;
    }

    // TODO: Submit form here
    this.addCartProduct();
  }

  addCartProduct() {
    const cartProd = new CartProduct();
    cartProd.quantity = 1;
    cartProd.addons = [];
    cartProd.customBouquet = [];
    cartProd.product = new Product();
    cartProd.product.Name = 'Custom Bouquet';
    cartProd.product.Description = '';

    this.flowers.forEach(f => {
      if (f.Quantity) {
        cartProd.customBouquet.push(f);
        cartProd.product.Description += f.Name + ' x' + f.Quantity + ', ';
      }
    });

    cartProd.product.Description = cartProd.product.Description.substr(0, cartProd.product.Description.length - 2);

    this.cache.cartAdd(cartProd);

    this.notif.showMessage('Your custom bouquet is now in your cart.', 'success');
  }

}
