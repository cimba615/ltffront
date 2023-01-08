import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/category';
import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'ltf-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  @Input() typeID: number[];
  @Output() productsFilter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private cache: CacheService) { }

  ngOnInit() {
    this.cache.categories.subscribe(data => {
      if (data) {
        this.categories = data.filter(c => this.typeID.filter(i => i === c.TypeID).length);
      }
    });
  }

  filterProducts(categID: number) {
    this.productsFilter.emit(categID);
  }

}
