import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { LoginService } from '../../services/login.service';
import { HttpError } from '../../models/httpError';
import { Router } from '@angular/router';

@Component({
  selector: 'ltf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private logicService: LoginService,
    private notif: NotificationService,
    private router: Router) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      remember: new FormControl(''),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.login();
  }

  login() {
    this.logicService.LogIn(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(res => {
      if (!res || res instanceof HttpError) {
        const err: HttpError  = res;
        if (err.status === 404) {
          this.notif.showMessage('This username doesn\'t exist please register first to use it.');
        } else {
          this.notif.showMessage('The credentials you entered were not recognized.');
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
  }

}
