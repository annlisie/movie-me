import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Movie} from "../movie/shared/movie.model";

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

  getRecommendations(f: any): Observable<any> {
    let parameters = '';
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers({
      'Authorization': currentUser.token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const options = new RequestOptions({headers: headers});
    const keyNames = Object.keys(f);
    for (const i of keyNames) {
      parameters += i + '=' + f[i] + '&';
    }
    return this.http.get(environment.apiEndpoint + '/recommendations?' + parameters, options)
      .map((response: Response) => {
        return response.json();
      });
  }
}
