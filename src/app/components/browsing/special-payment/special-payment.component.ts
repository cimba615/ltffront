import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { isNumber } from 'util';
import { SpecialPaymentService } from '../../../services/special-payment.service';
import { LoadingService } from '../../../services/loading.service';
import { HttpError } from '../../../models/httpError';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'ltf-special-payment',
  templateUrl: './special-payment.component.html',
  styleUrls: ['./special-payment.component.sass']
})
export class SpecialPaymentComponent implements OnInit {

  paymentForm: FormGroup;

  constructor(private spService: SpecialPaymentService,
              private loader: LoadingService,
              private toast: NotificationService) {

    this.paymentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      amountPayable: new FormControl('', [Validators.required, this.validateAmount()]),

      // nameOnCard: new FormControl('', Validators.required),
      // creditCard: new FormControl('', [Validators.required, Validators.maxLength(19),Validators.minLength(18)]),
      // creditCard: new FormControl('', [Validators.required, Validators.pattern('^()$')]),
      // expiryMonth: new FormControl('', Validators.required),
      // expiryYear: new FormControl('', Validators.required),
      // cvcCode: new FormControl('', [Validators.required, this.validateCVC(new RegExp(/^\d{3,4}$/))])
    });

    // this.paymentForm.valueChanges.subscribe(val => {
    //   console.log(this.paymentForm.valid);
    // });
  }

  ngOnInit() {
  }

  validateAmount() {
    return (control: AbstractControl) => {
      if (isNumber(control.value) && control.value > 0) {
        return null;
      }

      return { 'ValidationError': 'Invalid Value' };
    };
  }
  processPayment2() {
    if (this.paymentForm.valid) {
      this.loader.showLoading();

      this.spService.postSpecialPayment({
        name: this.paymentForm.get('name').value,
        email: this.paymentForm.get('email').value,
        phone: this.paymentForm.get('phone').value,
        transfer: true,
        amountPayable: this.paymentForm.get('amountPayable').value,
      }).subscribe(response => {
        if (response instanceof HttpError) {
          this.loader.hideLoading();
          this.toast.showMessage('There was an error processing your request');
        } else {
          document.location.href = response.ReturnURL;
        }
      });
    } else {
      for (const i in this.paymentForm.controls) {
        if (this.paymentForm.get(i)) {
          this.paymentForm.get(i).markAsDirty();
        }
      }
    }
  }
  processPayment() {
    if (this.paymentForm.valid) {
      this.loader.showLoading();

      this.spService.postSpecialPayment({
        name: this.paymentForm.get('name').value,
        email: this.paymentForm.get('email').value,
        phone: this.paymentForm.get('phone').value,
        amountPayable: this.paymentForm.get('amountPayable').value,
        transfer: false
      }).subscribe(response => {
        if (response instanceof HttpError) {
          this.loader.hideLoading();
          this.toast.showMessage('There was an error processing your request');
        } else {
          document.location.href = response.ReturnURL;
        }
      });
    } else {
      for (const i in this.paymentForm.controls) {
        if (this.paymentForm.get(i)) {
          this.paymentForm.get(i).markAsDirty();
        }
      }
    }
  }

}
