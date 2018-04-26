import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { User } from '../_Models/User';

@Injectable()
export class AuthService {
  baseurl = 'http://localhost:5000/api/auth/';
  userToken: any;
  decodedToken: any;
  currenrUser: User;
  jwtHelper: JwtHelper = new JwtHelper();
  private photoUrl = new BehaviorSubject<string>('../../assets/user.jpg');
  currentPhotoUrl = this.photoUrl.asObservable();

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private http: Http) {}

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  // tslint:disable-next-line:eofline

  login(model: any) {
    return this.http
      .post(this.baseurl + 'login', model, this.getRequestOptions())
      .map((res: Response) => {
        console.log(res, 'ress');
        const user = res.json();
        if (user && user.tokenString) {
          localStorage.setItem('token', user.tokenString);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
          this.currenrUser = user.user;
          console.log(this.decodedToken);
          this.userToken = user.tokenString;
          if (this.currenrUser.photoUrl !== null) {
          this.changeMemberPhoto(this.currenrUser.photoUrl);
          } else {
          this.changeMemberPhoto('../../assets/user.jpg');
          }
        }
      });
  }

  register(user: User) {
    return this.http.post(
      this.baseurl + 'register',
      user,
      this.getRequestOptions()
    );
  }

  loggedIn() {
    return tokenNotExpired('token');
  }

  private getRequestOptions() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }
}
