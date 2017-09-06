import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {MoviePage} from './movie-page.model';
import 'rxjs/add/operator/toPromise';
import {Movie} from './movie.model';

@Injectable()
export class MovieService {

  constructor(private http: Http) { }

  getAllMovies(page: number): Promise<MoviePage> {
    return this.http.get('https://localhost:8443/movies?page=' + page)
      .toPromise()
      .then(response => {
        return <MoviePage>response.json().data;
      })
      .catch(reason => console.log(reason));
  }

  searchByTitle(title: string, page: number): Promise<MoviePage> {
    return this.http.get('https://localhost:8443/movies/find?title=' + title + '&page=' + page)
      .toPromise()
      .then(response => {
        return <MoviePage>response.json().data;
      })
      .catch(reason => console.log(reason));
  }

  getSingleMovie(id: number): Promise<Movie> {
    return this.http.get('https://localhost:8443/movies/' + id)
      .toPromise()
      .then(response => {
        return <Movie>response.json().data;
      })
      .catch(reason => console.log(reason));
  }

}
