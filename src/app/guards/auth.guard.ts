import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate() {
    // 토큰 유효 기간 확인
    if (!this.auth.isAuthenticated()) {
      console.log('invalid token!');
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
}
