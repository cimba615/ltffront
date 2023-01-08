import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { LoginService } from '../../services/login.service';
import { HttpError } from '../../models/httpError';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'ltf-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private notif: NotificationService,
    private loader: LoadingService,
    private loginService: LoginService,
    private router: Router) {

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      cPassword: new FormControl('', [Validators.required, this.validateConfirmPassword()]),
      newsletter: new FormControl(''),
    }, { validators: this.checkForm() });
  }

  validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.registerForm) {
        if (control.value.toLowerCase() !== this.registerForm.value.password.toLowerCase()) {
          return { 'ValidationError': 'Passwords do not match' };
        }
      }

      return null;
    };
  }

  checkForm(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control && this.registerForm) {
        if (this.registerForm.value.password !== this.registerForm.value.cPassword) {
          this.registerForm.get('cPassword').markAsDirty();
          this.registerForm.get('cPassword').markAsTouched();
          this.registerForm.get('cPassword').setErrors({ 'ValidationError': 'Passwords do not match' });

          return { 'ValidationError': 'Passwords do not match' };
        }
      }

      return null;
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.register();
  }

  register() {
    this.loader.showLoading();
    this.loginService.Register(
      this.registerForm.get('email').value,
      this.registerForm.get('password').value,
      this.registerForm.get('newsletter').value ? true : false)
      .subscribe(res => {
        this.loader.hideLoading();
        if (!res || res instanceof HttpError) {
          this.notif.showMessage((res) ? res.srcError : 'There was an error processing your request');
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
  }

}
