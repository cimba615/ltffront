import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpError } from '../../models/httpError';

@Component({
  selector: 'ltf-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.sass']
})
export class ResetPassComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private notif: NotificationService,
    private loader: LoadingService,
    private loginService: LoginService,
    private router: Router) {

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {
  }

  resetPass() {
    this.loader.showLoading();
    this.loginService.ResetPass(this.registerForm.get('email').value)
      .subscribe(res => {
        this.loader.hideLoading();
        if (!res || res instanceof HttpError) {
          this.notif.showMessage((res) ? res.srcError : 'There was an error processing your request');
        } else {
          setTimeout(() => {
            this.router.navigate(['passValidate', this.registerForm.get('email').value]);
          }, 200);
        }
      });
  }

}
