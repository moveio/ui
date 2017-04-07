import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  lock = new Auth0Lock('taBZ3q2pc5MlNZeHy2ODzlglWrup48x7', 'flowup.eu.auth0.com', {});

  constructor(private router: Router) {
    this.lock.on('authenticated', (res) => {
      localStorage.setItem('id_token', res.idToken);
      console.log('I am here');
      setTimeout(() => {
        this.router.navigateByUrl(`platform/dashboard`);
      }, 200);
    });
  }

  login() {
    this.lock.show();
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  authenticated(): Boolean {
    return tokenNotExpired();
  }
}
