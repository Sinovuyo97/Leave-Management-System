import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Before I check expiry, I'll get the token from the session storage
    this.tokenService.getFromSessionStorage();

    if (this.tokenService.isTokenExpired()) {
      sessionStorage.clear();
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }

  }

}
