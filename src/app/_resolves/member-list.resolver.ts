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

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';


@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  PageSize = 6;
  PageNumber = 1;
  constructor(
    private userSrvice: UserService,
    private router: Router,
    private alert: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.userSrvice
      .getUsers(this.PageNumber, this.PageSize)
      .catch(err => {
        this.alert.error('Problem to retrieve data');
        this.router.navigate(['/home']);
        return Observable.throw(err.statusText);
      });
  }
}
