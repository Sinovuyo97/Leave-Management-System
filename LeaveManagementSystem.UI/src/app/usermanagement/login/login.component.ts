import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { contants } from 'src/app/shared/global/global.contants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  date: any;
  loginForm: FormGroup = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', Validators.required),
  });
  holdingArray: FormGroup = new FormGroup({});
  serverErrorMessage: any;
  loginTime: any = '';

  constructor(private tokenService: TokenService, private formBuilder: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {

  }

  login() {
    // display the error message
    this.loginForm.markAllAsTouched();

    // stop the code running
    if (this.loginForm.invalid) {
      return;
    }

    var tzoffset = (new Date()).getTimezoneOffset() * 60000;

    this.date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.loginTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    console.log(this.date);
    // making a backend call
    this.userService
      .authenticate(this.loginForm.value)
      .subscribe((response: any | undefined) => {
        // save the token
        sessionStorage.setItem(contants.token, response?.token);
        sessionStorage.setItem(contants.username, `${response?.name} ${response?.surname}`);
        sessionStorage.setItem(contants.role, response?.role);
        sessionStorage.setItem("date", this.date);
        sessionStorage.setItem(contants.time, this.loginTime);
        // route to the master layout
        this.router.navigate(['/leave']);

      },
        error => {
          this.loginForm.controls['Email'].setErrors({ isUserNameOrPasswordIncorrect: true });
          this.loginForm.controls['Password'].setErrors({ isUserNameOrPasswordIncorrect: true });
          this.loginForm.updateValueAndValidity();
          this.serverErrorMessage = error?.message;
        });


  }
  openSocialMediaOnNewTab(url: string) {
    window.open(url, "_blank");
  }

}
