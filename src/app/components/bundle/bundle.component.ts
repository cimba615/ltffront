import { Component, OnInit, Input } from '@angular/core';
import { IMAGES_URL } from '../../Constants';
import { Bundle } from '../../models/bundle';
import { Router } from '@angular/router';

@Component({
  selector: 'ltf-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.sass']
})
export class BundleComponent implements OnInit {

  imagesUrl = IMAGES_URL + '/bundles/';

  @Input() bundle: Bundle;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
