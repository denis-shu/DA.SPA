import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  login() {
    this.auth.login(this.model).subscribe(
      data => {
        console.log('Loging is success!');
      },
      err => {
        console.log('failed to login');
      }
    );
  }

  logout() {
    this.auth.userToken = null;
    localStorage.removeItem('token');
    console.log('logged out');
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
