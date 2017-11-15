import {Component, OnInit} from '@angular/core';
import {Movie} from '../movie/shared/movie.model';
import {UserService} from '../user/user.service';
import {NgForm} from '@angular/forms';
import {MovieService} from '../movie/shared/movie.service';
import {ContextParameter} from '../movie/movie-catalog/rating-form/model/context-parameter.model';
import {MovieFilteringParams} from '../movie/shared/movie-filtering-params.model';
import {MoviePageableParams} from '../movie/shared/movie-pageable-params.model';

@Component({
    selector: 'app-search',
    templateUrl: './recommendations.component.html',
    styleUrls: ['./recommendations.component.scss']
})

export class RecommendationsComponent implements OnInit {

  private contextParams: ContextParameter[];
  private recommendedMovies: Movie[];
  filteringParams: MovieFilteringParams;
  pageableParams: MoviePageableParams;

  constructor(private userService: UserService, private movieService: MovieService) {
    this.filteringParams = new MovieFilteringParams();
    this.pageableParams = new MoviePageableParams();
  }

  ngOnInit() {
    this.movieService.getContextParameters()
      .then(response => this.contextParams = response);
    if (localStorage.getItem('currentUser') !== null && localStorage.getItem('rememberedSearch') !== null && localStorage.getItem('filteringParams')) {
      const formParams = JSON.parse(localStorage.getItem('rememberedSearch'));
      this.filteringParams = new MovieFilteringParams();
      this.filteringParams.fill(JSON.parse(localStorage.getItem('filteringParams')));
      console.log(this.filteringParams);
      this.userService.getRecommendations(formParams, this.filteringParams)
        .subscribe(
          (data) => {
            this.recommendedMovies = data.data;
            console.log(this.recommendedMovies);
          }, // Reach here if res.status >= 200 && <= 299
          (err) => {
          });
    }
  }

  checkRememberedSearch(key: string) {
    const obj = JSON.parse(localStorage.getItem('rememberedSearch'));
    if (obj === null || obj[key].isUndefined) {
      return 'EMPTY';
    }
    return obj[key];
  }

  getRecommendations(f: NgForm) {
    if (localStorage.getItem('currentUser') === null) {
      alert('Aby otrzymać rekomendacje musisz być zalogowany!');
      return;
    }
    console.log(f.value);
    const keyNames = Object.keys(f.value);
    for (const i of keyNames) {
      if (f.value[i] === '' || f.value[i].isUndefined) {
        if (i === 'hideRated') {
          f.value[i] = false;
        } else {
          f.value[i] = 'EMPTY';
        }
      }
    }
    localStorage.setItem('rememberedSearch', JSON.stringify(f.value));
    localStorage.setItem('filteringParams', JSON.stringify(this.filteringParams));
    this.userService.getRecommendations(f.value, this.filteringParams)
      .subscribe(
        (data) => {
          this.recommendedMovies = data.data;
          console.log(this.recommendedMovies);
        }, // Reach here if res.status >= 200 && <= 299
        (err) => {
          alert('Oceń więcej filmów w wybranym kontekście lub zmień filtry, by otrzymać rekomendacje.');
          this.recommendedMovies = null;
          this.getMoviesForReplacement();
        });
  }

  getMoviesForReplacement() {
    this.pageableParams.numberOfElementsOnPage = 5;
    this.pageableParams.page = 0;
    this.pageableParams.columnToSort = 'id';
    this.movieService.getMovies(this.pageableParams, this.filteringParams)
      .then(response => this.recommendedMovies = <Movie[]>response.content);
  }
}
