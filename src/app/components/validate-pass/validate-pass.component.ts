import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpError } from '../../models/httpError';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'ltf-validate-pass',
  templateUrl: './validate-pass.component.html',
  styleUrls: ['./validate-pass.component.sass']
})
export class ValidatePassComponent implements OnInit {

  email: string;
  resetForm: FormGroup;

  constructor(
    private loader: LoadingService,
    private notif: NotificationService,
    private route: ActivatedRoute,
    private loginService: LoginService) {

    this.resetForm = new FormGroup({
      token: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      cPassword: new FormControl('', [Validators.required, this.validateConfirmPassword()]),
    }, { validators: this.checkForm() });
  }

  validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.resetForm) {
        if (control.value.toLowerCase() !== this.resetForm.value.password.toLowerCase()) {
          return { 'ValidationError': 'Passwords do not match' };
        }
      }

      return null;
    };
  }

  checkForm(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control && this.resetForm) {
        if (this.resetForm.value.password !== this.resetForm.value.cPassword) {
          this.resetForm.get('cPassword').markAsDirty();
          this.resetForm.get('cPassword').markAsTouched();
          this.resetForm.get('cPassword').setErrors({ 'ValidationError': 'Passwords do not match' });

          return { 'ValidationError': 'Passwords do not match' };
        }
      }

      return null;
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.email = params['email'];
    });
  }

  savePass() {
    this.loader.showLoading();

    const request = {
      token: this.resetForm.get('token').value,
      email: this.email,
      password: this.resetForm.get('password').value
    };

    this.loginService.ValidatePass(request)
      .subscribe(res => {
        this.loader.hideLoading();
        if (!res || res instanceof HttpError) {
          this.notif.showMessage((res) ? res.srcError : 'There was an error processing your request');
        } else {
          this.notif.showMessage('Your password is now changed.', 'success');
        }
      });

    return false;
  }

}
