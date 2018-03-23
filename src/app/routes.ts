import { MemberListResolver } from "./_resolves/member-list.resolver";
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MemberlistComponent } from "./members/memberlist/memberlist.component";
import { MessagesComponent } from "./messages/messages.component";
import { ListsComponent } from "./lists/lists.component";
import { AuthGuard } from "./_guard/auth.guard";
import { MemberDetailComponent } from "./members/MemberDetail/MemberDetail.component";
import { DetailResolver } from "./_resolves/detail.resolver";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { MemberEditResolver } from "./_resolves/member-edit.resolver";
import { PreventUnsafeChanges } from "./_guard/prevent-unsavedchanges.guard";
import { ListResolver } from "./_resolves/list.resolver";

export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "members",
        component: MemberlistComponent,
        resolve: { users: MemberListResolver }
      },
      {
        path: "members/:id",
        component: MemberDetailComponent,
        resolve: { user: DetailResolver }
      },
      {
        path: "member/edit",
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsafeChanges]
      },
      { path: "messages", component: MessagesComponent },
      {
        path: "lists",
        component: ListsComponent,
        resolve: { user: ListResolver }
      }
    ]
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];
