import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "../../_Models/User";
import { ActivatedRoute } from "@angular/router";
import { AlertifyService } from "../../_service/alertify.service";
import { NgForm } from "@angular/forms";
import { UserService } from "../../_service/user.service";
import { AuthService } from "../../_service/auth.service";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"]
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild("editForm") editForm: NgForm;
  photoUrl: string;

  constructor(
    private route: ActivatedRoute,
    private alert: AlertifyService,
    private auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data["user"];
    });
    this.auth.currentPhotoUrl.subscribe(photoUrl => {
      this.photoUrl = photoUrl;
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.auth.decodedToken.nameid, this.user)
      .subscribe(
        next => {
          this.alert.success("Was updated");
          this.editForm.reset(this.user);
        },
        err => {
          this.alert.error(err);
        }
      );
  }

  updateMainPhoto(photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }
}
