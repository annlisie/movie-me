import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {MoviePage} from './movie-page.model';
import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

@Injectable()
export class MovieService {

  constructor(private http: Http) { }

  getAllMovies(page: number): Promise<MoviePage> {
    return this.http.get(environment.apiEndpoint + '/movies?page=' + page)
      .toPromise()
      .then(response => {
        return <MoviePage>response.json().data;
      })
      .catch(reason => console.log(reason));
  }

  searchByTitle(title: string, page: number): Promise<MoviePage> {
    return this.http.get(environment.apiEndpoint + '/movies/find?title=' + title + '&page=' + page)
      .toPromise()
      .then(response => {
        return <MoviePage>response.json().data;
      })
      .catch(reason => console.log(reason));
  }

}
