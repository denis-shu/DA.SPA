import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(
    public auth: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.currentPhotoUrl.subscribe(photoUrl => {
      this.photoUrl = photoUrl;
    });
  }

  login() {
    this.auth.login(this.model).subscribe(
      data => {
        this.alertify.success('Loging is success!');
      },
      err => {
        this.alertify.error('failed to login');
      },
      () => {
        this.router.navigate(['/members']);
      }
    );
  }

  logout() {
    this.auth.userToken = null;
    this.auth.currenrUser = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  loggedIn() {
    return this.auth.loggedIn();
  }
}
