import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../models/user';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { HttpError } from '../../../models/httpError';
import { LoadingService } from '../../../services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ltf-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  user: User;

  profileForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private notif: NotificationService,
    private loader: LoadingService,
    private router: Router) {

    this.profileForm = new FormGroup({
      password: new FormControl(''),
      cPassword: new FormControl('', [this.validateConfirmPassword()]),
      fName: new FormControl(''),
      lName: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
      newsletter: new FormControl(''),
    }, {validators: this.checkForm()});
  }

  validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.profileForm) {
        if (control.value.toLowerCase() !== this.profileForm.value.password.toLowerCase()) {
          return { 'ValidationError': 'Passwords do not match' };
        }
      }

      return null;
    };
  }

  checkForm(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control && this.profileForm) {
        if (this.profileForm.value.password !== this.profileForm.value.cPassword) {
          this.profileForm.get('cPassword').markAsDirty();
          this.profileForm.get('cPassword').markAsTouched();
          this.profileForm.get('cPassword').setErrors({ 'ValidationError': 'Passwords do not match' });

          return { 'ValidationError': 'Passwords do not match' };
        }
      }

      return null;
    };
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    if (this.user) {
      this.profileForm.patchValue({ fName: this.user.FirstName }, { emitEvent: false });
      this.profileForm.patchValue({ lName: this.user.LastName }, { emitEvent: false });
      this.profileForm.patchValue({ phone: this.user.Phone }, { emitEvent: false });
      this.profileForm.patchValue({ address: this.user.Address }, { emitEvent: false });
      this.profileForm.patchValue({ newsletter: this.user.IsNewsletterSubscribed }, { emitEvent: false });
    }
  }

  update() {
    this.profileForm.updateValueAndValidity();
    if (this.profileForm.valid) {
      this.loader.showLoading();

      this.user.Address = this.profileForm.value.address;
      this.user.FirstName = this.profileForm.value.fName;
      this.user.IsNewsletterSubscribed = this.profileForm.value.newsletter;
      this.user.LastName = this.profileForm.value.lName;
      this.user.Phone = this.profileForm.value.phone;
      this.user.Password = this.profileForm.value.password;

      this.loginService.UpdateProfile(this.user).subscribe(res => {
        this.profileForm.patchValue({ password: '' }, { emitEvent: false });
        this.profileForm.patchValue({ cPAssword: '' }, { emitEvent: false });

        this.loader.hideLoading();
        if (res instanceof HttpError) {
          this.notif.showMessage('There was an error while attempting to update the profile.');
        } else {
          this.notif.showMessage('Your profile was updated.', 'success');
        }
      });
    } else {
      this.notif.showMessage('Some fields contain invalid values.');
    }
  }

  logout() {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

}
