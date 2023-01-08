import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { HttpError } from '../../../models/httpError';

@Component({
  selector: 'ltf-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    private notif: NotificationService,
    private router: Router,
    private loginService: LoginService) {
    this.checkoutForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      localStorage.setItem('userName', this.checkoutForm.value.name);
      localStorage.setItem('userEmail', this.checkoutForm.value.email);
      localStorage.setItem('userPhone', this.checkoutForm.value.phone);

      this.router.navigate(['checkoutDetails']);
    } else {
      for (const i in this.checkoutForm.controls) {
        if (this.checkoutForm.get(i)) {
          this.checkoutForm.get(i).markAsDirty();
        }
      }

      this.notif.showMessage('Please fill all marked fields correctly');
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loginService.LogIn(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(res => {
        if (!res || res instanceof HttpError) {
          const err: HttpError  = res;
          if (err.status === 404) {
            this.notif.showMessage('The credentials you entered were not recognized.');
          } else {
            this.notif.showMessage('This username doesn\'t exist please register first to use it.');
          }
        } else {
          localStorage.setItem('currentUser', JSON.stringify(res));
          localStorage.setItem('sessionToken', res.AuthToken);

          const redir = localStorage.getItem('redir');
          localStorage.removeItem('redir');
          if (redir && redir !== 'undefined') {
            this.router.navigate([redir]);
          } else {
            this.router.navigate(['profile']);
          }
        }
      });
    } else {
      for (const i in this.loginForm.controls) {
        if (this.loginForm.get(i)) {
          this.loginForm.get(i).markAsDirty();
        }
      }

      this.notif.showMessage('Please fill all marked fields correctly');
    }
  }

}
