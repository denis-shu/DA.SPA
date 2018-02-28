import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { User } from "../_Models/User";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private authHttp: AuthHttp) {}

  getUsers(): Observable<User[]> {
    return this.authHttp
      .get(this.baseUrl + "users")
      .map(res => <User[]>res.json());
  }

  getUser(id): Observable<User> {
    return this.authHttp
      .get(this.baseUrl + 'users/' + id)
      .map(res => <User>res.json());
  }
  updateUser(id: number, user: User) {
    return this.authHttp.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.authHttp.post(
      this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain',
      {}
    );
  }

  deletePhoto(userId: number, id: number) {
    return this.authHttp.delete(
      this.baseUrl + 'users/' + userId + '/photos/' + id
    );
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
