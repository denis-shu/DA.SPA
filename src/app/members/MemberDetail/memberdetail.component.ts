import { Component, OnInit } from '@angular/core';
import { User } from '../../_Models/User';
import { UserService } from '../../_service/user.service';
import { AlertifyService } from '../../_service/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memberdetail',
  templateUrl: './memberdetail.component.html',
  styleUrls: ['./memberdetail.component.css']

})
export class MemberDetailComponent implements OnInit {
  user: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alert: AlertifyService
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService
      .getUser(+this.route.snapshot.params['id'])
      .subscribe((user: User) => {this.user = user;
      },
      err => this.alert.error(err));
  }
}
