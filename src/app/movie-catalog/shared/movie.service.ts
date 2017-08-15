import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {MoviePage} from './movie-page.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieService {

  constructor(private http: Http) { }

  getMovies(page: number): Promise<MoviePage> {
    return this.http.get('https://localhost:8443/movies?page=' + page)
      .toPromise()
      .then(response => {
        return <MoviePage>response.json().data;
      })
      .catch(reason => console.log(reason));
  }

}
