import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login.service';

@Injectable()
export class CheckoutGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const token = localStorage.getItem('sessionToken');

    if (token && token !== 'undefined' ||
      (localStorage.getItem('userName') && localStorage.getItem('userEmail') && localStorage.getItem('userPhone'))
    ) {
      return true;
    }

    localStorage.setItem('redir', 'checkoutDetails');
    this.router.navigate(['checkout']);
  }
}
