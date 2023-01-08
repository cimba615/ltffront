import { Cart } from "./cart";

export class Order {
  name: string;
  email: string;
  phone: string;
  deliveryDetails: DeliveryDetails;
  billingDetails: BillingDetails;
  cart: Cart;
  transfer: boolean;
  paymentMethod: string;
}

export class DeliveryDetails {
  firstName: string;
  lastName: string;
  dayPhone: string;
  mobilePhone: string;
  building: string;
  apartment: string;
  floor: string;
  street: string;
  city: string;
  exactCity: string;
  deliveryShippingMethod: string;
  nearby: string;
  greeting: string;
  senderName: string;
  comment: string;
  date: string;
  time: number;
}
export class BillingDetails {
  name: string;
  tva: string;
  phoneNumber: string;
  address: string;
}

