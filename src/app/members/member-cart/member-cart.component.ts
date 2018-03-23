import { AlertifyService } from './../../_service/alertify.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_Models/User';
import { AuthService } from '../../_service/auth.service';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-member-cart',
  templateUrl: './member-cart.component.html',
  styleUrls: ['./member-cart.component.css']
})
export class MemberCartComponent implements OnInit {
  @Input() user: User;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private alert: AlertifyService
  ) {}

  ngOnInit() {}

  sendLike(id: number) {
    this.userService.sendLike(this.auth.decodedToken.nameid, id).subscribe(
      data => {
        this.alert.success('U`ve liked: ' + this.user.username);
      },
      error => {
        this.alert.error(error._body);
      });
  }
}
