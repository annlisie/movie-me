import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {MoviePage} from './movie-page.model';
import 'rxjs/add/operator/toPromise';
import {MoviePageableParams} from './movie-pageable-params.model';
import {MovieFilteringParams} from './movie-filtering-params.model';
import {Movie} from './movie.model';
import {Genre} from '../movie-catalog/movie-catalog-filter/model/genre.model';
import 'rxjs/add/operator/catch';
import {environment} from '../../../environments/environment';
import {ContextParameter} from '../movie-catalog/rating-form/model/context-parameter.model';

@Injectable()
export class MovieService {
  constructor(private http: Http) { }

  getMovies(pageableParams: MoviePageableParams, filteringParams: MovieFilteringParams): Promise<MoviePage> {
    const params = pageableParams.toParamsObject();
    params.appendAll(filteringParams.toParamsObject());

    const requestOptions = new RequestOptions();
    requestOptions.params = params;

    return this.http.get(environment.apiEndpoint + '/movies', requestOptions)
      .toPromise()
      .then(response => {
        return <MoviePage>response.json().data;
      })
      .catch(reason => console.log(reason));
  }

  getGenres(): Promise<Genre[]> {
    return this.http.get(environment.apiEndpoint + '/movies/genres')
      .toPromise()
      .then(response => {
        return <Genre[]>response.json().data;
      })
      .catch(reason => console.log(reason));
  }

  getSingleMovie(id: number): Promise<Movie> {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let options;
      if (currentUser != null) {
        const headers = new Headers({
          'Authorization': currentUser.token,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        });
        options = new RequestOptions({headers: headers});
      }
      return this.http.get(environment.apiEndpoint + '/movies/' + id, options)
        .toPromise()
        .then(response => {
            return <Movie>response.json().data;
          })
        .catch(reason => console.log(reason));
  }

  getContextParameters(): Promise<ContextParameter[]> {
    return this.http.get(environment.apiEndpoint + '/ratings/contextParams')
      .toPromise()
      .then(response => {
        return <ContextParameter[]>response.json().data;
      })
      .catch(reason => console.log(reason));
  }
}
