
import { ListResolver } from './_resolves/list.resolver';
import { MemberListResolver } from './_resolves/member-list.resolver';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from 'ngx-gallery';
import {TimeAgoPipe} from 'time-ago-pipe';
import {JwtModule} from '@auth0/angular-jwt';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_service/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_service/alertify.service';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './_guard/auth.guard';
import { UserService } from './_service/user.service';
import { MemberlistComponent } from './members/memberlist/memberlist.component';
import { MemberCartComponent } from './members/member-cart/member-cart.component';
import { MemberDetailComponent } from './members/MemberDetail/MemberDetail.component';
import { DetailResolver } from './_resolves/detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolves/member-edit.resolver';
import { PreventUnsafeChanges } from './_guard/prevent-unsavedchanges.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { MessagesResolver } from './_resolves/message.resolver';
import { MembersMessagesComponent } from './members/members-messages/members-messages.component';

export function getToken(): string {
  return localStorage.getItem('token');
}

export const jwtConfig = {
  tokenGetter: getToken,
  whitelistedDomains: ['localhost:5000']
};


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
    MemberDetailComponent,
    MembersMessagesComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: jwtConfig
    })
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    UserService,
    DetailResolver,
    MemberEditResolver,
    MemberListResolver,
    ListResolver,
    MessagesResolver,
  PreventUnsafeChanges],
  bootstrap: [AppComponent]
})
export class AppModule {}
