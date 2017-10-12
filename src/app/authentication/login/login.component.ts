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
/*
  login(email: string, password: string) {

    const url = 'https://localhost:8443/login';

    const headers = new Headers ({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers});

    const data = {
      email: email,
      password: password
    };

    return this.http.post( url, data, options )
      .map((res: Response) => res.json())
      .subscribe(
        function(response) { alert("Success Response" + response)},
        function(error) { alert("Error happened" + error)},
        function() { alert("the subscription is completed")}
      );
  }
  */
}
