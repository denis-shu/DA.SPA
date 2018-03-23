import { ActivatedRoute } from "@angular/router";
import { Pagination, PaginatedResult } from "./../_Models/pagination";
import { Component, OnInit } from "@angular/core";
import { User } from "../_Models/User";
import { AuthService } from "../_service/auth.service";
import { UserService } from "../_service/user.service";
import { AlertifyService } from "../_service/alertify.service";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.css"]
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(
    private auth: AuthService,
    private userSrvice: UserService,
    private route: ActivatedRoute,
    private alert: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data["user"].result;
      this.pagination = data["user"].pagination;
    });
    this.likesParam = "Likers";
  }

  loadUser() {
    this.userSrvice
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        null,
        this.likesParam
      )
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        err => {
          this.alert.error(err._body);
        });
  }
  
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUser();
  }
}
