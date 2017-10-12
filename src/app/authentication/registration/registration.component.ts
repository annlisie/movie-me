/**
 * Created by Ania on 06.06.2017.
 */
import { Component, OnInit } from '@angular/core';
import {Headers, RequestOptions, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthenticationService} from '../authentication.service';
import { Router } from '@angular/router';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import {parseHttpResponse} from "selenium-webdriver/http";

@Component ({
    selector: 'app-authentication-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['../authentication.component.scss']
})

export class RegistrationComponent implements OnInit {
    model: any = {};
    success = false;
    error = '';
    newEmail = '';


    constructor(public http: Http, private authenticationService: AuthenticationService, private router: Router) {
    }

    ngOnInit() {
    }

    clearError() {
      this.error = '';
    }

    validate(password: string, confirmPassword: string) {
      return password === confirmPassword ;
    }

    register(email: string, password: string, confirmPassword: string) {

      this.authenticationService.register(email, password, confirmPassword)
        .subscribe(
          (data) => {
            this.newEmail = data['data'].email;
          }, // Reach here if res.status >= 200 && <= 299
          (err) => {
             const errorArray = JSON.parse(err._body).errors;
             this.error = '';
             for (let e of errorArray) {
               this.error += e + '. ';
             }
          });
    }

}
