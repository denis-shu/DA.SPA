import { PaginatedResult } from './../_Models/pagination';
import { UserService } from './../_service/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../_service/alertify.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '../_Models/message';
import { Pagination } from '../_Models/pagination';
import { AuthService } from '../_service/auth.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(
    private alert: AlertifyService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.route.data = data['messages'].result;
      this.pagination = data['messages'].pagination;
      console.log('P', this.pagination);
    });
  }

  loadMessages() {
    console.log('nameid :' + this.authService.decodedToken.nameid,
    'currentPage: ' + this.pagination.currentPage,
    'itemPerPage: ' + this.pagination.itemsPerPage,
    'Container' + this.messageContainer);
    this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          console.log('2',  this.messages = res.result,
          this.pagination = res.pagination);
          this.messages = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alert.error(error);
        });
  }

  deleteMessage(id: number) {
    this.alert.confirm('Delete this shit?', () => {
       this.userService.deleteMessage(id, this.authService.decodedToken.nameid)
       .subscribe(() => {
        this.messages.splice(_.findIndex(this.messages, {id: id}, 1));
        this.alert.success('Deleted');
      }, err => {
        this.alert.error('Failed 2 del');
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}
