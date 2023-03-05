import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { contants } from '../global/global.contants';
import { Roles } from '../global/roles';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  role: string | null;

  constructor(private router: Router) {
    this.role = sessionStorage.getItem(contants.role);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.role === Roles.HR_Admin || this.role === Roles.Manager) {
      return true;
    } else {
      this.router.navigate(['/leave']);
      return false;
    }

  }

}
