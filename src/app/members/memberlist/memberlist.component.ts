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
  }

  loadUser() {
    console.log(this.pagination.currentPage);
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      },
      err => {
        this.alertity.error(err);
      }
    );
  }

  pageChanged(event: any): void {
    console.log(this.pagination);
    this.pagination.currentPage = event.page;
    this.loadUser();
  }
}
