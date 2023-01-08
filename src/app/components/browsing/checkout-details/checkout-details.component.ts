import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CacheService } from '../../../services/cache.service';
import { City } from '../../../models/city';
import { Cart, CartProduct } from '../../../models/cart';
import { IMAGES_URL } from '../../../Constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingService } from '../../../services/loading.service';
import { NotificationService } from '../../../services/notification.service';
import { OrderService } from '../../../services/order.service';
import { Order, DeliveryDetails, BillingDetails } from '../../../models/order';
import { HttpError } from '../../../models/httpError';
import { CheckoutGuard } from '../../../guards/checkout.guard';
import { ActivatedRoute, RouterState, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { PhoneCodes } from '../../../mockups/deliver-phone-codes';
import { PhoneCode } from '../../../models/phone-code-type';
import { TimeSlotDialogComponent } from '../../../dialogs/time-slot-dialog/time-slot-dialog.component';
import { ShippingMethodDialogComponent } from '../../../dialogs/shipping-method-dialog/shipping-method-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeliverCities } from '../../../mockups/deliver-cities';
import { ShippingMethods } from '../../../mockups/deliver-shipping-methods';


@Component({
  selector: 'ltf-checkout-details',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.sass'],
})
export class CheckoutDetailsComponent implements OnInit {
  cart: Cart;
  datelist: Array<any> = new Array();
  cities: City[];
  imgURL = IMAGES_URL + '/products/';
  bndlURL = IMAGES_URL + '/bundles/';
  bqtURL = IMAGES_URL + '/customBouquet/customBouquet.jpg';
  cartForm: FormGroup;
  startDate: Date = new Date();
  date: Date = new Date();
  discount = 0;
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true,
  };
  phoneCodes = PhoneCodes;
  deliverCities = DeliverCities;
  selectedPhoneCode: PhoneCode = {
    name: 'United Arab Emirates',
    dial_code: '+971',
    code: 'AE',
  };
  selectedBillingPhoneCode: PhoneCode = {
    name: 'United Arab Emirates',
    dial_code: '+971',
    code: 'AE',
  };
  shippingMethods = ShippingMethods;
  timeSlots = [];
  deliveryTimeSlot: string;
  deliveryShippingMethod: string;
  agreeTerms = { flag: true };

  constructor(
    public cache: CacheService,
    private loader: LoadingService,
    private notif: NotificationService,
    private loginService: LoginService,
    private orderService: OrderService,
    private checkoutGuard: CheckoutGuard,
    private route: ActivatedRoute,
    private router: Router,
    public datePipe: DatePipe,
    public timeSlotDialog: MatDialog,
    public shippingMethodDialog: MatDialog
  ) {
    this.datelist = new Array();
    this.cartForm = new FormGroup({
      fName: new FormControl('', Validators.required), // Name
      exactCity: new FormControl('', Validators.required), // Recipient's city
      dPhone: new FormControl(
        this.selectedPhoneCode.dial_code,
        Validators.required
      ), // Phone code
      mPhone: new FormControl('', Validators.required), // Recipient's Mobile
      nearby: new FormControl('', Validators.required), // Landmark
      building: new FormControl('', Validators.required), // Recipient's Address
      lName: new FormControl('', Validators.required), // Recipient's Email
      street: new FormControl('', Validators.required), // Address Type
      apartment: new FormControl('', Validators.required), // Agree Terms
      dDate: new FormControl('', Validators.required), // Select Delivery Date
      dTime: new FormControl('', Validators.required), // time slot
      deliveryShippingMethod: new FormControl('', Validators.required), // shipping method
      city: new FormControl('', Validators.required), // deliver to
      billingName: new FormControl('', Validators.required),
      billingPhoneCode: new FormControl(
        this.selectedBillingPhoneCode.dial_code,
        Validators.required
      ),
      billingPhoneNumber: new FormControl('', Validators.required),
      billingAddress: new FormControl('', Validators.required),
      billingTVA: new FormControl('', Validators.required),
      paymentMethod: new FormControl('', Validators.required),
      greeting: new FormControl(''),
      floor: new FormControl(''),
      senderName: new FormControl(''),
      comment: new FormControl(''),
      coupon: new FormControl(''),
    });
  }

  ngOnInit() {
    this.cache.cities.subscribe((z) => {
      this.cities = z;
    });

    this.cart = this.cache.cart;
    let i = 0;
    for (i = 0; i < 15; i++) {
      const copiedDate = new Date(this.date);
      this.datelist.push(
        this.datePipe.transform(
          new Date(copiedDate.setDate(copiedDate.getDate() + i)),
          'yyyy-MM-dd'
        )
      );
    }
    this.cartForm.get('coupon').valueChanges.subscribe((c) => {
      if (c && c.length === 10) {
        // this.loader.showLoading();
        this.orderService.validateCoupon(c).subscribe((coup) => {
          this.loader.hideLoading();

          if (coup) {
            switch (coup.TypeID) {
              case 1:
                this.discount = coup.Value;
                break;
              case 2:
                this.discount = (this.calculateSubTotal() * coup.Value) / 100;
                break;
            }
          }
        });
      } else {
        this.discount = 0;
      }
    });
  }

  increase(cp: CartProduct) {
    cp.quantity++;
    this.cache.cart = this.cart;
    this.cache.cartUpdate();
  }

  decrease(cp: CartProduct) {
    if (cp.quantity > 1) {
      cp.quantity--;
    }
    this.cache.cart = this.cart;
    this.cache.cartUpdate();
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

  calculateDelivery(): number {
    if (this.cities) {
      const city: City = this.cities.find(
        (z) => z.ID.toString() === this.cartForm.value.city
      );

      if (city) {
        switch (this.cartForm.value.deliveryShippingMethod) {
          case 'Standard':
            return city.DeliveryCharge;
            break;
          case 'Morning':
            return city.MorningDelivery;
            break;
          case 'Fixed':
            return city.FixedTimeDelivery;
            break;
          case 'MidNight':
            return city.MidnightDelivery;
            break;
          default:
            return 29;
            break;
        }
      }
    }
  }

  calculateTotal() {
    return this.calculateSubTotal() + this.calculateDelivery() - this.discount;
  }

  removeItem(cp: CartProduct) {
    this.cache.cartRemove(cp);
    // if (this.cache.cart.cartProducts.length > 1) {
    //   this.cache.cartRemove(cp);
    // }
  }

  orderSubmit() {
    if (this.calculateSubTotal() < 25) {
      this.notif.showMessage('Your order must have a value of 25 USD or more.');
      return;
    }

    if (!this.cartForm.valid) {
      for (const i in this.cartForm.controls) {
        if (this.cartForm.get(i)) {
          this.cartForm.get(i).markAsDirty();
        }
      }

      this.notif.showMessage('Please fill all marked fields correctly');
      return;
    }

    if (
      !this.checkoutGuard.canActivate(
        this.route.snapshot,
        this.router.routerState.snapshot
      )
    ) {
      this.router.navigate(['checkout']);
    }

    // this.loader.showLoading();
    const order = new Order();
    order.name = localStorage.getItem('userName');
    order.email = localStorage.getItem('userEmail');
    order.phone = localStorage.getItem('userPhone');

    this.cache.cart.coupon = this.cartForm.value.coupon;
    order.cart = this.cache.cart;

    order.deliveryDetails = new DeliveryDetails();
    order.deliveryDetails.apartment = this.cartForm.value.apartment;
    order.deliveryDetails.building = this.cartForm.value.building;
    order.deliveryDetails.exactCity = this.cartForm.value.exactCity;
    order.deliveryDetails.city = this.cartForm.value.city;
    order.deliveryDetails.deliveryShippingMethod =
      this.cartForm.value.deliveryShippingMethod;
    order.deliveryDetails.comment = this.cartForm.value.comment;
    order.deliveryDetails.date = this.cartForm.value.dDate;
    order.deliveryDetails.dayPhone = this.cartForm.value.dPhone;
    order.deliveryDetails.firstName = this.cartForm.value.fName;
    order.deliveryDetails.floor = this.cartForm.value.floor;
    order.deliveryDetails.greeting = this.cartForm.value.greeting;
    order.deliveryDetails.lastName = this.cartForm.value.lName;
    order.deliveryDetails.mobilePhone = this.cartForm.value.mPhone;
    order.deliveryDetails.nearby = this.cartForm.value.nearby;
    order.deliveryDetails.senderName = this.cartForm.value.senderName;
    order.deliveryDetails.street = this.cartForm.value.street;
    order.deliveryDetails.time = this.cartForm.value.dTime;
    order.transfer = false;
    order.billingDetails = new BillingDetails();
    order.billingDetails.name =   this.cartForm.value.billingName;
    order.billingDetails.address =   this.cartForm.value.billingAddress;
    order.billingDetails.tva =   this.cartForm.value.billingTVA;
    order.billingDetails.phoneNumber = this.cartForm.value.billingPhoneCode +  this.cartForm.value.billingPhoneNumber;
    order.paymentMethod = this.cartForm.value.paymentMethod;
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');

    this.orderService.postOrder(order).subscribe((res) => {
      this.loader.hideLoading();

      if (!res || res instanceof HttpError) {
        this.notif.showMessage(
          res ? res.srcError : 'There was an error processing your order',
          'error',
          () => {
            // this.router.navigate(['checkout']);
          }
        );
        return;
      }

      document.location.href = res.ReturnURL;
    });
  }
  orderSubmit2() {
    if (this.calculateSubTotal() < 25) {
      this.notif.showMessage('Your order must have a value of 25 USD or more.');
      return;
    }

    if (!this.cartForm.valid) {
      for (const i in this.cartForm.controls) {
        if (this.cartForm.get(i)) {
          this.cartForm.get(i).markAsDirty();
        }
      }

      this.notif.showMessage('Please fill all marked fields correctly');
      return;
    }

    if (
      !this.checkoutGuard.canActivate(
        this.route.snapshot,
        this.router.routerState.snapshot
      )
    ) {
      this.router.navigate(['checkout']);
    }

    // this.loader.showLoading();
    const order = new Order();
    order.name = localStorage.getItem('userName');
    order.email = localStorage.getItem('userEmail');
    order.phone = localStorage.getItem('userPhone');

    this.cache.cart.coupon = this.cartForm.value.coupon;
    order.cart = this.cache.cart;

    order.deliveryDetails = new DeliveryDetails();
    order.deliveryDetails.apartment = this.cartForm.value.apartment;
    order.deliveryDetails.building = this.cartForm.value.building;
    order.deliveryDetails.exactCity = this.cartForm.value.exactCity;
    order.deliveryDetails.city = this.cartForm.value.city;
    order.deliveryDetails.deliveryShippingMethod =
      this.cartForm.value.deliveryShippingMethod;
    order.deliveryDetails.comment = this.cartForm.value.comment;
    order.deliveryDetails.date =
      document.getElementById('mat-input-0')['value'];
    order.deliveryDetails.dayPhone = this.cartForm.value.dPhone;
    order.deliveryDetails.firstName = this.cartForm.value.fName;
    order.deliveryDetails.floor = this.cartForm.value.floor;
    order.deliveryDetails.greeting = this.cartForm.value.greeting;
    order.deliveryDetails.lastName = this.cartForm.value.lName;
    order.deliveryDetails.mobilePhone = this.cartForm.value.mPhone;
    order.deliveryDetails.nearby = this.cartForm.value.nearby;
    order.deliveryDetails.senderName = this.cartForm.value.senderName;
    order.deliveryDetails.street = this.cartForm.value.street;
    order.deliveryDetails.time = this.cartForm.value.dTime;
    order.billingDetails = new BillingDetails();
    order.billingDetails.name =   this.cartForm.value.billingName;
    order.billingDetails.address =   this.cartForm.value.billingAddress;
    order.billingDetails.tva =   this.cartForm.value.billingTVA;
    order.billingDetails.phoneNumber =   this.cartForm.value.billingPhoneCode +  this.cartForm.value.billingPhoneNumber;
    order.paymentMethod = this.cartForm.value.paymentMethod;
    order.transfer = true;
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');

    this.orderService.postOrder(order).subscribe((res) => {
      this.loader.hideLoading();

      if (!res || res instanceof HttpError) {
        this.notif.showMessage(
          res ? res.srcError : 'There was an error processing your order',
          'error',
          () => {
            // this.router.navigate(['checkout']);
          }
        );
        return;
      }

      document.location.href = res.ReturnURL;
    });
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
  getSlots() {
    if (this.cities) {
      const city = this.cities.find(
        (z) => z.ID.toString() === this.cartForm.value.city
      );

      if (city && city.TimeSlots) {
        switch (this.cartForm.value.deliveryShippingMethod) {
          case 'Standard':
            return city.TimeSlots.filter(
              (z) => z.DeliveryType === 'Standard'
            ).map((z) =>  z.SlotStart + ':00 - ' + z.SlotEnd);
            break;
          case 'Morning':
            return city.TimeSlots.filter(
              (z) => z.DeliveryType === 'Morning'
            ).map((z) =>  z.SlotStart + ':00 - ' + z.SlotEnd);
            break;
          case 'Fixed':
            return city.TimeSlots.filter(
              (z) => z.DeliveryType === 'Fixed'
            ).map((z) =>  z.SlotStart + ':00 - ' + z.SlotEnd);
            break;
          case 'Midnight':
            return city.TimeSlots.filter(
              (z) => z.DeliveryType === 'Midnight'
            ).map((z) =>  z.SlotStart + ':00 - ' + z.SlotEnd);
            break;
          default:
            return [''];
            break;
        }
      } else {
        return [];
      }
    }
  }
  deliveryShippingMethodText() {
    return this.shippingMethods.find(
      (z) => z.id === this.deliveryShippingMethod).text;
  }
  openTimeSlotDialog(): void {
    const timeSLotDialogRef = this.timeSlotDialog.open(
      TimeSlotDialogComponent,
      {
        width: '600px',
        data: JSON.stringify({data: this.deliveryTimeSlot, slots: this.getSlots()})
      }
    );

    timeSLotDialogRef.afterClosed().subscribe((result) => {
      this.deliveryTimeSlot = result;
      this.cartForm.patchValue({ dTime: result });
    });
  }

  openShippingMethodDialog(): void {
    const shippingMethodDialogRef = this.shippingMethodDialog.open(
      ShippingMethodDialogComponent,
      {
        width: '600px',
        data: this.deliveryShippingMethod,
      }
    );

    shippingMethodDialogRef.afterClosed().subscribe((result) => {
      this.deliveryShippingMethod = result;
      this.cartForm.patchValue({ deliveryShippingMethod: result });
    });
  }
}
