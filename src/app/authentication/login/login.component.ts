import { Component, OnInit } from '@angular/core';
import {Headers, RequestOptions, Response, Http} from '@angular/http';
import {AuthenticationService} from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  error = '';

  constructor(public http: Http, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  clearError() {
    this.error = '';
  }

  login(email: string, password: string) {
    this.authenticationService.login(this.model.email, this.model.password)
      .subscribe(
        (data) => {
          this.router.navigate(['/']);
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
