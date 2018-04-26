import { PaginatedResult } from './../_Models/pagination';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../_Models/User';
import { AuthHttp } from 'angular2-jwt';
import { Message } from '../_Models/message';

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private authHttp: AuthHttp) {}

  getUsers(
    page?: number,
    itemsPerPage?: number,
    userParams?: any,
    likesParam?: string
  ) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();
    let queryString = '?';

    if (page != null && itemsPerPage != null) {
      queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
    }

    if (likesParam === 'Likers') {
      queryString += 'Likers=true&';
    }
    if (likesParam === 'Likees') {
      queryString += 'Likees=true&';
    }

    if (userParams != null) {
      queryString +=
        'minAge=' +
        userParams.minAge +
        '&maxAge=' +
        userParams.maxAge +
        '&gender=' +
        userParams.gender +
        '&orderBy=' +
        userParams.orderBy;
    }
    return this.authHttp
      .get(this.baseUrl + 'users' + queryString)
      .map((res: Response) => {
        paginatedResult.result = res.json();

        if (res.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(
            res.headers.get('Pagination')
          );
        }
        return paginatedResult;
      });
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

  sendLike(id: number, recipientId: number) {
    return this.authHttp.post(
      this.baseUrl + 'users/' + id + '/like/' + recipientId,
      {}
    );
  }

  deletePhoto(userId: number, id: number) {
    return this.authHttp.delete(
      this.baseUrl + 'users/' + userId + '/photos/' + id
    );
  }

  getMessages(
    id: number,
    page?: number,
    itemsPerPage?: number,
    messageContainer?: string
  ) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<
      Message[]
    >();

    let queryString = '?MessageContainer=' + messageContainer;
    if (page != null && itemsPerPage != null) {
      queryString += '&pageNumber=' + page + '&pageSize=' + itemsPerPage;
    }
    console.log(queryString);
    return this.authHttp
      .get(this.baseUrl + 'users/' + id + '/message' + queryString)
      .map((res: Response) => {
        paginatedResult.result = res.json();
        console.log('UserService', paginatedResult);

        if (res.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(
            res.headers.get('Pagination')
          );
        }
        return paginatedResult;
      });
  }

  getMessageThread(id: number, recipientId: number) {
    return this.authHttp
      .get(this.baseUrl + 'users/' + id + '/message/thread/' + recipientId)
      .map((res: Response) => {
        return res.json();
      });
  }

  deleteMessage(id: number, userId: number) {
    return this.authHttp.post(this.baseUrl + 'users/' + userId + '/message/' + id, {});
  }

  sendMessage(id: number, message: Message) {
    return this.authHttp.post(this.baseUrl + 'users/' + id + '/message/', message)
    .map((res: Response) => {
      return res.json();
    });
  }

  markAsRead(userId: number, messageId: number) {
    return this.authHttp.post(this.baseUrl + 'users/' + userId + '/message/' + messageId + '/read', {})
    .subscribe()
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
