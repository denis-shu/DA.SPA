import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { AuthService } from "./_service/auth.service";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { AlertifyService } from "./_service/alertify.service";
import { BsDropdownModule } from 'ngx-bootstrap';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './_guard/auth.guard';
import { UserService } from './_service/user.service';
import { MemberlistComponent } from './members/memberlist/memberlist.component';
import { MemberCartComponent } from './members/member-cart/member-cart.component';
import { AuthModule } from './auth/auth.module';
import { MemberDetailComponent } from "./members/MemberDetail/MemberDetail.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberlistComponent,
    ListsComponent,
    MessagesComponent,
    MemberCartComponent,
    MemberDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AuthModule
  ],
  providers: [AuthService, AlertifyService, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
