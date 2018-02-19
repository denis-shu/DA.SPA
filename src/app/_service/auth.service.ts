import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  baseurl = 'http://localhost:5000/api/auth/';
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private http: Http) {}

  // tslint:disable-next-line:eofline

  login(model: any) {
    return this.http
      .post(this.baseurl + 'login', model, this.getRequestOptions())
      .map((res: Response) => {
        console.log(res, 'ress');
        const user = res.json();
        if (user) {
          localStorage.setItem('token', user.tokenString);
          this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
          console.log(this.decodedToken);
          this.userToken = user.tokenString;
        }
      });
  }

  register(model: any) {
    return this.http.post(
      this.baseurl + 'register',
      model,
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