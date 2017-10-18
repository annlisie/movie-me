import { Component, OnInit } from '@angular/core';
import {Headers, RequestOptions, Response, Http} from '@angular/http';
import {AuthenticationService} from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication-login',
  templateUrl: './change-password.component.html',
  styleUrls: ['../authentication.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  model: any = {};
  error = '';

  constructor(public http: Http, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  clearError() {
    this.error = '';
  }

  changePassword(oldPassword: string, newPassword: string, confirmNewPassword: string) {
    this.authenticationService.changePassword(oldPassword, newPassword, confirmNewPassword)
      .subscribe(
        (data) => {
          console.log(data);
        }, // Reach here if res.status >= 200 && <= 299
        (err) => {
          const errorArray = JSON.parse(err._body).errors;
          this.error = '';
          for (let e of errorArray) {
            this.error += e + '. ';
          }
        });
  }

  validate(password: string, confirmPassword: string) {
    return password === confirmPassword ;
  }

}
