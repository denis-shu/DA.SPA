import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { User } from '../_Models/User';
import { Injectable } from '@angular/core';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';

import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { AuthService } from '../_service/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private auth: AuthService,
    private userSrvice: UserService,
    private router: Router,
    private alert: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userSrvice.getUser(this.auth.decodedToken.nameid).catch(err => {
      this.alert.error('Problem to retrieve data');
      this.router.navigate(['/members']);
      return Observable.throw(err.statusText);
    });
  }
}
