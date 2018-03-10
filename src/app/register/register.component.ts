import { Component, EventEmitter, OnInit, Input, Output } from "@angular/core";
import { AuthService } from "../_service/auth.service";
import { AlertifyService } from "../_service/alertify.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap";
import { User } from "../_Models/User";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  user: User;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;



  constructor(private auth: AuthService, private router: Router, private alertify: AlertifyService,  private fb: FormBuilder) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
   this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        knownAs: ['...', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        userName: ['', Validators.required],
        password: [
          '',
          [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8)]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(f: FormGroup) {
    return f.get('password').value === f.get('confirmPassword').value
      ? null
      : { error: true };
  }

  register() {
   if (this.registerForm.valid) {
    this.user = Object.assign({}, this.registerForm.value);
    this.auth.register(this.user).subscribe(() => {
      this.alertify.success('Successful registetion');
    }, err => {
    this.alertify.error(err);    
   }, () => {
     this.auth.login(this.user).subscribe(()=>{
        this.router.navigate(['/members']);
     });
   });
  }
}

  cancel() {
    this.cancelRegister.emit(false);
    ;
  }
}
