import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { User } from '../_Models/User';
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private authHttp: AuthHttp) {}

  getUsers(): Observable<User[]> {
    return this.authHttp
      .get(this.baseUrl + 'users')
      .map(res => <User[]>res.json());
  }

  // private jwt() {
  //   let token = localStorage.getItem('token');
  //   if (token) {
  //     let headers = new Headers({ Authorization: 'Bearer ' + token });
  //     headers.append('Content-Type', 'application/json');
  //     return new RequestOptions({ headers: headers });
  //   }
  // }
}
