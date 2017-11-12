import {Component, OnInit} from '@angular/core';
import {ContextParameter} from '../../movie/movie-catalog/rating-form/model/context-parameter.model';
import {MovieService} from '../../movie/shared/movie.service';
import {NgForm} from '@angular/forms';
import {UserService} from '../../user/user.service';
import {Movie} from '../../movie/shared/movie.model';

@Component ({
    selector: 'app-context-search',
    templateUrl: './contextSearch.component.html',
    styleUrls: ['../recommendations.component.scss', './contextSearch.component.scss']
})

export class ContextSearchComponent implements OnInit {

  private contextParams: ContextParameter[];
  private recommendedMovies: Movie[];

  constructor(private movieService: MovieService, private userService: UserService) {
  }

  ngOnInit() {
    this.movieService.getContextParameters()
      .then(response => this.contextParams = response);
  }

  getRecommendations(f: NgForm) {
    const keyNames = Object.keys(f.value);
    for (const i of keyNames) {
      if (i !== 'ratingValue' && (f.value[i] === '' || f.value[i].isUndefined)) {
        f.value[i] = 'EMPTY';
      }
    }
    this.userService.getRecommendations(f)
      .subscribe(
        (data) => {
          this.recommendedMovies = data.data;
          console.log(this.recommendedMovies);
        }, // Reach here if res.status >= 200 && <= 299
        (err) => {
        });
  }
}
