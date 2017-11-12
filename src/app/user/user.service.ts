import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Injectable()
export class UserService {
  constructor(private http: Http, private router: Router) {
  }

  rateMovie(model: any, movieId: number): Observable<any> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers({
      'Authorization': currentUser.token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const options = new RequestOptions({headers: headers});
    return this.http.put(environment.apiEndpoint + '/movies/' + movieId + '/rate', JSON.stringify(model), options)
      .map((response: Response) => {
        return response.json();
      });
  }
}
