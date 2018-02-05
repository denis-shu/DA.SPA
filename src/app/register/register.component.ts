import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model: any = {};
@Output() cancelRegister = new EventEmitter();


  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.model).subscribe(res => {
      console.log("registr success");
    }, err => {
      console.log(err);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('canceled');
  }

}
