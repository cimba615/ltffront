import { Component, OnInit } from '@angular/core';
import { GOOGLE_RECAPTCHA_KEY, GOOGLE_MAPS_KEY } from '../../../Constants';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from '../../../services/loading.service';
import { HttpError } from '../../../models/httpError';
import { NotificationService } from '../../../services/notification.service';
import { ContactService } from '../../../services/contact.service';
import { CacheService } from '../../../services/cache.service';

@Component({
  selector: 'ltf-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.sass']
})
export class AboutusComponent implements OnInit {
  contactForm: FormGroup;
  captchaPassed = false;
  captchaString: string;
  aboutusText: string;
  lat = 33.8965044; // +Up & -Down
  lng = 35.532276; // +Right & -Left

  constructor(private ctService: ContactService,
    private loader: LoadingService,
    private cache: CacheService,
    private toast: NotificationService) {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
      // nameOnCard: new FormControl('', Validators.required),
      // creditCard: new FormControl('', [Validators.required, Validators.maxLength(19),Validators.minLength(18)]),
      // creditCard: new FormControl('', [Validators.required, Validators.pattern('^()$')]),
      // expiryMonth: new FormControl('', Validators.required),
      // expiryYear: new FormControl('', Validators.required),
      // cvcCode: new FormControl('', [Validators.required, this.validateCVC(new RegExp(/^\d{3,4}$/))])
    });

    this.contactForm.valueChanges.subscribe(val => {
      // console.log(this.contactForm.valid);
    });
  }

  ngOnInit() {
    this.contactForm.updateValueAndValidity();
    this.cache.settings.subscribe(s => {
      const aboutSettings = s.filter(gs => gs.Section === 'About Us');
      this.aboutusText = aboutSettings.find(setting => setting.Name === 'Text').Value;
    });
  }

  get RecaptchaKey() {
    return GOOGLE_RECAPTCHA_KEY;
  }

  resolved(e: any) {
    this.captchaString = e;
    this.captchaPassed = true;
  }

  submitContactForm() {
    if (!this.captchaPassed) {
      alert('Please fill all required fields.');
      return;
    }
    if (this.contactForm.valid) {
        this.loader.showLoading();
        this.ctService.postContact({
          name: this.contactForm.get('name').value,
          email: this.contactForm.get('email').value,
          subject: this.contactForm.get('subject').value,
          message: this.contactForm.get('message').value
        }).subscribe(response => {
          if (response instanceof HttpError) {
            this.loader.hideLoading();
            this.toast.showMessage('There was an error processing your request');
          } else {
            this.loader.hideLoading();
            // tslint:disable-next-line:max-line-length
            this.toast.showMessage('Thank you contacting lestroisfleurs, your inquiry will be handled within a period of 24 hours.', 'success');
          }
        });
      } else {
        for (const i in this.contactForm.controls) {
          if (this.contactForm.get(i)) {
            this.contactForm.get(i).markAsDirty();
          }
        }
      }
      // TODO: Submit the form here
    }
}

