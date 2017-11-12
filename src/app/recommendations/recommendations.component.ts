import {Component, OnInit} from '@angular/core';
import {Movie} from '../movie/shared/movie.model';
import {UserService} from '../user/user.service';
import {NgForm} from '@angular/forms';
import {MovieService} from '../movie/shared/movie.service';
import {ContextParameter} from '../movie/movie-catalog/rating-form/model/context-parameter.model';
import {MovieFilteringParams} from '../movie/shared/movie-filtering-params.model';

@Component({
    selector: 'app-search',
    templateUrl: './recommendations.component.html',
    styleUrls: ['./recommendations.component.scss']
})

export class RecommendationsComponent implements OnInit {

  private contextParams: ContextParameter[];
  private recommendedMovies: Movie[];
  filteringParams: MovieFilteringParams;

  constructor(private userService: UserService, private movieService: MovieService) {
    this.filteringParams = new MovieFilteringParams();
  }

  ngOnInit() {
    this.movieService.getContextParameters()
      .then(response => this.contextParams = response);
    if (localStorage.getItem('currentUser') !== null && localStorage.getItem('rememberedSearch') !== null) {
      const formParams = JSON.parse(localStorage.getItem('rememberedSearch'));
      console.log(formParams);
      this.userService.getRecommendations(formParams)
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
      return;
    }
    const keyNames = Object.keys(f.value);
    for (const i of keyNames) {
      if (i !== 'ratingValue' && (f.value[i] === '' || f.value[i].isUndefined)) {
        f.value[i] = 'EMPTY';
      }
    }
    localStorage.setItem('rememberedSearch', JSON.stringify(f.value));
    this.userService.getRecommendations(f.value)
      .subscribe(
        (data) => {
          this.recommendedMovies = data.data;
          console.log(this.recommendedMovies);
        }, // Reach here if res.status >= 200 && <= 299
        (err) => {
          // TODO dodać zastępcze filmy
          this.recommendedMovies = null;
          const errorMessage = JSON.parse(err._body).errors;
          console.log(errorMessage);
        });
  }
};
