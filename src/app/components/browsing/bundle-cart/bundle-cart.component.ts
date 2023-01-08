import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartProduct } from '../../../models/cart';
import { Bundle } from '../../../models/bundle';
import { NgbModalRef, NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMAGES_URL } from '../../../Constants';
import { CacheService } from '../../../services/cache.service';
import { Product } from '../../../models/product';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'ltf-bundle-cart',
  templateUrl: './bundle-cart.component.html',
  styleUrls: ['./bundle-cart.component.sass']
})
export class BundleCartComponent implements OnInit {

  bundle: Bundle = new Bundle();
  quantity = 1;
  modalRef: NgbModalRef;
  imgUrl = IMAGES_URL + '/bundles/';

  @ViewChild('prodQty') prodQty: ElementRef;

  constructor(private config: NgbCarouselConfig,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private cache: CacheService,
    private toast: NotificationService) {
    this.config.interval = 500000000;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cache.bundles.subscribe(bs => {
        this.bundle = bs.find(p => p.ID.toString() === params['id']);
      });
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

  calcSubtotal(): number {
    return this.bundle.Price * this.prodQty.nativeElement.value;
  }

  addCartProduct() {
    this.toast.showMessage('Product Added To Cart', 'success');
    const cartProd = new CartProduct();
    cartProd.product = new Product();
    cartProd.quantity = this.prodQty.nativeElement.value;
    cartProd.addons = [];
    cartProd.bundle = this.bundle;

    this.cache.cartAdd(cartProd);

    this.modalRef.close('resultObject');
  }

  checkout() {
    this.addCartProduct();
    this.router.navigate(['checkoutDetails']);
  }

}
