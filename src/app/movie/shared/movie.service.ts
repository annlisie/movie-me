import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import {MoviePage} from "./movie-page.model";
import "rxjs/add/operator/toPromise";
import {MoviePageableParams} from "./movie-pageable-params.model";
import {MovieFilteringParams} from "./movie-filtering-params.model";
import {Genre} from "../movie-catalog/movie-catalog-filter/model/genre.model";
import "rxjs/add/operator/catch";

@Injectable()
export class MovieService {


  constructor(private http: Http) { }

  getMovies(pageableParams: MoviePageableParams, filteringParams: MovieFilteringParams): Promise<MoviePage> {
    const params = pageableParams.toParamsObject();
    params.appendAll(filteringParams.toParamsObject());

    const requestOptions = new RequestOptions();
    requestOptions.params = params;

    return this.http.get('http://34.223.201.228:8080/movieme/movies', requestOptions)
      .toPromise()
      .then(response => {
        return <MoviePage>response.json().data;
      })
      .catch(reason => console.log(reason));
  }

  getRoles(): Promise<Genre[]> {
    return this.http.get('http://34.223.201.228:8080/movieme/movies/genres')
      .toPromise()
      .then(response => {
        return <Genre[]>response.json().data;
      })
      .catch(reason => console.log(reason));
  }

}