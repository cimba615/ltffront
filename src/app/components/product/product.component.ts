import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { IMAGES_URL } from '../../Constants';

@Component({
  selector: 'ltf-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  imagesUrl = IMAGES_URL;

  @Input() product: Product;
  @Input() source: string;

  @Output() categFilter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  moreLikeThis(categID) {
    if (this.source && this.source === 'home') {
      switch (this.product.TypeID) {
        case 1:
          this.router.navigate(['flowers', categID]);
          break;
        case 2:
          this.router.navigate(['plants', categID]);
          break;
        case 3:
          this.router.navigate(['gifts', categID]);
          break;
        case 4:
          this.router.navigate(['gifts', categID]);
          break;
      }
    } else {
      this.categFilter.emit(categID);
    }
  }

  shopNow() {
    this.router.navigate(['shopNow']);
  }
}
