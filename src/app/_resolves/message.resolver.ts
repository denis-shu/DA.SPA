import { AuthService } from './../_service/auth.service';
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
import { Message } from '../_Models/message';


  @Injectable()
  export class MessagesResolver implements Resolve<Message[]> {
    PageSize = 6;
    PageNumber = 1;
    MessageContainer = 'Unread';
    constructor(
      private userSrvice: UserService,
      private router: Router,
      private alert: AlertifyService,
      private authService: AuthService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
      return this.userSrvice.getMessages(this.authService.decodedToken.nameid, this.PageNumber,
        this.PageSize, this.MessageContainer)
        .catch(err => {
            console.log(err);
          this.alert.error('Problem to retrieve data');
          this.router.navigate(['/home']);
          return Observable.throw(err.statusText);
        });
    }
  }
