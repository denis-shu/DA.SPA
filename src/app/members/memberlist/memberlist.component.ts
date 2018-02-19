import { Component, OnInit } from "@angular/core";
import { AlertifyService } from "../../_service/alertify.service";
import { UserService } from "../../_service/user.service";
import { User } from "../../_Models/User";


@Component({
  selector: "app-memberlist",
  templateUrl: "./memberlist.component.html",
  styleUrls: ["./memberlist.component.css"]
})
export class MemberlistComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private alertity: AlertifyService
  ) {}

  ngOnInit() {
    this.loadusers();
  }

  loadusers() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      err => {
        this.alertity.error(err);
      }
    );
  }
}
