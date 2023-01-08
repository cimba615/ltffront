import { Product, Variant } from './product';
import { Common } from '../helpers/common';
import { Bundle } from './bundle';

export class Cart {
    cartProducts: CartProduct[] = [];
    coupon: string;
}

export class CartProduct {

    ID: string;
    product: Product;
    addons: Product[];
    variant: Variant;
    quantity = 1;
    customBouquet: CustomFlower[];
    bundle: Bundle;

    constructor() {
        this.ID = (new Common()).uuidv4();
    }

}

export class CartCoupon {
    TypeID: number;
    Value: number;
}

export class CustomFlower {
    ID: number;
    Name: string;
    Price: number;
    Image: string;
    Quantity = 0;
}
