import { Component, OnInit } from '@angular/core';
import { AuthService } from './_service/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { User } from './_Models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private auth: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.auth.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.auth.currenrUser = user;
      if (this.auth.currenrUser.photoUrl !== null){
        this.auth.changeMemberPhoto(user.photoUrl);
      }
      else{
        this.auth.changeMemberPhoto('../assets/user.jpg');
      }
    }
  }
}
