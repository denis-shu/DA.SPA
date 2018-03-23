import { PaginatedResult } from "./../../_Models/pagination";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AlertifyService } from "../../_service/alertify.service";
import { UserService } from "../../_service/user.service";
import { User } from "../../_Models/User";
import { Pagination } from "../../_Models/pagination";

@Component({
  selector: "app-memberlist",
  templateUrl: "./memberlist.component.html",
  styleUrls: ["./memberlist.component.css"]
})
export class MemberlistComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem("user"));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  userParams: any = {};
  pagination: Pagination;

  constructor(
    private userService: UserService,
    private alertity: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data["users"].result;
      this.pagination = data["users"].pagination;
      console.log(this.pagination);
    });
    this.userParams.gender = this.user.gender === 'female' ? 'female' : 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 101;
    this.userParams.orderBy = 'lastActive';
    console.log(this.userParams);
  }

  loadUser() {
    console.log(this.pagination.currentPage);
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        err => {
          this.alertity.error(err);
        }
      );
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 101;
    this.loadUser();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUser();
  }
}
