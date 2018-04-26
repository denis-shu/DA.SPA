import { UserService } from './../../_service/user.service';
import { Message } from './../../_Models/message';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../_service/auth.service';
import { AlertifyService } from '../../_service/alertify.service';
import * as _ from 'underscore';
import "rxjs/add/operator/do";

@Component({
  selector: 'app-members-messages',
  templateUrl: './members-messages.component.html',
  styleUrls: ['./members-messages.component.css']
})
export class MembersMessagesComponent implements OnInit {
  @Input() userId: number;
  messages: Message[] = new Array();
  newMessage: any = {};

  constructor(
    private _userService: UserService,
    private auth: AuthService,
    private alert: AlertifyService
  ) {}

  ngOnInit() {
    this.loadmessages();
  }

  loadmessages() {
    const currentUserId = +this.auth.decodedToken.nameid;
    this._userService
      .getMessageThread(this.auth.decodedToken.nameid, this.userId)
      .do(messages => {
          _.each(messages, (message: Message) => {
            if (message.isRead === false && message.recipientId === currentUserId) {
              this._userService.markAsRead(currentUserId, message.id);
            }
          });
      })
      .subscribe(
        messages => {
          this.messages = messages;
        },
        err => {
          this.alert.error(err);
        }
      );
  }

  sendMessage(){
    this.newMessage.recipientId = this.userId;
    this._userService.sendMessage(this.auth.decodedToken.nameid, this.newMessage)
    .subscribe(msg => {
     this.messages.unshift(msg);    
     this.newMessage.content = '';
    }, err => {
     this.alert.error(err);
    });
  }
}
