import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {MovieFilteringParams} from '../movie/shared/movie-filtering-params.model';
import {MoviePageableParams} from "../movie/shared/movie-pageable-params.model";

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

  getRecommendations(f: any, filteringParams: MovieFilteringParams): Observable<any> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers({
      'Authorization': currentUser.token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const params = new URLSearchParams();
    for (const key of Object.keys(f)) {
      params.set(key, f[key]);
    }
    params.appendAll(filteringParams.toParamsObject());
    const requestOptions = new RequestOptions();
    requestOptions.params = params;
    requestOptions.headers = headers;

    return this.http.get(environment.apiEndpoint + '/recommendations', requestOptions)
      .map((response: Response) => {
        return response.json();
      });
  }

  getRatings(pageableParams: MoviePageableParams): Observable<any> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const params = pageableParams.toParamsObject();
    const headers = new Headers({
      'Authorization': currentUser.token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const requestOptions = new RequestOptions();
    requestOptions.headers = headers;
    requestOptions.params = params;
    return this.http.get(environment.apiEndpoint + '/myRatings', requestOptions)
      .map((response: Response) => {
        return response.json();
      });
  }
}
