import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model: any = {};
@Output() cancelRegister = new EventEmitter();


  constructor(private auth: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.model).subscribe(res => {
      this.alertify.success('registr success');
    }, err => {
      this.alertify.error(err);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('canceled');
  }

}
