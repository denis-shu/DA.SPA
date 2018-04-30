import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { User } from '../_Models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUser } from '../_Models/AuthUser';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  baseurl = environment.apiUrl;
  userToken: any;
  decodedToken: any;
  currenrUser: User;
  private photoUrl = new BehaviorSubject<string>('../../assets/user.jpg');
  currentPhotoUrl = this.photoUrl.asObservable();

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {}

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  // tslint:disable-next-line:eofline

  login(model: any) {
    return this.http
      .post<AuthUser>(this.baseurl + 'auth/login', model,  {headers: new HttpHeaders().set('content-type', 'application/json')})
      .map(resUser => {
        if (resUser && resUser.tokenString) {
          localStorage.setItem('token', resUser.tokenString);
          localStorage.setItem('user', JSON.stringify(resUser.user));
          this.decodedToken = this.jwtHelperService.decodeToken(resUser.tokenString);
          this.currenrUser = resUser.user;
          this.userToken = resUser.tokenString;
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
      this.baseurl + 'auth/register',
      user,
      {headers: new HttpHeaders().set('content-type', 'application/json')}
    );
  }

  loggedIn() {
    const token = this.jwtHelperService.tokenGetter();
    if (!token) {
      return false;
    }

    return !this.jwtHelperService.isTokenExpired(token);
  }

  // private getRequestOptions() {
  //   const headers = new Headers({ 'Content-Type': 'application/json' });
  //   return new RequestOptions({ headers: headers });
  // }
}
