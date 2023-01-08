import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';
import { SimpleRange } from '../../../models/simple-range';

@Component({
  selector: 'ltf-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.sass']
})
export class RangeSliderComponent implements OnInit {

  sliderMin = 25;
  sliderMax = 1000;
  sliderOptions: Options;

  @Output() priceFilter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.sliderOptions = {
      floor: 25,
      ceil: 1000,
      step: 25,
      noSwitching: true
    };
  }

  ngOnInit() {
  }

  valueChanged(e) {
    this.priceFilter.emit(new SimpleRange(this.sliderMin, this.sliderMax));
  }

}
