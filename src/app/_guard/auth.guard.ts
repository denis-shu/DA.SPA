import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auht: AuthService,
    private router: Router,
    private alert: AlertifyService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auht.loggedIn()) {
      return true;
    }
    this.alert.error('U need 2 log In to access');
    this.router.navigate(['/home']);
    return false;
  }
}
