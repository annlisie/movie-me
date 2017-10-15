import { Component, OnInit } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from "@angular/http";
import { environment } from 'environments/environment';

@Component({
  selector: 'app-authentication-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(public http: Http) { }

  ngOnInit() {
  }


  login(email: string, password: string) {

    const headers = new Headers ({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers});

    const data = {
      email: email,
      password: password
    };


    return this.http.post(environment.apiEndpoint + '/login', data, options )
      .map((res: Response) => res.json())
      .subscribe(
        function(response) { alert("Success Response" + response)},
        function(error) { alert("Error happened" + error)},
        function() { alert("the subscription is completed")}
      );
  }



}
