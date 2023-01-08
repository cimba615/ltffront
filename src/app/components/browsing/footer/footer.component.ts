import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ltf-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  specialPayment() {
    this.router.navigate(['specialPayment']);
  }

  socialMedia(media: string) {
    switch (media) {
      case 'insta':
        window.open('https://www.instagram.com/lestroisfleurs', '_blank');
        break;
      case 'fb':
        window.open('https://www.facebook.com/lestroisfleurs', '_blank');
        break;
    }
  }

}
