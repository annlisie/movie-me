import { Injectable } from '@angular/core';
import {Http, RequestOptions, URLSearchParams} from '@angular/http';
import {MoviePage} from './movie-page.model';
import 'rxjs/add/operator/toPromise';
import {MoviePageableParams} from './movie-pageable-params.model';
import {MovieFilteringParams} from './movie-filtering-params.model';

@Injectable()
export class MovieService {


  constructor(private http: Http) { }

  getMovies(pageableParams: MoviePageableParams, filteringParams: MovieFilteringParams): Promise<MoviePage> {
    const params = pageableParams.toParamsObject();
    params.appendAll(filteringParams.toParamsObject());

    const requestOptions = new RequestOptions();
    requestOptions.params = params;

    return this.http.get('https://localhost:8443/movies', requestOptions)
      .toPromise()
      .then(response => {
        return <MoviePage>response.json().data;
      })
      .catch(reason => console.log(reason));
  }

}
